import { Component, OnInit } from '@angular/core';
import { RequestType } from "app/statistics/report/report.service";

@Component({
  selector: 'app-sales-advance-report',
  templateUrl: './sales-advance-report.component.html',
  styleUrls: ['./sales-advance-report.component.scss']
})
export class SalesAdvanceReportComponent implements OnInit {

  //下拉框内容
  public d1: Array<any> = [
    { label: '客户', value: 'customerid', text: 'name' },
    { label: '状态', value: 'state', text: 'state_text' },
    { label: '跟单员', value: 'takerid', text: 'taker' }]
  public d3: Array<any> = [
    { label: '订单数', value: 'count' },
    { label: '订单金额', value: 'amount' },
    { label: '订单数量', value: 'quantity' },
    { label: '完成数', value: 'finish_quantity' },
    { label: '计划数', value: 'plan_quantity' }]

  //销售单类型
  public requestType = RequestType.SalesGoodsOrder;

  constructor() {
  }

  ngOnInit() {

  }

}
