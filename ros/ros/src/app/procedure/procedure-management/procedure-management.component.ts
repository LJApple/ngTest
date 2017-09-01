import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { CommonHelper, HEADER_AND_FOOTER_HEIGHT } from "../../utils/common.helper";
import { ProcedureManagementService } from "./procedure-management.service";


import { Observable, Subscription } from 'rxjs/Rx';
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
    selector: 'app-procedure',
    templateUrl: './procedure-management.component.html',
    styleUrls: ['./procedure-management.component.scss']
})
export class ProcedureManagementComponent implements OnInit {

    public procedureGridOptions: GridOptions;
    public functionCodeCreate = 'create_procedure_management'
    public functionCodeView = 'procedure_management_view'
    public functionCodeUpdate = 'procedure_management_updata'
    public gridBodyHeigt: number;
    public gridBodyWidth;
    public alertMsg: any = [];
    public totalItems: string;
    public totalPages: number;
    RowState: RowState = new RowState('1', '15');
    public id: string;
    public itemid: any;
    public keyWords: string;
    public currentRowDate;

    // 右键菜单配置
    public contextMenuConfig = {
        isShow: true,
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
                    console.log(rowData);
                }
            },
            {
                'name': '查看',
                'code': 'view',
                'class': 'glyphicon-eye-open',
                'functionCode': this.functionCodeView,
                'handleType': CommonHelper.HANDLE_TYPE.TAB,
                'handler': function ($event, rowData) {
                    console.log(rowData);
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

    constructor(private procedureManagementService: ProcedureManagementService) {
        this.procedureGridOptions = <GridOptions>{};
        const self = this;
        // 列表表头
        this.procedureGridOptions.columnDefs = [
            { headerName: "id", field: "id", width: 0, hide: true },
            { headerName: "工序编号", field: "no", width: 200 },
            { headerName: "工序名称", field: "name", width: 200 },
            { headerName: "工序描述", field: "description", width: 200 },
            { headerName: "操作人", field: "operator", width: 200 },
             { headerName: "操作时间", field: "update_time", width: 200 },
        ];
        // 列表数据
        this.procedureGridOptions.rowData = [];
        this.procedureGridOptions.suppressContextMenu = true;
        // 列表初始化自适应
        this.procedureGridOptions.onGridReady = function (params) {
            params.api.sizeColumnsToFit();
        };

        // 高度自适应
        const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT;
        this.gridBodyHeigt = currentHeight;
        window.onresize = function () {
            self.procedureGridOptions.api.sizeColumnsToFit();
            const currentHeight = document.body.clientHeight;
            self.gridBodyHeigt = currentHeight - HEADER_AND_FOOTER_HEIGHT;
        }


        // 订阅功能子项的选中事件
        procedureManagementService.isUpdateSuccess.subscribe((tempData) => {

            self.alertMsg.push({
                type: "success",
                msg: tempData.msg,
                timeout: 2000
            })
            if (tempData.type === 2) {
                // 修改操作
                // console.log('修改操作')
                if (tempData.flag) {
                   
                    self.procedureGridOptions.api.updateRowData({add: [tempData.data], addIndex: 0});
                    self.procedureGridOptions.api.updateRowData({remove: [this.currentRowDate]});
                    this.procedureManagementService.afterUpdateSuccess.emit(tempData.flag);
                    // 提示弹窗
                    self.alertMsg.push({
                        type: "success",
                        msg: "修改成功!",
                        timeout: 2000
                    });
                }
            } else if (tempData.type === 1) {
               
                // 新增操作
                self.procedureGridOptions.api.updateRowData({add: [tempData.data], addIndex: 0});
                // 提示弹窗
                self.alertMsg.push({
                    type: "success",
                    msg: "添加成功!",
                    timeout: 2000
                });
            }
        });
    }

    ngOnInit() {

        const self = this;

        // 右键隐藏
        this.contextMenuConfig.isShow = false;

        // 初始化列表数据  
        this.getlist();

        // 监听屏幕变化
        window.addEventListener('resize', function () {

            const currentHeight = document.body.clientHeight;
            const currentWidth = document.body.clientWidth;
            self.gridBodyHeigt = currentHeight - HEADER_AND_FOOTER_HEIGHT;
            self.gridBodyWidth = currentWidth - 300;

            // 列表父宽度自适应
            setTimeout(function () {
                self.procedureGridOptions.api.sizeColumnsToFit();
            }, 100);

        });
    }


    // 行 单击
    onRowClicked($event) {
        console.log($event);
    };

    onCellFocused($event) {
        this.contextMenuConfig.isShow = false;
        this.contextMenuConfig.rowIndex = $event.rowIndex;
    }
    // 阻止表格内的右击事件
    onContextClick($event: any) {
        return false;
    }

    // 搜索程序
    filter() {
        if (this.keyWords) {
            Observable.fromPromise(this.procedureManagementService.Search(this.RowState.page, this.RowState.row, this.keyWords)).subscribe(data => {
           
                console.log(data)
                this.totalItems = data.total;
                this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
                this.procedureGridOptions.api.setRowData(data.rows);
                this.procedureGridOptions.api.sizeColumnsToFit();
            });
        } else {
            this.alertMsg.push({
                type: "warning",
                msg: "请输入关键字",
                timeout: 2000
            })
        }
    }

    // 更新主列表
    initLIst() {

        if (!this.keyWords) {
            this.getlist();
        }
    };

    getlist() {

        // 加载列表数据
        Observable.fromPromise(this.procedureManagementService.getList(this.RowState.page, this.RowState.row)).subscribe(data => {

            this.totalItems = data.total;
            this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
            this.procedureGridOptions.api.setRowData(data.rows);
            this.procedureGridOptions.api.sizeColumnsToFit();
        });
    };

    // 右键按钮点击事件
    onCellContextMenu(event) {

        const self = this;
        const itemid = event.data.id;
        this.contextMenuConfig.isShow = true;
        this.contextMenuConfig.position.clientX = event.event.clientX;
        this.contextMenuConfig.position.clientY = event.event.clientY;
        this.contextMenuConfig.rowData = event.data;
        this.currentRowDate = event.data
        this.contextMenuConfig.menuItems[3].handler = function (rowData) {
            Observable.fromPromise(self.procedureManagementService.delete(itemid)).subscribe(data => {
                self.procedureGridOptions.api.updateRowData({
                    remove: [rowData]
                });
                self.alertMsg.push({
                    type: "success",
                    msg: "删除成功!",
                    timeout: 2000
                })
            }); 
        };
    };

    // 双击查看该行数据
    onCellDoubleClicked($event) {
        console.log($event);
        // this.machineInspectionViewService.sendDataToView = $event.data;
        // this.functionUnitService.onFunctionSelect.emit(this.functionCodeView);
    }

    // Loading
    busy: Subscription;

    // 接收分页组件的数据赋值给本地
    getPagesRows(event: RowState) {

        if (this.procedureGridOptions.api) {
            this.procedureGridOptions.api.showLoadingOverlay();
        }
        this.RowState = event;

        this.busy = Observable.fromPromise(this.procedureManagementService.getList(this.RowState.page, this.RowState.row)).subscribe(data => {
            this.totalItems = data.total;
            this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
            this.procedureGridOptions.api.setRowData(data.rows);
            /*this.gridOptions.api.sizeColumnsToFit();*/
        });
    }
    //  单元格点击事件
    onContextItemClick($event) {
        // 监听子组件 右键菜单的 rowData 接受它
        this.id = $event.id;
        this.procedureManagementService.rowData = $event;
    };
}