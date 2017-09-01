import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router } from "@angular/router";
import { CommonHelper } from "app/utils/common.helper";
import { BaseService } from "app/base/base.service";
import { Profile } from "app/site/index/profile.model";
/**
 * 请求地址
 */
const PROFILE_URL = SERVICE_BASE_ADDR + "/Site/Profile";

/**
 * 用户设置信息服务类
 */
@Injectable()
export class ProfileService {

    // 用户信息
    public profile;

    constructor(private http: Http) {

    }

    /**
     * 获取配置
     * @param info
     */
    public get(): Observable<any> {

        return this.http.get(CommonHelper.getUrl(PROFILE_URL)).map((res: Response) => { return res.json() });
    }

}
