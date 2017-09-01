import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MachineInspectionPlanComponent} from './machine-inspection-plan/machine-inspection-plan.component';
import {AgGridModule} from 'ag-grid-angular';
import {MachineInspectionUpdateComponent} from './machine-inspection-plan/machine-inspection-update/machine-inspection-update.component';
import {MachineInspectionPlanService} from './machine-inspection-plan/machine-inspection-plan.service';
import {DefectCodeComponent} from './defect-code/defect-code.component';
import {DefectCodeService} from "./defect-code/defect-code.service";
import {AdminModule} from "../admin/admin.module";
import {CreateDefectCodeComponent} from "./defect-code/create-defect-code/create-defect-code.component";
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MachineInspectionCreateComponent} from './machine-inspection-plan/machine-inspection-create/machine-inspection-create.component';
import {DefectCodeViewComponent} from './defect-code/defect-code-view/defect-code-view.component';
import {OpenNewTabService} from "../admin/widgets/open-new-tab.service";
import {DefectCodeUpdataComponent} from './defect-code/defect-code-updata/defect-code-updata.component';
import {BarcodeTemplateComponent} from "./barcode-template/barcode-template.component";
import {BarcodeTemplateService} from './barcode-template/barcode-template.service';
import {MachineInspectionViewComponent} from './machine-inspection-plan/machine-inspection-view/machine-inspection-view.component';
import {BarcodeTemplateCreateComponent} from './barcode-template/barcode-template-create/barcode-template-create.component';
import {BarcodeTemplateUpdateComponent} from './barcode-template/barcode-template-update/barcode-template-update.component';
import {BarcodeTemplateViewComponent} from './barcode-template/barcode-template-view/barcode-template-view.component';
import {MachineInspectionViewService} from './machine-inspection-plan/machine-inspection-view/machine-inspection-view.service';
import {AlertModule} from 'ngx-bootstrap';
import {WorkshopManagementComponent} from './workshop-management/workshop-management.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {WorkshopMachineComponent} from './workshop-management/workshop-machine/workshop-machine.component';
import {WorkshopProductionComponent} from './workshop-management/workshop-production/workshop-production.component';
import {ProductionDailyComponent} from './workshop-management/production-daily/production-daily.component';
import {WorkshopManagementService} from "./workshop-management/workshop-management.service";
import {WorkshopMachineCreateComponent} from './workshop-management/workshop-machine/workshop-machine-create/workshop-machine-create.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {WorkshopMachineUpdateComponent} from './workshop-management/workshop-machine/workshop-machine-update/workshop-machine-update.component';
import {WorkshopMachineViewComponent} from './workshop-management/workshop-machine/workshop-machine-view/workshop-machine-view.component';
import {ProductionRecordsComponent} from './workshop-management/workshop-machine/workshop-machine-view/production-records/production-records.component';
import {LoggingComponent} from './workshop-management/workshop-machine/workshop-machine-view/logging/logging.component';
import {BarcodeTemplateDetailComponent} from './barcode-template/barcode-template-detail/barcode-template-detail.component';
import {BadCodeTypeComponent} from './bad-code-type/bad-code-type.component';
import {BadCodeTypeService} from "./bad-code-type/bad-code-type.service";
import { BadCodeTypeCreateComponent } from './bad-code-type/bad-code-type-create/bad-code-type-create.component';
import { BadTypeComponent } from './bad-code-type/bad-code-type-create/bad-type/bad-type.component';
import { RelatedProcessComponent } from './bad-code-type/bad-code-type-create/related-process/related-process.component';
import { BadCodeTypeViewComponent } from './bad-code-type/bad-code-type-view/bad-code-type-view.component';
import { BadCodeTypeUpdateComponent } from './bad-code-type/bad-code-type-update/bad-code-type-update.component';
import { ProcessGridComponent } from './bad-code-type/bad-code-type-create/process-grid/process-grid.component';
import { ProductionDemandService } from "app/production/production-demand/production-demand.service";
import { ProductionDemandComponent } from "app/production/production-demand/production-demand.component";
import { ProductionDemandCreateComponent } from './production-demand/production-demand-create/production-demand-create.component';
import { ProdutionDemandUpdateComponent } from './production-demand/prodution-demand-update/prodution-demand-update.component';
import { ProdutionDemandViewComponent } from './production-demand/prodution-demand-view/prodution-demand-view.component';

@NgModule({
    imports: [
        CommonModule,
        AgGridModule,
        ReactiveFormsModule,
        AdminModule,
        FormsModule,
        AlertModule,
        TabsModule,
        NgZorroAntdModule,

    ],
    exports: [
        MachineInspectionPlanComponent
    ],
    entryComponents: [
        MachineInspectionPlanComponent,
        MachineInspectionUpdateComponent,
        MachineInspectionCreateComponent,
        MachineInspectionViewComponent,
        DefectCodeComponent,
        CreateDefectCodeComponent,
        DefectCodeViewComponent,
        DefectCodeUpdataComponent,
        BarcodeTemplateComponent,
        BarcodeTemplateCreateComponent,
        BarcodeTemplateUpdateComponent,
        BarcodeTemplateViewComponent,
        WorkshopManagementComponent,
        WorkshopMachineCreateComponent,
        WorkshopMachineUpdateComponent,
        WorkshopMachineViewComponent,
        BadCodeTypeComponent,
        BadCodeTypeCreateComponent,
        BadCodeTypeViewComponent,
        BadCodeTypeUpdateComponent,
        ProcessGridComponent,
        ProductionDemandComponent,
        ProductionDemandCreateComponent,
        ProdutionDemandUpdateComponent,
        ProdutionDemandViewComponent
    ],
    providers: [
        MachineInspectionPlanService,
        MachineInspectionViewService,
        DefectCodeService,
        OpenNewTabService,
        BarcodeTemplateService,
        WorkshopManagementService,
        BadCodeTypeService,
        ProductionDemandService
    ],
    declarations: [
        MachineInspectionPlanComponent,
        MachineInspectionUpdateComponent,
        MachineInspectionCreateComponent,
        MachineInspectionViewComponent,
        DefectCodeViewComponent,
        BarcodeTemplateComponent,
        DefectCodeComponent,
        CreateDefectCodeComponent,
        MachineInspectionCreateComponent,
        DefectCodeViewComponent,
        DefectCodeUpdataComponent,
        BarcodeTemplateCreateComponent,
        BarcodeTemplateUpdateComponent,
        BarcodeTemplateViewComponent,
        WorkshopManagementComponent,
        WorkshopMachineComponent,
        WorkshopProductionComponent,
        ProductionDailyComponent,
        WorkshopMachineCreateComponent,
        WorkshopMachineUpdateComponent,
        WorkshopMachineViewComponent,
        ProductionRecordsComponent,
        LoggingComponent,
        BarcodeTemplateDetailComponent,
        BadCodeTypeComponent,
        BadCodeTypeCreateComponent,
        BadTypeComponent,
        RelatedProcessComponent,
        BadCodeTypeViewComponent,
        BadCodeTypeUpdateComponent,
        ProcessGridComponent,
        ProductionDemandComponent,
        ProductionDemandCreateComponent,
        ProdutionDemandUpdateComponent,
        ProdutionDemandViewComponent
    ],
})
export class ProductionModule {
}
