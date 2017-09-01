import {Injectable,EventEmitter} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVICE_BASE_ADDR, HttpResult} from "app/utils/utils";
import {CommonHelper} from "app/utils/common.helper";
import {BaseService} from "app/base/base.service";

/**
 * 请求地址
 */
const PROCEDURE_COMBOGRID_URL = SERVICE_BASE_ADDR + 'v1/production/procedures/stations'



@Injectable()
export class GridCombogridService extends BaseService {
   
    // 工位单元格点击combogrid
     public isCellClicked: EventEmitter<any>;
     public onCombogridGridClick : EventEmitter<any>;
    /**
     * 列表请求地址
     */
    private

    constructor(private http: Http) {
        super();

        this.isCellClicked = new EventEmitter();
        this.onCombogridGridClick = new EventEmitter();
    }

    /**
     * 请求获取功能定义列表
     * @param info
     */
     getStationList(): Promise<any> {

        return this.http.get(CommonHelper.getUrl(PROCEDURE_COMBOGRID_URL)).toPromise().then((res: Response) => {
            return res.json()
        });
    }

}
