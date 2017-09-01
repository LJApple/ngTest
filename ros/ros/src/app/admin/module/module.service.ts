import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router, ActivatedRoute } from "@angular/router";
import { Module } from "app/admin/module/module.model";
import { CommonHelper } from "app/utils/common.helper";

/**
 * 请求地址
 */
const SERVICE_URL = SERVICE_BASE_ADDR + "/admin/Module/List";

@Injectable()
export class ModuleService {

    // 模块列表数据
    moduleList;

    constructor(private http: Http) {

    }
    /**
     * 请求获取模块列表
     * @param info
     */
    getList(): Observable<Module[]> {

        return this.http.get(CommonHelper.getUrl(SERVICE_URL)).map((res: Response) => { return <Module[]>res.json() });

    }
}
