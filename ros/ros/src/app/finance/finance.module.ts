import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from "ag-grid-angular/main";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SelectModule } from 'ng2-select';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlertModule } from 'ngx-bootstrap';
import { AdminModule } from 'app/admin/admin.module';
import { CashVoucherComponent } from 'app/finance/cash-voucher/cash-voucher.component';


@NgModule({
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule,
    BrowserModule,
    TabsModule,
    ReactiveFormsModule,
    SelectModule,
    AdminModule,
    AlertModule,
    NgZorroAntdModule
  ],
  exports: [
  ],
  entryComponents: [
    CashVoucherComponent,
  ],
  declarations: [
    CashVoucherComponent,
  ]
})
export class FinanceModule { }
