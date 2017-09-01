import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';
import { FunctionUnit } from "app/admin/function-unit/function-unit.model";
import { CommonHelper } from "app/utils/common.helper";
import { FunctionContainerComponent } from 'app/site/function-container/function-container.component';
import { SalesOrderComponent } from 'app/sales/sales-order/sales-order.component';
import { SalesOrderViewComponent } from '../../sales/sales-order/sales-order-view/sales-order-view.component';
import { SalesOrderCreateComponent } from "app/sales/sales-order/sales-order-create/sales-order-create.component";
import { ChartComponent } from 'app/statistics/chart/chart.component';
import { SalesReturnComponent } from 'app/statistics/chart/business-chart/sales-return/sales-return.component';
import { SalesVolumeComponent } from 'app/statistics/chart/business-chart/sales-volume/sales-volume.component';
import { SalesPersonageComponent } from 'app/statistics/chart/business-chart/sales-personage/sales-personage.component';
import { HrChartComponent } from 'app/statistics/chart/hr-chart/hr-chart.component';
import { BusinessChartComponent } from 'app/statistics/chart/business-chart/business-chart.component';
import { ProductionChartComponent } from 'app/statistics/chart/production-chart/production-chart.component';
import { ProcedureManagementComponent } from 'app/procedure/procedure-management/procedure-management.component';
import { CreateProcedureManagementComponent } from 'app/procedure/create-procedure-management/create-procedure-management.component';
import { ViewProcedureManagementComponent } from 'app/procedure/view-procedure-management/view-procedure-management.component';
import { UpdateProcedureManagementComponent } from 'app/procedure/update-procedure-management/update-procedure-management.component';
import { DefectCodeComponent } from "../../production/defect-code/defect-code.component";
import { MachineInspectionUpdateComponent } from "app/production/machine-inspection-plan/machine-inspection-update/machine-inspection-update.component";
import { MachineInspectionCreateComponent } from '../../production/machine-inspection-plan/machine-inspection-create/machine-inspection-create.component';
import { CreateDefectCodeComponent } from "../../production/defect-code/create-defect-code/create-defect-code.component";
import { DefectCodeViewComponent } from "../../production/defect-code/defect-code-view/defect-code-view.component";
import { DefectCodeUpdataComponent } from "../../production/defect-code/defect-code-updata/defect-code-updata.component";
import { BarcodeTemplateComponent } from 'app/production/barcode-template/barcode-template.component';
import { BarcodeTemplateCreateComponent } from 'app/production/barcode-template/barcode-template-create/barcode-template-create.component';
import { BarcodeTemplateUpdateComponent } from 'app/production/barcode-template/barcode-template-update/barcode-template-update.component';
import { BarcodeTemplateViewComponent } from 'app/production/barcode-template/barcode-template-view/barcode-template-view.component';
import { MachineInspectionViewComponent } from '../../production/machine-inspection-plan/machine-inspection-view/machine-inspection-view.component';
import { MachineInspectionPlanComponent } from '../../production/machine-inspection-plan/machine-inspection-plan.component';
import { WorkshopManagementComponent } from "../../production/workshop-management/workshop-management.component";
import { FinanceChartComponent } from 'app/statistics/chart/finance-chart/finance-chart.component';
import { WorkshopMachineCreateComponent } from "app/production/workshop-management/workshop-machine/workshop-machine-create/workshop-machine-create.component";
import { WorkshopMachineUpdateComponent } from "../../production/workshop-management/workshop-machine/workshop-machine-update/workshop-machine-update.component";
import { WorkshopMachineViewComponent } from "../../production/workshop-management/workshop-machine/workshop-machine-view/workshop-machine-view.component";
import { FactoryModelTypeComponent } from 'app/system/factory-model-type/factory-model-type.component';
import { FactoryModelTypeCreateComponent } from 'app/system/factory-model-type/factory-model-type-create/factory-model-type-create.component';
import { FactoryModelTypeUpdateComponent } from 'app/system/factory-model-type/factory-model-type-update/factory-model-type-update.component';
import { FactoryModelTypeViewComponent } from 'app/system/factory-model-type/factory-model-type-view/factory-model-type-view.component';
import { FactoryModelComponent } from 'app/system/factory-model/factory-model.component';
import { FactoryModelCreateComponent } from 'app/system/factory-model/factory-model-create/factory-model-create.component';
import { FactoryModelUpdateComponent } from 'app/system/factory-model/factory-model-update/factory-model-update.component';
import { FactoryModelViewComponent } from 'app/system/factory-model/factory-model-view/factory-model-view.component';
import { SalesReportComponent } from "app/statistics/report/sales-report/sales-report.component";
import {BadCodeTypeComponent} from "../../production/bad-code-type/bad-code-type.component";
import {BadCodeTypeCreateComponent} from "../../production/bad-code-type/bad-code-type-create/bad-code-type-create.component";
import {BadCodeTypeViewComponent} from "../../production/bad-code-type/bad-code-type-view/bad-code-type-view.component";
import { ProductReportComponent } from "app/statistics/report/product-report/product-report.component";
import { PurchaseReportComponent } from "app/statistics/report/purchase-report/purchase-report.component";
import { InspectReportComponent } from "app/statistics/report/inspect-report/inspect-report.component";
import { CashVoucherComponent } from 'app/finance/cash-voucher/cash-voucher.component';
import { PuchrecordingComponent } from "app/personnelmatters/checkworkattendance/puchrecording/puchrecording.component";
import { WorkSchedulePlanComponent } from "app/personnelmatters/checkworkattendance/work-schedule-plan/work-schedule-plan.component";
import { ProductionDemandComponent } from "app/production/production-demand/production-demand.component";
import { ProductionDemandCreateComponent } from "app/production/production-demand/production-demand-create/production-demand-create.component";
import { ProdutionDemandViewComponent } from "app/production/production-demand/prodution-demand-view/prodution-demand-view.component";
import { ProdutionDemandUpdateComponent } from "app/production/production-demand/prodution-demand-update/prodution-demand-update.component";

/**
 * 请求地址
 */
const SERVICE_URL = SERVICE_BASE_ADDR + "/admin/FunctionUnit/AllList";

/**
 * 功能组件对应关系定义
 */
const FUNCTION_CONFIG = [
    { functionCode: 'salesOrder', functionName: '销售订单', unique: true, component: SalesOrderComponent },
    { functionCode: 'salesOrder_create', functionName: '新增销售订单', component: SalesOrderCreateComponent },
    { functionCode: 'salesOrder_view', functionName: '查看销售订单', component: SalesOrderViewComponent },
    { functionCode: 'statisticsChart', functionName: '统计分析', unique: true, component: ChartComponent },
    { functionCode: 'analysis_hr', functionName: '人事分析', unique: true, component: HrChartComponent },
    { functionCode: 'analysis_sales', functionName: '业务分析', unique: true, component: BusinessChartComponent },
    { functionCode: 'analysis_production', functionName: '生产分析', unique: true, component: ProductionChartComponent },
    { functionCode: 'salesReturnChart', functionName: '销售退货率', unique: true, component: SalesReturnComponent },
    { functionCode: 'salesPersonageChart', functionName: '个人业绩', unique: true, component: SalesPersonageComponent },
    { functionCode: 'attendance_record', functionName: '打卡记录', unique: true, component: PuchrecordingComponent },
    { functionCode: 'work_schedule_plan', functionName: '排班计划', unique: true, component: WorkSchedulePlanComponent },
    { functionCode: 'employee_overtime', functionName: '加班申请', unique: true, component: FunctionContainerComponent },
    { functionCode: 'machine_check', functionName: '机台点检计划', unique: true, component: MachineInspectionPlanComponent },
    { functionCode: 'machine_inspection_update', functionName: '修改点检计划', component: MachineInspectionUpdateComponent },
    { functionCode: 'machine_inspection_create', functionName: '新增点检计划', component: MachineInspectionCreateComponent },
    { functionCode: 'bad_code', functionName: '不良代码', unique: true, component: DefectCodeComponent },
    { functionCode: 'machine_inspection_view', functionName: '查看点检计划', component: MachineInspectionViewComponent },
    { functionCode: 'create_defect_code', functionName: '新增不良代码', component: CreateDefectCodeComponent },
    { functionCode: 'defect_code_view', functionName: '查看不良代码', component: DefectCodeViewComponent },
    { functionCode: 'defect_code_updata', functionName: '修改不良代码', component: DefectCodeUpdataComponent },
    { functionCode: 'barcode_template', functionName: '条码模板维护', unique: true, component: BarcodeTemplateComponent },
    { functionCode: 'barcode_template_create', functionName: '新增条码模板', component: BarcodeTemplateCreateComponent },
    { functionCode: 'barcode_template_update', functionName: '编辑条码模板', component: BarcodeTemplateUpdateComponent },
    { functionCode: 'barcode_template_view', functionName: '查看条码模板', component: BarcodeTemplateViewComponent },
    { functionCode: 'salesChart', functionName: '销售额', component: SalesVolumeComponent },
    { functionCode: 'analysis_finance', functionName: '财务分析', component: FinanceChartComponent },
    { functionCode: 'machine', functionName: '车间管理', component: WorkshopManagementComponent },
    { functionCode: 'workshop_machine_create', functionName: '新增车间机台', component: WorkshopMachineCreateComponent },
    { functionCode: 'workshop_machine_update', functionName: '修改车间机台', component: WorkshopMachineUpdateComponent },
    { functionCode: 'workshop_machine_view', functionName: '查看车间机台', component: WorkshopMachineViewComponent },
    { functionCode: 'procedure', functionName: '工序管理', component: ProcedureManagementComponent },
    { functionCode: 'procedure_management_view', functionName: '查看工序管理', component: ViewProcedureManagementComponent },
    { functionCode: 'create_procedure_management', functionName: '新增工序管理', component: CreateProcedureManagementComponent },
    { functionCode: 'procedure_management_updata', functionName: '编辑工序管理', component: UpdateProcedureManagementComponent },
    { functionCode: 'salesReportForm', functionName: '销售报表', component: SalesReportComponent },
    { functionCode: 'analysis_finance', functionName: '财务分析', component: FinanceChartComponent },
    { functionCode: 'factory_model_type', functionName: '工厂模型类型', component: FactoryModelTypeComponent },
    { functionCode: 'factory_model_type_create', functionName: '新增工厂模型类型', component: FactoryModelTypeCreateComponent },
    { functionCode: 'factory_model_type_update', functionName: '编辑工厂模型类型', component: FactoryModelTypeUpdateComponent },
    { functionCode: 'factory_model_type_view', functionName: '查看工厂模型类型', component: FactoryModelTypeViewComponent },
    { functionCode: 'factory_model', functionName: '工厂模型', component: FactoryModelComponent },
    { functionCode: 'factory_model_create', functionName: '新增工厂模型', component: FactoryModelCreateComponent },
    { functionCode: 'factory_model_update', functionName: '编辑工厂模型', component: FactoryModelUpdateComponent },
    { functionCode: 'factory_model_view', functionName: '查看工厂模型', component: FactoryModelViewComponent },
    { functionCode: 'bad_code_type', functionName: '不良类型', component: BadCodeTypeComponent },
    { functionCode: 'bad_code_type_create', functionName: '新增不良类型', component: BadCodeTypeCreateComponent },
    { functionCode: 'bad_code_type_view', functionName: '查看不良类型', component: BadCodeTypeViewComponent },
    { functionCode: 'productionReportForm', functionName: '生产报表', component: ProductReportComponent },
    { functionCode: 'purchaseReportForm', functionName: '采购报表', component: PurchaseReportComponent },
    { functionCode: 'inspectReportForm', functionName: '品检报表', component: InspectReportComponent },
    { functionCode: 'cashVoucher', functionName: '出纳', component: CashVoucherComponent },
    { functionCode: 'cashVoucher_create', functionName: '新增出纳', component: CashVoucherComponent },
    { functionCode: 'cashVoucher_update', functionName: '编辑出纳', component: CashVoucherComponent },
    { functionCode: 'cashVoucher_view', functionName: '编辑出纳', component: CashVoucherComponent },
    { functionCode: 'productionRequirement', functionName: '生产需求',unique: true, component: ProductionDemandComponent },
    { functionCode: 'production_model_type_create', functionName: '新增生产需求',unique: true, component: ProductionDemandCreateComponent },
    { functionCode: 'production_model_type_update', functionName: '修改生产需求',unique: true, component: ProdutionDemandUpdateComponent },
    { functionCode: 'production_model_type_view', functionName: '产看生产需求',unique: true, component: ProdutionDemandViewComponent }
];

/**
 * 系统功能定义服务类
 */
@Injectable()
export class FunctionUnitService {

    // 功能选中事件
    public onFunctionSelect: EventEmitter<String>;

    // 操作执行事件
    public onOperationExecute: EventEmitter<any>;

    // 功能列表数据
    functionList;

    constructor(private http: Http) {

        this.onFunctionSelect = new EventEmitter();
        this.onOperationExecute = new EventEmitter();
    }

    /**
     * 请求获取功能定义列表
     * @param info
     */
    public getList(): Observable<FunctionUnit[]> {

        return this.http.get(CommonHelper.getUrl(SERVICE_URL)).map((res: Response) => { return <FunctionUnit[]>res.json() });
    }

    /**
     * 获取功能配置信息
     */
    public getConfig(functionCode: string): any {

        return _.find(FUNCTION_CONFIG, { functionCode: functionCode });
    }

    /**
     * 获取功能配置信息
     */
    public isUnique(functionCode: string): boolean {

        let configItem = _.find(FUNCTION_CONFIG, { functionCode: functionCode });
        if (!configItem) {
            return false;
        }
        return configItem.unique ? true : false;
    }

}
