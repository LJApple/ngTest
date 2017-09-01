import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { GridCombogridService } from './grid-combogrid.service'
import { Observable, Subscription } from 'rxjs/Rx';
import { ProcedureManagementService } from "app/procedure/procedure-management/procedure-management.service";

@Component({
    selector: 'app-grid-combogrid',
    templateUrl: './grid-combogrid.component.html',
    styleUrls: ['./grid-combogrid.component.scss']
})
export class GridCombogridComponent implements OnInit {

    public params: any;
    public gridOptions: GridOptions;
    public rowdata: any;
    public isBlock: Object;
    public detailMainIndex; // 明细主列表id
    public upDateDetailMainList = {
         index:'',
         data:{}
    };  
    public position ={
        clientX:0,
        clientY:0
    };


    constructor(private gridCombogridService: GridCombogridService,
                private procedureManagementService: ProcedureManagementService) {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = [
            { headerName: "id", field: "id", hide: true },
            { headerName: "工位编号", field: "name", width: 150 }
        ];

        this.gridOptions.rowData = [];
        this.gridOptions.enableColResize = true;
        this.gridOptions.suppressContextMenu = true;

        // 加载列表数据
        Observable.fromPromise(this.gridCombogridService.getStationList()).subscribe(data => {
            this.gridOptions.api.setRowData(data.data.list);
        });
    }

    ngOnInit() {   

        //  控制列表下拉显示隐藏；
        this.procedureManagementService.isCombogridShow.subscribe((data) => {   
            if(data.isBlock){
                this.isBlock = {'display':'block'};
                this.position = data.position;
            }else{
                this.isBlock = {'display':'none'};
                this.position = data.position;
            }
        });

        this.gridCombogridService.isCellClicked.subscribe((data)=>{
         
            if(data.index){
                // 获取明细主列表所在行对应的id
                this.detailMainIndex = data.index;
            }
        });
        
    }

    // 行点击事件
    public onRowClicked ($event) {

        this.upDateDetailMainList.index = this.detailMainIndex;
        this.upDateDetailMainList.data = $event.data;
        if(this.upDateDetailMainList.data){

            console.log(this.upDateDetailMainList)
            this.gridCombogridService.onCombogridGridClick.emit(this.upDateDetailMainList);
        }
        this.isBlock = {'display':'none'};
    };

    // 鼠标事件
    public closeMenuContext () {
       this.isBlock = {'display':'none'};
    };

}
