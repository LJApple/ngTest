import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router } from "@angular/router";
import { CommonHelper } from "app/utils/common.helper";
import { BaseService } from "app/base/base.service";
/**
 * 请求地址
 */
const EMPLOYEE_CLOCK_URL = SERVICE_BASE_ADDR + "statistics/HrAnalysis/GetPunchDetails/";

/**
 * 用户设置信息服务类
 */
@Injectable()
export class EmployeeClockService {


    constructor(private http: Http) {
    }

    /**
     * 获取配置
     * @param info
     */
    public getEmployeeClock(employeeId,periodId): Observable<any> {

        let param = 'periodId/'+periodId+'/employeeId/'+employeeId;
        return this.http.get(CommonHelper.getUrl(EMPLOYEE_CLOCK_URL+param)).map((res: Response) => { return res.json() });
    }

}
