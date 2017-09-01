import { Injectable ,EventEmitter } from '@angular/core';
import { SERVICE_BASE_ADDR } from '../../utils/utils';
import { Http, Response, Headers } from '@angular/http';
import { CommonHelper } from '../../utils/common.helper';
import { BaseService } from "../../base/base.service";


const VERSION = "v1";
const FUNCTION_CODE = "";
// 获取主界面的list
const FANCTORYMODEL_URL = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModels/";
// 新增工厂模型类型数据
const CREATE_URL  = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModels/";
// 编辑工厂模型类型数据
const UPDATE_URL  = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModels/";
// 查看工厂模型类型数据
const VIEW_URL  = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModels/";
// 删除工厂模型类型数据
const DELECT_URL  = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModels/";
// 获取主界面的list
const MODEL_URL = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModels/Catalogue/";
// 获取上级工厂模型下拉数据
const MODEL_TYPE = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModelTypes/Catalogue/"
// 账套
const ACCOUNT_BOOK_INFO = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModels/AccountInfo/"


@Injectable()
export class FactoryModelService extends BaseService {

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

  // 工厂模型类型列表数据
  getFactoryModelList(page: string, rows: string) {

    return this.http
      .get(CommonHelper.getUrl(FANCTORYMODEL_URL) + '&page=' + page + '&rows=' + rows)
      .toPromise()
      .then((res: Response) => {
        return res.json()
      });
  }

  saveFactoryModel(data) {
    return this.http.post(CommonHelper.getUrl(FANCTORYMODEL_URL), JSON.stringify(data), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return <any>res.json()
    });
  }

   factoryModelView(id) {
    return this.http.get(CommonHelper.getUrl(VIEW_URL + id)).toPromise().then((res: Response) => {
      return res.json()
    });
  }

  factoryModelUpdata(id, data) {
    return this.http.put(CommonHelper.getUrl(UPDATE_URL + id), JSON.stringify(data), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return res.json()
    });
  }

  Search(page: string, rows: string, no: string) {
        return this.http.get(CommonHelper.getUrl(FANCTORYMODEL_URL) + '&page=' + page + '&rows=' + rows + '&no=' + encodeURIComponent(no)).toPromise().then((res: Response) => {
            return res.json()
        });
    }

  delete(id: string) {
    return this.http.delete(CommonHelper.getUrl(DELECT_URL + id), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return res.json()
    });
  }

  getModel(){
   return this.http.get(CommonHelper.getUrl(MODEL_URL), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return res.json()
    });
 };

  // 获取上级工厂模型类型下拉数据
 getModelType (id){
   return this.http.get(CommonHelper.getUrl(MODEL_TYPE)+'&id='+id, CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return res.json()
    });
 };

 // 获取上级工厂模型类型下拉数据
 getAccountBookInfo (){
   return this.http.get(CommonHelper.getUrl(ACCOUNT_BOOK_INFO), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return res.json()
    });
 };
}
