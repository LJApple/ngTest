import { FunctionUnit } from "app/admin/function-unit/function-unit.model";

export class ChartTable {
    title:string; //表格标题
    href: string; //“更多”跳转地址
    head: Array<any>; //表格头
    data: any; //表格数据
    drill_target_code: string;//钻取参数
}
