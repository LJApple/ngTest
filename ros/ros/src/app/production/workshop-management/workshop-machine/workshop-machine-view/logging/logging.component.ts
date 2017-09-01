import {Component, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid';
import {Observable} from 'rxjs';
import {WorkshopManagementService} from "../../../workshop-management.service";
import {MachineInspectionPlanService} from "../../../../machine-inspection-plan/machine-inspection-plan.service";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
    selector: 'app-logging',
    templateUrl: './logging.component.html',
    styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit {

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
            {headerName: "序号", field: "id", width: 250},
            {headerName: "创建时间", field: "createtime", width: 230},
            {headerName: "操作记录", field: "content", width: 250},
            {headerName: "操作人", field: "creatorid", width: 350},
            {headerName: "备注", field: "remark", width: 350}
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
        _self.getlLogs();
    }

    // 获取分页的数据
    getPagesRows(event: RowState) {
        this.RowState = event;
        this.getlLogs();
    }

    getlLogs() {
        Observable.fromPromise(this.workshopService.getLogsList(this.id, '/logs', this.RowState.page, this.RowState.row))
            .subscribe(data => {
                this.totalItems = data.total;
                this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
                this.gridOptions.api.setRowData(data.rows);
                this.gridOptions.api.sizeColumnsToFit();
            });
    }
}
