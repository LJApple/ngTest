import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router } from "@angular/router";
import { CommonHelper } from "app/utils/common.helper";
import { BaseService } from "app/base/base.service";
// import { EmployeeClockModel } from "app/statistics/chart/hr-chart/rank-pounds/employee-clock/employee-clock.model";
/**
 * 请求地址
 */
const EMPLOYEE_INTRODUCE_URL = SERVICE_BASE_ADDR + "statistics/HrAnalysis/getEmployeeHistory/employeeId/";

/**
 * 用户设置信息服务类
 */
@Injectable()
export class EmployeeIntroduceService {


    constructor(private http: Http) {

    }

    /**
     * 获取配置
     * @param info
     */
    public getEmployeeIntroduce(employeeId): Observable<any> {

        return this.http.get(CommonHelper.getUrl(EMPLOYEE_INTRODUCE_URL+employeeId)).map((res: Response) => { return res.json() });
    }

}
