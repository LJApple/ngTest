
import { BaseModel } from "app/base/base.model";
/**
 * 系统模块model
 */
export class Module extends BaseModel {
    name: string;
    code: string;
    description: string;
    index: number;
    url: string;
    image_class: string;
    small_text: string;
    active: boolean;
}
