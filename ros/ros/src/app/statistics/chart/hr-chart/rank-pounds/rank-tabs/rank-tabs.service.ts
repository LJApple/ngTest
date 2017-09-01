import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router } from "@angular/router";
import { CommonHelper } from "app/utils/common.helper";
import { BaseService } from "app/base/base.service";
import { rankTabsModel } from "app/statistics/chart/hr-chart/rank-pounds/rank-tabs/rank-tabs.model";
/**
 * 请求地址
 */
const RANK_TABS_URL = SERVICE_BASE_ADDR + "statistics/HrAnalysis/getEmployeeRank";

/**
 * 用户设置信息服务类
 */
@Injectable()
export class RankTabsService {

    // 用户信息
    public rankTabsModel;

    constructor(private http: Http) {


    }

    /**
     * 获取配置
     * @param info
     */
    public getRankTabs(periodId): Observable<any> {

        let param = '&periodId=' + periodId + '&rows=5'
        return this.http.get(CommonHelper.getUrl(RANK_TABS_URL) + param).map((res: Response) => { return res.json() });
    }
    // CommonHelper.getUrl()

}
