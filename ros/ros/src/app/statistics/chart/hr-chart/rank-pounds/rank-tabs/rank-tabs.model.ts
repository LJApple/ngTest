import { BaseModel } from "app/base/base.model";
/**
 * 人事分析 - 排行版- model
 */
export class rankTabsModel extends BaseModel {

        "title":string;
        "active": boolean;
        "employeeDetail":Array<any>;
}

