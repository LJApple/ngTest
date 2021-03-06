import {Component, OnInit} from '@angular/core';
import {CommonHelper, HEADER_AND_FOOTER_HEIGHT} from '../../utils/common.helper';
import {GridOptions} from 'ag-grid';
import {Observable} from 'rxjs';
import {MachineInspectionPlanService} from "../machine-inspection-plan/machine-inspection-plan.service";
import {BadCodeTypeService} from "./bad-code-type.service";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
    selector: 'app-bad-code-type',
    templateUrl: './bad-code-type.component.html',
    styleUrls: ['./bad-code-type.component.scss']
})
export class BadCodeTypeComponent implements OnInit {
    // 声明模块功能对应的code
    public functionCode: string = 'bad_code_type';
    public functionCodeCreate = 'bad_code_type_create'
    public functionCodeView = 'bad_code_type_view'
    public functionCodeUpdate = 'bad_code_type_update'
    public id: string;
    public itemid: any;
    public totalItem: string;
    public oldRowDate: any;
    public data = {
        FUNCTION_CODE: this.functionCode
    };

    // 表格数据模型
    public gridOptions: GridOptions;
    public gridBodyHeigt: number;
    public alertMsg: any = [];


    // 分页组件
    RowState: RowState = new RowState('1', '15');
    public totalItems: string;
    public totalPages: number;
    public keyWords: string;
    // 右键菜单配置
    public contextMenuConfig = {
        isShow: false,
        position: {
            clientX: 0,
            clientY: 0
        },
        rowData: null,
        rowIndex: null,
        menuItems: [
            {
                'name': '新增',
                'code': 'create',
                'class': 'glyphicon-plus',
                'functionCode': this.functionCodeCreate,
                'handleType': CommonHelper.HANDLE_TYPE.TAB,
                'handler': function (rowData) {
                    console.log(rowData);
                }
            },
            {
                'name': '编辑',
                'code': 'update',
                'class': 'glyphicon-pencil',
                'functionCode': this.functionCodeUpdate,
                'handleType': CommonHelper.HANDLE_TYPE.TAB,
                'handler': function (rowData) {
                    console.log('编辑' + rowData);
                }
            },
            {
                'name': '查看',
                'code': 'view',
                'class': 'glyphicon-eye-open',
                'functionCode': this.functionCodeView,
                'handleType': CommonHelper.HANDLE_TYPE.TAB,
                'handler': function ($event, rowData) {
                    console.log('查看' + rowData);
                }
            },
            {
                'name': '删除',
                'code': 'remove',
                'class': 'glyphicon-remove',
                'handleType': CommonHelper.HANDLE_TYPE.HANDLER,
                'handler': function ($event, rowData) {
                    console.log('删除' + rowData);
                }
            }
        ]
    }


    constructor(private badCodeTypeService: BadCodeTypeService) {
        this.gridOptions = <GridOptions>{};
        const self = this;
        this.gridOptions.columnDefs = [
            {headerName: "id", field: "id", hide: true},
            {headerName: "不良类型编号", field: "no", width: 300},
            {headerName: "不良代码类型", field: "name", width: 300},
            {headerName: "操作人", field: "operator", width: 300},
            {headerName: "操作时间时间", field: "update_time", width: 225},
            {headerName: "是否启用", field: "status_text", width: 201}
        ];

        this.gridOptions.enableColResize = true;
        this.gridOptions.suppressContextMenu = true;
        this.gridOptions.onGridReady = function (params) {
            self.gridOptions.api.sizeColumnsToFit();
        };

        this.gridOptions.rowData = [];
        // 高度自适应
        const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT;
        this.gridBodyHeigt = currentHeight;
        window.onresize = function () {
            self.gridOptions.api.sizeColumnsToFit();
            const currentHeight = document.body.clientHeight;
            self.gridBodyHeigt = currentHeight - HEADER_AND_FOOTER_HEIGHT;
        }

        /*// 订阅功能子项的选中事件
        badCodeTypeService.isUpdateSuccess.subscribe((tempData) => {
            self.alertMsg.push({
                type: "success",
                msg: tempData.msg,
                timeout: 2000
            })
            if (tempData.type === 2) {
                // 修改操作
                if (tempData.flag) {
                    self.gridOptions.api.updateRowData({add: [tempData.data], addIndex: 0});
                    self.gridOptions.api.updateRowData({remove: [this.oldRowDate]});
                }
            } else if (tempData.type === 1) {
                // 新增操作
                self.gridOptions.api.updateRowData({add: [tempData.data], addIndex: 0});
            }
        })*/
    }

    // 初始化主列表
    ngOnInit() {
        /* Observable.fromPromise(this.DefectCodeService.getDefectCodeList(this.RowState.page, this.RowState.row)).subscribe(data => {
             // console.log(data);
             this.totalItems = data.total;
             this.gridOptions.rowData = data.rows;
             this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
             this.gridOptions.api.setRowData(data.rows);
         });*/
    }

    // 获取分页的数据
    getPagesRows(event: RowState) {
        this.RowState = event;
        this.getlist(this.keyWords);
    }

    // 行单击
    onRowClicked($event) {
    };

    onRowSelected($event) {
    };

    // 搜索程序
    filter() {
        /*if (this.keyWords) {
            Observable.fromPromise(this.DefectCodeService.Search(this.RowState.page, this.RowState.row, this.keyWords)).subscribe(data => {
                this.totalItems = data.total;
                this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
                this.gridOptions.api.setRowData(data.data);
                /!*this.gridOptions.api.sizeColumnsToFit();*!/
            });
        } else {
            this.alertMsg.push({
                type: "warning",
                msg: "请输入关键字",
                timeout: 2000
            })
        }*/
    }

    // 更新主列表
    initList() {
        console.log(this.keyWords);
        this.getlist(this.keyWords);
    }

    // 阻止右键浏览器默认事件
    onContextClick(event) {
        return false;
    };

    // 赋值当前索引
    onCellFocused($event) {
        this.contextMenuConfig.isShow = false;
        this.contextMenuConfig.rowIndex = $event.rowIndex;
    }

    // 右键菜单配置
    onCellContextMenu(event) {
        console.log(event);
        /* const itemid = event.data.id;
         this.oldRowDate = event.data;
         const self = this;
         this.contextMenuConfig.isShow = true;
         this.contextMenuConfig.position.clientX = event.event.clientX;
         this.contextMenuConfig.position.clientY = event.event.clientY;
         this.contextMenuConfig.rowData = event.data;
         this.contextMenuConfig.rowData.rowIndex = this.contextMenuConfig.rowIndex;
         this.contextMenuConfig.menuItems[3].handler = function (rowData) {
             Observable.fromPromise(self.DefectCodeService.delete(itemid)).subscribe(data => {
                 self.gridOptions.api.updateRowData({remove: [rowData]});
                 self.alertMsg.push({
                     type: "success",
                     msg: "删除成功!",
                     timeout: 2000
                 });
                 self.totalItems = Number(self.totalItems) - 1 + "";
             });
         };*/
    }

    getlist(keywords?: string) {
        Observable.fromPromise(this.badCodeTypeService.getList(this.RowState.page, this.RowState.row, keywords))
            .subscribe(data => {
                console.log(data);
                this.totalItems = data.total;
                this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
                this.gridOptions.api.setRowData(data.rows);
                this.gridOptions.api.sizeColumnsToFit();
            });
    }

    // $event: rowData
    onContextItemClick($event) {
        // 监听子组件 右键菜单的 rowData 接受它
        /*  this.id = $event.id;
          this.badCodeTypeService.rowData = $event;*/
    }

    // 列的宽度发生变化
    /*onColumnResized($event) {
        console.log($event);
    }*/
}
