import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { ViewProcedureManagementService } from "app/procedure/view-procedure-management/view-procedure-management.service";
import { Observable, Subscription } from 'rxjs/Rx';
import { HEADER_AND_FOOTER_HEIGHT } from "app/utils/common.helper";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
  selector: 'app-procedure-attribute-view',
  templateUrl: './procedure-attribute-view.component.html',
  styleUrls: ['./procedure-attribute-view.component.scss']
})
export class ProcedureAttributeViewComponent implements OnInit {

  public gridOptions: GridOptions;
  public rowdata: any;
  // 分页组件
  RowState: RowState = new RowState('1', '15');
  public gridBodyHeigt: number;
  public totalItems: string;
  public totalPages: number;
  public itemId: string = '867228';
  public oldSunscribeAttributeData;

  constructor(private viewProcedureManagementService: ViewProcedureManagementService) {

    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "id", field: "id", width: 50, hide: true },
      { headerName: "属性编号", field: "no", width: 300 },
      { headerName: "属性名", field: "name", width: 300 },
      { headerName: "属性值", field: "value", width: 300 },
    ];

    this.gridOptions.rowData = [];
    this.gridOptions.enableColResize = true;
    this.gridOptions.editType = 'fullRow';
    //  列表初始化高度
    const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT;
    const currentWidth = document.body.clientWidth - 300;
    this.gridBodyHeigt = currentHeight;

    
  }

  ngOnInit() {

    this.oldSunscribeAttributeData = this.viewProcedureManagementService.attributes.subscribe((data) => {

      this.gridOptions.api.setRowData(data);
      this.gridOptions.api.sizeColumnsToFit();

    });
    const self = this
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

  ngOnDestroy() {

    this.oldSunscribeAttributeData.unsubscribe();
  }

  busy: Subscription;

  // 接收分页组件的数据赋值给本地
  getPagesRows(event: RowState) {

    if (this.gridOptions.api) {
            this.gridOptions.api.showLoadingOverlay();
        }
      this.RowState = event;
      this.busy = Observable.fromPromise(this.viewProcedureManagementService.ViewAttributeData(this.RowState.page, this.RowState.row)).subscribe(data => {
          this.totalItems = data.total;
          this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
          this.gridOptions.api.setRowData(data.rows);
          this.gridOptions.api.sizeColumnsToFit();
      });
  }

}
