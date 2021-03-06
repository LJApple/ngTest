import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FactoryModelService } from "app/system/factory-model/factory-model.service";
import { Observable } from 'rxjs';
import { codeValidator, normalTextValidator, mobileNumber } from "../../../admin/validator/validators";
import { MainTabService } from "../../../admin/main-tab/main-tab.service";
import { FactoryModelTypeService } from "app/system/factory-model-type/factory-model-type.service";

@Component({
    selector: 'app-factory-model-update',
    templateUrl: './factory-model-update.component.html',
    styleUrls: ['./factory-model-update.component.scss']
})

export class FactoryModelUpdateComponent implements OnInit {

    public functionCode = 'factory_model_update';
    formModel: FormGroup;
    public id: string;
    public formData: any;
    public updateData: any;
    public alertMsg: any = [];
    public flag: boolean;
    public type: number = 1;
    public isParentIdHide: boolean = true;
    public isModelTypeHide: boolean = true;

    // 上级工厂模型
    public parentModelOptions: any;
    // 模型类型
    public modelTypeOptions: any;



    constructor(private Fbuilder: FormBuilder,
        private mianTabService: MainTabService,
        private factoryModelService: FactoryModelService,
        private factoryModelTypeService: FactoryModelTypeService) {
        this.formModel = Fbuilder.group({
            'no': ['', codeValidator],
            'name': ['', normalTextValidator],
            'parent_id': ['', Validators.required],
            'factory_model_type_id': ['', Validators.required],
            'manager': [''],
            'manager_contact': ['', mobileNumber],
            'description': [''],
            'status': true,
            'accountBook': ['账套']
        })
    }

    ngOnInit() {
        const self = this;

        if (this.factoryModelService.rowData) {
            this.id = this.factoryModelService.rowData.id;
        }


        //  获取账套信息
        Observable.fromPromise(this.factoryModelService.getAccountBookInfo()).subscribe(data => {

            if (data.result.success == 1) {
                this.formModel.patchValue({
                    'accountBook': data.result.extra.name,
                });
            }
        });

        Observable.fromPromise(this.factoryModelService.factoryModelView(this.id)).subscribe(data => {

            this.formModel.patchValue({
                'no': data.result.extra.no,
                'name': data.result.extra.name,
                'parent_id': data.result.extra.parent_id,
                'factory_model_type_id': data.result.extra.factory_model_type_id,
                'manager': data.result.extra.manager,
                'manager_contact': data.result.extra.manager_contact,
                'description': data.result.extra.description,
                'status': data.result.extra.status,
            });

            // 获取工厂模型下拉数据
            Observable.fromPromise(this.factoryModelService.getModelType(self.formModel.value.parent_id)).subscribe(data => {

                if (data.result.success == 1) {
                    self.modelTypeOptions = data.result.extra
                }
            });

            // 获取上级工厂模型下拉数据
            Observable.fromPromise(this.factoryModelService.getModel()).subscribe(data => {

                if (data.result.extra.length > 0) {
                    self.parentModelOptions = data.result.extra;
                } else {
                    return;
                }
            });
        });
    }

    // 获取上级工厂模型事件
    nzOpenChange(event) {

        const self = this;
        let parentId = this.formModel.value.parent_id;
        if (!parentId) {
            self.modelTypeOptions = [];
            return;
        }
        Observable.fromPromise(self.factoryModelService.getModelType(parentId)).subscribe(data => {
            if (data.result.success == 1) {
                self.modelTypeOptions = data.result.extra;
            }
        });
    };

    // 提示判断
    onParentIdSelectedt() {
        this.isParentIdHide = false;
    };

    // 提示判断
    onModelTypeSelectedt() {
        this.isModelTypeHide = false;
    };

    //  模型类型
    nzOpenChangeType(event) {

        const self = this;
        let parentId = this.formModel.value.parent_id;
        if (!parentId) {
            self.modelTypeOptions = [];
            self.isModelTypeHide = true;
        }
    };

    // 提交表单
    saveFrom() {

        const self = this;
        let noValid: boolean = this.formModel.get('no').valid;
        let nameValid: boolean = this.formModel.get('name').valid;
        let parentIdValid: boolean = this.formModel.get('parent_id').valid;
        let typeIdValid: boolean = this.formModel.get('factory_model_type_id').valid;
        let mobileValue: boolean = this.formModel.get('manager_contact').value;
        let mobileValid: boolean = this.formModel.get('manager_contact').valid;
        // console.log(this.formModel.value)

        if (mobileValue) {
            if (!mobileValid) {
                return
            }
        }

        if (noValid && nameValid && parentIdValid && typeIdValid) {

            Observable.fromPromise(this.factoryModelService.factoryModelUpdata(this.id, this.formModel.value)).subscribe(data => {

                this.formData = data.result;

                if (data.result.success == 1) {

                    self.alertMsg.push({
                        type: "success",
                        msg: data.result.err_msg,
                        timeout: 2000
                    })
                    // 关闭新增页面
                    this.mianTabService.onTabRemove.emit(this.functionCode);
                    // 更新数据网格的数据
                    self.flag = true;
                    const tempData = {
                        flag: self.flag,
                        data: data.result.extra,
                        msg: data.result.err_msg,
                        type: self.type
                    };
                    self.factoryModelService.isUpdateSuccess.emit(tempData);
                } else {
                    self.alertMsg.push({
                        type: "danger",
                        msg: data.result.err_msg,
                        timeout: 2000
                    })
                }
            });
        } else {
            self.alertMsg.push({
                type: "danger",
                msg: "请按要求填写数据!",
                timeout: 2000
            });
        }
    }

    // 取消保存
    canceledit() {
        this.mianTabService.onTabRemove.emit(this.functionCode);
    }

    // 时间格式化
    FormatDate(strTime) {
        return strTime.getFullYear() + "-" + (strTime.getMonth() + 1) + "-" + strTime.getDate();
    }
}
