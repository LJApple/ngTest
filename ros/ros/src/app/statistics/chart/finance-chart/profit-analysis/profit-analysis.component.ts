import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GridOptions } from "ag-grid/main";
import { FinanceChartService } from '../finance-chart.service';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartBarLine } from 'app/statistics/chart/common-chart/chart-bar-line/chart-bar-line.model';
import { ChartLineTwo } from 'app/statistics/chart/common-chart/chart-line-two/chart-line-two.model';
import { ChartRectangle } from 'app/statistics/chart/common-chart/chart-rectangle/chart-rectangle.model';

@Component({
  selector: 'app-profit-analysis',
  templateUrl: './profit-analysis.component.html',
  styleUrls: ['./profit-analysis.component.scss']
})
export class ProfitAnalysisComponent implements OnInit {

  public gridOptions: GridOptions;
  busy: Subscription;
  busy1: Subscription;
  chartTitle: string;
  public option1: ChartBarLine;
  public option2: ChartLineTwo;
  public option3: ChartRectangle;

  constructor(private financeChartService: FinanceChartService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "损益类科目", field: "name", width: 150 },
      { headerName: "年初余额", field: "year_begin_balance", width: 150 },
      { headerName: "期初余额", field: "period_begin_balance", width: 150 },
      { headerName: "借方发生额", field: "period_happened_credit_amount", width: 100 },
      { headerName: "贷方发生额", field: "period_happened_debit_amount", width: 100 },
      { headerName: "期末余额", field: "period_total_amount", width: 100 }
    ];
    this.gridOptions.rowData = [];
    this.gridOptions.enableColResize = true;
  }

  ngOnInit() {
    this.chartTitle = "一、营业收入";
    this.busy = Observable.forkJoin(this.financeChartService.getFinanceChartInfo(6), this.financeChartService.getProfitAnalysisData(this.chartTitle)).subscribe(data => {
      let gridData = data[0];
      let chartData = data[1];
      let rowData = [];
      for (var key in gridData.rows) {
        rowData.push(gridData.rows[key]);
      }
      this.gridOptions.api.setRowData(rowData);

      this.option1 = this.getyearOnYearData(chartData);

      this.option2 = this.getDuringTrendData(chartData);

      this.option3 = this.getCustomerData(chartData);
    });
  }

  public getyearOnYearData(data) {
    if (data) {
      let xData = [];
      let currentPeriod = [];
      let lastYear = [];
      let scale = [];
      for (let key in data.account) {
        xData.push(key);
        currentPeriod.push(data.account[key]['end_balance']);
        lastYear.push(data.account[key]['prev_end_balance'])
        scale.push(data.account[key]['prev_end_balance'] == 0 || data.account[key]['prev_end_balance'] == undefined ? 0 :
          (data.account[key]['end_balance'] - data.account[key]['prev_end_balance']) / data.account[key]['prev_end_balance'] * 100);
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

  public getDuringTrendData(data) {
    if (data) {
      let date = new Date;
      let nowYearData = date.getFullYear();
      let xData = [];
      let accountLastYear = [];
      let accountNowYear = [];
      for (let key in data.periods[nowYearData]) {
        xData.push(key);
        accountNowYear.push(data.periods[nowYearData][key])
      }
      for (let key in data.periods[nowYearData - 1]) {
        accountLastYear.push(data.periods[nowYearData - 1][key])
      }
      return {
        legendData: ['今年金额', '去年金额'],
        xData: xData,
        value: [{ name: '今年金额', value: accountNowYear },
        { name: '去年金额', value: accountLastYear }]
      };
    }
  }

  public getCustomerData(data) {
    if (data) {
      let xData = [];
      let customerList = [];
      for (let key in data.employee) {
        xData.push(key);
        customerList.push({ name: key, value: data.employee[key].end_balance })
      }
      return {
        title: "",
        xData: xData,
        Data: customerList,
      }
    }
  }
  rowClick($event) {
    this.busy1 = Observable.forkJoin(this.financeChartService.getProfitAnalysisData($event.node.data.name)).subscribe(data => {
      this.chartTitle = $event.node.data.name;
      let chartData = data[0];

      this.option1 = this.getyearOnYearData(chartData);

      this.option2 = this.getDuringTrendData(chartData);

      this.option3 = this.getCustomerData(chartData);
    });
  }
}
