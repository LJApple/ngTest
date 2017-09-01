import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { GridOptions } from "ag-grid/main";
import { FinanceChartService } from '../finance-chart.service';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartBarLine } from 'app/statistics/chart/common-chart/chart-bar-line/chart-bar-line.model';
import { ChartPieSimple } from 'app/statistics/chart/common-chart/chart-pie-simple/chart-pie-simple.model';
import { ChartPieRadius } from 'app/statistics/chart/common-chart/chart-pie-radius/chart-pie-radius.model';

@Component({
  selector: 'app-monetary-capital',
  templateUrl: './monetary-capital.component.html',
  styleUrls: ['./monetary-capital.component.scss']
})
export class MonetaryCapitalComponent implements OnInit {

  public gridOptions: GridOptions;
  busy: Subscription;
  chartTitle: string;
  public option1: ChartPieSimple;
  public accountsReceivable_pie: ChartPieRadius;
  public accountsReceivable_bar: ChartBarLine;
  public accountsPayable_pie: ChartPieRadius;
  public accountsPayable_bar: ChartBarLine;
  public other_pie: ChartPieRadius;
  public other_bar: ChartBarLine;

  constructor(private financeChartService: FinanceChartService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "损益类科目", field: "name", width: 150 },
      { headerName: "期初余额", field: "begin_balance", width: 150 },
      { headerName: "贷方发生额", field: "credit_amount", width: 200 },
      { headerName: "借方发生额", field: "debit_amount", width: 200 },
      { headerName: "期末余额", field: "end_balance", width: 200 }
    ];
    this.gridOptions.rowData = [];
    this.gridOptions.enableColResize = true;
  }

  ngOnInit() {
    this.chartTitle = "应收账款";
    this.busy = Observable.forkJoin(this.financeChartService.getFinanceChartInfo(3)).subscribe(data => {
      let gridData = data[0];
      let rowData = [];
      rowData.push(gridData.Monetary['库存现金']);
      rowData.push(gridData.Monetary['银行存款']);
      rowData.push(gridData.Monetary['其他货币资金']);
      rowData.push(gridData.Monetary['合计']);
      rowData[0].name = '库存现金';
      rowData[1].name = '银行存款';
      rowData[2].name = '其他货币资金';
      rowData[3].name = '合计';
      this.gridOptions.api.setRowData(rowData);

      //货币资金占比
      this.option1 = {
        title: '货币资金占比',
        legendData: ['库存现金', '银行存款', '其他货币资金'],
        total: 1000000,
        value: [{ value: rowData[0].begin_balance, name: '库存现金' }, { value: rowData[1].begin_balance, name: '银行存款' }, { value: rowData[2].begin_balance, name: '其他货币资金' }],
        colors: [
          '#74CAF6',
          '#47C17E',
          '#FABD5D'
        ]
      };

      //应收账款占比
      let accountsReceivable_companyList = [];
      let accountsReceivable = [];
      let accountsReceivable_beginBalance = [];
      let accountsReceivable_debitAmount = [];
      let accountsReceivable_credteAmout = [];
      let accountsReceivable_endBalance = [];
      for (let key in gridData.other['应收账款']) {
        accountsReceivable_companyList.push(key);
        accountsReceivable.push({ value: gridData.other['应收账款'][key].begin_balance, name: key })
        accountsReceivable_beginBalance.push(gridData.other['应收账款'][key].begin_balance)
        accountsReceivable_debitAmount.push(gridData.other['应收账款'][key].debit_amount)
        accountsReceivable_credteAmout.push(gridData.other['应收账款'][key].credit_amount)
        accountsReceivable_endBalance.push(gridData.other['应收账款'][key].end_balance)
      }
      this.accountsReceivable_pie = {
        title: '应收账款占比',
        legendData: accountsReceivable_companyList,
        value: accountsReceivable,
        showTitle: true
      }

      this.accountsReceivable_bar = {
        colors: ['#75D19E', '#F3969C', '#51BDF4', '#FABD5D'],
        legendData: ['期初余额', '借方发生额', '贷方发生额', '期末余额'],
        xData: accountsReceivable_companyList,
        yName: '单位(万元)',
        seriesData: [
          {
            name: '期初余额',
            value: accountsReceivable_beginBalance
          },
          {
            name: '借方发生额',
            value: accountsReceivable_debitAmount
          },
          {
            name: '贷方发生额',
            value: accountsReceivable_credteAmout
          },
          {
            name: '期末余额',
            value: accountsReceivable_endBalance
          }],
        hasLine: false
      };

      //应付账款占比
      let accountsPayable_companyList = [];
      let accountsPayable = [];
      let accountsPayable_beginBalance = [];
      let accountsPayable_debitAmount = [];
      let accountsPayable_credteAmout = [];
      let accountsPayable_endBalance = [];

      for (let key in gridData.other['应付账款']) {
        accountsPayable_companyList.push(key);
        accountsPayable.push({ value: gridData.other['应付账款'][key].begin_balance, name: key })
        accountsPayable_beginBalance.push(gridData.other['应付账款'][key].begin_balance)
        accountsPayable_debitAmount.push(gridData.other['应付账款'][key].debit_amount)
        accountsPayable_credteAmout.push(gridData.other['应付账款'][key].credit_amount)
        accountsPayable_endBalance.push(gridData.other['应付账款'][key].end_balance)
      }
      this.accountsPayable_pie = {
        title: '应收账款占比',
        legendData: accountsPayable_companyList,
        value: accountsPayable,
        showTitle: true
      }

      this.accountsPayable_bar = {
        colors: ['#75D19E', '#F3969C', '#51BDF4', '#FABD5D'],
        legendData: ['期初余额', '借方发生额', '贷方发生额', '期末余额'],
        xData: accountsPayable_companyList,
        yName: '单位(万元)',
        seriesData: [
          {
            name: '期初余额',
            value: accountsPayable_beginBalance
          },
          {
            name: '借方发生额',
            value: accountsPayable_debitAmount
          },
          {
            name: '贷方发生额',
            value: accountsPayable_credteAmout
          },
          {
            name: '期末余额',
            value: accountsPayable_endBalance
          }],
        hasLine: false
      };

      //其它应收款占比
      let other_companyList = [];
      let other = [];
      let other_beginBalance = [];
      let other_debitAmount = [];
      let other_credteAmout = [];
      let other_endBalance = [];

      for (let key in gridData.other['其他应收款']) {
        other_companyList.push(key);
        other.push({ value: gridData.other['其他应收款'][key].begin_balance, name: key })
        other_beginBalance.push(gridData.other['其他应收款'][key].begin_balance)
        other_debitAmount.push(gridData.other['其他应收款'][key].debit_amount)
        other_credteAmout.push(gridData.other['其他应收款'][key].credit_amount)
        other_endBalance.push(gridData.other['其他应收款'][key].end_balance)
      }
      this.other_pie = {
        title: '应收账款占比',
        legendData: other_companyList,
        value: other,
        showTitle: true
      }

      this.other_bar = {
        colors: ['#75D19E', '#F3969C', '#51BDF4', '#FABD5D'],
        legendData: ['期初余额', '借方发生额', '贷方发生额', '期末余额'],
        xData: other_companyList,
        yName: '单位(万元)',
        seriesData: [
          {
            name: '期初余额',
            value: other_beginBalance
          },
          {
            name: '借方发生额',
            value: other_debitAmount
          },
          {
            name: '贷方发生额',
            value: other_credteAmout
          },
          {
            name: '期末余额',
            value: other_endBalance
          }],
        hasLine: false
      };
    });
  }
}
