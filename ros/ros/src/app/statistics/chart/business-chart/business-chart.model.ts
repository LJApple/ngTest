import { BaseModel } from "app/base/base.model";
/**
 * 业务分析 model
 */
export class BusinessChart extends BaseModel {
    sales_amount: number; /*销售额*/
    timely_delivery_rate: number; /*出货及时率*/
    sales_return_rate: number; /*销售退货率*/
    normal_qunatity: number; /*正常出货量*/
    max_amount: number;/*近12个月最大值*/
    abnormal_qunatity: number;/*延期出货量*/
    return_quantity: number;/*退货量*/
    sales_quantity: number;/*销售总量*/
    sales_rank: Array<any>; /*销售排名*/
    customer_top10_list: Array<any>; /*客户排行*/
    product_top10_list: any; /*产品排行*/
}