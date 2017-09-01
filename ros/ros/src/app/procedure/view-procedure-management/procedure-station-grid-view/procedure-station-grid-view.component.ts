import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { ViewProcedureManagementService } from "app/procedure/view-procedure-management/view-procedure-management.service";
import { Observable,Subscription } from 'rxjs/Rx';
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
  selector: 'app-procedure-station-grid-view',
  templateUrl: './procedure-station-grid-view.component.html',
  styleUrls: ['./procedure-station-grid-view.component.scss']
})
export class ProcedureStationGridViewComponent implements OnInit {

  public gridOptions: GridOptions;
  public rowdata: any;
  public isToCreate: boolean;
  public oldSunscribeStationData;
  

  // 分页组件
  RowState: RowState = new RowState('1', '15');
  public gridBodyHeigt: number;
  public totalItems: string;
  public totalPages: number;
  public itemId: string = '867228';


  constructor(private viewProcedureManagementService:ViewProcedureManagementService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "关联工位", field: "name", width: 1000},
    ];

    this.gridOptions.rowData = [];
    this.gridOptions.enableColResize = true;
    this.gridOptions.onGridReady = function (params) {
      params.api.sizeColumnsToFit();
    };
  };

  ngOnInit() {

    this.oldSunscribeStationData = this.viewProcedureManagementService.stations.subscribe((data) => {    
       this.gridOptions.api.setRowData(data);
    });
  };

  busy: Subscription;

   // 接收分页组件的数据赋值给本地
  getPagesRows(event: RowState) {
    
    if (this.gridOptions.api) {
            this.gridOptions.api.showLoadingOverlay();
        }
      this.RowState = event;

      this.busy = Observable.fromPromise(this.viewProcedureManagementService.ViewStationData(this.RowState.page, this.RowState.row)).subscribe(data => {
          this.totalItems = data.total;
          this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
          this.gridOptions.api.setRowData(data.rows);
          this.gridOptions.api.sizeColumnsToFit();
      });
  };


  ngOnDestroy() {
  
      this.oldSunscribeStationData.unsubscribe();
  }
}
