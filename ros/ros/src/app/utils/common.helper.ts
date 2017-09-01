import {Http, Response, RequestOptions, Headers} from '@angular/http';
import * as _ from 'lodash';

/**
 * 公共辅助类
 */
export class CommonHelper {

    /**
     * 获取表单x-www-form-urlencoded提交参数
     */
    public static getFormRequestOptions() {
        const opts: RequestOptions = new RequestOptions();
        opts.headers = new Headers();
        opts.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        opts.withCredentials = true;
        return opts;
    }

    /**
     * 获取json提交参数
     */
    public static getJSONRequestOptions() {
        const opts: RequestOptions = new RequestOptions();
        opts.headers = new Headers();
        //opts.headers.append('Content-Type', 'application/json');
        opts.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        opts.withCredentials = true;
        return opts;
    }

    /**
     * 根据参数构建url 追加token参数
     * @param baseUrl
     * @param params
     */
    public static getUrl(baseUrl: string, params: any = null): string {
        let temp: string = baseUrl;
        if (params) {
            _.forEach(params, function (value, key) {
                temp += '/' + key + '/' + value;
            });
        }

        // 从cookies中获取token，拼接到url
        var arr, reg = new RegExp("(^| )accessToken=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            temp += '?token=' + arr[2];
        }
        return temp;
    }

    /**
     * 判断用户是否已登录
     */
    public static isLogined(): boolean {

        let accessToken = null;
        let arr, reg = new RegExp("(^| )accessToken=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            accessToken = arr[2];
        }
        return accessToken && accessToken.length > 0;
    }


    /**
     * 操作形式定义
     */
    public static HANDLE_TYPE = {

        TAB: 1, // 新增页签
        HANDLER: 2, // 自定义操作
    }

    /**
     * 操作形式定义
     */
    public static onContextClick($event) {
        return false;
    }

    // 系统组件尺寸
    public static WIDGET_SIZE = {

        HEIGHT: {
            HEADER: 50, // 系统头部
            FILTER_BAR: 65, // 主列表筛选栏
            FOOTER: 0, // 系统脚部
            MASTER_LIST_HEADER: 38, // 主列表头部高度
            MASTER_LIST_ROW: 38, // 主列表行高度
        }
    }
}

export const HEADER_AND_FOOTER_HEIGHT: number = 165;
