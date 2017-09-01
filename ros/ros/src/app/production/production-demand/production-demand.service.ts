import { Injectable, EventEmitter } from '@angular/core';
import { SERVICE_BASE_ADDR } from "app/utils/utils";
import { Http, Response } from "@angular/http";
import { CommonHelper } from '../../utils/common.helper';
import { BaseService } from "../../base/base.service";


/**
 * 请求
 */
const VERSION = "v1";

// 获取主页面的list
const PRODUCTION_DEMAN_URL = SERVICE_BASE_ADDR + VERSION + "/admin/FactoryModelTypes/";

@Injectable()
export class ProductionDemandService extends BaseService {
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
  // 主页面表格接口
  getProductionDemandList(page: string, rows: string) {
    return this.http
      .get(CommonHelper.getUrl(PRODUCTION_DEMAN_URL) + "&page=" + page + "&rows=" + rows)
      .toPromise()
      .then((res: Response) => {
        return res.json();
      });

  }
  // 查询接口
  searchDetail(page: string, rows: string, no: string) {
    console.log(CommonHelper.getUrl(PRODUCTION_DEMAN_URL) + "&page=" + page + "&rows=" + rows + "&no=" + no);
    return this.http.get(CommonHelper.getUrl(PRODUCTION_DEMAN_URL) + "&page=" + page + "&rows=" + rows + "&no=" + no)
      .toPromise().then((res: Response) => {
        console.log(res);
        return res.json();
      });
  }
  // 新增保存接口
  saveFactoryModelType(data) {
    return this.http.post(CommonHelper.getUrl(PRODUCTION_DEMAN_URL), JSON.stringify(data), CommonHelper.getJSONRequestOptions()).toPromise().then((res: Response) => {
      return <any>res.json()
    });
  }
  // 获取上级工厂模型数据select
  getParentModelType() {
    return this.http.get(CommonHelper.getUrl(PRODUCTION_DEMAN_URL),CommonHelper.getJSONRequestOptions()).toPromise().then((res:Response) => {
      return res.json()
    });
  }
  // 删除表格行数据
  deletRow(id: string) {
    return this.http.delete(CommonHelper.getUrl(PRODUCTION_DEMAN_URL+id),CommonHelper.getJSONRequestOptions()).toPromise().then((res:Response) => {
      return res.json();
    });
  }
   // 更新接口
   factoryModelTypeUpdata(id ,data) {
    return this.http.put(CommonHelper.getUrl(PRODUCTION_DEMAN_URL+id),JSON.stringify(data),CommonHelper.getJSONRequestOptions()).toPromise().then((res:Response) => {
      return res.json();
    });
  }
   // 查看接口
   factoryModelTypeView(id) {
    return this.http.get(CommonHelper.getUrl(PRODUCTION_DEMAN_URL+id)).toPromise().then((res:Response) => {
      return res.json();
    });
  }
}
