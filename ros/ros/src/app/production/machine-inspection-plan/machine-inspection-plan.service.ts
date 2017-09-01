import {EventEmitter, Injectable} from '@angular/core';
import {SERVICE_BASE_ADDR} from '../../utils/utils';
import {Http, Response, Headers} from '@angular/http';
import {CommonHelper} from '../../utils/common.helper';



/**
 * 请求主列表 MASTERLIST 接口地址
 */
const MACHINEINSPECTIONLIST_URL = SERVICE_BASE_ADDR + "production/machineCheck/Masterlist";


/**
 * 提交  新增 页面的表单数据接口
 */
const CREATEFORM_URL = SERVICE_BASE_ADDR + "production/MachineCheck/create";

/**
 * 初始化 编辑 页面的表单数据接口
 */
const UPDATEFORMINIT_URL = SERVICE_BASE_ADDR + "production/machineCheck/View/id/";

/**
 * 提交  编辑 页面的表单数据接口
 */
const UPDATEFORM_URL = SERVICE_BASE_ADDR + "production/machineCheck/update/";

/**
 * 删除  表单数据接口
 */
const DELETEFORM_URL = SERVICE_BASE_ADDR;


/**
 * 校验 点检机台编号是否已存在
 */
const ISNOEXIST_URL = SERVICE_BASE_ADDR + 'production/machineCheck/CheckNoExist/';



@Injectable()
export class MachineInspectionPlanService {

    private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    // 在该服务中 定义一个 ng 提供的EventEmitter类方法 用来向外部发射事件
    public isUpdateSuccess: EventEmitter<any>;
    public afterUpdateSuccess: EventEmitter<any>;

    public isCreateSuccess: EventEmitter<any>;
    public afterCreateSuccess: EventEmitter<any>;

    public updateInvoke: EventEmitter<any>;

    public rowData;

    constructor(private http: Http) {
        this.isUpdateSuccess = new EventEmitter();
        this.afterUpdateSuccess = new EventEmitter();

        this.isCreateSuccess = new EventEmitter();
        this.afterCreateSuccess = new EventEmitter();

        this.updateInvoke = new EventEmitter();
    }



    // 获取 MASTERLIST 主列表的接口
    getMachineInspectionListData(data): Promise<any> {

        return this.http
            .post(CommonHelper.getUrl(MACHINEINSPECTIONLIST_URL), $.param(data), {headers: this.headers})
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    }

    // 新增 提交接口
    createFormData (data): Promise<any> {
        return this.http
            .post(CommonHelper.getUrl(CREATEFORM_URL), $.param(data), {headers: this.headers})
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    }

    // 编辑 界面初始化接口
    updateFormInitData (id): Promise<any> {
        return this.http
            .get(CommonHelper.getUrl(UPDATEFORMINIT_URL + id))
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    }

    // 编辑 提交接口
    updateFormData (id, data): Promise<any> {
        return this.http
            .post(CommonHelper.getUrl(UPDATEFORM_URL + id), $.param(data), {headers: this.headers})
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    }

    // 删除 接口
    deleteFormData (url): Promise<any> {
        return this.http
            .post(CommonHelper.getUrl(DELETEFORM_URL + url), $.param({}), {headers: this.headers})
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    }

    // 校验 点检机台编号是否已存在
    isNoExist (no): Promise<any> {
        return this.http
            .get(CommonHelper.getUrl(ISNOEXIST_URL) + '&no=' + no)
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    }

}
