import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/retry';

import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { Router } from "@angular/router";
import { AccountBook, BookState } from './account-book.model';
import * as _ from 'lodash';
const BOOK_BASE_URL = SERVICE_BASE_ADDR + '/accountbook/AccountBook';

@Injectable()
export class AccountBookService {
    /**
    * 账套列表
    */
    public list: Observable<AccountBook[]>;
    /**
    * 有效账套列表
    */
    public validList: Observable<AccountBook[]>;
    constructor(private http: Http, private router: Router) {
        let url: string = BOOK_BASE_URL + "/accountBookList";
        this.list = this.http.get(url, { withCredentials: true }).map(response => {
            let temp: AccountBook[] = <AccountBook[]>response.json();
           //处理text属性的值,为了赋予账套下拉使用
            let result = temp.map(book => {
                book.text = book.name;
                return book;
            })
            return result;
        });
        this.validList = this.list.map((books: AccountBook[]) => {
            return _.filter(books, (book: AccountBook) => {
                return book.state == BookState.Enable;
            });
        });
    }




}
