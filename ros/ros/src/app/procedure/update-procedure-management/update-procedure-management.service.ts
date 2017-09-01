import {Injectable,EventEmitter,Output} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVICE_BASE_ADDR, HttpResult} from "app/utils/utils";
import {CommonHelper} from "app/utils/common.helper";
import {BaseService} from "app/base/base.service";


/**
 * 请求地址
 */
const UPDATE_PROCEDURE_URL = SERVICE_BASE_ADDR + 'v1/production/procedures/';

@Injectable()
export class UpdateProcedureManagementService extends BaseService {

    private headersJSON = new Headers({'Content-Type': 'application/json'});
    private headerXW = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    /**
     * 列表请求地址
     */
    private
    @Output() statusValue: EventEmitter<any>;
    @Output() barcodeTypeValue: EventEmitter<any>;
    @Output() stationValue: EventEmitter<any>;
    @Output() attributesValue: EventEmitter<any>;
    
    constructor(private http: Http) {
        super();
        this.statusValue = new EventEmitter();
        this.stationValue = new EventEmitter();
        this.barcodeTypeValue = new EventEmitter();
        this.attributesValue = new EventEmitter();
    }

    /**
     * 请求获取功能定义列表
     * @param info
     */
    
     getDpdateFormData (id): Promise<any> {
        return this.http
            .get(CommonHelper.getUrl(UPDATE_PROCEDURE_URL+id), {headers: this.headersJSON})
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    };

     updateFormData (id,data): Promise<any> {
        return this.http
            .put(CommonHelper.getUrl(UPDATE_PROCEDURE_URL+id),JSON.stringify(data), {headers: this.headersJSON})
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    };

}
