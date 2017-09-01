import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid/main';
import { Observable, Subscription } from 'rxjs/Rx';
import { CommonHelper } from 'app/utils/common.helper';
import * as _ from 'lodash';

import { MasterListBaseService } from './master-list-base.service';

/**
 * 主列表基类
 */
@Component({
    selector: 'app-master-list-base',
    templateUrl: './master-list-base.component.html',
    styleUrls: ['./master-list-base.component.scss']
})
export class MasterListBaseComponent implements OnInit {

    /*
     * 子组件，用于解决循环引用的问题
     * 需要在列表视图中引入子组件：
     * <app-master-list-base-child #masterListBaseChildComponent></app-master-list-base-child>
     */
    @ViewChild('masterListBaseChildComponent') child;

    // 功能代码
    public FUNCTION_CODE: string = 'salesOrder';

    // 相应操作的代码（默认规则是功能代码拼接相应后缀）
    public CREATE_CODE: string = this.FUNCTION_CODE + '_create'; // 新增
    public UPDATE_CODE: string = this.FUNCTION_CODE + '_update'; // 编辑
    public VIEW_CODE: string = this.FUNCTION_CODE + '_view'; // 查看
    public REMOVE_CODE: string = this.FUNCTION_CODE + '_remove'; // 删除

    // 主列表配置
    public masterListOptions: GridOptions = <GridOptions>{};
    // 主列表字段配置
    public masterListFieldConfig: Array<any>;
    // 主列表高度
    public masterListHeight: number;

    constructor(protected masterListBaseService: MasterListBaseService) { }

    ngOnInit() {
    }

    // 初始化主列表
    initMasterList() {

        const self = this;

        // 属性
        this.masterListOptions.animateRows = true; // 是否启用行动画
        this.masterListOptions.rowSelection = 'multiple'; // 记录选择模式（single、multiple）
        this.masterListOptions.rowHeight = CommonHelper.WIDGET_SIZE.HEIGHT.MASTER_LIST_ROW; // 行高
        this.masterListOptions.headerHeight = CommonHelper.WIDGET_SIZE.HEIGHT.MASTER_LIST_HEADER; // 表头高度
        this.masterListOptions.columnDefs = this.getColumnDefs(); // 列表字段配置
        this.masterListOptions.enableColResize = true; // 是否允许通过在列标题边缘拖动鼠标来调整列宽
        this.masterListOptions.enableServerSideSorting = true; // 是否启用服务端排序
        this.masterListOptions.enableServerSideFilter = true; // 是否启用服务端筛选
        this.masterListOptions.rowModelType = 'infinite'; // 行模型类型 [inMemory，infinite，viewport，enterprise]
        this.masterListOptions.pagination = true; // 是否分页
        this.masterListOptions.paginationPageSize = 20; // 每页记录数
        this.masterListOptions.cacheOverflowSize = 2; // 采用下拉加载时预加载的空白记录数
        this.masterListOptions.maxConcurrentDatasourceRequests = 2; // 最大并行请求数量
        this.masterListOptions.infiniteInitialRowCount = 1; // 数据未加载时显示的记录数
        this.masterListOptions.maxBlocksInCache = 2; // 缓存中保存的最大数据块数
        this.masterListOptions.cacheBlockSize = 50; // 单体数据块包含的记录数（每次请求获取到的记录数）
        this.masterListOptions.getContextMenuItems = this.getContextMenuItems; // 右键菜单配置
        //this.masterListOptions.paginationAutoPageSize = true; // 根据列表高度自动设置每页记录数
        //this.masterListOptions.suppressRowClickSelection = true; // 点击行时是否阻止选中行为（配合checkbox实现选中效果）
        //this.masterListOptions.enableSorting = true; // 是否启用排序功能（行模型类型为inMemory时有效）
        //this.masterListOptions.enableFilter = true; // 是否启用筛选功能（行模型类型为inMemory时有效）

        // 事件
        this.masterListOptions.onGridReady = this.onGridReady; // 列表加载成功
        this.masterListOptions.onCellClicked = this.onCellClicked; // 单元格点击
        this.masterListOptions.onCellDoubleClicked = this.onCellDoubleClicked; // 单元格双击
        this.masterListOptions.onRowSelected = this.onRowSelected; // 行选中
        this.masterListOptions.onRowClicked = this.onRowClicked; // 行点击
        this.masterListOptions.onCellContextMenu = this.onCellContextMenu; // 单元格右键

        // 表格尺寸适配
        const restHeight = CommonHelper.WIDGET_SIZE.HEIGHT.HEADER + CommonHelper.WIDGET_SIZE.HEIGHT.FILTER_BAR;
        this.masterListHeight = document.body.clientHeight - restHeight;
        window.addEventListener('resize', function () {
            self.masterListHeight = document.body.clientHeight - restHeight;
        });

        this.setDataSource();
    }

    // 获取并加工列表字段配置信息
    getColumnDefs() {

        let columnDefs = [];
        let index = 0;
        _.forEach(this.masterListFieldConfig, function (item) {

            let defItem = {
                headerName: item.title,
                field: item.field,
                width: item.width
            }
            if (index === 0) {
                // 第一个字段设置“加载中”效果
                defItem['cellRenderer'] = function (params) {
                    if (params.value !== undefined) {
                        return params.value;
                    } else {
                        return '加载中...'
                    }
                };
            }
            columnDefs.push(defItem);
            index++;
        });

        return columnDefs;
    }

    // 配置数据源
    setDataSource() {

        const self = this;
        let dataSource = {
            rowCount: null,
            getRows: function (params) {

                let page = Math.round(params.startRow / self.masterListOptions.cacheBlockSize) + 1 + ''; // 页数
                let rows = params.endRow - params.startRow + ''; // 每页记录数
                self.reloadListData(params, page, rows);
            }
        };

        setTimeout(function () {
            self.masterListOptions.api.setDatasource(dataSource);
        }, 0);
    }

    // 获取列表筛选参数
    getReloadParams(): any {

        let reloadParams = {};
        //reloadParams['productid'] = 12345;
        return reloadParams;
    }

    /*
     * 加载列表数据
     * @param params ag-grid数据源（dataSource）中getRows方法的参数
     * @page 指定页
     * @rows 每页记录数
     */
    reloadListData(params, page, rows) {

        Observable.fromPromise(this.masterListBaseService.getMasterList(page, rows, this.getReloadParams())).subscribe(data => {
            params.successCallback(data.rows, data.total);
        });
    }

    // 右键菜单配置
    getContextMenuItems = (params) => {

        let result = [
            {
                name: '新增',
                action: this.create
            },
            'copy'
        ];

        return result;
    }

    // 新增
    create = () => {
        this.child.onFunctionSelect(this.CREATE_CODE);
    }

    // 点击单元格事件
    onCellClicked = (params) => {
        //console.log('onCellClicked: ' + params.rowIndex + ' ' + params.colDef.field);
    }

    // 列表加载成功事件
    onGridReady = (params) => {
        //console.log('onGridReady: %o', params);
    }

    // 单元格双击事件
    onCellDoubleClicked = (params) => {
        //console.log('onCellDoubleClicked: %o', params);
    }

    // 行选中事件
    onRowSelected = (params) => {
        //console.log('onRowSelected: %o', params);
    }

    // 行点击事件
    onRowClicked = (params) => {
        //console.log('onRowClicked: %o', params);
    }

    // 单元格右键事件
    onCellContextMenu = (params) => {
        //console.log('onCellContextMenu: %o', params);
    }
}
