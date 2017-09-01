/**
 * 账套信息类
 */
export class AccountBook {

    public text: string;
    /**
     * 构造函数
     * @param id 账套id
     * @param no 账套编号
     * @param name 账套名称
     * @param text 账套名称
     * @param state 账套状态
     * @param createTime 账套创建时间
     */
    constructor(public id: number, public no: string, public name: string, public state: number, public createtime: string) {

    }

}
/**
* 账套状态
*/
export enum BookState {
    /**
    * 禁用 值为0
    */
    Disable = 0,
    /**
    * 启用 值为1
    */
    Enable = 1
};
