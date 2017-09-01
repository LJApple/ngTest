import { Component, OnInit } from '@angular/core';
import { RequestType } from "app/statistics/report/report.service";

@Component({
  selector: 'app-out-source-report',
  templateUrl: './out-source-report.component.html',
  styleUrls: ['./out-source-report.component.scss']
})
export class OutSourceReportComponent implements OnInit {

  //下拉框内容
  public d1: Array<any> = [
    { label: '供应商', value: 'supplierid', text: 'supplierid' },
    { label: '状态', value: 'state', text: 'state_text' },
    { label: '仓库', value: 'warehouse_id', text: 'warehouse_id' },
    { label: '跟单员', value: 'takerid', text: 'taker' },
    { label: '退货原因', value: 'return_reason', text: 'return_reason' }]
  public d3: Array<any> = [
    { label: '订单数', value: 'count' },
    { label: '订单金额', value: 'amount' },
    { label: '订单数量', value: 'quantity' },
    { label: '成交金额', value: 'finalAmount' },
    { label: '补货数', value: 'replenishment' }]

  //销售单类型
  public requestType = RequestType.OutSourceOrder;

  constructor() {
  }
  ngOnInit() {

  }
}
