import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import * as _ from 'lodash';

@Component({
    selector: 'app-function-create-base',
    templateUrl: './function-create-base.component.html',
    styleUrls: ['./function-create-base.component.scss']
})
export class FunctionCreateBaseComponent implements OnInit {

    // 表单模型
    public formModel;
    // 字段配置
    public fieldConfig;

    constructor(protected formBuilder: FormBuilder) {

    }

    ngOnInit() {
    }

    // 初始化表单Model
    protected initFormModel() {

        let groupConfig = {};
        _.forEach(this.fieldConfig, function (item) {
            groupConfig[item.name] = [''];
        });

        this.formModel = this.formBuilder.group(groupConfig);
    }
}
