import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { Observable, Subscription } from 'rxjs/Rx';
import { CommonHelper, HEADER_AND_FOOTER_HEIGHT } from 'app/utils/common.helper';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { QuotationReportComponent } from "app/statistics/report/sales-report/quotation-report/quotation-report.component";
import { SalesOrderReportComponent } from "app/statistics/report/sales-report/sales-order-report/sales-order-report.component";
import { SalesReturnReportComponent } from "app/statistics/report/sales-report/sales-return-report/sales-return-report.component";
import * as _ from 'lodash';
import { SalesAdvanceReportComponent } from "app/statistics/report/sales-report/sales-advance-report/sales-advance-report.component";

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  public modules: any[] = [
    { title: '销售订单', code: 'salesOrder', component: SalesOrderReportComponent, disabled: false, removable: false, active: true },
    { title: '报价单', code: 'quotation', component: QuotationReportComponent, disabled: false, removable: false, active: false },
    { title: '销售退货单', code: 'salesReturn', component: SalesReturnReportComponent, disabled: false, removable: false, active: false },
    { title: '销售备货单', code: 'salesAdvance', component: SalesAdvanceReportComponent, disabled: false, removable: false, active: false }
  ]

  constructor() {

  }

  ngOnInit() {
  }

  switch(code) {
    let self = this;
    _.forEach(this.modules, function (module) {
      if (module.code == code) {
        module.active = true;
      } else {
        module.active = false;
      }
    });
  }

}
