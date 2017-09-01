import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommonHelper } from 'app/utils/common.helper';

/**
 * 是否已登录路由验证
 */
@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor() { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const isLoggedIn = CommonHelper.isLogined();
        return isLoggedIn;
    }
}
