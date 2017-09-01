import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { HEADER_AND_FOOTER_HEIGHT } from "app/utils/common.helper";
import { ProcedureManagementService } from "app/procedure/procedure-management/procedure-management.service";
import { Observable, Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';
import { ProcedureAttributeService } from 'app/procedure/create-procedure-management/procedure-attribute/procedure-attribute.service'
import { UpdateProcedureManagementService } from "app/procedure/update-procedure-management/update-procedure-management.service";
import { CreateProcedureManagementService } from "app/procedure/create-procedure-management/create-procedure-management.service";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";
@Component({
  selector: 'app-procedure-attribute',
  templateUrl: './procedure-attribute.component.html',
  styleUrls: ['./procedure-attribute.component.scss']
})
export class ProcedureAttributeComponent implements OnInit {

  public gridOptions: GridOptions;
  public rowdata: any;
  private isToCreate: boolean;
  public alertMsg: any = [];
  public optionArr = [];
  @Input() type;

  // 分页组件
  RowState: RowState = new RowState('1', '15');
  public gridBodyHeigt: number;
  public totalItems: string;
  public totalPages: number;
  public itemId: string = '867228';
  public oldSunscribeData;

  constructor(private procedureManagementService: ProcedureManagementService,
    private procedureAttributeService: ProcedureAttributeService,
    private updateProcedureManagementService: UpdateProcedureManagementService,
    private createProcedureManagementService: CreateProcedureManagementService, ) {

    const self = this;
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: "",
        width: 100,
        maxWidth: 100,
        checkboxSelection: true,
        suppressSorting: true,
        suppressMenu: true,
        suppressResize: true,
         headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
      },
      { headerName: "id", field: "index", width: 50, hide: true },
      {
        headerName: "属性编号", field: "no", width: 200, editable: function (params) {
          return params.node.data.id ? false : true
        }
      },
      {
        headerName: "属性名", field: "name", width: 200, editable: function (params) {
          return params.node.data.id ? false : true
        }
      },
      { headerName: "属性值", field: "value", width: 200, editable: true },
    ];

    this.gridOptions.rowData = [];
    this.gridOptions.enableColResize = true;
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.suppressContextMenu = true;
    //  列表初始化高度
    const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT;
    const currentWidth = document.body.clientWidth - 300;
    this.gridBodyHeigt = currentHeight;

   
  }



  // 验证方法
  noAndNameValidater(reg, newValue, msg, alertMsg) {
    const noReg = reg;
    let valid = noReg.test(newValue);

    if (!valid) {

      alertMsg.push({
        type: "danger",
        msg: msg,
        timeout: 2000
      });
    }
  };

  ngOnInit() {
    const self = this;

    // 点击更新 新增
    self.oldSunscribeData = this.createProcedureManagementService.attributesValue.subscribe((data) => {
      console.log(data)
      Observable.fromPromise(this.procedureManagementService.getAttributeList(this.RowState.page, this.RowState.row)).subscribe(data => {
        self.gridOptions.api.setRowData(data.data.list);
        self.gridOptions.api.sizeColumnsToFit();
      });
    });

    // 编辑订阅
    if (this.type == 2) {

      self.oldSunscribeData = self.updateProcedureManagementService.attributesValue.subscribe((data) => {
        setTimeout(function () {
          self.gridOptions.api.setRowData(data);
          self.gridOptions.api.sizeColumnsToFit();
        }, 0);
      });
    }

    // 监听屏幕变化 
    window.addEventListener('resize', function () {

      const currentHeight = document.body.clientHeight;
      const currentWidth = document.body.clientWidth;
      self.gridBodyHeigt = currentHeight - HEADER_AND_FOOTER_HEIGHT;
      // 列表父宽度自适应
      setTimeout(function () {
        self.gridOptions.api.sizeColumnsToFit();
      }, 100);
    });
  }

  createNewRowData(length) {
    length++;
    let newData = {
      index: length,
      name: "",
    };
    return newData;
  };

  // 新增
  addRow(row) {

    const self = this;
    let arr = [];
    let hasChild = $('.procedure-attribute-list').find('.ag-body-container').find('.ag-row');
    self.gridOptions.api.stopEditing();

    if (!hasChild.length) {
      self.isToCreate = true;
    } else {

      this.gridOptions.api.forEachNode(function (node) {

        if (!node.data.name || !node.data.no) {
          window.alert('请输入完整后再新增');
          self.isToCreate = false;
          self.gridOptions.api.startEditingCell({
            rowIndex: arr.length,
            colKey: 'no',
          });
          return;
        }
        self.isToCreate = true;
        arr.push(node.data);
      });
    }

    if (self.isToCreate) {
      this.gridOptions.api.updateRowData({ add: [this.createNewRowData(arr.length)] });
      this.gridOptions.api.startEditingCell({
        rowIndex: arr.length,
        colKey: 'no',
      });
      this.totalItems = this.gridOptions.rowData.length + '';
      this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
    }
  }

  // 删除
  onRemoveSelected($event) {
    var selectedRowData = this.gridOptions.api.getSelectedRows();
    this.gridOptions.api.updateRowData({ remove: selectedRowData });
  }

  onSelectionChanged($event) {

  };

  busy: Subscription;
  // 接收分页组件的数据赋值给本地
  getPagesRows(event: RowState) {

    if (this.gridOptions.api) {
      this.gridOptions.api.showLoadingOverlay();
    }
    this.RowState = event;

    this.busy = Observable.fromPromise(this.procedureAttributeService.getList(this.RowState.page, this.RowState.row)).subscribe(data => {

      if (data.code == 0) {
        this.totalItems = data.data.total;
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
        this.gridOptions.api.setRowData(data.data.list);
        this.gridOptions.api.sizeColumnsToFit();
      }
    }); 
  }

  ngOnDestroy() {

    this.oldSunscribeData.unsubscribe();
  }
}
