import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartComponent } from './chart/chart.component';
import { HrChartComponent } from './chart/hr-chart/hr-chart.component';
import { EchartsNg2Module } from 'echarts-ng2';
import { BusinessChartComponent } from './chart/business-chart/business-chart.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartPieComponent } from './chart/common-chart/chart-pie/chart-pie.component';
import { ChartGaugeComponent } from './chart/common-chart/chart-gauge/chart-gauge.component';
import { ChartTableComponent } from './chart/common-chart/chart-table/chart-table.component';
import { ChartRectangleComponent } from './chart/common-chart/chart-rectangle/chart-rectangle.component';
import { ChartProgressComponent } from './chart/common-chart/chart-progress/chart-progress.component';
import { RankPoundsComponent } from './chart/hr-chart/rank-pounds/rank-pounds.component';
import { EmployeeIntroduceComponent } from './chart/hr-chart/rank-pounds/employee-introduce/employee-introduce.component';
import { EmployeeClockComponent } from './chart/hr-chart/rank-pounds/employee-clock/employee-clock.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PipeModule } from 'app/utils/custom-pipe/pipe.module';
import { CalendarModule } from "ap-angular2-fullcalendar";
import { RankTabsComponent } from './chart/hr-chart/rank-pounds/rank-tabs/rank-tabs.component';
import { ProductionChartComponent } from './chart/production-chart/production-chart.component';
import { ProductionChartService } from './chart/production-chart/production-chart.service';
import { NumRateChartComponent } from './chart/production-chart/num-rate-chart/num-rate-chart.component';
import { MachineOutputSortChartComponent } from './chart/production-chart/machine-output-sort-chart/machine-output-sort-chart.component';
import { WorkshopDetailChartComponent } from './chart/production-chart/workshop-detail-chart/workshop-detail-chart.component';
import { MachineUtilizationChartComponent } from './chart/production-chart/machine-utilization-chart/machine-utilization-chart.component';
import { MachineUtilizationRateChartService } from './chart/machine-utilization-rate-chart/machine-utilization-rate-chart.service';
import { MachineUtilizationRateChartComponent } from './chart/machine-utilization-rate-chart/machine-utilization-rate-chart.component';
import { MachineUsageDatailChartComponent } from './chart/machine-usage-datail-chart/machine-usage-datail-chart.component';
import { MachineUsageDetailChartService } from './chart/machine-usage-datail-chart/machine-usage-detail-chart.service';
import { SalesVolumeComponent } from './chart/business-chart/sales-volume/sales-volume.component';
import { ChartLineComponent } from './chart/common-chart/chart-line/chart-line.component';
import { ChartPieSectorComponent } from './chart/common-chart/chart-pie-sector/chart-pie-sector.component';
import { SalesReturnComponent } from './chart/business-chart/sales-return/sales-return.component';
import { SalesPersonageComponent } from './chart/business-chart/sales-personage/sales-personage.component';
import { FunctionListComponent } from "app/admin/function-list/function-list.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { HrChartService } from './chart/hr-chart/hr-chart.service';
import { FinanceChartComponent } from './chart/finance-chart/finance-chart.component';
import { AdminModule } from 'app/admin/admin.module';
import { AssetStatisticsComponent } from './chart/finance-chart/asset-statistics/asset-statistics.component';
import { FinanceChartService } from './chart/finance-chart/finance-chart.service';
import { AgGridModule } from "ag-grid-angular/main";
import { ChartBarLineComponent } from './chart/common-chart/chart-bar-line/chart-bar-line.component';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { MonetaryCapitalComponent } from './chart/finance-chart/monetary-capital/monetary-capital.component';
import { DebtEquityComponent } from './chart/finance-chart/debt-equity/debt-equity.component';
import { CostAnalysisComponent } from './chart/finance-chart/cost-analysis/cost-analysis.component';
import { CashFlowComponent } from './chart/finance-chart/cash-flow/cash-flow.component';
import { ProfitAnalysisComponent } from './chart/finance-chart/profit-analysis/profit-analysis.component';
import { DynamicWrapperComponent } from 'app/admin/dynamic-wrapper/dynamic-wrapper.component';
import { ChartPieRadiusComponent } from './chart/common-chart/chart-pie-radius/chart-pie-radius.component';
import { ChartPieSimpleComponent } from './chart/common-chart/chart-pie-simple/chart-pie-simple.component';
import { ChartLineTwoComponent } from './chart/common-chart/chart-line-two/chart-line-two.component';
import { SalesReportComponent } from './report/sales-report/sales-report.component';
import { QuotationReportComponent } from './report/sales-report/quotation-report/quotation-report.component';
import { SalesOrderReportComponent } from './report/sales-report/sales-order-report/sales-order-report.component';
import { SalesReturnReportComponent } from './report/sales-report/sales-return-report/sales-return-report.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SalesAdvanceReportComponent } from './report/sales-report/sales-advance-report/sales-advance-report.component';
import { ReportTemplateComponent } from './report/report-template/report-template.component';
import { ReportService } from "app/statistics/report/report.service";
import { PurchaseReportComponent } from './report/purchase-report/purchase-report.component';
import { ProductReportComponent } from './report/product-report/product-report.component';
import { InspectReportComponent } from './report/inspect-report/inspect-report.component';
import { PurchaseOrderReportComponent } from './report/purchase-report/purchase-order-report/purchase-order-report.component';
import { OutSourceReportComponent } from './report/purchase-report/out-source-report/out-source-report.component';
import { PurchaseReturnReportComponent } from './report/purchase-report/purchase-return-report/purchase-return-report.component';
import { ProductTaskReportComponent } from './report/product-report/product-task-report/product-task-report.component';
import { ProductOrderReportComponent } from './report/product-report/product-order-report/product-order-report.component';


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
};
@NgModule({
    imports: [
        CommonModule,
        AgGridModule,
        EchartsNg2Module,
        TabsModule,
        CollapseModule.forRoot(),
        PipeModule,
        BrowserModule,
        BrowserAnimationsModule,
        BusyModule,
        ReactiveFormsModule,
        FormsModule,
        AdminModule,
        NgZorroAntdModule
        /* .forRoot(
            new BusyConfig({
                message: '加载中，请稍后...',
                // backdrop: false,
                // template: '<div>{{message}}</div>',
                // delay: 200,
                // minDuration: 600,
                // wrapperClass: 'my-class'
            })
        ) */,
        CalendarModule
    ],
    exports: [
        HrChartComponent,
        ProductionChartComponent,
        MachineUtilizationRateChartComponent,
        MachineUsageDatailChartComponent
    ],
    entryComponents: [
        ChartComponent,
        HrChartComponent,
        ProductionChartComponent,
        MachineUtilizationRateChartComponent,
        MachineUsageDatailChartComponent,
        BusinessChartComponent,
        ProductionChartComponent,
        SalesVolumeComponent,
        SalesReturnComponent,
        SalesPersonageComponent,
        FinanceChartComponent,
        AssetStatisticsComponent,
        DebtEquityComponent,
        MonetaryCapitalComponent,
        CostAnalysisComponent,
        CashFlowComponent,
        ProfitAnalysisComponent,
        SalesReportComponent,
        QuotationReportComponent,
        SalesOrderReportComponent,
        SalesReturnReportComponent,
        SalesAdvanceReportComponent,
        ReportTemplateComponent,
        PurchaseReportComponent,
        ProductReportComponent,
        InspectReportComponent,
        PurchaseOrderReportComponent,
        OutSourceReportComponent,
        PurchaseReturnReportComponent,
        ProductTaskReportComponent,
        ProductOrderReportComponent
    ],
    declarations: [
        ChartComponent,
        HrChartComponent,
        RankPoundsComponent,
        RankTabsComponent,
        EmployeeIntroduceComponent,
        EmployeeClockComponent,
        ProductionChartComponent,
        NumRateChartComponent,
        MachineOutputSortChartComponent,
        WorkshopDetailChartComponent,
        MachineUtilizationChartComponent,
        BusinessChartComponent,
        ChartPieComponent,
        ChartGaugeComponent,
        ChartTableComponent,
        ChartRectangleComponent,
        ChartProgressComponent,
        SalesVolumeComponent,
        ChartLineComponent,
        ChartPieSectorComponent,
        SalesReturnComponent,
        SalesPersonageComponent,
        MachineUtilizationRateChartComponent,
        MachineUsageDatailChartComponent,
        MachineUsageDatailChartComponent,
        FinanceChartComponent,
        AssetStatisticsComponent,
        ChartBarLineComponent,
        MonetaryCapitalComponent,
        DebtEquityComponent,
        CostAnalysisComponent,
        CashFlowComponent,
        ProfitAnalysisComponent,
        ChartPieRadiusComponent,
        ChartPieSimpleComponent,
        ChartLineTwoComponent,
        SalesReportComponent,
        QuotationReportComponent,
        SalesOrderReportComponent,
        SalesReturnReportComponent,
        SalesAdvanceReportComponent,
        ReportTemplateComponent,
        PurchaseReportComponent,
        ProductReportComponent,
        InspectReportComponent,
        PurchaseOrderReportComponent,
        OutSourceReportComponent,
        PurchaseReturnReportComponent,
        ProductTaskReportComponent,
        ProductOrderReportComponent
    ],
    providers: [
        HrChartService,
        ProductionChartService,
        MachineUtilizationRateChartService,
        MachineUsageDetailChartService,
        FinanceChartService,
        ReportService
    ]
})
export class StatisticsModule {
}
