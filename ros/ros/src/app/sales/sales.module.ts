import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectModule } from 'ng2-select';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { AgGridModule } from "ag-grid-angular/main";
import { MasterGridComponent } from "app/admin/master-grid/master-grid.component";
import { AdminModule } from 'app/admin/admin.module';

import { SalesOrderComponent } from "./sales-order/sales-order.component";
import { SalesOrderService } from './sales-order/sales-order.service';
import { SalesOrderCreateComponent } from "./sales-order/sales-order-create/sales-order-create.component";
import { SalesOrderDetailComponent } from "./sales-order/sales-order-detail/sales-order-detail.component";
import { SalesOrderViewComponent } from "./sales-order/sales-order-view/sales-order-view.component";

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

/*
 * sales 销售模块
 */
@NgModule({
    imports: [
        CommonModule,
        AgGridModule.withComponents(
            [MasterGridComponent]
        ),
        BrowserModule,
        TabsModule,
        FormsModule,
        ReactiveFormsModule,
        SelectModule,
        BrowserAnimationsModule,
        BusyModule,
        AdminModule,
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],
    exports: [
    ],
    declarations: [
        SalesOrderComponent,
        SalesOrderCreateComponent,
        SalesOrderDetailComponent,
        SalesOrderViewComponent
    ],
    entryComponents: [
        SalesOrderComponent,
        SalesOrderCreateComponent,
        SalesOrderViewComponent
    ],
    providers: [
        SalesOrderService
    ],
})
export class SalesModule {
}
