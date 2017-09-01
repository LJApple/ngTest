import {Injectable,EventEmitter,Output} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVICE_BASE_ADDR, HttpResult} from "app/utils/utils";
import {CommonHelper} from "app/utils/common.helper";
import {BaseService} from "app/base/base.service";


/**
 * 请求地址
 */


@Injectable()
export class SelectService extends BaseService {

    private headersJSON = new Headers({'Content-Type': 'application/json'});
    private headerXW = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    /**
     * 列表请求地址
     */
    private
    @Output() statusValue: EventEmitter<any>;

    constructor(private http: Http) {
        super();
        this.statusValue = new EventEmitter();
    }

    /**
     * 请求获取功能定义列表
     * @param info
     */
    


}
