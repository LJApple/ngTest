/**
 * model基类
 */
export class BaseModel {
    id: number;
    is_delete: boolean;
    version: number;
    creatorid: number;
    createtime: string;
    updatorid: number;
    updatetime: string;
}
