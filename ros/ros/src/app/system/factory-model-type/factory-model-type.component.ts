import { Component, OnInit } from '@angular/core';
import { CommonHelper, HEADER_AND_FOOTER_HEIGHT } from '../../utils/common.helper';
import { GridOptions } from 'ag-grid';
import { Observable } from 'rxjs';

import { FactoryModelTypeService } from "app/system/factory-model-type/factory-model-type.service";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";


@Component({
  selector: 'app-factory-model-type',
  templateUrl: './factory-model-type.component.html',
  styleUrls: ['./factory-model-type.component.scss']
})
export class FactoryModelTypeComponent implements OnInit {


  // 声明模块功能对应的code
  public functionCodeCreate = 'factory_model_type_create';
  public functionCodeView = 'factory_model_type_view';
  public functionCodeUpdate = 'factory_model_type_update';
  public id: string;
  public alertMsg: any = [];
 

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
      }
    ]
  }

  constructor(private factoryModelTypeService: FactoryModelTypeService) {
    this.gridOptions = <GridOptions>{};
    const self = this;
    this.gridOptions.columnDefs = [
      { headerName: "工厂模型类型编号", field: "no", width: 300 },
      { headerName: "工厂模型类型名称", field: "name", width: 300 },
      { headerName: "创建人", field: "creator", width: 300 },
      { headerName: "创建时间", field: "create_time", width: 300 }
    ];

    this.gridOptions.suppressContextMenu = true;
    this.gridOptions.rowData = [];
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

  ngOnInit() {

    // 初始化主列表
    Observable.fromPromise(this.factoryModelTypeService.getFactoryModelTypeList(this.RowState.page, this.RowState.row)).subscribe(data => {

      console.log(data)
      this.totalItems = data.total;
      this.gridOptions.rowData = data.rows;
      this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
      this.gridOptions.api.setRowData(data.rows);
    });

    // 修改成功
    this.factoryModelTypeService.isUpdateSuccess.subscribe((updateData) => {

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
        this.factoryModelTypeService.afterUpdateSuccess.emit(updateData.flag);
      }
    });

    // 新增成功的数据
    this.factoryModelTypeService.isCreateSuccess.subscribe((createData) => {

      const self = this;
      if (createData.flag) {
        
        self.gridOptions.rowData.unshift(createData.data);
        self.gridOptions.api.setRowData(self.gridOptions.rowData);
        this.alertMsg = [{
          type: 'success',
          msg: '新增成功',
          timeout: 2000
        }];
        this.factoryModelTypeService.afterCreateSuccess.emit(createData.flag);
      }
    });
  }

  // 赋值当前索引
  onCellFocused($event) {
    this.contextMenuConfig.isShow = false;
    this.contextMenuConfig.rowIndex = $event.rowIndex;
  }

  // 行点击
  onRowClicked(event) {

  };

  // 搜索程序
    filter() {
        if (this.keyWords) {
            Observable.fromPromise(this.factoryModelTypeService.Search(this.RowState.page, this.RowState.row, this.keyWords)).subscribe(data => {
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

  // 右键点击事件
  onCellContextMenu(event) {

    const itemid = event.data.id;
    const self = this;
    this.contextMenuConfig.isShow = true;
    this.contextMenuConfig.position.clientX = event.event.clientX;
    this.contextMenuConfig.position.clientY = event.event.clientY;
    this.contextMenuConfig.rowData = event.data;
    this.contextMenuConfig.rowData.rowIndex = this.contextMenuConfig.rowIndex;

    this.contextMenuConfig.menuItems[3].handler = function (rowData) {

      Observable.fromPromise(self.factoryModelTypeService.delete(itemid)).subscribe(data => {
        self.gridOptions.rowData.splice(self.contextMenuConfig.rowIndex, 1);
        self.gridOptions.api.setRowData(self.gridOptions.rowData);
        self.alertMsg.push({
          type: "success",
          msg: "删除成功!",
          timeout: 2000
        });
        self.totalItems = Number(self.totalItems) - 1 + "";
      });
    };
  };

  // 阻止右键浏览器默认事件
  onContextClick(event) {

    return false;
  }

  // 获取分页的数据
  getPagesRows(event: RowState) {
    this.RowState = event;
    this.getlist();
  }

  getlist() {
    Observable.fromPromise(this.factoryModelTypeService.getFactoryModelTypeList(this.RowState.page, this.RowState.row)).subscribe(data => {
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
    this.factoryModelTypeService.rowData = $event;
  }
}
