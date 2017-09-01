import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { CommonHelper } from "app/utils/common.helper";
import { BaseService } from "app/base/base.service";
import * as _ from 'lodash';

@Injectable()
export class MasterListBaseService extends BaseService {

    // 功能代码
    protected FUNCTION_CODE: string = 'salesOrder';

    // 主列表请求地址
    protected MASTER_LIST_ADDR = SERVICE_BASE_ADDR + '/sales/SalesOrder/MasterList' + '/FUNCTION_CODE/' + this.FUNCTION_CODE;

    constructor(public http: Http) {

        super();
    }

    /**
     * 获取主列表数据
     */
    getMasterList(page: string, rows: string, reloadParams: any): Promise<any> {

        // 查询参数
        let paramsStr = '&page=' + page + '&rows=' + rows;
        _.forEach(reloadParams, function (value, key) {
            let paramItem = '&' + key + '=' + value;
            paramsStr += paramItem;
        });

        // 拼接请求地址
        let url = CommonHelper.getUrl(this.MASTER_LIST_ADDR) + paramsStr;

        return this.http.get(url).toPromise().then((res: Response) => {
            return res.json();
        });
    }
}
