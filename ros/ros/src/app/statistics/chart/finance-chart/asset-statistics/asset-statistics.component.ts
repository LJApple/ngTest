import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GridOptions } from "ag-grid/main";
import { FinanceChartService } from '../finance-chart.service';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartBarLine } from 'app/statistics/chart/common-chart/chart-bar-line/chart-bar-line.model';
import { ChartPieSimple } from 'app/statistics/chart/common-chart/chart-pie-simple/chart-pie-simple.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-asset-statistics',
  templateUrl: './asset-statistics.component.html',
  styleUrls: ['./asset-statistics.component.scss']
})
export class AssetStatisticsComponent implements OnInit {

  public gridOptions: GridOptions;
  public assetOption: ChartPieSimple;
  public linkRelativeOption: ChartBarLine;
  public yearOnYearOption: ChartBarLine;
  busy: Subscription;
  busy1: Subscription;
  chartTitle: string;

  constructor(private financeChartService: FinanceChartService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "资产类科目", field: "name", width: 150 },
      { headerName: "年初余额", field: "begin_balance", width: 150 },
      { headerName: "期初余额", field: "end_balance", width: 150 },
      { headerName: "借方发生额", field: "period_begin_balance", width: 150 },
      { headerName: "贷方发生额", field: "period_happened_credit_amount", width: 150 },
      { headerName: "期末余额", field: "period_happened_debit_amount", width: 100 }
    ];
    this.gridOptions.rowData = [];
    this.gridOptions.enableColResize = true;
  }

  ngOnInit() {
    this.chartTitle = "应收账款";
    this.busy = Observable.forkJoin(this.financeChartService.getFinanceChartInfo(1), this.financeChartService.getLastYearAnalysisData(this.chartTitle)).subscribe(data => {
      let gridData = data[0];
      let chartData = data[1];
      let rowData = [];
      for (var key in gridData.rows['流动资产']) {
        rowData.push(gridData.rows['流动资产'][key]);
      }
      for (var key in gridData.rows['非流动资产']) {
        rowData.push(gridData.rows['非流动资产'][key]);
      }
      this.gridOptions.api.setRowData(rowData);

      //资产类别占比
      this.assetOption = {
        title: '资产类别占比',
        legendData: ['流动资产合计', '非流动资产合计'],
        total: gridData.rows['流动资产合计'].end_balance + gridData.rows['非流动资产合计'].end_balance,
        value: [{ value: gridData.rows['流动资产合计'].end_balance, name: '流动资产合计' }, { value: gridData.rows['非流动资产合计'].end_balance, name: '非流动资产合计' }],
        colors: [
          '#74CAF6',
          '#47C17E'
        ]
      };

      //环比分析
      this.linkRelativeOption = this.financeChartService.getLinkRelativeData(chartData);

      //同比分析
      this.yearOnYearOption = this.financeChartService.getyearOnYearData(chartData);

    });
  }

  rowClick($event) {
    this.busy1 = Observable.forkJoin(this.financeChartService.getLastYearAnalysisData($event.node.data.name)).subscribe(data => {
      this.chartTitle = $event.node.data.name;
      let chartData = data[0];

      //环比分析
      this.linkRelativeOption = this.financeChartService.getLinkRelativeData(chartData);

      //同比分析
      this.yearOnYearOption = this.financeChartService.getyearOnYearData(chartData);
    });
  }
}
