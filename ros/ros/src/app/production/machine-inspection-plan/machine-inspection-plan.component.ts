import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {CommonHelper, HEADER_AND_FOOTER_HEIGHT} from '../../utils/common.helper';
import {GridOptions} from 'ag-grid';
import {FunctionUnitService} from '../../admin/function-unit/function-unit.service';
import {Observable} from 'rxjs';
import {MachineInspectionPlanService} from './machine-inspection-plan.service';
import {MachineInspectionUpdateComponent} from './machine-inspection-update/machine-inspection-update.component';
import {FormControl} from '@angular/forms';
import {MachineInspectionViewService} from './machine-inspection-view/machine-inspection-view.service';
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
  selector: 'app-machine-inspection-plan',
  templateUrl: './machine-inspection-plan.component.html',
  styleUrls: ['./machine-inspection-plan.component.scss']
})
export class MachineInspectionPlanComponent implements OnInit, AfterViewInit {

    public FUNCTION_CODE: string = 'machine_check';
    public functionCodeCreate: string = 'machine_inspection_create';
    public searchValue: FormControl = new FormControl();
    public gridOptions: GridOptions;
    public gridBodyHeigt: number;
    public functionData: string = 'machine_inspection_create';
    public functionViewData:string = 'machine_inspection_view';
    public reSearch: boolean;
    public totalItems: string;
    public totalPages: number;
    RowState: RowState = new RowState('1', '15');
    public alertMessage2: any;

    // 右键菜单配置
    public contextMenuConfig = {
        isShow: true,
        position: {
            clientX: 0,
            clientY: 0
        },
        rowIndex: null,
        rowData: null,
        menuItems: [
            {
                'name': '新增',
                'code': 'create',
                'class': 'glyphicon glyphicon-plus',
                'functionCode': 'machine_inspection_create',
                'handleType': CommonHelper.HANDLE_TYPE.TAB,
                'handler': function (rowData) {
                }
            },
            {
                'name': '编辑',
                'code': 'update',
                'class': 'glyphicon glyphicon-pencil',
                'functionCode': 'machine_inspection_update',
                'handleType': CommonHelper.HANDLE_TYPE.TAB,
                'handler': function (rowData) {
                }
            },
            {
                'name': '查看',
                'code': 'view',
                'class': 'glyphicon glyphicon-eye-open',
                'functionCode': 'machine_inspection_view',
                'handleType': CommonHelper.HANDLE_TYPE.TAB,
                'handler': function (rowData) {
                }
            },
            {
                'name': '删除',
                'code': 'remove',
                'class': 'glyphicon glyphicon-trash',
                'handleType': CommonHelper.HANDLE_TYPE.HANDLER,
                'handler': function (rowData) {
                }
            }
        ]
    };

    constructor(/*private functionUnitService: FunctionUnitService, */
                private machineInspectionViewService: MachineInspectionViewService,
                private machineInspectionPlanService: MachineInspectionPlanService) {

        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = [
            {headerName: "点检计划编号", field: "no", width: 200},
            {headerName: "机台编号", field: "machine_no", width: 200},
            {headerName: "机台名称", field: "machine_name", width: 200},
            {headerName: "机台类型", field: "machine_category_name", width: 201},
            {headerName: "点检项目", field: "content", width: 201},
            {headerName: "点检周期(次/天)", field: "period", width: 201},
            {headerName: "操作时间", field: "update_time", width: 201},
        ];
        this.gridOptions.rowData = [];
        this.gridOptions.enableColResize = true;
        this.gridOptions.suppressContextMenu = true;
        this.gridOptions.onGridReady = function (params) {
            console.log(params);
            //params.api.sizeColumnsToFit();
        };

        // 定义grid表格以字段id为索引进行获取下标
        this.gridOptions.getRowNodeId = function (data) {
            return data.id;
        };

        const self = this;
        const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT;
        this.gridBodyHeigt = currentHeight;
        window.onresize = function () {
            const currentHeight = document.body.clientHeight;
            self.gridBodyHeigt = currentHeight - HEADER_AND_FOOTER_HEIGHT;
            self.gridOptions.api.sizeColumnsToFit();
        };

        // 订阅功能子项的选中事件------修改成功
        machineInspectionPlanService.isUpdateSuccess.subscribe((updateData) => {
            const self = this;
            if (updateData.flag) {
                // 获取id对应的所在行  (该代码暂时保留)
                // let node = this.gridOptions.api.getRowNode(updateData.data.id);
                //
                // this.gridOptions.api.updateRowData({
                //     update: [updateData.data]
                // });

                self.gridOptions.rowData.splice(self.contextMenuConfig.rowIndex, 1);
                self.gridOptions.rowData.unshift(updateData.data);
                self.gridOptions.api.setRowData(self.gridOptions.rowData);

                this.alertMessage2 = [{
                    type: 'success',
                    msg: '修改成功',
                    timeout: 2000
                }];
                this.machineInspectionPlanService.afterUpdateSuccess.emit(updateData.flag);
            }
        });

        // 订阅功能子项的选中事件------新增成功
        machineInspectionPlanService.isCreateSuccess.subscribe((createData) => {
            const self = this;
            if (createData.flag) {
                console.log(self.gridOptions.rowData);
                console.log(createData);
                self.gridOptions.rowData.unshift(createData.data);
                self.gridOptions.api.setRowData(self.gridOptions.rowData);
                this.alertMessage2 = [{
                    type: 'success',
                    msg: '新增成功',
                    timeout: 2000
                }];
                this.machineInspectionPlanService.afterCreateSuccess.emit(createData.flag);
            }
        });
    }

    ngOnInit() {
        this.contextMenuConfig.isShow = false;
    }

    ngAfterViewInit () {

    }

    // 分页请求 MASTERLIST 接口公共方法
    getPagesRows (event: RowState) {
        const self = this;
        this.RowState = event;
        let data = {
            FUNCTION_CODE: this.FUNCTION_CODE,
            page: this.RowState.page,
            rows: this.RowState.row
        };

        this.getMasterListData(data);
    }

    getMasterListData (data) {
        const self = this;
        Observable.fromPromise(this.machineInspectionPlanService.getMachineInspectionListData(data)).subscribe(data => {
            console.log(data.rows);
            // 渲染整个列表数据
            self.totalItems = data.total;
            self.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
            self.gridOptions.rowData = data.rows;
            self.gridOptions.api.setRowData(data.rows);

        });
    }

    // 新增事件 跳转到  【新增】模块
    /*addMachineInspectionFn ($event) {
        this.functionUnitService.onFunctionSelect.emit(this.functionData);
    };*/

    // 双击查看该行数据
    onCellDoubleClicked ($event) {
         console.log($event);
        // this.machineInspectionViewService.sendDataToView = $event.data;
        // this.functionUnitService.onFunctionSelect.emit(this.functionViewData);
    }

    // 搜索查询事件
    searchClick () {
        // console.log(this.searchValue.value);
        const self = this;
        let data = {
            FUNCTION_CODE: self.FUNCTION_CODE,
            page: self.RowState.page,
            rows: self.RowState.row,
            no: self.searchValue.value
        };

        if (this.reSearch) {
            this.getMasterListData(data);
        }else{
            this.alertMessage2 = [{
                type: 'danger',
                msg: '请输入关键字进行过滤',
                timeout: 2000
            }];
        }
        this.reSearch = false;


    }

    // input change事件
    valueIsChange (event): any {
        if (event) {
            this.reSearch = true;
        }
    };

    // 行 单击
    onRowClicked($event) {
    };

    onRowSelected($event) {};

    // 阻止右键浏览器默认事件
    onContextClick (event) {
        return false;
    };

    // aggrid右键事件
    onCellContextMenu(event) {
        console.log(event);
        const self = this;
        this.contextMenuConfig.isShow = true;
        this.contextMenuConfig.position.clientX = event.event.clientX;
        this.contextMenuConfig.position.clientY = event.event.clientY;
        this.contextMenuConfig.rowData = event.data;
        this.contextMenuConfig.rowIndex = event.node.rowIndex;

        // 获取到当前删除按钮的handler事件
        this.contextMenuConfig['menuItems'][3]['handler'] = function (rowData) {
            let url = 'production/MachineCheck/Delete/id/' + rowData.id + '/function_code/machine_check';
            Observable.fromPromise(self.machineInspectionPlanService.deleteFormData(url)).subscribe(data => {
                if (data.result.success) {
                    self.alertMessage2 = [{
                        type: 'success',
                        msg: '删除成功',
                        timeout: 2000
                    }];
                    let node = self.gridOptions.api.getRowNode(rowData.id);
                    self.gridOptions.api.updateRowData({
                        remove: [node.data]
                    });
                }
            });
        };

        // 获取到当前查看按钮的handler事件
        this.contextMenuConfig['menuItems'][2]['handler'] = function (rowData) {
            self.machineInspectionViewService.sendDataToView = rowData;
        }
    };

    onCellFocused($event) {
        this.contextMenuConfig.isShow = false;
    }

    // $event: rowData
    onContextItemClick ($event) {
        // 监听子组件 右键菜单的 rowData 接受它
        this.machineInspectionPlanService.rowData = $event;
    }

}
