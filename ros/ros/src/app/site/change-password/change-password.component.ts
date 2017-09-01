import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ChangePasswordService } from './change-password.service';
import { UserService } from "app/admin/user/user.service";
import { User } from "app/admin/user/user.model";
import { Observable } from 'rxjs/Observable';
/**
 * 修改密码组件
 */
@Component({
    selector: 'ros-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./../login/login.component.scss', './change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    userId: number;
    fromLogin: boolean = false;
    public user: User;
    constructor(
        private changeService: ChangePasswordService,
        private route: ActivatedRoute,
        private userService: UserService

    ) { }

    ngOnInit(): void {
        //从路由中获取用户id和请求来源
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                this.userId = Number.parseInt(params.get('userId'));
                this.fromLogin = new Boolean(params.get("fromLogin")).valueOf();
                this.userService.getBasicUserInfo(this.userId).subscribe(u => this.user = u);
            }
            );

    }
    onSubmit(formValue: any) {
        this.changeService.changePassword(formValue);
        return false;
    }

}
