import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { CommonHelper } from "app/utils/common.helper";
import { BaseService } from "app/base/base.service";



@Injectable()
export class CombogridButtonService extends BaseService {


    // 工位按钮点击combogrid
    public isCombogridShow: EventEmitter<any>;
   
  
    constructor(private http: Http) {
        super();
        this.isCombogridShow = new EventEmitter();

    }

}
