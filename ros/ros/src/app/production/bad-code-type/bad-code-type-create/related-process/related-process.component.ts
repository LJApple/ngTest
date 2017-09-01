import {Component, Input, OnInit} from '@angular/core';
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";
import {GridOptions} from "ag-grid";
import {HEADER_AND_FOOTER_HEIGHT} from "app/utils/common.helper";
import {ProcessGridComponent} from "../process-grid/process-grid.component";

@Component({
    selector: 'app-related-process',
    templateUrl: './related-process.component.html',
    styleUrls: ['./related-process.component.scss']
})
export class RelatedProcessComponent implements OnInit {

    @Input() formModel;
    // 分页组件
    RowState: RowState = new RowState('1', '15');
    public totalItems: string;
    public totalPages: number;
    public keyWords: string;

    // 表格数据模型
    public gridOptions: GridOptions;
    public gridBodyHeigt: number;
    public alertMsg: any = [];

    public gridWidth: any = 1500;

/*
*  {
                   {headerName: "Athlete", field: "athlete",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true},
            },*/
    constructor() {
        this.gridOptions = <GridOptions>{};
        const self = this;
        this.gridOptions.columnDefs = [
            {headerName: "id", field: "id", hide: true},
            {
                headerName: "",
                width: 50,
                maxWidth: 50,
                checkboxSelection: true,
                suppressMenu: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
            },
            {headerName: "关联工序",
                field: "procedure",
                cellEditorFramework: ProcessGridComponent,
                editable: true,
                width: self.gridWidth}
        ];

        this.gridOptions.suppressContextMenu = true;
        this.gridOptions.onGridReady = function (params) {
            self.gridOptions.api.sizeColumnsToFit();
        };

        this.gridOptions.rowData = [];
        // 高度自适应
        const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT - 150;

        this.gridBodyHeigt = currentHeight;
        window.onresize = function () {
            self.gridOptions.api.sizeColumnsToFit();
            const currentHeight = document.body.clientHeight;
            self.gridBodyHeigt = currentHeight - HEADER_AND_FOOTER_HEIGHT - 150;
            self.gridWidth = document.body.clientWidth - HEADER_AND_FOOTER_HEIGHT - 170;
            console.log(self.gridWidth);
        }
    }

    ngOnInit() {
        this.gridWidth = document.body.clientWidth - HEADER_AND_FOOTER_HEIGHT - 170;
    }

    // 获取分页的数据
    getPagesRows(event: RowState) {
        this.RowState = event;
        // this.getlist(this.keyWords);
    }

    addNewRow() {
        const data = [{}];
        this.gridOptions.api.updateRowData({
            add: data
        })
    }

}
