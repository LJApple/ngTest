import { Component, OnInit } from '@angular/core';
import { SERVICE_BASE_ADDR } from "app/utils/utils";
import { Http, Response, } from '@angular/http';
import { LoginService } from './login.service';
import { IOption } from 'ng-select';
import { AccountBookService } from "app/fms/account-book/account-book.service";

/**
 * 登录页组件
 */
@Component({
    selector: 'ros-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    /**
    * captcha刷新url
    */
    refreshUrl: string = SERVICE_BASE_ADDR + "/site/captcha?refresh=1";
    /**
    * captcha图片获取url
    */
    captchaUrl: string = SERVICE_BASE_ADDR + "/site/captcha";
    /**
    * 选中的账套id
    */
    account_id: number;
    /**
    * 是否首次加载
    */
    isFirstLoad: boolean = true;

    public accountBookData: Array<Object> = [
        { 'id': 1, 'text': '开发账套' },
        { 'id': 2, 'text': '测试账套' }
    ];

    constructor(private http: Http, public loginService: LoginService, public bookService: AccountBookService) {

    }

    ngOnInit() {

    }

    /**
     * 刷新captcha
     */
    refreshCaptcha(): boolean {
        this.http.get(this.refreshUrl, { withCredentials: true }).subscribe((res: Response) => {
            var data: object = res.json();
            console.log(data);
            this.captchaUrl = SERVICE_BASE_ADDR + data['url'];
        });
        return false;
    }
    /**
     * 用户登录
     * @param formValue
     */
    onLogin(formValue: any) {

        //账套下拉控件返回的是一个数组,且数组中为SelectItem项 所以需要做处理 直接返回选中的账套id
        formValue["LoginForm[account_id]"] = this.account_id;

        this.isFirstLoad = false;
        this.loginService.login(formValue);
        return false;
    }
    /**
     * 账套选中事件
     */
    onAccountSelected(event: any) {
        this.account_id = event.id;
    }
}
