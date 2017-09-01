import { Component, OnInit, EventEmitter } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { Observable, Subscription } from 'rxjs/Rx';
import { ProcedureManagementService } from "app/procedure/procedure-management/procedure-management.service";
import { GridCombogridService } from 'app/procedure/create-procedure-management/procedure-station-grid/grid-combogrid/grid-combogrid.service';

@Component({
    selector: 'app-combogrid-button',
    templateUrl : './combogrid-button.component.html',
    styleUrls: ['./combogrid-button.component.scss']
})


export class CombogridButtonComponent implements OnInit {

    // 工位按钮点击combogrid
    public isCombogridShow: EventEmitter<any>;
    public params: any;
    public gridOptions: GridOptions;
    public rowdata: any;
    public isClick: boolean;
    public remove =false ;
    // 右键位置配置
    public positionConfig = {
        isBlock: true,
        position: {
            clientX: 0,
            clientY: 0
        },
    }

    agInit(params: any): void {
        this.params = params;
    }

    constructor(private procedureManagementService: ProcedureManagementService, private gridCombogridService: GridCombogridService) {
        this.isClick = false;
    }

    ngOnInit() {
        console.log(this.params)
        // 工位combogrid选中后更新明细列表数据
        this.gridCombogridService.onCombogridGridClick.subscribe((updateData) => {

            // this.remove = updateData.index
            /* if(updateData.index == this.params.data.index){
                console.log('2');
                this.remove = true;
            } */
            // console.log($('"."+updateData.index"'))
           if (updateData.index) {
             $($('.ag-grid-input')[updateData.index - 1]).val(updateData.data.name);
            }
        });
    };

    //  按钮点击事件
    toGetCombogrid(event) {
        if (this.isClick) {
            this.positionConfig.isBlock = false;
            this.positionConfig.position.clientX = event.clientX;
            this.positionConfig.position.clientY = event.clientY;
            this.procedureManagementService.isCombogridShow.emit(this.positionConfig);
        } else {
            this.positionConfig.isBlock = true;
            this.positionConfig.position.clientX = event.clientX;
            this.positionConfig.position.clientY = event.clientY;
            this.procedureManagementService.isCombogridShow.emit(this.positionConfig);
        }
    };
}
