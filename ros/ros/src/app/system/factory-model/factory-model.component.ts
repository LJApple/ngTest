import { Component, OnInit } from '@angular/core';
import { CommonHelper, HEADER_AND_FOOTER_HEIGHT } from '../../utils/common.helper';
import { GridOptions } from 'ag-grid';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { FactoryModelService } from "app/system/factory-model/factory-model.service";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
    selector: 'app-factory-model',
    templateUrl: './factory-model.component.html',
    styleUrls: ['./factory-model.component.scss']
})
export class FactoryModelComponent implements OnInit {

    // 声明模块功能对应的code
    public functionCodeCreate = 'factory_model_create';
    public functionCodeView = 'factory_model_view';
    public functionCodeUpdate = 'factory_model_update';
    public id: string;
    public alertMsg: any = [];
    public currentRowDate;
    // 表格数据模型
    public gridOptions: GridOptions;
    public gridBodyHeigt: number;

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
            },
            {
                'name': '启用',
                'code': 'start',
                'class': 'glyphicon-open',
                'handleType': CommonHelper.HANDLE_TYPE.HANDLER,
                'handler': function ($event, rowData) {
                    console.log('启用' + rowData);
                }
            },
            {
                'name': '停用',
                'code': 'stop',
                'class': 'glyphicon-open',
                'handleType': CommonHelper.HANDLE_TYPE.HANDLER,
                'handler': function ($event, rowData) {
                    console.log('停用' + rowData);
                }
            }
        ]
    };

    constructor(private factoryModelService: FactoryModelService) {

        this.gridOptions = <GridOptions>{};
        const self = this;
        this.gridOptions.suppressContextMenu = true;
        this.gridOptions.debug = true,
            this.gridOptions.getNodeChildDetails = this.getNodeChildDetails;

        this.gridOptions.autoGroupColumnDef = {
            headerName: "Athlete",
            field: "athlete",
            width: 200
        }
        this.gridOptions.columnDefs =
            [
                {
                    headerName: "模型编号", field: 'no', width: 100, cellStyle: function (params) {
                  
                        if (params.data.status == 0) {
                            return { color: '#b0b0b0'};
                        } else {
                            return null;
                        }
                    }
                },
                { headerName: "模型名称", field: "name", cellRenderer: 'group', width: 300 ,cellStyle: function (params) {
                  
                        if (params.data.status == 0) {
                            return { color: '#b0b0b0'};
                        } else {
                            return null;
                        }
                    } },
                { headerName: "模型类型名称", field: "factory_model_type_name", width: 200 , cellStyle: function (params) {
                  
                        if (params.data.status == 0) {
                            return { color: '#b0b0b0'};
                        } else {
                            return null;
                        }
                    }},
                { headerName: "是否应用", field: "show_status", width: 200, cellStyle: function (params) {
                  
                        if (params.data.status == 0) {
                            return { color: '#b0b0b0'};
                        } else {
                            return null;
                        }
                    } },
                { headerName: "操作人", field: "show_updator", width: 200 , cellStyle: function (params) {
                  
                        if (params.data.status == 0) {
                            return { color: '#b0b0b0'};
                        } else {
                            return null;
                        }
                    }},
                { headerName: "操作时间", field: "update_time", width: 200, cellStyle: function (params) {
                  
                        if (params.data.status == 0) {
                            return { color: '#b0b0b0'};
                        } else {
                            return null;
                        }
                    } }
            ];

        this.gridOptions.rowData = [
            /* {
                   id: '1', no: 'Group B', name: 'name', year: '2000..2012', country: 'Group Country', parent_id:'sdss'
               },
   
               {
                   id: '1', no: 'B.2', name: 'Missy Franklin ', year: '2012', country: 'United States', participants: [
                       {
                           id: '1', no: 'B.1', name: 'Natalie Coughlin', year: '2008', country: 'United States', participants: [
                               { id: '1', no: 'B.1', name: 'Natalie Coughlin', year: '2008', country: 'United States', },
   
                               { id: '1', no: 'B.2', name: 'Missy Franklin ', year: '2012', country: 'United States' },
                               { id: '1', no: 'B.3', name: 'Ole Einar Qjorndalen', year: '2002', country: 'Norway' },
                               { id: '1', no: 'B.4', name: 'Marit Bjorgen', year: '2010', country: 'Norway' },
                               { id: '1', no: 'B.5', name: 'Ian Thorpe', year: '2000', country: 'Australia' }
                           ]
                       },
                       { id: '1', no: 'B.3', name: 'Ole Einar Qjorndalen', year: '2002', country: 'Norway' },
                       { id: '1', no: 'B.4', name: 'Marit Bjorgen', year: '2010', country: 'Norway' },
                       { id: '1', no: 'B.5', name: 'Ian Thorpe', year: '2000', country: 'Australia' }
                   ]
               }, 
     */
        ];

        this.gridOptions.enableColResize = true;
        this.gridOptions.onGridReady = function (params) {
            self.gridOptions.api.sizeColumnsToFit();
        };

        // 高度自适应
        const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT;
        this.gridBodyHeigt = currentHeight;
        window.onresize = function () {
            self.gridOptions.api.sizeColumnsToFit();
            const currentHeight = document.body.clientHeight;
            self.gridBodyHeigt = currentHeight - HEADER_AND_FOOTER_HEIGHT;
        }


    }

    getNodeChildDetails(rowItem) {

        if (rowItem.participants) {
            return {
                group: true,
                expanded: true,
                field: 'name',
                children: rowItem.participants,
                key: rowItem.name
            };
        } else {
            return null;
        }
    };

    ngOnInit() {

        // 初始化主列表
        Observable.fromPromise(this.factoryModelService.getFactoryModelList(this.RowState.page, this.RowState.row)).subscribe(data => {

            this.totalItems = data.total;
            this.gridOptions.rowData = data.rows;
            this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
            this.gridOptions.api.setRowData(data.rows);
        });

        // 修改成功
        this.factoryModelService.isUpdateSuccess.subscribe((updateData) => {

            const self = this;
            if (updateData.flag) {
                self.gridOptions.rowData.splice(self.contextMenuConfig.rowIndex, 1);
                self.gridOptions.rowData.unshift(updateData.data);
                self.gridOptions.api.setRowData(self.gridOptions.rowData);

                this.alertMsg = [{
                    type: 'success',
                    msg: '修改成功',
                    timeout: 2000
                }];
                this.factoryModelService.afterUpdateSuccess.emit(updateData.flag);
            }
        });

        // 新增成功的数据
        this.factoryModelService.isCreateSuccess.subscribe((createData) => {

            const self = this;
            if (createData.flag) {

                self.gridOptions.rowData.unshift(createData.data);
                self.gridOptions.api.setRowData(self.gridOptions.rowData);
                this.alertMsg = [{
                    type: 'success',
                    msg: '新增成功',
                    timeout: 2000
                }];
                this.factoryModelService.afterCreateSuccess.emit(createData.flag);
            }
        });

    };


    // 赋值当前索引
    onCellFocused($event) {
        this.contextMenuConfig.isShow = false;
        this.contextMenuConfig.rowIndex = $event.rowIndex;
    }

    // 右键点击事件
    onCellContextMenu(event) {

        const itemid = event.data.id;
        const self = this;
        this.contextMenuConfig.isShow = true;
        this.contextMenuConfig.position.clientX = event.event.clientX;
        this.contextMenuConfig.position.clientY = event.event.clientY;
        this.contextMenuConfig.rowData = event.data;
        this.currentRowDate = event.data
        this.contextMenuConfig.rowData.rowIndex = this.contextMenuConfig.rowIndex;
        let removeRowId = self.contextMenuConfig.rowData.id;

        this.contextMenuConfig.menuItems[3].handler = function (rowData) {

            Observable.fromPromise(self.factoryModelService.delete(itemid)).subscribe(data => {

                // 移除嵌套数组数据
                let arr = self.gridOptions.rowData;
                self.removeDate(arr, removeRowId);
                self.gridOptions.api.setRowData(arr);

                self.alertMsg.push({
                    type: "success",
                    msg: "删除成功!",
                    timeout: 2000
                });
                self.totalItems = Number(self.totalItems) - 1 + "";
            });
        };

        // 启用
        this.contextMenuConfig.menuItems[4].handler = function (rowData) {

            Observable.fromPromise(self.factoryModelService.factoryModelUpdata(itemid, 1)).subscribe(data => {

                if (data.result.success == 1) {

                    let arr = self.gridOptions.rowData;
                    self.startStatusDate(arr, removeRowId);

                    self.gridOptions.api.setRowData(arr);

                    self.alertMsg.push({
                        type: "success",
                        msg: "启用成功!",
                        timeout: 2000
                    });
                }
            });
        };

        // 停用
        this.contextMenuConfig.menuItems[5].handler = function (rowData) {

            Observable.fromPromise(self.factoryModelService.factoryModelUpdata(itemid, 0)).subscribe(data => {

                if (data.result.success == 1) {

                    let arr = self.gridOptions.rowData;
                    self.stopStatusDate(arr, removeRowId);
                    self.gridOptions.api.setRowData(arr);

                    self.alertMsg.push({
                        type: "success",
                        msg: "停用成功!",
                        timeout: 2000
                    });
                }
            });
        };
    };

    onRowClicked(event) {

    };

    // 删除
    removeDate(arr, tag) {
        const self = this;
        for (let i = arr.length; i > 0; i--) {
            if (arr[i - 1].id == tag) {
                arr.splice(i - 1, 1);

            } else {
                if (arr[i - 1].participants) {
                    self.removeDate(arr[i - 1].participants, tag)
                }
            }
        }
    };

    // 启用
    startStatusDate(arr, tag) {
        const self = this;
        for (let i = arr.length; i > 0; i--) {
            if (arr[i - 1].id == tag) {
                arr[i - 1].status = '1';
                arr[i - 1].show_status = '启用';
            } else {
                if (arr[i - 1].participants) {
                    self.startStatusDate(arr[i - 1].participants, tag)
                }
            }
        }
    };

    // 停用
    stopStatusDate(arr, tag) {
        const self = this;
        for (let i = arr.length; i > 0; i--) {
            if (arr[i - 1].id == tag) {
                arr[i - 1].status = '0';
                arr[i - 1].show_status = '停用';
            } else {
                if (arr[i - 1].participants) {
                    self.stopStatusDate(arr[i - 1].participants, tag)
                }
            }
        }
    };

    // 搜索程序
    filter() {
        if (this.keyWords) {
            Observable.fromPromise(this.factoryModelService.Search(this.RowState.page, this.RowState.row, this.keyWords)).subscribe(data => {
                this.totalItems = data.total;
                this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
                this.gridOptions.api.setRowData(data.rows);
                this.gridOptions.api.sizeColumnsToFit();
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
        console.log(this.keyWords);
        if (!this.keyWords) {
            this.getlist();
        }
    }

    // 获取分页的数据
    getPagesRows(event: RowState) {
        this.RowState = event;
        this.getlist();
    }

    // 阻止右键浏览器默认事件
    onContextClick(event) {

        return false;
    }

    getlist() {
        Observable.fromPromise(this.factoryModelService.getFactoryModelList(this.RowState.page, this.RowState.row)).subscribe(data => {

            this.totalItems = data.total;
            this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
            this.gridOptions.api.setRowData(data.rows);
            this.gridOptions.api.sizeColumnsToFit();
        });
    };

    // 监听子组件 右键菜单的 rowData 接受它
    onContextItemClick($event) {
        // 监听子组件 右键菜单的 rowData 接受它
        this.id = $event.id;
        this.factoryModelService.rowData = $event;
    };

}
