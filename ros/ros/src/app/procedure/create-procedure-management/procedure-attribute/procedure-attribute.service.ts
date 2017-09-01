import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVICE_BASE_ADDR, HttpResult} from "app/utils/utils";
import {CommonHelper} from "app/utils/common.helper";
import {BaseService} from "app/base/base.service";

/**
 * 请求地址
 */
const version = 'v1';
const PROCEDURE_ATTRIBUTE_URL = SERVICE_BASE_ADDR + 'v1/production/procedureAttributes'



@Injectable()
export class ProcedureAttributeService extends BaseService {

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
    getList(page: string, rows: string): Promise<any> {

        // + '/page/' + page + '/rows/' + rows
        return this.http.get(CommonHelper.getUrl(PROCEDURE_ATTRIBUTE_URL )+ '&page=' + page + '&rows=' + rows).toPromise().then((res: Response) => {
            return res.json()
        });
    }

}
