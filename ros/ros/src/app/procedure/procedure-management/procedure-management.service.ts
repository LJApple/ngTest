import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { CommonHelper } from "app/utils/common.helper";
import { BaseService } from "app/base/base.service";

/**
 * 功能代码
 */
const FUNCTION_CODE = 'procedure';

/**
 * 请求地址
 */
const VERSION = "v1";
// 列表数据
const PROCEDURE_URL = SERVICE_BASE_ADDR + VERSION + '/production/procedures/'
// 新增接口
const CREATE_PROCEDURE_URL = SERVICE_BASE_ADDR + VERSION + '/production/procedures/';
// 属性参数
const PROCEDURE_ATTRIBUTE_URL = SERVICE_BASE_ADDR + VERSION + '/production/procedureAttributes';
// 删除
const DELECT_URL = SERVICE_BASE_ADDR + VERSION + '/production/procedures/';

@Injectable()
export class ProcedureManagementService extends BaseService {

    private headersJSON = new Headers({ 'Content-Type': 'application/json' });
    private headerXW = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    // 工位按钮点击combogrid
    public isCombogridShow: EventEmitter<any>;
    // 在该服务中 定义一个 ng 提供的EventEmitter类方法 用来向外部发射事件
    public isCreateSuccess: EventEmitter<any>;
    public afterCreateSuccess: EventEmitter<any>;

    public isUpdateSuccess: EventEmitter<any>;
    public afterUpdateSuccess: EventEmitter<any>;
    // 右键设置rowData
    public rowData;
    /**
     * 列表请求地址
     */
    private

    constructor(private http: Http) {
        super();
        this.isCombogridShow = new EventEmitter();

        this.isCreateSuccess = new EventEmitter();
        this.afterCreateSuccess = new EventEmitter();

        this.isUpdateSuccess = new EventEmitter();
        this.afterUpdateSuccess = new EventEmitter();
    }

    /**
     * 请求获取功能定义列表
     * @param info
     */
    // 获取工序管理主列表
    getList(page: string, rows: string): Promise<any> {

        return this.http.get(CommonHelper.getUrl(PROCEDURE_URL) + '&page=' + page + '&rows=' + rows + '&FUNCTION_CODE=' + FUNCTION_CODE).toPromise().then((res: Response) => {
            return res.json()
        });
    }

    // 新增工序管理
    createFormData(data): Promise<any> {
        return this.http
            .post(CommonHelper.getUrl(CREATE_PROCEDURE_URL), JSON.stringify(data), { headers: this.headersJSON })
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    }

    // 新增工序管理 属性参数列表数据
    getAttributeList(page: string, rows: string){
        return this.http.get(CommonHelper.getUrl(PROCEDURE_ATTRIBUTE_URL )+ '&page=' + page + '&rows=' + rows).toPromise().then((res: Response) => {
            return res.json()
        });
    }

    // 工序管理主列表搜索
    Search(page: string, rows: string, no: string) {
        return this.http.get(CommonHelper.getUrl(PROCEDURE_URL) + '&page=' + page + '&rows=' + rows + '&no=' + encodeURIComponent(no)).toPromise().then((res: Response) => {
            return res.json()
        });
    }

    // 删除
    delete(id: string) {
    return this.http.delete(CommonHelper.getUrl(DELECT_URL + id), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return res.json()
    });
  }

}
