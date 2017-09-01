import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GridOptions } from "ag-grid/main";
import { FinanceChartService } from '../finance-chart.service';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartBarLine } from 'app/statistics/chart/common-chart/chart-bar-line/chart-bar-line.model';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit {

  public gridOptions: GridOptions;
  busy: Subscription;
  chartTitle: string;
  option1: ChartBarLine;
  option2: ChartBarLine;
  busy1: Subscription;

  constructor(private financeChartService: FinanceChartService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "资产类科目", field: "name", width: 250 },
      { headerName: "本期金额", field: "current_amount", width: 200 },
      { headerName: "上年本期金额", field: "prev_amount", width: 200 },
      { headerName: "本期同比", field: "linkRelative", width: 200 },
      { headerName: "本年累计", field: "year_total_amount", width: 200 },
      { headerName: "上年累计", field: "prev_total_amount", width: 200 },
      { headerName: "累计同比", field: "linkRelativeTotal", width: 200 }
    ];
    this.gridOptions.rowData = [];
    this.gridOptions.enableColResize = true;
  }

  ngOnInit() {
    this.chartTitle = "支付的职工薪酬";
    this.busy = Observable.forkJoin(this.financeChartService.getFinanceChartInfo(5), this.financeChartService.getCashItemAnalysisData(this.chartTitle)).subscribe(data => {
      let gridData = data[0];
      let chartData = data[1];
      let rowData = [];
      for (var key in gridData) {
        let newObj = gridData[key];
        newObj.name = key;
        newObj.linkRelative = (newObj.prev_amount == 0 || newObj.prev_amount == undefined ? 0 : (newObj.current_amount - newObj.prev_amount) / newObj.prev_amount * 100) + '%';
        newObj.linkRelativeTotal = (newObj.prev_total_amount == 0 || newObj.prev_total_amount == undefined ? 0 : (newObj.year_total_amount - newObj.prev_total_amount) / newObj.prev_total_amount * 100) + '%';
        rowData.push(newObj);
      }
      this.gridOptions.api.setRowData(rowData);

      //同比分析
      this.option1 = this.getyearOnYearData(chartData);

      //累计同比分析
      this.option2 = this.getyearOnYearTotalData(chartData);

      // this.option = {
      //   colors: ['#2BABEF', '#FABD5D', '#F3969C'],
      //   legendData: ['本期', '同期', '环比比例'],
      //   xData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      //   yName: '单位(万元)',
      //   seriesData: [
      //     {
      //       name: '本期',
      //       value: [3000, 3200, 4200, 1900, 2400, 5200, 3500, 1300, 4100, 4200, 3700, 3800]
      //     },
      //     {
      //       name: '同期',
      //       value: [3200, 3100, 5200, 2900, 1400, 3200, 2500, 3300, 3100, 2200, 1700, 4800],
      //     },
      //     {
      //       name: '环比比例',
      //       value: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      //     }],
      //   hasLine: true
      // };
    });
  }

  public getyearOnYearData(data) {
    if (data) {
      let xData = [];
      let currentPeriod = [];
      let lastYear = [];
      let scale = [];
      for (let key in data.total) {
        xData.push(key);
        currentPeriod.push(data.period[key]['end_balance']);
        lastYear.push(data.period[key]['prev_end_balance'])
        scale.push(data.period[key]['prev_end_balance'] == 0 || data.period[key]['prev_end_balance'] == undefined ? 0 :
          (data.period[key]['end_balance'] - data.period[key]['prev_end_balance']) / data.period[key]['prev_end_balance'] * 100);
      }
      return {
        colors: ['#51BDF4', '#FABD5D', '#F3969C'],
        legendData: ['本期金额', '上年同期', '同比比例'],
        xData: xData,
        yName: '单位(万元)',
        seriesData: [
          {
            name: '本期金额',
            value: currentPeriod
          },
          {
            name: '上年同期',
            value: lastYear,
          },
          {
            name: '同比比例',
            value: scale
          }],
        hasLine: true
      };
    }
  }

  public getyearOnYearTotalData(data) {
    if (data) {
      let xData = [];
      let currentPeriod = [];
      let lastYear = [];
      let scale = [];
      for (let key in data.total) {
        xData.push(key);
        currentPeriod.push(data.total[key]['total_balance']);
        lastYear.push(data.total[key]['prev_total_balance'])
        scale.push(data.total[key]['prev_total_balance'] == 0 || data.total[key]['prev_total_balance'] == undefined ? 0 :
          (data.total[key]['total_balance'] - data.total[key]['prev_total_balance']) / data.total[key]['prev_total_balance'] * 100);
      }
      return {
        colors: ['#51BDF4', '#FABD5D', '#F3969C'],
        legendData: ['本年累计', '上年同期', '同比比例'],
        xData: xData,
        yName: '单位(万元)',
        seriesData: [
          {
            name: '本年累计',
            value: currentPeriod
          },
          {
            name: '上年同期',
            value: lastYear,
          },
          {
            name: '同比比例',
            value: scale
          }],
        hasLine: true
      };
    }
  }

  rowClick($event) {
    this.busy1 = Observable.forkJoin(this.financeChartService.getCashItemAnalysisData($event.node.data.name)).subscribe(data => {
      this.chartTitle = $event.node.data.name;
      let chartData = data[0];

      //同比分析
      this.option1 = this.getyearOnYearData(chartData);

      //累计同比分析
      this.option2 = this.getyearOnYearTotalData(chartData);
    });
  }

}
