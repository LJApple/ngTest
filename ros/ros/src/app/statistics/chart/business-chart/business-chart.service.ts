import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { CommonHelper } from "app/utils/common.helper";
import { BusinessChart } from "./business-chart.model";
import { SalesVolume } from './sales-volume/sales-volume.model';
import { SalesReturn } from './sales-return/sales-return.model';
import * as _ from 'lodash';

/**
 * 获取初始化数据地址
 */
const BUSINESS_URL = SERVICE_BASE_ADDR + "statistics/SalesAnalysis/GetSalesInitByPeriod";

/**
 * 获取产品TOP10排行数据地址
 */
const PRODUCTTOP_URL = SERVICE_BASE_ADDR + "statistics/SalesAnalysis/GetProductTop10List";

/**
 * 获取过去12个月的销售数据地址
 */
const PAST12MOUTHSALES_URL = SERVICE_BASE_ADDR + "statistics/SalesAnalysis/GetPast12MouthSales";


/**
 * 获取过去12个月的销售退货数据地址
 */
const PAST12MOUTHSALESRRTURN_URL = SERVICE_BASE_ADDR + "statistics/SalesAnalysis/GetPast12MonthSalesReturn";

/**
 * 业务分析相关数据接口
 */
@Injectable()
export class BusinessChartService {

    constructor(private http: Http) { }


    getBusinessChartInfo(): Observable<BusinessChart> {

        return this.http.get(CommonHelper.getUrl(BUSINESS_URL)).map((res: Response) => { return <BusinessChart>res.json() });
    }

    getProductTopByCustomer(customerid): Promise<any> {

        return this.http.get(CommonHelper.getUrl(PRODUCTTOP_URL, { "customerid": customerid })).toPromise().then((res: Response) => { return res.json() });
    }

    getPast12MouthSales(): Promise<SalesVolume> {

        return this.http.get(CommonHelper.getUrl(PAST12MOUTHSALES_URL)).toPromise().then((res: Response) => { return res.json() });
    }

    getPath12MouthSalesReturn(): Promise<SalesReturn> {
        
        return this.http.get(CommonHelper.getUrl(PAST12MOUTHSALESRRTURN_URL)).toPromise().then((res: Response) => { return res.json() });
    }
}
