import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { BaseDataComponent } from './base-data/base-data.component';
import { ModuleComponent } from './module/module.component';
import { FunctionUnitComponent } from './function-unit/function-unit.component';
import { ModuleService } from "app/admin/module/module.service";
import { FunctionUnitService } from "app/admin/function-unit/function-unit.service";
import { UserIconComponent } from './user-icon/user-icon.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { FunctionListComponent } from './function-list/function-list.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicWrapperComponent } from './dynamic-wrapper/dynamic-wrapper.component';
import { MainTabComponent } from './main-tab/main-tab.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MasterGridComponent } from './master-grid/master-grid.component';
import { CombogridComponent } from './widgets/combogrid/combogrid.component';
import { FunctionButtonComponent } from './function-button/function-button.component';
import { ContextMenuComponent } from "./context-menu/context-menu.component";
import { MainTabService } from "app/admin/main-tab/main-tab.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular/main";
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { GetDataListService } from './widgets/get-data-list.service';
import { ToolbarComponent } from 'app/admin/widgets/toolbar/toolbar.component';
import { SearchComponent } from 'app/admin/widgets/toolbar/search/search.component';
import { FilterBarComponent } from './widgets/filter-bar/filter-bar.component'
import { CombogridButtonComponent } from './widgets/combogrid-button/combogrid-button.component';
import { SelectComponent } from './select/select.component';
import { StoreModule } from '@ngrx/store';
import { MasterListBaseComponent } from './base/master-list-base/master-list-base.component';
import { RosPaginationComponent } from './widgets/ros-pagination/ros-pagination.component';
import { RosCalendarComponent } from './widgets/ros-calendar/ros-calendar.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MasterListBaseChildComponent } from './base/master-list-base/master-list-base-child/master-list-base-child.component';
import { FunctionCreateBaseComponent } from './base/function-create-base/function-create-base.component';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
};

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        TabsModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        AgGridModule,
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
        StoreModule,
        NgZorroAntdModule
    ],
    exports: [
        ModuleListComponent,
        FunctionListComponent,
        UserIconComponent,
        DynamicWrapperComponent,
        MainTabComponent,
        FunctionButtonComponent,
        ContextMenuComponent,
        CombogridComponent,
        ToolbarComponent,
        SearchComponent,
        FilterBarComponent,
        SelectComponent,
        RosCalendarComponent,
        RosPaginationComponent,
        MasterListBaseChildComponent,
        FunctionCreateBaseComponent
    ],
    declarations: [
        UserComponent,
        BaseDataComponent,
        ModuleComponent,
        FunctionUnitComponent,
        ContextMenuComponent,
        UserIconComponent,
        ModuleListComponent,
        FunctionListComponent,
        DynamicWrapperComponent,
        MainTabComponent,
        MasterGridComponent,
        CombogridComponent,
        FunctionButtonComponent,
        ToolbarComponent,
        SearchComponent,
        FilterBarComponent,
        CombogridButtonComponent,
        SelectComponent,
        RosCalendarComponent,
        MasterListBaseComponent,
        RosPaginationComponent,
        MasterListBaseChildComponent,
        FunctionCreateBaseComponent
    ],
    providers: [
        UserService,
        ModuleService,
        FunctionUnitService,
        MainTabService,
        GetDataListService
    ],
})
export class AdminModule {
}
