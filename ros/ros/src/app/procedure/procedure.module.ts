import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgGridModule} from "ag-grid-angular/main";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MasterGridComponent} from "app/admin/master-grid/master-grid.component";
import {CombogridButtonComponent} from "app/admin/widgets/combogrid-button/combogrid-button.component";
import {SelectModule} from 'ng2-select';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ProcedureManagementComponent} from "./procedure-management/procedure-management.component";
import { NgZorroAntdModule} from 'ng-zorro-antd';

import { AdminModule } from 'app/admin/admin.module';
import { CreateProcedureManagementComponent } from './create-procedure-management/create-procedure-management.component';
import { ProcedureDescriptionComponent } from './create-procedure-management/procedure-description/procedure-description.component';
import { ProcedureStationGridComponent } from './create-procedure-management/procedure-station-grid/procedure-station-grid.component';
import { ProcedureAttributeComponent } from './create-procedure-management/procedure-attribute/procedure-attribute.component';
import { ProcedureBarCodeComponent } from './create-procedure-management/procedure-bar-code/procedure-bar-code.component';
import { ViewProcedureManagementComponent } from './view-procedure-management/view-procedure-management.component';
import { ProcedureDescriptionViewComponent } from './view-procedure-management/procedure-description-view/procedure-description-view.component';
import { ProcedureBarCodeViewComponent } from './view-procedure-management/procedure-bar-code-view/procedure-bar-code-view.component';
import { ProcedureAttributeViewComponent } from './view-procedure-management/procedure-attribute-view/procedure-attribute-view.component';
import { ProcedureStationGridViewComponent } from './view-procedure-management/procedure-station-grid-view/procedure-station-grid-view.component';
import { GridCombogridComponent } from 'app/procedure/create-procedure-management/procedure-station-grid/grid-combogrid/grid-combogrid.component';
import { UpdateProcedureManagementComponent } from './update-procedure-management/update-procedure-management.component';
import { ProcedureStationGridUpdateComponent } from './update-procedure-management/procedure-station-grid-update/procedure-station-grid-update.component';
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        AgGridModule.withComponents(
            [
                MasterGridComponent,
                CombogridButtonComponent
            ]
        ),
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
        ProcedureManagementComponent,
        GridCombogridComponent
    ],
    entryComponents: [
        ProcedureManagementComponent,
        CreateProcedureManagementComponent,
        ViewProcedureManagementComponent,
        GridCombogridComponent,
        UpdateProcedureManagementComponent
    ],
    declarations: [
        ProcedureManagementComponent,
        ViewProcedureManagementComponent,
        CreateProcedureManagementComponent,
        ProcedureDescriptionComponent,
        ProcedureStationGridComponent,
        ProcedureAttributeComponent,
        ProcedureBarCodeComponent,
        ViewProcedureManagementComponent,
        ProcedureDescriptionViewComponent,
        ProcedureBarCodeViewComponent,
        ProcedureAttributeViewComponent,
        ProcedureStationGridViewComponent,
        GridCombogridComponent,
        UpdateProcedureManagementComponent,
        ProcedureStationGridUpdateComponent,
        UpdateProcedureManagementComponent],
    providers: [],
})
export class ProcedureModule {
}
