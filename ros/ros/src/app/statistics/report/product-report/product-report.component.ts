import { Component, OnInit } from '@angular/core';
import { ProductTaskReportComponent } from "app/statistics/report/product-report/product-task-report/product-task-report.component";
import { ProductOrderReportComponent } from "app/statistics/report/product-report/product-order-report/product-order-report.component";
import * as _ from 'lodash';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent implements OnInit {
  public modules: any[] = [
    { title: '生产任务', code: 'productTask', component: ProductTaskReportComponent, disabled: false, removable: false, active: true },
    { title: '车间生产', code: 'productOrder', component: ProductOrderReportComponent, disabled: false, removable: false, active: false }
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
