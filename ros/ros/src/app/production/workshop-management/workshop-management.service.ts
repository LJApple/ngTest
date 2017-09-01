import {EventEmitter, Injectable} from '@angular/core';
import {SERVICE_BASE_ADDR} from '../../utils/utils';
import {Headers, Http, Response} from '@angular/http';
import {CommonHelper} from '../../utils/common.helper';
import {BaseService} from "../../base/base.service";


/**
 * 请求主列表 MASTERLIST 接口地址
 *
 * http://ros.dev/oa/organization/getIsOriginalData/extra/0
 * /admin/FactoryModels
 * /admin/FactoryModels/StationsByWorkshop
 */
const VERSION = "v1";
const FUNCTION_CODE = "machine";
// 获取主界面的list
const MACHINE_URL = SERVICE_BASE_ADDR + VERSION + "/production/machines/";
// 获取主界面的车间分类
const MIAN_OPTIONS = SERVICE_BASE_ADDR + VERSION + "/oa/organizations/IsOriginalData";
// 获取新增/修改界面的车间信选项
const WORKSHOP_OPTIONS = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModels";
// 获取新增/修改界面的车间信选项
const STATION_OPTIONS = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModels/StationsByWorkshop";
// 机台分类项
const MACHINE_CATEGORY = SERVICE_BASE_ADDR + VERSION + '/production/machines/extra';


@Injectable()
export class WorkshopManagementService extends BaseService {
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
    // 获取主列表
    getList(page: string, rows: string, keywords?: string) {
        let params: string;
        if (keywords) {
            params = '&page=' + page + '&rows=' + rows + '&no=' + keywords;
        } else {
            params = '&page=' + page + '&rows=' + rows;
        }
        return this.http
            .get(CommonHelper.getUrl(MACHINE_URL) + params)
            .toPromise()
            .then((res: Response) => {
                return res.json()
            });
    }

    // 获取车间数据
    getTopOptions() {
        return this.http
            .get(CommonHelper.getUrl(MIAN_OPTIONS))
            .toPromise()
            .then((res: Response) => {
                return res.json()
            });
    }

    // 获取新增/修改界面的车间信选项
    getWorkshopOptions() {
        return this.http
            .get(CommonHelper.getUrl(WORKSHOP_OPTIONS) + '&factory_model_type_ids=2')
            .toPromise()
            .then((res: Response) => {
                return res.json()
            });
    }

    // 获取机台类型
    getMachineCat() {
        return this.http
            .get(CommonHelper.getUrl(MACHINE_CATEGORY) + '&rows=1000&page=1')
            .toPromise()
            .then((res: Response) => {
                return res.json()
            });
    }

    // 定义搜索地址
    getSList(page: string, rows: string, start?: any, end?: any, workshop?: any, state?: any) {
        let str: any = '';
        if (page) {
            str += '&page=' + page;
        }
        if (rows) {
            str += '&rows=' + rows;
        }

        if (end) {
            str += '&endFinishtime=' + end;
        }
        if (start) {
            str += '&startFinishtime=' + start;
        }

        if (workshop) {
            str += '&workshop_id=' + workshop;
        }
        if (state) {
            str += '&state=' + state;
        }

        return this.http
            .get(CommonHelper.getUrl(MACHINE_URL) + str)
            .toPromise()
            .then((res: Response) => {
                return res.json()
            });
    }

    // 保存提交
    save(data) {
        console.log(data);
        return this.http
            .post(CommonHelper.getUrl(MACHINE_URL), JSON.stringify(data), CommonHelper.getJSONRequestOptions())
            .toPromise()
            .then((res: Response) => {
                return <any>res.json()
            });
    }

    // 工位数据
    getStation(id) {
        return this.http.get(CommonHelper.getUrl(STATION_OPTIONS) + '&id=' + id).toPromise().then((res: Response) => {
            return res.json()
        });
    }

    // 修改数接口
    Update(id, data?: any) {
        return this.http
            .put(CommonHelper.getUrl(MACHINE_URL + id), JSON.stringify(data), CommonHelper.getJSONRequestOptions())
            .toPromise()
            .then((res: Response) => {
                return res.json()
            });
    }

    // 查看接口
    view(id) {
        return this.http
            .get(CommonHelper.getUrl(MACHINE_URL + id))
            .toPromise()
            .then((res: Response) => {
                return res.json()
            });
    }

    // 生产/操作记录记录数据接口
    getLogsList(id: string, params: string, page?: string, rows?: string) {
        return this.http
            .get(CommonHelper.getUrl(MACHINE_URL + id + params) + '&page=' + page + '&rows=' + rows)
            .toPromise()
            .then((res: Response) => {
                return res.json()
            });
    }
}
