import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonHelper } from "app/utils/common.helper";
import { SalesOrderComponent } from 'app/sales/sales-order/sales-order.component';
import { ChartComponent } from 'app/statistics/chart/chart.component';
import { ProductionchartModel } from "app/statistics/chart/production-chart/production-chart.model";

import * as _ from 'lodash';

/**
 * 请求地址
 */
const PRODUCTIONCHART_URL = SERVICE_BASE_ADDR + "/statistics/ProductionAnalysis/GetProductionInitDatas";


/**
* 车间生产分析
*/
@Injectable()
export class ProductionChartService {


    // 在该服务中 定义一个 ng 提供的EventEmitter类方法 用来向外部发射事件
    public onEchartsSelect: EventEmitter<any>;
    public forbidActShow: EventEmitter<any>;
    public machineRateChartsSelect: EventEmitter<any>;
    public machineUtiSelect: EventEmitter<any>;
    public chartOptions;

    constructor(private http: Http) {

        this.onEchartsSelect = new EventEmitter();
        this.forbidActShow = new EventEmitter();
        this.machineRateChartsSelect = new EventEmitter();
        this.machineUtiSelect = new EventEmitter();
    }

    getProductionChartInfo(): Promise<ProductionchartModel> {
        return this.http.get(CommonHelper.getUrl(PRODUCTIONCHART_URL)).toPromise().then((res: Response) => { return <ProductionchartModel>res.json() });
    }

}
