import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { GridOptions } from "ag-grid/main";
import { ProcedureDescriptionComponent } from '../create-procedure-management/procedure-description/procedure-description.component';
import { ProcedureStationGridComponent } from '../create-procedure-management/procedure-station-grid/procedure-station-grid.component';
import { ProcedureAttributeComponent } from '../create-procedure-management/procedure-attribute/procedure-attribute.component';
import { ProcedureBarCodeComponent } from '../create-procedure-management/procedure-bar-code/procedure-bar-code.component';
import { CreateProcedureManagementService } from "app/procedure/create-procedure-management/create-procedure-management.service";
import { ProcedureManagementService } from "app/procedure/procedure-management/procedure-management.service";
import { Observable, Subscription } from 'rxjs/Rx';
import { codeValidator } from "app/admin/validator/validators";
import { MainTabService } from "app/admin/main-tab/main-tab.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-create-procedure-management',
    templateUrl: './create-procedure-management.component.html',
    styleUrls: ['./create-procedure-management.component.scss']
})
export class CreateProcedureManagementComponent implements OnInit {

    @ViewChild(ProcedureDescriptionComponent) descriptionChild: ProcedureDescriptionComponent;
    @ViewChild(ProcedureStationGridComponent) stationChild: ProcedureStationGridComponent;
    @ViewChild(ProcedureAttributeComponent) attributeChild: ProcedureStationGridComponent;
    @ViewChild(ProcedureBarCodeComponent) barCodeChild: ProcedureBarCodeComponent;
    public functionCodeCreate = 'create_procedure_management'
    public procedureFormModel: FormGroup;
    public tempModel: any;
    public flag: boolean; // 是否成功
    public alertMsg: any = [];
    public createData: any;
    public type: number = 1;
    public switchActive = true;
    public switchActiveStations = true;
    public attributeNoIsTrue;

    constructor(Fbuilder: FormBuilder,
        private createProcedureManagementService: CreateProcedureManagementService,
        private procedureManagementService: ProcedureManagementService,
        private mainTabService: MainTabService) {

        const self = this;
        procedureManagementService.afterUpdateSuccess.subscribe((flag) => {
            if (flag) {
                self.flag = false;
                // console.log(self.flag);
            }
        });
        this.procedureFormModel = Fbuilder.group({
            'no': ['', [Validators.required, codeValidator]],
            'name': ['', [Validators.required]],
            'status': ['', [Validators.required]],
            'description': ['', Validators.maxLength(64)],
            'attributes': [''],
            'barcode_type': [''],
            'barcode_rule_type': [''],
            'barcode_rule': [''],
            'barcode_id': [''],
            'barcode_text': [''],
            'stations': Fbuilder.array([

            ])

        });
    }

    ngOnInit() {

        this.createProcedureManagementService.attributesValue.emit("attributes");
        this.createProcedureManagementService.stationValue.emit("stations");
    }


    switch(code) {
        let self = this;
        if (code == "attributes" && self.switchActive) {
            self.switchActive = false;
            self.createProcedureManagementService.attributesValue.emit("attributes")
        } else if (code == "stations" && self.switchActiveStations) {
            self.switchActiveStations = false;
            self.createProcedureManagementService.stationValue.emit("stations");
        }
    };

    // 取消编辑
    cancelUpdate() {
        this.mainTabService.onTabRemove.emit(this.functionCodeCreate);
    }

    onSubmit() {

        const self = this;
        let stationArr = [];
        let attributeArr = []
        let noValid: boolean = this.procedureFormModel.get('no').valid;
        let noValue: boolean = this.procedureFormModel.get('no').value;
        let nameValid: boolean = this.procedureFormModel.get('name').valid;
        let nameValue: boolean = this.procedureFormModel.get('name').value;
        this.stationChild.gridOptions.api.stopEditing();
        this.attributeChild.gridOptions.api.stopEditing();

        if (!noValid || !nameValid) {
            this.alertMsg.push({
                type: "danger",
                msg: '请填写完必填项',
                timeout: 2000
            });
            return
        }

        // 工序工位明细列表数据获取
        this.stationChild.gridOptions.api.forEachNode(function (node) {

            stationArr.push(node.data.id);
        });
        // 工序属性明细列表数据获取

        this.attributeChild.gridOptions.api.forEachNode(function (node) {
          
            let reg = /^[0-9a-zA-Z]{1,16}$/;
            let msg = '请输入1-16位数字或英文字母的属性编号';
            let valid = reg.test(node.data.no);

            let nameReg = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,32}$/;
            let nameMsg = '请输入1-32位中文、数字或英文字母的属性名称';
            let nameValid = nameReg.test(node.data.name);

            if (!valid) {
                self.alertMsg.push({
                    type: "danger",
                    msg: msg,
                    timeout: 2000
                });
                self.attributeNoIsTrue = false;
                return;
            } else if (!nameValid) {
                self.alertMsg.push({
                    type: "danger",
                    msg: nameMsg,
                    timeout: 2000
                });
                self.attributeNoIsTrue = false;
                return;
            }
            else {
                self.attributeNoIsTrue = true;
                attributeArr.push(node.data);
            }
        });


        this.tempModel = {
            'no': this.procedureFormModel.value["no"],
            'name': this.procedureFormModel.value["name"],
            'status': this.procedureFormModel.value["status"],
            'description': this.procedureFormModel.value["description"],
            'stations': stationArr,
            'attributes': attributeArr,
            'barcode_type': this.procedureFormModel.value["barcode_type"],
            'barcode_rule_type': this.barCodeChild["barcode_rule_type"],
            'barcode_rule': this.procedureFormModel.value["barcode_rule"],
            'barcode_id': this.procedureFormModel.value["barcode_id"],

        };

        // 工序表单必填项验证
        if (noValid && nameValid && self.attributeNoIsTrue && !this.procedureFormModel.value["barcode_type"] && !this.procedureFormModel.value["barcode_rule"]
            || noValid && nameValid && self.attributeNoIsTrue && this.procedureFormModel.value["barcode_type"] && this.procedureFormModel.value["barcode_rule"]) {
            this.getData(this.tempModel)
        } /* else if(!noValid || !nameValid){
            this.alertMsg.push({
                type: "danger",
                msg: '请填写完必填项',
                timeout: 2000
            });
        } */

        if (this.procedureFormModel.value["barcode_type"] && !this.procedureFormModel.value["barcode_rule"]) {

            this.alertMsg.push({
                type: "danger",
                msg: '请填写完整条码规则对应的条码校验规则',
                timeout: 2000
            });
        } else if (this.procedureFormModel.value["barcode_rule"] && !this.procedureFormModel.value["barcode_type"]) {

            this.alertMsg.push({
                type: "danger",
                msg: '请填写完整条码校验规则对应的条码规则',
                timeout: 2000
            });
        }
        console.log(this.tempModel)
    };

    // 调用service中提交表单接口方法
    getData(data) {
        const self = this;
        Observable.fromPromise(this.procedureManagementService.createFormData(data)).subscribe(data => {

            if (data.code == 0) { // 保存成功
                self.flag = true;
                self.alertMsg.push({
                    type: "success",
                    msg: data.message,
                    timeout: 2000
                });
                self.createData = {
                    flag: self.flag,
                    data: data.data,
                    msg: data.message,
                    type: self.type
                };
                self.procedureManagementService.isUpdateSuccess.emit(self.createData);
                this.mainTabService.onTabRemove.emit(this.functionCodeCreate);
            } else { // 保存失败

                self.alertMsg.push({
                    type: "danger",
                    msg: data.message,
                    timeout: 2000
                });
                return;
            }
        });
    };
}

