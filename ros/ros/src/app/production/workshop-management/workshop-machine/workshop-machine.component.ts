import {Component, OnInit} from '@angular/core';
import {CommonHelper, HEADER_AND_FOOTER_HEIGHT} from 'app/utils/common.helper';
import {GridOptions} from 'ag-grid';
import {Observable} from 'rxjs';
import {WorkshopManagementService} from "app/production/workshop-management/workshop-management.service";
import {MachineInspectionPlanService} from "../../machine-inspection-plan/machine-inspection-plan.service";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
    selector: 'app-workshop-machine',
    templateUrl: './workshop-machine.component.html',
    styleUrls: ['./workshop-machine.component.scss']
})
export class WorkshopMachineComponent implements OnInit {
    // 头部日期范围选择控件参数
    public _startDate = null;
    public _endDate = null;
    // 头部车间筛选栏 下拉选择框
    public workshopOption: any = 0;
    public _workshopOption: any;
    public defaultWorkshop: any = {
        id: 0,
        text: "全部车间"
    };

    // 头部状态筛选栏 下拉选择框
    public stateOption: any = 0;
    public _stateOption: any = [{
        value: 0,
        label: '全部',
    },
        {
            value: 1,
            label: '停机中',
        },
        {
            value: 2,
            label: '生产中',
        }];

    public functionCode = 'workshop_machine';
    public functionCodeCreate = 'workshop_machine_create'
    public functionCodeView = 'workshop_machine_view'
    public functionCodeUpdate = 'workshop_machine_update'
    public id: string;
    public itemid: any;
    public totalItem: string;
    public data = {
        FUNCTION_CODE: this.functionCode
    };
    public alertMsg: any = [];

    // 表格数据模型
    public gridOptions: GridOptions;
    public gridBodyHeigt: number;

    // 分页组件
    RowState: RowState = new RowState('1', '15');
    public totalItems: string;
    public totalPages: number;
    public keyWords: string;
    // 当前行的数据
    public currentRowDate: any;

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
            }/*,
            {
                'name': '删除',
                'code': 'remove',
                'class': 'glyphicon-remove',
                'handleType': CommonHelper.HANDLE_TYPE.HANDLER,
                'handler': function ($event, rowData) {
                    console.log('删除' + rowData);
                }
            }*/
        ]
    }


    constructor(private workshopService: WorkshopManagementService) {
        this.gridOptions = <GridOptions>{};
        const self = this;
        this.gridOptions.columnDefs = [
            {headerName: "机台ID", field: "id", hide: true},
            {headerName: "机台编号", field: "no", width: 130},
            {headerName: "机台名称", field: "name", width: 150},
            {headerName: "机台规格", field: "norms", width: 150},
            {headerName: "机台型号", field: "model", width: 150},
            {headerName: "机台厂商", field: "firm_name", width: 150},
            {headerName: "机台分类", field: "category_text", width: 151},
            {headerName: "所在车间", field: "workshop_name", width: 151},
            {headerName: "购入时间", field: "buy_time", width: 201},
            {headerName: "机台IP", field: "ip", width: 101},
            {headerName: "功率", field: "power", width: 101},
            {headerName: "折旧年限", field: "useful_year", width: 201},
            {headerName: "出厂日期", field: "firm_time", width: 201},
            {headerName: "数釆编号", field: "collection_no", width: 101}
        ];

        this.gridOptions.enableColResize = true;
        this.gridOptions.suppressContextMenu = true;
        this.gridOptions.rowData = [];
        this.gridOptions.onGridReady = function (params) {
            self.gridOptions.api.sizeColumnsToFit();
        };

        this.gridOptions.rowData = [];
        // 高度自适应
        const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT;
        this.gridBodyHeigt = currentHeight;
        window.onresize = function () {
            self.gridOptions.api.sizeColumnsToFit();
            const _Height = document.body.clientHeight;
            self.gridBodyHeigt = _Height - HEADER_AND_FOOTER_HEIGHT;
        }

        // 订阅功能子项的选中事件
        workshopService.isUpdateSuccess.subscribe((tempData) => {
            console.log(self.gridOptions.rowData);
            if (tempData.type === 2) {
                // 修改操作
                if (tempData.flag) {
                    self.gridOptions.api.updateRowData({add: [tempData.data], addIndex: 0});
                    self.gridOptions.api.updateRowData({remove: [this.currentRowDate]});
                    this.workshopService.afterUpdateSuccess.emit(tempData.flag);
                    // 提示弹窗
                    self.alertMsg.push({
                        type: "success",
                        msg: "机台修改成功!",
                        timeout: 2000
                    });
                }
            } else if (tempData.type === 1) {
                // 新增操作
                self.gridOptions.api.updateRowData({add: [tempData.data], addIndex: 0});
                // 提示弹窗
                self.alertMsg.push({
                    type: "success",
                    msg: "机台添加成功!",
                    timeout: 2000
                });
            }
        })
        // 获取机台分类的options
        Observable.fromPromise(this.workshopService.getTopOptions()).subscribe(data => {
            this._workshopOption = data;
            this._workshopOption.unshift(this.defaultWorkshop);
        });
    }

    // 初始化主列表
    ngOnInit() {
        Observable.fromPromise(this.workshopService.getList(this.RowState.page, this.RowState.row)).subscribe(data => {
            // console.log(data);
            this.totalItems = data.total;
            this.gridOptions.api.sizeColumnsToFit();
            this.gridOptions.rowData = data.rows;
            this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
            this.gridOptions.api.setRowData(data.rows);
        });
    }

    // 获取分页的数据
    getPagesRows(event: RowState) {
        this.RowState = event;
        this.getlist();
    }

    // 行单击
    onRowClicked($event) {
    };

    onRowSelected($event) {
    };

    // 搜索程序
    _filter() {
        let end;
        let start;
        if (!this._startDate) {
            start = null
        } else {
            start = this.FormatDate(this._startDate);
        }
        if (!this._endDate) {
            end = null
        } else {
            end = this.FormatDate(this._endDate);
        }
        if (end || start || this.stateOption || this.workshopOption) {
            Observable.fromPromise(this.workshopService
                .getSList(this.RowState.page, this.RowState.row, start, end, this.workshopOption, this.stateOption))
                .subscribe(data => {
                    this.totalItems = data.total;
                    this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
                    this.gridOptions.api.setRowData(data.rows);
                });
        } else {
            this.getlist();
        }
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
        const itemid = event.data.id;
        const self = this;
        this.currentRowDate = event.data
        this.contextMenuConfig.isShow = true;
        this.contextMenuConfig.position.clientX = event.event.clientX - 50;
        this.contextMenuConfig.position.clientY = event.event.clientY - 60;
        this.contextMenuConfig.rowData = event.data;
        /*this.contextMenuConfig.menuItems[3].handler = function (rowData) {
            /!*Observable.fromPromise(self.workshopService.delete(itemid)).subscribe(data => {
                self.gridOptions.rowData.splice(self.contextMenuConfig.rowIndex, 1);
                self.gridOptions.api.setRowData(self.gridOptions.rowData);
                self.alertMsg.push({
                    type: "success",
                    msg: "删除成功!",
                    timeout: 2000
                });
                self.totalItems = Number(self.totalItems) - 1 + "";
            });*!/
        };*/
    }

    getlist(keywords?: string) {
        Observable.fromPromise(this.workshopService.getList(this.RowState.page, this.RowState.row, keywords)).subscribe(data => {
            this.totalItems = data.total;
            this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
            this.gridOptions.api.setRowData(data.rows);
            this.gridOptions.api.sizeColumnsToFit();
        });
    }

    // $event: rowData
    onContextItemClick($event) {
        // 监听子组件 右键菜单的 rowData 接受它
        this.id = $event.id;
        this.workshopService.rowData = $event;
    }

    // 头部日期范围选择控件代码
    _startValueChange = () => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endValueChange = () => {
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
    };
    _disabledStartDate = (startValue) => {
        if (!startValue || !this._endDate) {
            return false;
        }
        return startValue.getTime() >= this._endDate.getTime();
    };
    _disabledEndDate = (endValue) => {
        if (!endValue || !this._startDate) {
            return false;
        }
        return endValue.getTime() <= this._startDate.getTime();
    };

    // 时间格式化
    FormatDate(strTime) {
        const date = new Date(strTime)
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
}
