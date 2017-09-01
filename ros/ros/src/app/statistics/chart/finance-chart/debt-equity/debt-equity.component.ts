import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GridOptions } from "ag-grid/main";
import { FinanceChartService } from '../finance-chart.service';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartPieSimple } from 'app/statistics/chart/common-chart/chart-pie-simple/chart-pie-simple.model';
import { ChartBarLine } from 'app/statistics/chart/common-chart/chart-bar-line/chart-bar-line.model';

@Component({
  selector: 'app-debt-equity',
  templateUrl: './debt-equity.component.html',
  styleUrls: ['./debt-equity.component.scss']
})
export class DebtEquityComponent implements OnInit {

  public gridOptions: GridOptions;
  busy: Subscription;
  busy1: Subscription;
  chartTitle: string;
  public option1: ChartPieSimple;
  public option2: ChartBarLine;
  public option3: ChartBarLine;

  constructor(private financeChartService: FinanceChartService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "负债权益类科目", field: "name", width: 150 },
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
    this.chartTitle = "应付账款";
    this.busy = Observable.forkJoin(this.financeChartService.getFinanceChartInfo(2), this.financeChartService.getLastYearAnalysisData(this.chartTitle)).subscribe(data => {
      let gridData = data[0];
      let chartData = data[1];
      let rowData = [];
      for (var key in gridData.rows['所有者权益']) {
        rowData.push(gridData.rows['所有者权益'][key]);
      }
      for (var key in gridData.rows['流动负债']) {
        rowData.push(gridData.rows['流动负债'][key]);
      }
      for (var key in gridData.rows['非流动负债']) {
        rowData.push(gridData.rows['非流动负债'][key]);
      }
      this.gridOptions.api.setRowData(rowData);

      this.option1 = {
        title: '负债权益占比',
        legendData: ['所有者权益合计', '负债合计'],
        total: 1000000,
        value: [{ value: gridData.rows['所有者权益（或股东权益）合计'].end_balance, name: '所有者权益合计' }, { value: gridData.rows['负债合计'].end_balance, name: '负债合计' }],
        colors: [
          '#74CAF6',
          '#47C17E'
        ]
      };

      this.option2 = this.financeChartService.getLinkRelativeData(chartData);

      this.option3 = this.financeChartService.getyearOnYearData(chartData);

    });
  }

  rowClick($event) {
    this.busy1 = Observable.forkJoin(this.financeChartService.getLastYearAnalysisData($event.node.data.name)).subscribe(data => {
      this.chartTitle = $event.node.data.name;
      let chartData = data[0];

      //环比分析
      this.option2 = this.financeChartService.getLinkRelativeData(chartData);

      //同比分析
      this.option3 = this.financeChartService.getyearOnYearData(chartData);
    });
  }
}
