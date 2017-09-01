
import {Injectable,EventEmitter} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVICE_BASE_ADDR, HttpResult} from "app/utils/utils";
import {CommonHelper} from "app/utils/common.helper";
import {BaseService} from "app/base/base.service";

/**
 * 请求地址
 */
const SNTYPES_URL = SERVICE_BASE_ADDR + 'v1/production/procedures/SNTypes';

@Injectable()
export class BarCodeTypeService extends BaseService {

    
    // 列表请求地址
     
    constructor(private http: Http) {
        super();

    }

    // 条码规则校验请求
    getSNTypes(): Promise<any> {

        return this.http.get(CommonHelper.getUrl(SNTYPES_URL)).toPromise().then((res: Response) => {
            return res.json()
        });
    };

}
