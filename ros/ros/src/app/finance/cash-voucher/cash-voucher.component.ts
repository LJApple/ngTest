import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";
import { GridOptions } from 'ag-grid';
import { Observable } from 'rxjs';
import { CommonHelper, HEADER_AND_FOOTER_HEIGHT } from '../../utils/common.helper';
import { CashVoucherService } from "app/finance/cash-voucher/cash-voucher.service";
import 'ag-grid-enterprise/main';

@Component({
  selector: 'app-cash-voucher',
  templateUrl: './cash-voucher.component.html',
  styleUrls: ['./cash-voucher.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CashVoucherComponent implements OnInit {

  // 声明模块功能对应的code
  public functionCode: string = 'cashVoucher';
  public functionCodeCreate = 'cashVoucher_create'
  public functionCodeView = 'cashVoucher_view'
  public functionCodeUpdate = 'cashVoucher_update'
  public id: string;
  public itemid: any;
  public totalItem: string;
  public oldRowDate: any;
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

  constructor(private cashVoucherService: CashVoucherService) {
    this.gridOptions = <GridOptions>{};
    const self = this;
    this.gridOptions.columnDefs = [
      {
        headerName: '',
        width: 50,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        suppressSorting: true,
        suppressMenu: true,
      },
      { headerName: "日期", field: "name", width: 100 },
      { headerName: "对方户名", field: "description", width: 100 },
      { headerName: "结算方式", field: "creator", width: 100 },
      { headerName: "摘要", field: "create_time", width: 100 },
      { headerName: "币种", field: "status", width: 100 },
      {
        headerName: '发生额',
        children: [
          {
            headerName: "收入",
            field: "nae",
            width: 80,
          },
          {
            headerName: "支出",
            field: "country",
            width: 80,
          }
        ]
      },
      { headerName: "余额（本位币）", field: "name", width: 100 },
      { headerName: "现金流量项目", field: "description", width: 100 },
      { headerName: "部门", field: "creator", width: 100 },
      { headerName: "备注", field: "create_time", width: 100 },
      { headerName: "状态", field: "status", width: 100 },
      { headerName: "会计凭证号", field: "statuds", width: 100 },
    ];
    this.gridOptions.enableColResize = true;
    this.gridOptions.suppressContextMenu = true;
    this.gridOptions.onGridReady = function (params) {
      self.gridOptions.api.sizeColumnsToFit();
    };
    this.gridOptions.rowData = [{ id: 111 }];
    // 高度自适应
    const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT - 160;
    this.gridBodyHeigt = currentHeight;
    window.onresize = function () {
      self.gridOptions.api.sizeColumnsToFit();
      const currentHeight = document.body.clientHeight;
      self.gridBodyHeigt = currentHeight - HEADER_AND_FOOTER_HEIGHT - 160;
    }

  }

  ngOnInit() {
  }

  // 搜索程序
  filter() {
    if (this.keyWords) {
      Observable.fromPromise(this.cashVoucherService.search(this.RowState.page, this.RowState.row, this.keyWords)).subscribe(data => {
        this.totalItems = data.total;
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
        this.gridOptions.api.setRowData(data.data);
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
    this.getlist(this.keyWords);
  }

  // 获取分页的数据
  getPagesRows(event: RowState) {
    this.RowState = event;
    this.getlist(this.keyWords);
  }

  // 阻止右键浏览器默认事件
  onContextClick(event) {
    return false;
  };


  onCellFocused(event) {

    this.contextMenuConfig.isShow = false;
    this.contextMenuConfig.rowIndex = event.rowIndex;
  };

  // 右键菜单配置
  onCellContextMenu(event) {
    console.log(event);
    const itemid = event.data.id;
    this.oldRowDate = event.data;
    const self = this;
    this.contextMenuConfig.isShow = true;
    this.contextMenuConfig.position.clientX = event.event.clientX;
    this.contextMenuConfig.position.clientY = event.event.clientY;
    this.contextMenuConfig.rowData = event.data;
    this.contextMenuConfig.rowData.rowIndex = this.contextMenuConfig.rowIndex;
    this.contextMenuConfig.menuItems[3].handler = function (rowData) {
      Observable.fromPromise(self.cashVoucherService.delete(itemid)).subscribe(data => {
        self.gridOptions.api.updateRowData({ remove: [rowData] });
        self.alertMsg.push({
          type: "success",
          msg: "删除成功!",
          timeout: 2000
        });
        self.totalItems = Number(self.totalItems) - 1 + "";
      });
    };
  }

  getlist(keywords?: string) {
    Observable.fromPromise(this.cashVoucherService.getCashVoucherList(this.RowState.page, this.RowState.row, keywords))
      .subscribe(data => {
        this.totalItems = data.total;
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
        this.gridOptions.api.setRowData(data.data);
        this.gridOptions.api.sizeColumnsToFit();
      });
  }

  // $event: rowData
  onContextItemClick($event) {
    // 监听子组件 右键菜单的 rowData 接受它
    this.id = $event.id;
    this.cashVoucherService.rowData = $event;
  }

}
