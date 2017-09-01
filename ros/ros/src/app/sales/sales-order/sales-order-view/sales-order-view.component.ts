import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { SalesOrderService } from "../sales-order.service";
import { MasterGridComponent } from "../../../admin/master-grid/master-grid.component";
import { Observable, Subscription } from 'rxjs/Rx';
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
    selector: 'app-sales-order-view',
    templateUrl: './sales-order-view.component.html',
    styleUrls: ['./sales-order-view.component.scss']
})
export class SalesOrderViewComponent implements OnInit {

    public gridOptions: GridOptions;
    public functionCode: string = 'salesOrder';
    // 分页组件
    RowState: RowState = new RowState('1', '15');
    public gridBodyHeigt: number;
    public totalItems: string;
    public totalPages: number;
    public itemId: string = '867228';
    // Loading
    busy: Subscription;
    // 接收分页组件的数据赋值给本地
    getPagesRows(event: RowState) {
        this.RowState = event;
        /* this.busy = Observable.fromPromise(this.salesOrderService.getViewData('867228')).subscribe(data => {
            this.totalItems = data.total;
            this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
            this.gridOptions.api.setRowData(data.rows);
        }); */
    }

    constructor(private salesOrderService: SalesOrderService) {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = [
            {
                headerName: "产品代码",
                field: "product_code",
                width: 170
            },
            { headerName: "产品名称", field: "product_name", width: 200 },
            { headerName: "单位", field: "unit", width: 100 },
            { headerName: "数量", field: "quantity", width: 101 },
            { headerName: "面价", field: "price", width: 101 },
            { headerName: "期望日期", field: "desire_delivery_date", width: 101 },
            { headerName: "交货日期", field: "delivery_date", width: 101 },
            { headerName: "未税单价", field: "standard_price", width: 101 },
            { headerName: "含税单价", field: "tax_inclusive_price", width: 101 },
            { headerName: "未税总价", field: "amount", width: 101 },
            { headerName: "含税总价", field: "tax_inclusive_price", width: 101 },
            { headerName: "其他费用", field: "other_fee", width: 101 },
            { headerName: "原单类型", field: "source_type_name", width: 101 },
            { headerName: "原单单号", field: "source_no", width: 151 },
            { headerName: "isNewRecord", field: "isNewRecord", hide: true },
            { headerName: "source_type", field: "source_type", hide: true },
            { headerName: "productid", field: "productid", width: 0, hide: true },
            { headerName: "sourceid", field: "sourceid", width: 0, hide: true },
        ];
        this.gridOptions.rowData = [];
        this.gridOptions.enableColResize = true;
        this.gridOptions.onGridReady = function (params) {
            // params.api.sizeColumnsToFit();
        };
        this.gridOptions.paginationPageSize = 2;
        this.gridOptions.pagination = true;
        // this.gridOptions.paginationAutoPageSize = true;
        // this.gridOptions.getContextMenuItems = this.getContextMenuItems.bind(this);
    }


    ngOnInit() {
        /* Observable.fromPromise(this.salesOrderService.getViewData('867228')).subscribe(data => {
             this.totalItems = data.total;
             this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
             this.gridOptions.api.setRowData(data.rows);
             console.log(this.totalItems);
             console.log(this.totalPages);
         });*/
    }
    onCellFocused($event) {
    }
}
