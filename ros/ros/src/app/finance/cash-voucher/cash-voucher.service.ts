

import {EventEmitter, Injectable} from '@angular/core';
import {SERVICE_BASE_ADDR} from '../../utils/utils';
import {Http, Response, Headers} from '@angular/http';
import {CommonHelper} from '../../utils/common.helper';
import {BaseService} from "../../base/base.service";


const VERSION = "v1";
const FUNCTION_CODE = "cashVoucher";
// 获取主界面的list
const CASH_VOUCHER_URL = SERVICE_BASE_ADDR + "/account/CashVoucher/MasterList";
// 新增接口
const CASH_VOUCHER_CREATE_URL = SERVICE_BASE_ADDR + VERSION + "/production/badCodes/";
// 查看接口
const CASH_VOUCHER_VIEW_URL = SERVICE_BASE_ADDR + VERSION + '/production/badCodes/';
// 修改接口
const CASH_VOUCHER_UPDATA_URL = SERVICE_BASE_ADDR + VERSION + '/production/badCodes/';
// 搜索接口
const CASH_VOUCHER_SEARCH_URL = SERVICE_BASE_ADDR + VERSION + '/production/badCodes';
// 删除接口
const CASH_VOUCHER_DELETE_URL = SERVICE_BASE_ADDR + VERSION + '/production/badCodes/';

@Injectable()
export class CashVoucherService extends BaseService {
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
    getCashVoucherList(page: string, rows: string, keywords?: string) {
        let params: string;
        if (keywords) {
            params = '&page=' + page + '&rows=' + rows + '&no=' + keywords;
        } else {
            params = '&page=' + page + '&rows=' + rows;
        }
        // .get(CommonHelper.getUrl(CASH_VOUCHER_URL) + params)
        return this.http
            .get(CommonHelper.getUrl(CASH_VOUCHER_URL)+'&FUNCTION_CODE=' + FUNCTION_CODE)
            .toPromise()
            .then((res: Response) => {
                return res.json()
            });
    }

    saveNewCashVoucher(data) {
        console.log(data);
        return this.http.post(CommonHelper.getUrl(CASH_VOUCHER_CREATE_URL), JSON.stringify(data), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
            return <any>res.json()
        });
    }

    cashVoucherView(id) {
        return this.http.get(CommonHelper.getUrl(CASH_VOUCHER_VIEW_URL + id)).toPromise().then((res: Response) => {
            return res.json()
        });
    }

     cashVoucherUpdata(id, data) {
        return this.http.put(CommonHelper.getUrl(CASH_VOUCHER_UPDATA_URL + id), JSON.stringify(data), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
            return res.json()
        });
    }

    search(page: string, rows: string, no: string) {
        return this.http.get(CommonHelper.getUrl(CASH_VOUCHER_SEARCH_URL) + '&page=' + page + '&rows=' + rows + '&no=' + encodeURIComponent(no)).toPromise().then((res: Response) => {
            return res.json()
        });
    }

    delete(id: string) {
        return this.http.delete(CommonHelper.getUrl(CASH_VOUCHER_DELETE_URL + id), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
            return res.json()
        });
    }
}
