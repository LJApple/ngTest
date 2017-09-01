import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { Observable } from 'rxjs/Rx';
import { MasterGridComponent } from "app/admin/master-grid/master-grid.component";
import { BarcodeTemplateService } from '../barcode-template.service';
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
    selector: 'app-barcode-template-detail',
    templateUrl: './barcode-template-detail.component.html',
    styleUrls: ['./barcode-template-detail.component.scss']
})
export class BarcodeTemplateDetailComponent implements OnInit {

    public gridOptions: GridOptions;
    public rowdata: any;
    public rowIndex: number;

    // 分页组件
    RowState: RowState = new RowState('1', '15');
    public gridBodyHeigt: number = 0;
    public totalItems: string = '0';
    public totalPages: number = 0;

    constructor(
        private barcodeTemplateService: BarcodeTemplateService
    ) {

        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = [
            { headerName: "id", field: "id", width: 0, hide: true },
            { headerName: "工序id", field: "procedure_id", width: 0, hide: true },
            { headerName: "文件id", field: "archive_id", width: 0, hide: true },
            { headerName: "模板名称", field: "name", width: 100, editable: true },
            { headerName: "工序", field: "procedure_name", width: 100, editable: true },
            { headerName: "模板文件", field: "archive", width: 100, editable: true },
            { headerName: "描述", field: "description", width: 100, editable: true },
        ];
        this.gridOptions.editType = 'fullRow';

        this.gridOptions.enableColResize = true;
        this.gridOptions.stopEditingWhenGridLosesFocus = true;
        this.gridOptions.onGridReady = function (params) {
            params.api.sizeColumnsToFit();
        };
        this.rowdata = [{
        }];
        this.gridOptions.rowData = this.rowdata;
    }

    ngOnInit() {

        //this.totalItems = this.gridOptions.rowData.length + '';
        Observable.fromPromise(this.barcodeTemplateService.getModel({id: 809125, page: 1, rows: 15})).subscribe(data => {
            console.log(data);
            this.totalItems = data.total;
            this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
            this.gridOptions.api.setRowData(data.rows);
        });
    }

    createNewRowData(): any {

        var newRowData = {
            name: "",
            procedure_name: "",
            archive: "",
            description: ""
        }
    }

    getPagesRows(event: RowState) {
        this.RowState = event;
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
    }

    addRow() {
        this.gridOptions.api.updateRowData({ add: [this.createNewRowData()] });
        this.totalItems = this.gridOptions.rowData.length + '';
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
    }

    removeRow() {
        var selectedData = this.gridOptions.api.getSelectedRows();
        console.log(selectedData);
        this.gridOptions.api.updateRowData({ remove: selectedData });
        this.totalItems = this.gridOptions.rowData.length + '';
    }

    onCellFocused($event) {
        this.rowIndex = $event.rowIndex;
    }

    onCellValueChanged($event) {
        console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
    }
}
