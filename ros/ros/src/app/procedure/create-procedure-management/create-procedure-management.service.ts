import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { CommonHelper } from "app/utils/common.helper";
import { BaseService } from "app/base/base.service";


/**
 * 请求地址
 */
const CREATE_PROCEDURE_URL = SERVICE_BASE_ADDR + 'v1/production/procedures/';

@Injectable()
export class CreateProcedureManagementService extends BaseService {

    private headersJSON = new Headers({ 'Content-Type': 'application/json' });
    private headerXW = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    /**
     * 列表请求地址
     */
    private

    // 传出的事件
    public attributesValue: EventEmitter<any>;
    public stationValue: EventEmitter<any>;

    constructor(private http: Http) {
        super();
        this.attributesValue = new EventEmitter();
        this.stationValue = new EventEmitter();
     
    }

    /**
     * 请求获取功能定义列表
     * @param info
     */

    //  挪走了
   /*  createFormData(data): Promise<any> {
        return this.http
            .post(CommonHelper.getUrl(CREATE_PROCEDURE_URL), JSON.stringify(data), { headers: this.headersJSON })
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    }
 */

}
