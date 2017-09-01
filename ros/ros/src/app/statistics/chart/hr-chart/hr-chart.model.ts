import { BaseModel } from "app/base/base.model";
/**
 * 年度各月员工变动 model
 */
export class HrchartModel extends BaseModel {
    entrydata: Array<any>; /*本月入职数*/
    "ordinate": Object; /*所属月份*/
    "quitdata": Array<any>; /*本月离职数*/
    "xAxisData": Array<any>; /*所属年份*/
    "growth": Array<any>; /*本月净增值*/

}

