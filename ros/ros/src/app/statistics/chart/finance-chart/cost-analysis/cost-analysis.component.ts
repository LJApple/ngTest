import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GridOptions } from "ag-grid/main";
import { FinanceChartService } from '../finance-chart.service';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartBarLine } from 'app/statistics/chart/common-chart/chart-bar-line/chart-bar-line.model';
import { ChartPieRadius } from 'app/statistics/chart/common-chart/chart-pie-radius/chart-pie-radius.model';
import { ChartLineTwo } from 'app/statistics/chart/common-chart/chart-line-two/chart-line-two.model';

@Component({
  selector: 'app-cost-analysis',
  templateUrl: './cost-analysis.component.html',
  styleUrls: ['./cost-analysis.component.scss']
})
export class CostAnalysisComponent implements OnInit {
  public option1: ChartPieRadius;
  public option2: ChartBarLine;
  public option3: ChartBarLine;
  public option4: ChartLineTwo;
  public gridOptions: GridOptions;
  busy: Subscription;
  busy1: Subscription;
  chartTitle: string;
  chartID: string;

  constructor(private financeChartService: FinanceChartService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "损益类科目", field: "name", width: 150 },
      { headerName: "本期发生额", field: "end_balance", width: 150 },
      { headerName: "上期发生额", field: "prev_end_balance", width: 150 },
      { headerName: "本期环比", field: "linkRelative", width: 150 },
      { headerName: "上年发生额", field: "prev_year_end_balance", width: 150 },
      { headerName: "本期同比", field: "yearOnYearRelative", width: 150 },
      { headerName: "本年累计发生额", field: "total_balance", width: 150 },
      { headerName: "上年累计发生额", field: "prev_year_total_balance", width: 150 },
      { headerName: "本年累计同比", field: "linkRelativeTotal", width: 150 }
    ];
    this.gridOptions.rowData = [];
    this.gridOptions.enableColResize = true;
  }

  ngOnInit() {
    this.chartTitle = "销售费用";
    this.chartID = "342898";
    this.busy = Observable.forkJoin(this.financeChartService.getFinanceChartInfo(4), this.financeChartService.getCostAnalysisData(this.chartID)).subscribe(data => {
      let gridData = data[0];
      let chartData = data[1];
      let rowData = [];
      for (var key in gridData) {
        let newObj = gridData[key];
        newObj.linkRelative = (newObj.prev_end_balance == 0 || newObj.prev_end_balance == undefined ? 0 : (newObj.end_balance - newObj.prev_end_balance) / newObj.prev_end_balance * 100) + '%';
        newObj.yearOnYearRelative = (newObj.prev_year_end_balance == 0 || newObj.prev_year_end_balance == undefined ? 0 : (newObj.end_balance - newObj.prev_year_end_balance) / newObj.prev_year_end_balance * 100) + '%';
        newObj.linkRelativeTotal = (newObj.prev_year_total_balance == 0 || newObj.prev_year_total_balance == undefined ? 0 : (newObj.total_balance - newObj.prev_year_total_balance) / newObj.total_balance * 100) + '%';
        rowData.push(gridData[key]);
      }
      this.gridOptions.api.setRowData(rowData);

      //部门费用占比
      this.option1 = this.getPartScare(chartData);

      this.option2 = this.getyearOnYearData(chartData, 'organization');

      this.option3 = this.getyearOnYearData(chartData, 'accountItem');

      this.option4 = this.getDuringTrendData(chartData);
    });
  }

  public getPartScare(data) {
    if (data) {
      //部门费用占比
      let partlegendData = [];
      let partCost = [];
      for (let key in data.organization) {
        partlegendData.push(key);
        partCost.push({ value: data.organization[key].end_balance, name: key });
      }
      return {
        title: '',
        legendData: partlegendData,
        value: partCost,
        showTitle: false
      }
    }
  }

  public getyearOnYearData(data, type) {
    if (data) {
      let xData = [];
      let currentPeriod = [];
      let lastYear = [];
      let scale = [];
      for (let key in data[type]) {
        xData.push(key);
        currentPeriod.push(data[type][key]['end_balance']);
        lastYear.push(data[type][key]['prev_end_balance'])
        scale.push(data[type][key]['prev_end_balance'] == 0 || data[type][key]['prev_end_balance'] == undefined ? 0 :
          (data[type][key]['end_balance'] - data[type][key]['prev_end_balance']) / data[type][key]['prev_end_balance'] * 100);
      }
      return {
        colors: ['#51BDF4', '#FABD5D', '#F3969C'],
        legendData: ['本期发生额', '上年同期', '同比比例'],
        xData: xData,
        yName: '单位(万元)',
        seriesData: [
          {
            name: '本期发生额',
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

  public getDuringTrendData(data) {
    if (data) {
      let xData = [];
      let accountLastYear = [];
      let accountNowYear = [];
      for (let key in data.account) {
        xData.push(key);
        accountLastYear.push(data.account[key].prev_end_balance);
        accountNowYear.push(data.account[key].end_balance)
      }

      return {
        legendData: ['今年发生额', '去年发生额'],
        xData: xData,
        value: [{ name: '去年发生额', value: accountLastYear },
        { name: '今年发生额', value: accountNowYear }]
      };
    }
  }

  rowClick($event) {
    this.busy1 = Observable.forkJoin(this.financeChartService.getCostAnalysisData($event.node.data.id)).subscribe(data => {

      this.chartTitle = $event.node.data.name;
      let chartData = data[0];

      this.option1 = this.getPartScare(chartData);

      this.option2 = this.getyearOnYearData(chartData, 'organization');

      this.option3 = this.getyearOnYearData(chartData, 'accountItem');

      this.option4 = this.getDuringTrendData(chartData);
    });
  }
}
