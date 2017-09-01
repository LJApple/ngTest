import { BaseModel } from "app/base/base.model";
/**
 * 功能信息model
 */
export class FunctionUnit extends BaseModel {
    table_name: string;
    function_code: string;
    value: string;
    description: string;
    is_delete: boolean;
    module_id: number;
    module_code: string;
    module_name: string;
    index: number;
    url: string;
    type: number;
    partial_view_path: string;
    model_name: string;
    level: number;
    parent_id: number;
    children: Array<FunctionUnit>;
    active: boolean;
}
