import {EventEmitter, Injectable} from '@angular/core';
import {SERVICE_BASE_ADDR} from '../../utils/utils';
import {Http, Response, Headers} from '@angular/http';
import {CommonHelper} from '../../utils/common.helper';
import {BaseService} from "../../base/base.service";


/**
 * 请求主列表 MASTERLIST 接口地址
 *&FUNCTION_CODE=bad_code_type
 *
 */
const VERSION = "v1";
const FUNCTION_CODE = "bad_code_type";
// 获取主界面的list
const BAD_TYPE_URL = SERVICE_BASE_ADDR + VERSION + "/production/badCodeTypes/";
// 新增接口
const DEFECT_CODE_CREATE_URL = SERVICE_BASE_ADDR + VERSION + "/production/badCodes/";
// 查看接口
const DEFECT_CODE_VIEW_URL = SERVICE_BASE_ADDR + VERSION + '/production/badCodes/';
// 修改接口
const DEFECT_CODE_UPDATA_URL = SERVICE_BASE_ADDR + VERSION + '/production/badCodes/';
// 搜索接口
const DEFECT_CODE_SEARCH_URL = SERVICE_BASE_ADDR + VERSION + '/production/badCodes';
// 删除接口
const DEFECT_CODE_DELETE_URL = SERVICE_BASE_ADDR + VERSION + '/production/badCodes/';

@Injectable()
export class BadCodeTypeService extends BaseService {
    // 在该服务中 定义一个 ng 提供的EventEmitter类方法 用来向外部发射事件
    public isUpdateSuccess: EventEmitter<any>;
    public afterUpdateSuccess: EventEmitter<any>;

    public isCreateSuccess: EventEmitter<any>;
    public afterCreateSuccess: EventEmitter<any>;
    public updateInvoke: EventEmitter<any>;

    public rowData;

    constructor(private http: Http) {
        super();
        this.isUpdateSuccess = new EventEmitter();
        this.afterUpdateSuccess = new EventEmitter();

        this.isCreateSuccess = new EventEmitter();
        this.afterCreateSuccess = new EventEmitter();

        this.updateInvoke = new EventEmitter();
    }

    /**
     * 请求获取功能定义列表
     * @param info
     */
    getList(page: string, rows: string, keywords?: string) {
        let params: string;
        if (keywords) {
            params = '&page=' + page + '&rows=' + rows + '&no=' + keywords;
        } else {
            params = '&page=' + page + '&rows=' + rows;
        }
        return this.http
            .get(CommonHelper.getUrl(BAD_TYPE_URL) + params + '&FUNCTION_CODE=' + FUNCTION_CODE)
            .toPromise()
            .then((res: Response) => {
                return res.json()
            });
    }

    // 获取不良现象数据
    getCheckGroup() {
        return this.http.get(CommonHelper.getUrl(BAD_TYPE_URL + 'badCodes')).toPromise().then((res: Response) => {
            return res.json()
        });
    }
    // 获取不良现象数据
    getProcessList() {
        return this.http.get(CommonHelper.getUrl(BAD_TYPE_URL + 'procedures')).toPromise().then((res: Response) => {
            return res.json()
        });
    }

    submitData(data) {
        console.log(data);
        return this.http.post(CommonHelper.getUrl(BAD_TYPE_URL), JSON.stringify(data), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
            return <any>res.json()
        });
    }

    DefectCodeView(id) {
        return this.http.get(CommonHelper.getUrl(DEFECT_CODE_VIEW_URL + id)).toPromise().then((res: Response) => {
            return res.json()
        });
    }

    DefectCodeUpdata(id, data) {
        return this.http.put(CommonHelper.getUrl(DEFECT_CODE_UPDATA_URL + id), JSON.stringify(data), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
            return res.json()
        });
    }

    Search(page: string, rows: string, no: string) {
        return this.http.get(CommonHelper.getUrl(DEFECT_CODE_SEARCH_URL) + '&page=' + page + '&rows=' + rows + '&no=' + encodeURIComponent(no)).toPromise().then((res: Response) => {
            return res.json()
        });
    }

    delete(id: string) {
        return this.http.delete(CommonHelper.getUrl(DEFECT_CODE_DELETE_URL + id), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
            return res.json()
        });
    }
}
