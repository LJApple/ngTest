import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {GridOptions} from "ag-grid";
import {Observable} from 'rxjs';
import {ICellEditorAngularComp} from "ag-grid-angular/main";
import {BadCodeTypeService} from "../../bad-code-type.service";

@Component({
    selector: 'app-process-grid',
    templateUrl: './process-grid.component.html',
    styleUrls: ['./process-grid.component.scss']
})
export class ProcessGridComponent implements ICellEditorAngularComp, AfterViewInit, OnInit {

    // 表格数据模型
    public gridOptions: GridOptions;
    private params: any;

    @ViewChild('container', {read: ViewContainerRef}) public container;
    public selectedValue:string = '';


    constructor(private badCodeTypeService: BadCodeTypeService) {
        this.gridOptions = <GridOptions>{};
        const self = this;
        this.gridOptions.columnDefs = [
            {headerName: "id", field: "id", hide: true},
            {headerName: "工序编码", field: "no", width: 225},
            {headerName: "工序名称", field: "name", width: 225},
        ];

        this.gridOptions.suppressContextMenu = true;
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.onRowDataChanged = function (params) {
            self.gridOptions.api.forEachNode(function (node) {
                if (node.data.no === self.selectedValue) {
                    node.setSelected(true);
                }
            });
            self.gridOptions.api.sizeColumnsToFit();
        };
        Observable.fromPromise(self.badCodeTypeService.getProcessList())
            .subscribe(data => {
                this.gridOptions.api.setRowData(data.data);
                this.gridOptions.api.sizeColumnsToFit();
            });
    }

    ngOnInit() {
    }

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
        this.container.element.nativeElement.focus();
    }

    agInit(params: any): void {
        this.params = params;
        this.selectedValue = params.value;
    }

    getValue(): any {
        return this.selectedValue;
    }

    isPopup(): boolean {
        return true;
    }


    onRowClicked(event) {
        this.selectedValue = event.data.no;
        this.params.api.stopEditing();
    }

}
