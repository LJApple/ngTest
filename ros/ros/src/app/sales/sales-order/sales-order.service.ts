import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { CommonHelper } from "app/utils/common.helper";
import { MasterListBaseService } from "app/admin/base/master-list-base/master-list-base.service";


@Injectable()
export class SalesOrderService extends MasterListBaseService {

    constructor(public http: Http) {
        super(http);
    }
}
