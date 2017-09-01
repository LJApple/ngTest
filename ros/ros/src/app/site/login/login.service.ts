import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from 'app/utils/utils';
import { Router } from '@angular/router';
import { CommonHelper } from 'app/utils/common.helper';
import { BaseService } from 'app/base/base.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
/**
 * 登录请求地址
 */
const LOGIN_URL = SERVICE_BASE_ADDR + "/site/login";

declare var $: any;

/**
 * 登录服务
 */
@Injectable()
export class LoginService extends BaseService {

    constructor(private http: Http, private router: Router, private cookieService: CookieService) {
        super();
    }


    /**
     * 登录
     * @param info
     */
    public login(info: any) {
        // 设置正在登录
        this.isProcessing = true;
        // 发送登录请求
        this.http.post(LOGIN_URL, $.param(info), CommonHelper.getFormRequestOptions()).subscribe((res: Response) => {
            // 获取登录响应
            const temp: any = res.json().result;
            this.result = <HttpResult>(temp);

            // 如果成功登录
            if (this.result.success) {

                let expiredDate = new Date();
                // 设置token过期时间为3小时
                expiredDate.setHours(expiredDate.getHours() + 3);
                // 把token标记放到cookie中
                this.cookieService.put('accessToken', temp.extra.token, {expires: expiredDate});
                // 判断是否是第一次需要修改密码
                if (this.result.extra.change_password) {
                    // 如果是 则跳转到修改密码界面
                    this.router.navigate(['change-password', this.result.extra.userId, 1]);
                }
                // 否则直接登录到工作台
                else {
                    this.router.navigate(['index']);
                }
            }
            this.isProcessing = false;
        });
    }
}
