import {Injectable,EventEmitter,Output} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVICE_BASE_ADDR, HttpResult} from "app/utils/utils";
import {CommonHelper} from "app/utils/common.helper";
import {BaseService} from "app/base/base.service";


/**
 * 请求地址
 */
const VIEW_PROCEDURE_URL = SERVICE_BASE_ADDR + 'v1/production/procedures/'; 
const PROCEDURE_STATIONS_URL =  SERVICE_BASE_ADDR + 'v1/production/procedures/stations'; 
const  PROCEDURE_ATTRIBUTES_URL = SERVICE_BASE_ADDR + 'v1/production/procedureAttributes'; 

@Injectable()
export class ViewProcedureManagementService extends BaseService {

    private headersJSON = new Headers({'Content-Type': 'application/json'});
    private headerXW = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    /**
     * 列表请求地址
     */
    private

    public stations: EventEmitter<any>;
    public barcode: EventEmitter<any>;
    public procedureMsg: EventEmitter<any> ;
    public attributes: EventEmitter<any>;

    constructor(private http: Http) {
        super();
        this.stations = new EventEmitter();
        this.barcode = new EventEmitter();
        this.procedureMsg = new EventEmitter();
        this.attributes = new EventEmitter();
    }

    /**
     * 请求获取功能定义列表
     * @param info
     */

      //  查看工序
    ViewFormData (id): Promise<any> {
        return this.http
            .get(CommonHelper.getUrl(VIEW_PROCEDURE_URL+ id))
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    };
    //  查看工序工位接口
    ViewStationData (page: string, rows: string): Promise<any> {
        return this.http
            .get(CommonHelper.getUrl(PROCEDURE_STATIONS_URL) + '&page=' + page + '&rows=' + rows, {headers: this.headersJSON})
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    };

    // 查看工序属性
    ViewAttributeData (page: string, rows: string): Promise<any> {
        return this.http
            .get(CommonHelper.getUrl(PROCEDURE_ATTRIBUTES_URL)+ '&page=' + page + '&rows=' + rows, {headers: this.headersJSON})
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    } 

}
