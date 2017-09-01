import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVICE_BASE_ADDR, HttpResult} from "app/utils/utils";
import {CommonHelper} from "app/utils/common.helper";
import {BaseService} from "app/base/base.service";

/**
 * 功能代码
 * http://inner-qa02-ros.xin3wei.com
 */
const FUNCTION_CODE = 'Customer';

/**
 * 请求地址
 */
const SERVICE_URL = SERVICE_BASE_ADDR;


@Injectable()
export class GetDataListService extends BaseService {

    /**
     * 列表请求地址
     */
    private

    constructor(private http: Http) {
        super();
    }

    /**
     * 请求获取功能定义列表
     * @param info
     */
    getDataList(url: string, q: any): Promise<any> {

        return this.http.get(CommonHelper.getUrl(SERVICE_URL + url) + '&q=' + q).toPromise().then((res: Response) => {
            return res.json()
        });
    }

}
