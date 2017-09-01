import { BaseModel } from "app/base/base.model";
/**
 * 年度各月员工变动 model
 */
export class ProductionchartModel extends BaseModel {
    "machine_utilization_rate": object; // 车间生产量统计
    "pre_production_order": object; // 上月车间生产量统计
    "production_order": object; // 车间产值排名
    "sums": object; // 几台利用率
    "workshop_output_value": object; // 几台利用率
}

export class ProductionDetailchartModel extends BaseModel {
    "plan_quantity": number;
    "sum_quantity": number;
    "complect_rate": number;
    "unqualified_rate": number;
    "production_count": number;
}
