import { BaseModel } from "app/base/base.model";
/**
 * 人事分析 - 打卡记录- model
 */
export class EmployeeClockModel extends BaseModel {
    
    "defaultDate": string;
    "mouth": string;
    "eventOne": Array<any>;
    "eventTwo": Array<any>;
}

