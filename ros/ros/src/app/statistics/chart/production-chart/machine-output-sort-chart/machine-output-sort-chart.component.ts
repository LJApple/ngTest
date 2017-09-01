import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as _ from 'lodash';
import {ProductionChartService} from '../production-chart.service';

@Component({
  selector: 'app-machine-output-sort-chart',
  templateUrl: './machine-output-sort-chart.component.html',
  styleUrls: ['./machine-output-sort-chart.component.scss']
})
export class MachineOutputSortChartComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() localData;

    outPutSortLis: Array<object>;
    selItem: any;

    constructor(private productionChartService: ProductionChartService) {
        // 订阅是否需要取消产值排名列表选中的Class样式
        productionChartService.forbidActShow.subscribe((isAct) => {
            if (!isAct) {
                this.selItem = '';
            }
        });
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes['localData'] && changes['localData'].currentValue) {

            // 将后台返回的打包数据中的workshop_output_value数组赋值给本地变量中
            this.outPutSortLis = this.localData["workshop_output_value"];
        }

    }

    sortListOnclick (index, outPutSortItem) {
        let emitData = this.outPutSortLis[index];
        this.productionChartService.onEchartsSelect.emit(emitData);

        this.selItem = outPutSortItem;
    }

    ngAfterViewInit() {
        //this.sortListOnclick();
    }

    test() {}
}
