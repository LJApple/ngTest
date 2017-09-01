import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseService } from "app/base/base.service";
import { CommonHelper } from "app/utils/common.helper";

/**
 * 用户后端服务基地址
 */
const BASE_URL = SERVICE_BASE_ADDR + '/User';

declare var $: any;
/**
 * 密码更改服务
 */
@Injectable()
export class ChangePasswordService extends BaseService {


    constructor(private http: Http, private router: Router) {
        super();

    }
    changePassword(formValue: any) {
        //设置正在登录
        this.isProcessing = true;
        //发送登录请求
        this.http.post(BASE_URL + '/ChangePassword', $.param(formValue), CommonHelper.getFormRequestOptions()).subscribe((res: Response) => {
            //获取登录响应
            const temp: any = res.json().result;
            this.result = <HttpResult>(temp);

            //如果修改密码成功
            if (this.result.success) {

                //如果是 则跳转到主界面工作台
                this.router.navigate(['index']);

            }
            this.isProcessing = false;
        });
    }

}
