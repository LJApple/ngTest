import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MainTabService} from "app/admin/main-tab/main-tab.service";
import {codeValidator, identifierValidator, normalTextValidator} from "../../../admin/validator/validators";
import {BadCodeTypeService} from "../bad-code-type.service";
import {Observable} from 'rxjs';

@Component({
    selector: 'app-bad-code-type-create',
    templateUrl: './bad-code-type-create.component.html',
    styleUrls: ['./bad-code-type-create.component.scss']
})
export class BadCodeTypeCreateComponent implements OnInit {

    public Code = 'bad_type_code_create';
    formModel: FormGroup;
    public flag: boolean;
    public alertMsg: any = [];
    public type = 1;
    public submitData: any = {
        no: '',
        name: '',
        status: '',
        bad_code: [],
        procedure: [],
    };

    constructor(private mianTabService: MainTabService,
                private fb: FormBuilder,
                private badCodeTypeService: BadCodeTypeService) {
        this.formModel = fb.group({
            'no': ['', codeValidator],
            'name': ['', normalTextValidator],
            'status': true,
            'bad_code': ['']
        })
    }

    ngOnInit() {
    }

    getCheckeds(event) {
        this.submitData.bad_code = event.chechedArr;
        this.submitData.status = event.state;
        console.log(this.submitData);
    }


    // 提交表单
    submitFrom() {
        const self = this;
        // 表单验证
        const noValid: boolean = this.formModel.get('no').valid;
        const nameValid: boolean = this.formModel.get('name').valid;
        const no = this.formModel.get('no').value;
        const name = this.formModel.get('name').value;
        this.submitData.no = no;
        this.submitData.name = name;

        if (noValid && nameValid) {
            console.log(self.submitData);
            Observable.fromPromise(this.badCodeTypeService.submitData(self.submitData)).subscribe(data => {
                console.log(data);
                /*if (data.code === 1) {
                    self.alertMsg.push({
                        type: "success",
                        msg: "添加成功",
                        timeout: 2000
                    })
                    // 关闭新增页面
                    this.mianTabService.onTabRemove.emit(this.Code);
                    // 更新数据网格的数据
                    self.flag = true;
                    const tempData = {
                        flag: self.flag,
                        data: data.data,
                        msg: data.message,
                        type: self.type
                    };
                    self.badCodeTypeService.isUpdateSuccess.emit(tempData);
                } else {
                    self.alertMsg.push({
                        type: "danger",
                        msg: data.result.err_msg,
                        timeout: 2000
                    })
                }*/
            })
        } else {
            self.alertMsg.push({
                type: "danger",
                msg: '请按要求填写数据，带的 * 是必填项!',
                timeout: 2000
            })
        }
    }

    // 取消保存
    canceledit() {
        this.mianTabService.onTabRemove.emit(this.Code);
    }
}
