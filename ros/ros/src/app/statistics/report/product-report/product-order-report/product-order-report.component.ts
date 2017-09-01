import { Component, OnInit } from '@angular/core';
import { RequestType } from "app/statistics/report/report.service";

@Component({
  selector: 'app-product-order-report',
  templateUrl: './product-order-report.component.html',
  styleUrls: ['./product-order-report.component.scss']
})
export class ProductOrderReportComponent implements OnInit {
  //下拉框内容
  public d1: Array<any> = [
    { label: '车间', value: 'organizationid', text: 'organizationid' },
    { label: '状态', value: 'state', text: 'state_text' }]
  public d3: Array<any> = [
    { label: '实际生产量', value: 'production_quantity' },
    { label: '计划生产量', value: 'quantity' },
    { label: '订单数', value: 'count' }]

  //销售单类型
  public requestType = RequestType.ProductOrder;

  constructor() {
  }
  ngOnInit() {

  }
}
