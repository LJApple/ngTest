import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { HEADER_AND_FOOTER_HEIGHT } from "app/utils/common.helper";
import { MasterGridComponent } from "app/admin/master-grid/master-grid.component";
import { CombogridButtonComponent } from 'app/admin/widgets/combogrid-button/combogrid-button.component';
import { GridCombogridService } from 'app/procedure/create-procedure-management/procedure-station-grid/grid-combogrid/grid-combogrid.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { ProcedureManagementService } from "app/procedure/procedure-management/procedure-management.service";
import { ViewProcedureManagementService } from "app/procedure/view-procedure-management/view-procedure-management.service";
import { UpdateProcedureManagementService } from "app/procedure/update-procedure-management/update-procedure-management.service";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
  selector: 'app-procedure-station-grid-update',
  templateUrl: './procedure-station-grid-update.component.html',
  styleUrls: ['./procedure-station-grid-update.component.scss']
})
export class ProcedureStationGridUpdateComponent implements OnInit {

  public gridOptions: GridOptions;
  public rowdata: any;
  private isToCreate: boolean;
  public flag: boolean; // 是否成功
  public alertMsg: any = [];
  public createData: any;
  public type: number = 1;

  // 分页组件
  RowState: RowState = new RowState('1', '15');
  public gridBodyHeigt: number;
  public totalItems: string;
  public totalPages: number;
  public itemId: string = '867228';


  constructor(private gridCombogridService: GridCombogridService,
    private viewProcedureManagementService: ViewProcedureManagementService,
    private updateProcedureManagementService: UpdateProcedureManagementService) {

    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: "",
        width: 100,
        maxWidth: 100,
        checkboxSelection: function (params) {

          if (params.data.id) {
            return false;
          } else {
            return true
          }
        },
        suppressSorting: true,
        suppressMenu: true,
        suppressResize: true
      },
      { headerName: "id", field: "id", width: 50, hide: true },
      { headerName: "index", field: "index", width: 50, hide: true },
      {
        headerName: "关联工位", field: "name", width: 208,
        // cellRendererFramework:CombogridButtonComponent,
      },
    ];

    this.gridOptions.rowData = [{ id: '44', no: '1', name: '5666326' }];
    this.gridOptions.enableColResize = true;
    this.gridOptions.suppressContextMenu = true;
    this.gridOptions.onGridReady = function (params) {
      params.api.sizeColumnsToFit();
    };

    //  列表初始化高度
    const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT;
    const currentWidth = document.body.clientWidth - 300;
    this.gridBodyHeigt = currentHeight;

    // 定义grid表格以字段id为索引进行获取下标
    this.gridOptions.getRowNodeId = function (data) {
      return data.index;
    };

  }

  ngOnInit() {

    // 编辑工位界面加载数据
    this.updateProcedureManagementService.stationValue.subscribe(data => {
      console.log(data)
      this.gridOptions.api.setRowData(data);
    });

    // 工位combogrid选中后更新明细列表数据
    this.gridCombogridService.onCombogridGridClick.subscribe((updateData) => {

      if (updateData.index) {
        // 获取id对应的所在行
        let node = this.gridOptions.api.getRowNode(updateData.index);
        // 赋值给数据模型中
        node.data.name = updateData.data.name;
        node.data.id = updateData.data.id;
        this.gridOptions.api.updateRowData({
          update: [node.data]
        });
      }
    });
  };

  //  工位列表单位格点击
  onCellClicked(event) {
    this.gridCombogridService.isCellClicked.emit(event.data);
  };

  // 创建列表模型
  createNewRowData(length) {
    length++;
    let newData = {
      id: null,
      index: length,
      name: "",
    };
    return newData;
  };

  // 新增
  addRow(row) {

    const self = this;
    let arr = [];
    let hasChild = $('.procedure-station-list').find('.ag-body-container').find('.ag-row');

    if (!hasChild.length) {
      self.isToCreate = true;
    } else {

      this.gridOptions.api.forEachNode(function (node) {

        if (!node.data.name) {
          self.alertMsg.push({
            type: "danger",
            msg: '请填写完整之后再新增',
            timeout: 2000
          });
          self.isToCreate = false;
          /* self.gridOptions.api.startEditingCell({
            rowIndex: arr.length,
            colKey: 'name',
          }); */
          return;
        }
        self.isToCreate = true;
        arr.push(node.data);
      });
    }

    if (self.isToCreate) {
      this.gridOptions.api.updateRowData({ add: [this.createNewRowData(arr.length)] });
      /*  this.gridOptions.api.startEditingCell({
         rowIndex: arr.length,
         colKey: 'name',
       }); */
      this.totalItems = this.gridOptions.rowData.length + '';
      this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
    }
  }

  // 删除
  onRemoveSelected($event) {
    let selectedRowData = this.gridOptions.api.getSelectedRows();
    this.gridOptions.api.updateRowData({ remove: selectedRowData });
  }

  busy: Subscription;
  // 接收分页组件的数据赋值给本地
  getPagesRows(event: RowState) {

    if (this.gridOptions.api) {
      this.gridOptions.api.showLoadingOverlay();
    }
    this.RowState = event;

    this.busy = Observable.fromPromise(this.viewProcedureManagementService.ViewStationData(this.RowState.page, this.RowState.row)).subscribe(data => {
      if (data.code == 0) {
        this.totalItems = data.data.total;
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
        this.gridOptions.api.setRowData(data.data.rows);
        this.gridOptions.api.sizeColumnsToFit();
      }
    });
  }

}
