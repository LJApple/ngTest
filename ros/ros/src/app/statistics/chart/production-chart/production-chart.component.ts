import { EChartOption ,ECharts} from 'echarts-ng2';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {ProductionChartService} from './production-chart.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-production-chart',
  templateUrl: './production-chart.component.html',
  styleUrls: ['./production-chart.component.scss']
})
export class ProductionChartComponent implements OnInit {

    localData: object;

    // @Output() onEchartsSelect = new EventEmitter<any>();

    constructor(private productionChartService: ProductionChartService) { }

    ngOnInit() {
        Observable.fromPromise(this.productionChartService.getProductionChartInfo()).subscribe(data => {
            this.localData = data;
            console.log(data);
        });
    }

}
