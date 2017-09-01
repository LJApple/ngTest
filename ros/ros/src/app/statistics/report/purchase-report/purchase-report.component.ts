import { Component, OnInit } from '@angular/core';
import { PurchaseOrderReportComponent } from "app/statistics/report/purchase-report/purchase-order-report/purchase-order-report.component";
import { PurchaseReturnReportComponent } from "app/statistics/report/purchase-report/purchase-return-report/purchase-return-report.component";
import { OutSourceReportComponent } from "app/statistics/report/purchase-report/out-source-report/out-source-report.component";
import * as _ from 'lodash';

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.scss']
})
export class PurchaseReportComponent implements OnInit {
  public modules: any[] = [
    { title: '采购订单', code: 'purchaseOrder', component: PurchaseOrderReportComponent, disabled: false, removable: false, active: true },
    { title: '委外订单', code: 'outSource', component: OutSourceReportComponent, disabled: false, removable: false, active: false },
    { title: '采购退货订单', code: 'purchaseReturn', component: PurchaseReturnReportComponent, disabled: false, removable: false, active: false }
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
