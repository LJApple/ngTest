import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CookieService, CookieOptions } from 'angular2-cookie/core';

import { FmsModule } from 'app/fms/fms.module';
import { AdminModule } from 'app/admin/admin.module';
import { SalesModule } from 'app/sales/sales.module';
import { SystemModule } from 'app/system/system.module'
import { ProcedureModule } from 'app/procedure/procedure.module';
import { StatisticsModule } from 'app/statistics/statistics.module';
import { LoggedInGuard } from 'app/utils/logged-in.guard';

import { LoginComponent } from './login/login.component';
import { DefaultComponent } from './default/default.component';
import { LoginService } from './login/login.service';
import { ChangePasswordService } from './change-password/change-password.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CanvasBackgroundComponent } from './canvas-background/canvas-background.component';
import { IndexComponent } from './index/index.component';
import { ProfileService } from './index/profile.service';
import { LogoComponent } from './logo/logo.component';
import { ZoomComponent } from './zoom/zoom.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { FunctionContainerComponent } from './function-container/function-container.component';

import { HrChartService } from 'app/statistics/chart/hr-chart/hr-chart.service';
import { BusinessChartService } from 'app/statistics/chart/business-chart/business-chart.service';
import { RankTabsService } from "app/statistics/chart/hr-chart/rank-pounds/rank-tabs/rank-tabs.service";
import { EmployeeClockService } from "app/statistics/chart/hr-chart/rank-pounds/employee-clock/employee-clock.service";
import { EmployeeIntroduceService } from "app/statistics/chart/hr-chart/rank-pounds/employee-introduce/employee-introduce.service";
import { ProcedureManagementService } from "app/procedure/procedure-management/procedure-management.service";
import { ProductionModule } from 'app/production/production.module';
import { FinanceModule } from 'app/finance/finance.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CombogridButtonService } from 'app/admin/widgets/combogrid-button/combogrid-button.service';
import { BarCodeTypeService} from 'app/procedure/create-procedure-management/procedure-bar-code/procedure-bar-code.service';
import { GridCombogridService } from 'app/procedure/create-procedure-management/procedure-station-grid/grid-combogrid/grid-combogrid.service';
import { CreateProcedureManagementService } from "app/procedure/create-procedure-management/create-procedure-management.service";
import { UpdateProcedureManagementService } from "app/procedure/update-procedure-management/update-procedure-management.service";
import { ViewProcedureManagementService } from "app/procedure/view-procedure-management/view-procedure-management.service";
import { SelectService } from 'app/admin/select/select.service';
import { FactoryModelService } from "app/system/factory-model/factory-model.service";
import { FactoryModelTypeService } from "app/system/factory-model-type/factory-model-type.service";
import { ProcedureAttributeService } from 'app/procedure/create-procedure-management/procedure-attribute/procedure-attribute.service';
import { CashVoucherService } from "app/finance/cash-voucher/cash-voucher.service";
import { PersonnelmattersModule } from "app/personnelmatters/personnelmatters.module";


const routes: Routes = [
    { path: '', redirectTo: 'default', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'default', component: DefaultComponent },
    { path: 'change-password/:userId/:fromLogin', component: ChangePasswordComponent, canActivate: [LoggedInGuard] },
    { path: 'index', component: IndexComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        SelectModule,
        FmsModule,
        AlertModule.forRoot(),
        AdminModule,
        SalesModule,
        ProcedureModule,
        StatisticsModule,
        ProductionModule,
        BrowserAnimationsModule,
        NgZorroAntdModule.forRoot(),
        SystemModule,
        FinanceModule,
        PersonnelmattersModule
    ],
    declarations: [
        LoginComponent,
        DefaultComponent,
        ChangePasswordComponent,
        CanvasBackgroundComponent,
        IndexComponent,
        LogoComponent,
        ZoomComponent,
        SidebarComponent,
        MainComponent,
        FunctionContainerComponent,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/' },
        LoginService,
        ChangePasswordService,
        LoggedInGuard,
        ProfileService,
        HrChartService,
        BusinessChartService,
        CookieService,
        { provide: CookieOptions, useValue: false },
        RankTabsService,
        EmployeeClockService,
        EmployeeIntroduceService,
        ProcedureManagementService,
        BarCodeTypeService,
        GridCombogridService,
        CreateProcedureManagementService,
        UpdateProcedureManagementService,
        ViewProcedureManagementService,
        SelectService,
        FactoryModelService,
        FactoryModelTypeService,
        CombogridButtonService,
        ProcedureAttributeService,
        CashVoucherService
    ],
    bootstrap: [DefaultComponent],
    entryComponents: [FunctionContainerComponent]
})

export class SiteModule { }
