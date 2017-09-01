
import { Injectable ,EventEmitter } from '@angular/core';
import { SERVICE_BASE_ADDR } from '../../utils/utils';
import { Http, Response, Headers } from '@angular/http';
import { CommonHelper } from '../../utils/common.helper';
import { BaseService } from "../../base/base.service";


const VERSION = "v1";
const FUNCTION_CODE = "";
// 获取主界面的list
const FANCTORYMODEL_TYPE_URL = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModelTypes/";
// 新增工厂模型类型数据
const CREATE_URL  = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModelTypes/";
// 编辑工厂模型类型数据
const UPDATE_URL  = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModelTypes/";
// 删除工厂模型类型数据
const DELECT_URL  = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModelTypes/";
// 获取上级工厂模型下拉数据
const PARENT_MODEL_TYPE = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModelType/Catalogue/"

@Injectable()
export class FactoryModelTypeService extends BaseService {

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
  getFactoryModelTypeList(page: string, rows: string) {

    return this.http
      .get(CommonHelper.getUrl(FANCTORYMODEL_TYPE_URL) + '&page=' + page + '&rows=' + rows )
      .toPromise()
      .then((res: Response) => {
        return res.json()
      });
  }

  saveFactoryModelType(data) {
    return this.http.post(CommonHelper.getUrl(CREATE_URL), JSON.stringify(data), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return <any>res.json()
    });
  }

   factoryModelTypeView(id) {
    return this.http.get(CommonHelper.getUrl(UPDATE_URL + id)).toPromise().then((res: Response) => {
      return res.json()
    });
  }

  factoryModelTypeUpdata(id, data) {
    return this.http.put(CommonHelper.getUrl(UPDATE_URL + id), JSON.stringify(data), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return res.json()
    });
  }

  Search(page: string, rows: string, no: string) {
        return this.http.get(CommonHelper.getUrl(FANCTORYMODEL_TYPE_URL) + '&page=' + page + '&rows=' + rows + '&no=' + encodeURIComponent(no)).toPromise().then((res: Response) => {
            return res.json()
        });
    }


  delete(id: string) {
    return this.http.delete(CommonHelper.getUrl(DELECT_URL + id), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return res.json()
    });
  }

  getParentModelType(){
     return this.http.get(CommonHelper.getUrl(FANCTORYMODEL_TYPE_URL ), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return res.json()
    });
  }
}
