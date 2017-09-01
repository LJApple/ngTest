import { Component, OnInit } from '@angular/core';
import { RequestType } from "app/statistics/report/report.service";

@Component({
  selector: 'app-sales-return-report',
  templateUrl: './sales-return-report.component.html',
  styleUrls: ['./sales-return-report.component.scss']
})
export class SalesReturnReportComponent implements OnInit {

  //下拉框内容
  public d1: Array<any> = [
    { label: '客户', value: 'customerid', text: 'name' },
    { label: '仓库', value: 'warehouse_id', text: 'customer_pay_type_text' },
    { label: '状态', value: 'state', text: 'state_text' },
    { label: '跟单员', value: 'takerid', text: 'taker' },
    { label: '退货原因', value: 'return_reason', text: 'taker' }]
  public d3: Array<any> = [
    { label: '订单数', value: 'count' },
    { label: '订单金额', value: 'amount' },
    { label: '订单数量', value: 'quantity' },
    { label: '补货数', value: 'replenishment' }]

  //销售单类型
  public requestType = RequestType.SalesReturn;

  constructor() {
  }

  ngOnInit() {

  }



}
