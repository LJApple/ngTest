import { Component, OnInit } from '@angular/core';
import { RequestType } from "app/statistics/report/report.service";

@Component({
  selector: 'app-product-task-report',
  templateUrl: './product-task-report.component.html',
  styleUrls: ['./product-task-report.component.scss']
})
export class ProductTaskReportComponent implements OnInit {
  //下拉框内容
  public d1: Array<any> = [
    { label: '车间', value: 'organization_id', text: 'organization_id' },
    { label: '机台', value: 'machine_id', text: 'machine_id' },
    { label: '状态', value: 'state', text: 'state_text' },
    { label: '工序', value: 'process_card_name', text: 'process_card_name' }]
  public d3: Array<any> = [
    { label: '计划生产量', value: 'plan_quantity' },
    { label: '实际生产量', value: 'quantity' },
    { label: '订单数', value: 'count' }]

  //销售单类型
  public requestType = RequestType.ProductTask;

  constructor() {
  }
  ngOnInit() {

  }
}
