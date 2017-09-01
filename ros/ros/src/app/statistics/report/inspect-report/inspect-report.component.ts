import { Component, OnInit } from '@angular/core';
import { RequestType } from "app/statistics/report/report.service";

@Component({
  selector: 'app-inspect-report',
  templateUrl: './inspect-report.component.html',
  styleUrls: ['./inspect-report.component.scss']
})
export class InspectReportComponent implements OnInit {

  //下拉框内容
  public d1: Array<any> = [
    { label: '品检类型', value: 'inspect_method', text: 'inspect_method' },
    { label: '品检方式', value: 'type', text: 'type' },
    { label: '品检部门', value: 'organization_id', text: 'organization_id' },
    { label: '异常处理', value: 'unqualified_dispose', text: 'unqualified_dispose' },
    { label: '状态', value: 'state', text: 'state_text' }]
  public d3: Array<any> = [
    { label: '合格数', value: 'qualified_quantity' },
    { label: '品检数量', value: 'quantity' },
    { label: '订单数', value: 'count' },
    { label: '不合格数', value: 'unqualified_quantity' }]

  //销售单类型
  public requestType = RequestType.InspectOrder;

  constructor() {
  }
  ngOnInit() {

  }

}
