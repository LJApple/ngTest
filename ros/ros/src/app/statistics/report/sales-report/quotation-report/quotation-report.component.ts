import { Component, OnInit } from '@angular/core';
import { RequestType } from "app/statistics/report/report.service";

@Component({
  selector: 'app-quotation-report',
  templateUrl: './quotation-report.component.html',
  styleUrls: ['./quotation-report.component.scss']
})
export class QuotationReportComponent implements OnInit {
  //下拉框内容
  public d1: Array<any> = [
    { label: '客户', value: 'customerid', text: 'name' },
    { label: '状态', value: 'state', text: 'state_text' }]
  public d3: Array<any> = [{ label: '订单数', value: 'count' }]

  //销售单类型
  public requestType = RequestType.SalesQuotation;


  constructor() {

  }

  ngOnInit() {
  }

}
