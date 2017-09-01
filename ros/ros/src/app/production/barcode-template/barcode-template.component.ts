import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { CommonHelper, HEADER_AND_FOOTER_HEIGHT } from 'app/utils/common.helper';
import { FilterBarComponent } from 'app/admin/widgets/filter-bar/filter-bar.component';
import { BarcodeTemplateService } from './barcode-template.service';
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
    selector: 'app-barcode-template',
    templateUrl: './barcode-template.component.html',
    styleUrls: ['./barcode-template.component.scss']
})
export class BarcodeTemplateComponent implements OnInit {

    public FUNCTION_CODE = 'barcode_template';

    // 列表配置
    public gridOptions: GridOptions;
    public gridBodyHeigt: number;

    // 列表参数
    public gridParams: object;

    // 筛选栏配置
    public filterBarConfig = {

        // 操作按钮
        buttons: [
            {
                'name': '新增', // 名称
                'class': 'create', // 自定义类选择器
                'handleType': CommonHelper.HANDLE_TYPE.TAB, // 操作类型
                'functionCode': 'barcode_template_create', // 点击打开的功能code
            }
        ],
        // 搜索控件
        search: {
            'key': '不良代码编号', // 文本
            'param': '', // 默认搜索参数
            'handleType': CommonHelper.HANDLE_TYPE.HANDLER, // 操作类型
        }
    };

    // 右键菜单配置
    public contextMenuConfig = {
        isShow: true,
        position: {
            clientX: 0,
            clientY: 0
        },
        rowData: null,
        menuItems: [
            {
                'name': '新增',
                'code': 'create',
                'class': 'glyphicon-ok-sign',
                'functionCode': 'barcode_template_create',
                'handleType': CommonHelper.HANDLE_TYPE.TAB,
                'handler': function (rowData) {
                }
            },
            {
                'name': '编辑',
                'code': 'update',
                'class': 'glyphicon-ok-sign',
                'functionCode': 'barcode_template_update',
                'handleType': CommonHelper.HANDLE_TYPE.TAB,
                'handler': function (rowData) {
                }
            },
            {
                'name': '查看',
                'code': 'view',
                'class': 'glyphicon-ok-sign',
                'functionCode': 'barcode_template_view',
                'handleType': CommonHelper.HANDLE_TYPE.TAB,
                'handler': function ($event, rowData) {
                    console.log(rowData);
                }
            },
            {
                'name': '删除',
                'code': 'remove',
                'class': 'glyphicon-ok-sign',
                'handler': function ($event, rowData) {
                    console.log(rowData);
                }
            }
        ]
    };

    // 分页配置
    public totalItems: string;
    public totalPages: number;
    RowState: RowState = new RowState('1', '15');

    constructor(
        private barcodeTemplateService: BarcodeTemplateService
    ) {
        this.initGrid();
     }

    ngOnInit() {
    }

    // 列表初始化
    initGrid() {

        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = [
            { headerName: "成品编号", field: "no", width: 200 },
            { headerName: "成品名称", field: "product_name", width: 200 },
            { headerName: "创建时间", field: "create_time", width: 200 },
            { headerName: "创建人", field: "creator_name", width: 200 },
        ];

        this.gridOptions.enableColResize = true;
        this.gridOptions.onGridReady = function (params) {
            params.api.sizeColumnsToFit();
        };

        // 定义grid表格以字段id为索引进行获取下标
        this.gridOptions.getRowNodeId = function (data) {
            return data.no;
        };

        const self = this;
        const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT;
        this.gridBodyHeigt = currentHeight;
        window.onresize = function () {
            const currentHeight = document.body.clientHeight;
            self.gridBodyHeigt = currentHeight - HEADER_AND_FOOTER_HEIGHT;
        }
    }

    // 阻止右键浏览器默认事件
    onContextClick(event) {
        return false;
    }

    // 新增
    create($event) {
        //this.functionUnitService.onFunctionSelect.emit('machine_inspection_create');
    }

    // 刷新列表
    reloadListData() {

        console.log(this.gridParams);

        if (this.gridOptions.api) {
            this.gridOptions.api.showLoadingOverlay();
        }
        const self = this;
        Observable.fromPromise(this.barcodeTemplateService.getListData(this.gridParams)).subscribe(data => {
            self.totalItems = data.total;
            self.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
            self.gridOptions.api.setRowData(data.rows);
            this.gridOptions.api.hideOverlay();
        });
    }

    // 筛选栏按钮点击
    onFilterButtonClick($event) {

        console.log($event);
    }

    // 筛选栏搜索按钮点击
    onFilterSearchClick($event) {

        console.log($event);

        let params = $event.param;

        this.gridParams = _.merge(this.gridParams, {
            params: params
        });
        this.reloadListData();
    }

    // 右键菜单点击
    onContextItemClick($event) {

    }

    onCellContextMenu(event) {
        this.contextMenuConfig.isShow = true;
        this.contextMenuConfig.position.clientX = event.event.clientX;
        this.contextMenuConfig.position.clientY = event.event.clientY;
        this.contextMenuConfig.rowData = event.data;
    }

    onCellFocused($event) {
        this.contextMenuConfig.isShow = false;
    }

    onRowClicked($event) {
    }

    onRowSelected($event) {

    }

    getPagesRows (event: RowState) {
        const self = this;
        this.RowState = event;
        let data = {
            FUNCTION_CODE: this.FUNCTION_CODE,
            page: this.RowState.page,
            rows: this.RowState.row
        };

        this.gridParams = _.merge(this.gridParams, data);

        this.reloadListData();
    }

}
