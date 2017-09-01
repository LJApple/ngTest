import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProductionChartService} from '../production-chart.service';

@Component({
  selector: 'app-workshop-detail-chart',
  templateUrl: './workshop-detail-chart.component.html',
  styleUrls: ['./workshop-detail-chart.component.scss']
})
export class WorkshopDetailChartComponent implements OnInit, OnChanges {

    @Input() localData;

    currentData;

    constructor(public productionChartService: ProductionChartService) {

        // 订阅功能子项的选中事件
        productionChartService.onEchartsSelect.subscribe((dayData) => {
            this.currentData = dayData;
            console.log(dayData);
        });
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['localData'] && changes['localData'].currentValue) {
            this.currentData = this.localData['sums'];
        }
    }

}
