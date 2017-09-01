import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { MasterGridComponent } from "app/admin/master-grid/master-grid.component";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
    selector: 'app-sales-order-detail',
    templateUrl: './sales-order-detail.component.html',
    styleUrls: ['./sales-order-detail.component.scss']
})
export class SalesOrderDetailComponent implements OnInit {

    public gridOptions: GridOptions;
    public rowdata: any;
    public rowIndex: number;

    // 分页组件
    RowState: RowState = new RowState('1', '15');
    public gridBodyHeigt: number;
    public totalItems: string;
    public totalPages: number;

    public itemId: string = '867228';

    public newRowData: any = {
        isNewRecord: true,
        source_type: 0,
        source_type_name: "",
        standard_price: "",
        productid: "",
        product_spec: "",
        product_code: "",
        product_name: "",
        unit: "",
        quantity: "",
        price: "",
        desire_delivery_date: "",
        delivery_date: "",
        quote_price: "",
        tax_inclusive_price: "",
        amount: "",
        tax_inclusive_amount: "",
        other_fee: "",
        source_no: "",
        sourceid: "",
        remark: ""
    };

    constructor() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = [
            {
                headerName: "产品代码",
                field: "product_code",
                cellRendererFramework: MasterGridComponent,
                width: 150,
                editable: true
            },
            { headerName: "产品名称", field: "product_name", width: 100 },
            { headerName: "单位", field: "unit", width: 100 },
            { headerName: "数量", field: "quantity", width: 101, editable: true },
            { headerName: "面价", field: "price", width: 101 },
            { headerName: "期望日期", field: "desire_delivery_date", width: 101 },
            { headerName: "交货日期", field: "delivery_date", width: 101 },
            { headerName: "未税单价", field: "standard_price", width: 101 },
            { headerName: "含税单价", field: "tax_inclusive_price", width: 101 },
            { headerName: "未税总价", field: "amount", width: 201 },
            { headerName: "含税总价", field: "tax_inclusive_price", width: 101 },
            { headerName: "其他费用", field: "other_fee", width: 101 },
            { headerName: "原单类型", field: "source_type_name", width: 101 },
            { headerName: "原单单号", field: "source_no", width: 141 },
            { headerName: "isNewRecord", field: "isNewRecord", hide: true },
            { headerName: "source_type", field: "source_type", hide: true },
            { headerName: "productid", field: "productid", width: 0, hide: true },
            { headerName: "sourceid", field: "sourceid", width: 0, hide: true },
        ];

        this.gridOptions.enableColResize = true;
        this.gridOptions.onGridReady = function (params) {
            console.log(params);
        };
        this.rowdata = [{
            isNewRecord: true,
            source_type: 0,
            source_type_name: "自定义",
            standard_price: "0.0000",
            productid: "250272",
            product_spec: "ø4.0/50L*ø0.6/1.2*2F",
            product_code: " 91.35.TCQ.046210",
            product_name: "两刃铣刀",
            unit: "PCS",
            quantity: "121",
            price: "0.0000",
            desire_delivery_date: "2017-08-09",
            delivery_date: "2017-08-25",
            quote_price: "0.0000",
            tax_inclusive_price: "0.0000",
            amount: "0.00",
            tax_inclusive_amount: "0.00",
            other_fee: "1200.00",
            source_no: "",
            sourceid: "",
            remark: "remark"
        }];
        this.gridOptions.rowData = this.rowdata;
    }


    ngOnInit() {
        this.totalItems = this.gridOptions.rowData.length + '';
    }

    getPagesRows(event: RowState) {
        this.RowState = event;
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
    }

    addRow() {
        this.gridOptions.rowData.push(this.newRowData);
        this.gridOptions.api.setRowData(this.gridOptions.rowData);
        this.totalItems = this.gridOptions.rowData.length + '';
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
    }

    removeRow() {
        if (this.rowIndex || this.rowIndex == 0) {
            this.gridOptions.rowData.splice(this.rowIndex, 1);
            this.gridOptions.api.setRowData(this.gridOptions.rowData);
        }
    }

    onCellFocused($event) {
        this.rowIndex = $event.rowIndex;
    }

    onCellValueChanged($event) {
        console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
    }
}
