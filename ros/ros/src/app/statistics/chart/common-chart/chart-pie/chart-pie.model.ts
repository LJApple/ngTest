import { FunctionUnit } from "app/admin/function-unit/function-unit.model";

export class ChartPie {
    title: string; //大标题
    show_rate: number; //需要显示的百分率
    show_rate_text: string; //显示的百分率的文字
    show_rate_title: string; //显示百分率的标题
    rec_one_text: string; //一级介绍文字
    rec_one_value: any; //一级介绍值
    rec_two_text: string; //二级介绍文字
    rec_two_value: any; //二级介绍值
    rec_unit: string; //介绍值单位
    rec_unit_atPev: boolean; //单位显示位置（前，后）
    drill_target_code: string;//钻取参数
}
