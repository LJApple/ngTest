import { Component, OnInit } from '@angular/core';
import { RequestType } from "app/statistics/report/report.service";

@Component({
  selector: 'app-sales-order-report',
  templateUrl: './sales-order-report.component.html',
  styleUrls: ['./sales-order-report.component.scss']
})
export class SalesOrderReportComponent implements OnInit {

  //下拉框内容
  public d1: Array<any> = [
    { label: '客户', value: 'customerid', text: 'name' },
    { label: '结算方式', value: 'customer_pay_type', text: 'customer_pay_type_text' },
    { label: '状态', value: 'state', text: 'state_text' },
    { label: '跟单员', value: 'takerid', text: 'taker' }]
  public d3: Array<any> = [
    { label: '订单数', value: 'count' },
    { label: '订单金额', value: 'amount' },
    { label: '订单数量', value: 'quantity' },
    { label: '成交金额', value: 'finalAmount' }]

  //销售单类型
  public requestType = RequestType.SalesOrder;

  constructor() {
  }
  ngOnInit() {

  }

}
