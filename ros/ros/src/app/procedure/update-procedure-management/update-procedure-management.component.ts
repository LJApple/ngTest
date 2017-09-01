import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { GridOptions } from "ag-grid/main";
import { Observable, Subscription } from 'rxjs/Rx';

import { MainTabService } from "app/admin/main-tab/main-tab.service";
import { ProcedureDescriptionComponent } from '../create-procedure-management/procedure-description/procedure-description.component';
import { ProcedureStationGridUpdateComponent } from '../update-procedure-management/procedure-station-grid-update/procedure-station-grid-update.component';
import { ProcedureAttributeComponent } from '../create-procedure-management/procedure-attribute/procedure-attribute.component';
import { ProcedureBarCodeComponent } from '../create-procedure-management/procedure-bar-code/procedure-bar-code.component';
import { UpdateProcedureManagementService } from "app/procedure/update-procedure-management/update-procedure-management.service";
import { ProcedureManagementService } from "app/procedure/procedure-management/procedure-management.service";
import { SelectService } from 'app/admin/select/select.service';
import { CreateProcedureManagementService } from "app/procedure/create-procedure-management/create-procedure-management.service";
@Component({
  selector: 'app-update-procedure-management',
  templateUrl: './update-procedure-management.component.html',
  styleUrls: ['./update-procedure-management.component.scss']
})
export class UpdateProcedureManagementComponent implements OnInit {


  @ViewChild(ProcedureDescriptionComponent) descriptionChild: ProcedureDescriptionComponent;
  @ViewChild(ProcedureStationGridUpdateComponent) stationChild: ProcedureStationGridUpdateComponent;
  @ViewChild(ProcedureAttributeComponent) attributeChild: ProcedureAttributeComponent;
  @ViewChild(ProcedureBarCodeComponent) barCodeChild: ProcedureBarCodeComponent;
  public procedureFormModel: FormGroup;
  public tempModel: any;
  public statusId;
  public barcodeTypeId;
  private id;
  public formData: any;
  private functionCode = 'procedure_management_update';
  public flag: boolean; // 是否成功
  public alertMsg: any = [];
  public updateData: any;
  public type: number = 2;
  public switchActive = true;
  public switchActiveStations = true;

  constructor(Fbuilder: FormBuilder,
    private mainTabService: MainTabService,
    private updateProcedureManagementService: UpdateProcedureManagementService,
    private createProcedureManagementService: CreateProcedureManagementService,
    private procedureManagementService: ProcedureManagementService,
    private selectService: SelectService) {
    this.procedureFormModel = Fbuilder.group({
      'no': ['', [Validators.required]],
      'name': ['', [Validators.required]],
      'status': ['', [Validators.required]],
      'description': [''],
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


    const self = this;


    // 加载编辑dd的数据
    this.id = this.procedureManagementService.rowData.id;

    Observable.fromPromise(this.updateProcedureManagementService.getDpdateFormData(this.id)).subscribe(data => {

      console.log(data)
      this.formData = data.data;
      if (data.code == 0) {

        this.procedureFormModel.setValue({
          'no': this.formData.no,
          'name': this.formData.name,
          'status': this.formData.status,
          'description': this.formData.description,
          'attributes': this.formData.attributes,
          'barcode_type': this.formData.barcode_type,
          'barcode_rule_type': this.formData.barcode_rule_type,
          'barcode_rule': this.formData.barcode_rule,
          'barcode_id': this.formData.barcode_id,
          'barcode_text': this.formData.barcode_text,
          'stations': this.formData.stations
        });
      }

      //  序列号检验规则
      if (this.formData.barcode_type && this.formData.barcode_rule_type) {

        let ruleTypeData = {
          barcodeRule: self.formData.barcode_rule,
          barcodeRuleType: self.formData.barcode_rule_type,
        }
        self.updateProcedureManagementService.barcodeTypeValue.emit(ruleTypeData)
      }
    });
  }

  // 编辑提交
  onProcedureUpdate() {

    const self = this;
    let stationArr = [];
    let attributeArr = []
    let noValid: boolean = this.procedureFormModel.get('no').valid;
    let noValue: boolean = this.procedureFormModel.get('no').value;
    let nameValid: boolean = this.procedureFormModel.get('name').valid;
    let nameValue: boolean = this.procedureFormModel.get('name').value;
    this.stationChild.gridOptions.api.stopEditing();
    this.attributeChild.gridOptions.api.stopEditing();

    // 工序工位明细列表数据获取
    this.stationChild.gridOptions.api.forEachNode(function (node) {

      stationArr.push(node.data.id)
    });
    // 工序属性明细列表数据获取
    this.attributeChild.gridOptions.api.forEachNode(function (node) {
      attributeArr.push(node.data)
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

    console.log(this.tempModel)

    if (this.procedureFormModel.value["barcode_type"] && !this.procedureFormModel.value["barcode_rule"]) {

      this.alertMsg.push({
        type: "danger",
        msg: '请填写完整条码规则对应的条码校验规则',
        timeout: 2000
      });
      return;
    } else if (this.procedureFormModel.value["barcode_rule"] && !this.procedureFormModel.value["barcode_type"]) {

      this.alertMsg.push({
        type: "danger",
        msg: '请填写完整条码校验规则对应的条码规则',
        timeout: 2000
      });
      return;
    }
    // 工序表单必填项验证
    if (noValid && nameValid && !this.procedureFormModel.value["barcode_type"] && !this.procedureFormModel.value["barcode_rule"]
      || noValid && nameValid && this.procedureFormModel.value["barcode_type"] && this.procedureFormModel.value["barcode_rule"]) {

      Observable.fromPromise(this.updateProcedureManagementService.updateFormData(this.id, this.tempModel)).subscribe(data => {

        if (data.code == 0) { // 保存成功
          self.flag = true;
          self.alertMsg.push({
            type: "success",
            msg: data.message,
            timeout: 2000
          });
          self.updateData = {
            flag: self.flag,
            data: data.data,
            msg: data.message,
            type: self.type
          };
          self.procedureManagementService.isUpdateSuccess.emit(self.updateData);
          self.mainTabService.onTabRemove.emit(this.functionCode);
        } else { // 保存失败

          self.alertMsg.push({
            type: "danger",
            msg: data.message,
            timeout: 2000
          });
          return;
        }

      });
    } else {
      this.alertMsg.push({
        type: "danger",
        msg: '请按要求填写数据 ',
        timeout: 2000
      });
    }

  };

  // 取消编辑
  cancelUpdate() {
    this.mainTabService.onTabRemove.emit(this.functionCode);
  }

  switch(code) {
    let self = this;
    if (code == "attributes" && self.switchActive) {
      self.switchActive = false;
      self.updateProcedureManagementService.attributesValue.emit(self.formData.attributes)
    } else if (code == "stations" && self.switchActiveStations) {
      self.switchActiveStations = false;
      self.updateProcedureManagementService.stationValue.emit(self.formData.stations);
    }
  };
}
