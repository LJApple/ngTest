import { FunctionUnitComponent } from './../../admin/function-unit/function-unit.component';
import { FilterBarComponent } from './../../admin/widgets/filter-bar/filter-bar.component';
import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";
import { ProductionDemandService } from "app/production/production-demand/production-demand.service";
import { CommonHelper, HEADER_AND_FOOTER_HEIGHT } from '../../utils/common.helper';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
@Component({
  selector: 'app-production-demand',
  templateUrl: './production-demand.component.html',
  styleUrls: ['./production-demand.component.scss']
})
export class ProductionDemandComponent implements OnInit {
  // 声明模块功能对应的code
  public productionCodeCreate = "production_model_type_create";
  public productionCodeUpdate = "production_model_type_update";
  public productionCodeeView = "production_model_type_view";
  // 设置radio默认选中项
  radioValue = 'oddNumbersArray';
  public id: string;
  public alertMsg: any = [];
  // select
  options = [];
  test = 1;
  selectedOption;


  // 表格数据模型
  public gridOptions: GridOptions;
  public gridBodyHeight: number;

  // 分页组件
  RowState: RowState = new RowState('1', '15');
  public totalItems: string;
  public totalPages: number;
  // input绑定
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
        'functionCode': this.productionCodeCreate,
        'handleType': CommonHelper.HANDLE_TYPE.TAB,
        'handler': function (rowData) {
          console.log(rowData);
        }
      },
      {
        'name': '编辑',
        'code': 'update',
        'class': 'glyphicon-pencil',
        'functionCode': this.productionCodeUpdate,
        'handleType': CommonHelper.HANDLE_TYPE.TAB,
        'handler': function (rowData) {
          console.log('编辑' + rowData);
        }
      },
      {
        'name': '查看',
        'code': 'view',
        'class': 'glyphicon-eye-open',
        'functionCode': this.productionCodeeView,
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
  // 阻止右键浏览器默认事件
  onContextClick(event) {

    return false;
  }

  constructor(private ProductionDemandService: ProductionDemandService) {
    /*****************************************************表格事件开始*********************************************************************/
    this.gridOptions = <GridOptions>{};
    const self = this;
    // 表头定义
    this.gridOptions.columnDefs = [
      { headerName: "", field: "check", width: 300 },
      { headerName: "工厂类型编号", field: "no", width: 300 },
      { headerName: "工厂名称", field: "name", width: 300 },
      { headerName: "创建人", field: "creator", width: 300 },
      { headerName: "创建时间", field: "create_time", width: 300 }
    ];
    // 表格右键事件
    this.gridOptions.suppressContextMenu = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.rowData = [];
    this.gridOptions.onGridReady = function () {
      self.gridOptions.api.sizeColumnsToFit();
    }

    const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT;
    self.gridBodyHeight = currentHeight;
    window.onresize = function () {
      self.gridOptions.api.sizeColumnsToFit();
      const current_hight = document.body.clientHeight;
      self.gridBodyHeight = current_hight - HEADER_AND_FOOTER_HEIGHT;
    }
  }
  /**
   * 组织右键默认事件
   */
  getPagesRows(event: RowState) {
    this.RowState = event;
    this.getlist();
  }
  /**
   *  赋值当前索引
   */
  onCellFocused($event) {
    this.contextMenuConfig.isShow = false;
    this.contextMenuConfig.rowIndex = $event.rowIndex;
  }
  /**
   * 行点击事件
   */
  onRowClicked(event) {

  };
  ngOnInit() {
    const self = this;
    // 表格列表加载
    Observable.fromPromise(this.ProductionDemandService
      .getProductionDemandList(this.RowState.page, this.RowState.row))
      .subscribe(data => {
        console.log(data.rows);
        this.totalItems = data.total;
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
        this.gridOptions.api.setRowData(data.rows);
      });
    
    this.ProductionDemandService.isCreateSuccess.subscribe((createData) => {
      if (createData.flag) {
        this.getlist();
      }
    });
    this.ProductionDemandService.isUpdateSuccess.subscribe((upData) => {
      if (upData.flag) {
        this.getlist();
        this.alertMsg = [{
          type: 'success',
          msg: '修改成功',
          timeout: 2000
        }];
        this.ProductionDemandService.afterUpdateSuccess.emit(upData.flag);
      }
    });
    this.searchTable();


    this.options = [
      { value: 'all', label: '全部' },
      { value: 'sale_order', label: '销售订单' },
      { value: 'reserve_bank', label: '补存库' },
      { value: 'outsourcing_order', label: '委外订单' },
      { value: 'purchase_order', label: '采购订单' },
      { value: 'oder_for_goods', label: '备货订单' },
      { value: 'OEM_order', label: '代工订单' },
    ];
    this.selectedOption = this.options[0];
  }
  /**
   * 获取分页数据
   */
  initList() {
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
    console.log(self.gridOptions.rowData);
    this.contextMenuConfig.rowData.rowIndex = this.contextMenuConfig.rowIndex;
    // 删除行数据
    this.contextMenuConfig.menuItems[3].handler = function (rowData) {

      Observable.fromPromise(self.ProductionDemandService.deletRow(itemid)).subscribe(data => {
        self.getlist();
        self.alertMsg.push({
          type: "success",
          msg: "删除成功!",
          timeout: 2000
        });
      });
    };
  };
  onContextItemClick($event) {
    // 监听子组件 右键菜单的 rowData 接受它
    this.id = $event.id;
    this.ProductionDemandService.rowData = $event;
  }
  /*****************************************************表格事件结束*********************************************************************/
  getlist() {
    Observable.fromPromise(this.ProductionDemandService
      .getProductionDemandList(this.RowState.page, this.RowState.row))
      .subscribe(data => {
        this.reloadTable(data)
      });
  };
  // 重新加载表格数据
  reloadTable(data) {
    this.totalItems = data.total;
    this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
    this.gridOptions.api.setRowData(data.rows);
    this.gridOptions.api.sizeColumnsToFit();
  }
  /**
   * 表格模糊查询
   */
  filter() {
    if (this.keyWords) {
      console.log(this.RowState.page + ":" + this.RowState.row + ":" + this.keyWords);
      Observable.fromPromise(this.ProductionDemandService.searchDetail(this.RowState.page, this.RowState.row, this.keyWords)).subscribe(data => {
        this.reloadTable(data);
      });

    } else {
      this.getlist();
      // this.alertMsg.push({
      //   type: "warning",
      //   msg: "请输入产品代码/源单号搜索",
      //   timeout: 2000
      // });
    }
  }
  // radio选中是数据事件
  searchTable() {
    var radioValue = this.radioValue;
    if (radioValue == "oddNumbersArray") {
      Observable.fromPromise(this.ProductionDemandService.getProductionDemandList(this.RowState.page, this.RowState.row)).subscribe(data => {
        this.reloadTable(data);
      });
    } else {
      Observable.fromPromise(this.ProductionDemandService.searchDetail(this.RowState.page, this.RowState.row, this.keyWords)).subscribe(data => {
        this.reloadTable(data);
      });
    }
  }
}


