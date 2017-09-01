import { Injectable } from '@angular/core';
import { SERVICE_BASE_ADDR } from '../../utils/utils';
import { Http, Response, Headers } from '@angular/http';
import { CommonHelper } from '../../utils/common.helper';

@Injectable()
export class BarcodeTemplateService {

    // 接口地址配置
    private URL = {
        // 主列表
        MASTER_LIST: SERVICE_BASE_ADDR + 'production/BarcodeTemplate/MasterList',
        // 查看
        VIEW: SERVICE_BASE_ADDR + 'production/BarcodeTemplate/view',
    }

    // 请求头配置
    private HEADERS = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    constructor(private http: Http) { }

    getListData(data): Promise<any> {

        return this.http
            .post(CommonHelper.getUrl(this.URL.MASTER_LIST), $.param(data), { headers: this.HEADERS })
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    }

    getModel(data): Promise<any> {

        return this.http
            .post(CommonHelper.getUrl(this.URL.VIEW), $.param(data), { headers: this.HEADERS })
            .toPromise()
            .then((res: Response) => { return <any>res.json() });
    }
}
