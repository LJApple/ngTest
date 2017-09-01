/**
 * web请求响应信息类
 */
export class HttpResult {
    /**
     *  构造函数
     * @param success 请求是否成功
     * @param errorMessage 请求响应消息
     * @param extra 请求额外响应内容
     * @param extra2 请求额外响应内容2
     */
    constructor(public success: boolean, public err_msg: string, public extra: any = null, public extra2: any = null) {

    }
}

/**
 * 后端服务基地址
 * 注意：为本地调试做的调整不要提交到代码库
 */

export const SERVICE_BASE_ADDR: string = 'http://test-api.xin3wei.com/'; // 测试环境接口地址

// export const SERVICE_BASE_ADDR: string = 'http://inner-qa04-ros.xin3wei.com/';
// export const SERVICE_BASE_ADDR: string = 'http://inner-qa05-ros.xin3wei.com/';
// export const SERVICE_BASE_ADDR: string = 'http://localhost';
// export const SERVICE_BASE_ADDR: string = 'http://192.168.1.99/';
// export const SERVICE_BASE_ADDR: string = 'http://192.168.1.16:8080/';
// export const SERVICE_BASE_ADDR: string = 'http://ros.dev/';
// export const SERVICE_BASE_ADDR: string = 'http://192.168.0.125/'; // 仁海
