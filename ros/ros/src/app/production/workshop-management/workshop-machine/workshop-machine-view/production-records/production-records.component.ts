import {Component, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid';
import {Observable} from 'rxjs';
import {WorkshopManagementService} from "../../../workshop-management.service";
import {MachineInspectionPlanService} from "../../../../machine-inspection-plan/machine-inspection-plan.service";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
    selector: 'app-production-records',
    templateUrl: './production-records.component.html',
    styleUrls: ['./production-records.component.scss']
})
export class ProductionRecordsComponent implements OnInit {

    // 表格数据模型
    public gridOptions: GridOptions;

    // 分页组件
    RowState: RowState = new RowState('1', '10');
    public totalItems: string;
    public totalPages: number;
    public id: string = "";

    constructor(private workshopService: WorkshopManagementService,
                private assistService: MachineInspectionPlanService) {
        this.gridOptions = <GridOptions>{};
        const self = this;
        this.gridOptions.columnDefs = [
            {headerName: "生产号", field: "no", hide: true},
            {headerName: "下达日期", field: "create_time", width: 130},
            {headerName: "车间", field: "organization_name", width: 150},
            {headerName: "机台", field: "machine_name", width: 150},
            {headerName: "计划开始时间", field: "plan_start_time", width: 150},
            {headerName: "计划结束时间", field: "plan_end_time", width: 150},
            {headerName: "实际开始时间", field: "actual_start_time", width: 151},
            {headerName: "实际结束时间", field: "actual_end_time", width: 151},
            {headerName: "作业员", field: "operator", width: 201},
            {headerName: "调机用时", field: "adjust_machine_time", width: 101},
            {headerName: "生产用时", field: "production_time", width: 101},
            {headerName: "生产单价", field: "price", width: 201},
            {headerName: "生产数量", field: "qualified_num", width: 201},
            {headerName: "合格数", field: "quantity", width: 101},
            {headerName: "不合格数", field: "unqualified_num", width: 101},
            {headerName: "备注", field: "remark", width: 101},
            {headerName: "状态", field: "state_text", width: 101}
        ];

        this.gridOptions.enableColResize = true;
        this.gridOptions.onGridReady = function (params) {
            self.gridOptions.api.sizeColumnsToFit();
        };
        /*window.onresize = function () {
            self.gridOptions.api.sizeColumnsToFit();
        }*/
    }


    ngOnInit() {
        this.id = this.assistService.rowData.id;
        const _self = this;
        _self.getlist();
    }

    // 获取分页的数据
    getPagesRows(event: RowState) {
        this.RowState = event;
        this.getlist();
    }

    getlist() {
        Observable.fromPromise(this.workshopService.getLogsList(this.id, '/orders', this.RowState.page, this.RowState.row))
            .subscribe(data => {
                this.totalItems = data.total;
                this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
                this.gridOptions.api.setRowData(data.rows);
                this.gridOptions.api.sizeColumnsToFit();
            });
    }
}
