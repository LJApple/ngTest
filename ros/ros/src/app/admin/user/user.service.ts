import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router } from "@angular/router";
import { CommonHelper } from "app/utils/common.helper";
import { User } from "./user.model";

const USER_BASIC_URL = SERVICE_BASE_ADDR + '/user';

@Injectable()
export class UserService {


    constructor(private http: Http, private router: Router) {
    }
    /**
     * 获取用户信息
     * @param id 用户id
     */
    getBasicUserInfo(id: number): Observable<User> {

        return this.http.get(CommonHelper.getUrl(USER_BASIC_URL + '/BasicInfo', { "id": id }), { withCredentials: true }).map((res: Response) => {
            return <User>res.json();
        });
    }
}
