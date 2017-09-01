import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router, ActivatedRoute } from "@angular/router";
import { HrchartModel } from "app/statistics/chart/hr-chart/hr-chart.model";
import { CommonHelper } from "app/utils/common.helper";
import { SalesOrderComponent } from 'app/sales/sales-order/sales-order.component';
import { ChartComponent } from 'app/statistics/chart/chart.component';
import * as _ from 'lodash';

/**
 * 请求地址
 */
const HRCHART_URL = SERVICE_BASE_ADDR + "/statistics/HrAnalysis/getEmployeeTurnover/periodId/76008";

/**
 * 年度各月员工变动
 */
@Injectable()
export class HrChartService {

     // 功能选中事件
     public onRankTabsSelect: EventEmitter<any>;


    constructor(private http: Http) {

         this.onRankTabsSelect = new EventEmitter();
    }
 
     getHrchartInfo(): Promise<any> {

        return this.http.get(CommonHelper.getUrl(HRCHART_URL)).toPromise().then((res: Response) => { return res.json() });
    } 

}
