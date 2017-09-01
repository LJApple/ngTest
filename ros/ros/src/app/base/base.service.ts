import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVICE_BASE_ADDR, HttpResult } from 'app/utils/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { IService } from 'app/base/iservice';

export class BaseService implements IService {
    /**
    * 是否正在处理
    */
    isProcessing: boolean = false;
    /**
    * 结果响应
    */
    result: HttpResult;
    /**
   * 重置结果
   */
    resetResult() {
        this.result = null;
    }
}
