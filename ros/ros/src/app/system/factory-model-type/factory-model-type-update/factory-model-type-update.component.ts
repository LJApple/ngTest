import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FactoryModelTypeService } from "app/system/factory-model-type/factory-model-type.service";
import { Observable } from 'rxjs';
import { identifierValidator, normalTextValidator } from "../../../admin/validator/validators";
import { MainTabService } from "../../../admin/main-tab/main-tab.service";


@Component({
  selector: 'app-factory-model-type-update',
  templateUrl: './factory-model-type-update.component.html',
  styleUrls: ['./factory-model-type-update.component.scss']
})
export class FactoryModelTypeUpdateComponent implements OnInit {

  private functionCode = 'factory_model_type_updata';
  updateFanctoryModel: FormGroup;
  public id: string;
  public formData: any;
  updateData: any;
  public code: any;
  public flag: boolean;
  public type: number = 2;
  public active: boolean;
  public alertMsg: any = [];
  public parentModelOptions: any;
  public isHide: boolean = true;


  constructor(
    private Fbuilder: FormBuilder,
    private factoryModelTypeService: FactoryModelTypeService,
    private mianTabService: MainTabService,
  ) {
    this.updateFanctoryModel = Fbuilder.group({
      'no': ['', [identifierValidator, Validators.required]],
      'name': ['', [normalTextValidator, Validators.required]],
      'parent_id': ['', [Validators.required]]
    });
  }

  ngOnInit() {

    const self =this;
    if (this.factoryModelTypeService.rowData) {
      this.id = this.factoryModelTypeService.rowData.id;
    }

    // 获取上级工厂模型下拉数据
      Observable.fromPromise(this.factoryModelTypeService.getParentModelType()).subscribe(data => {

        if (data.rows.length > 0) {
          self.parentModelOptions = data.rows
        }
      });
    Observable.fromPromise(this.factoryModelTypeService.factoryModelTypeView(this.id)).subscribe(data => {

      this.updateFanctoryModel.patchValue({
        'no': data.result.extra.no,
        'name': data.result.extra.name,
        'parent_id': data.result.extra.parent_id,

      });
      
    });


  }

  isHideSelected() {
    this.isHide = false;
  };

  // 保存
  onFanctoryTypeUpdateSave() {

    const self = this;
    let noValid: boolean = this.updateFanctoryModel.get('no').valid;
    let nameValid: boolean = this.updateFanctoryModel.get('name').valid;
    let parentIdValid: boolean = this.updateFanctoryModel.get('parent_id').valid;

    console.log(parentIdValid);
    if (!parentIdValid) {
      return;
    }

    if (noValid && nameValid && parentIdValid) {

      Observable.fromPromise(this.factoryModelTypeService.factoryModelTypeUpdata(this.id, this.updateFanctoryModel.value)).subscribe(data => {

        console.log(data)
        this.formData = data.result;

        if (this.formData.success == 1) {
          self.flag = true;
          self.updateData = {
            flag: self.flag,
            data: this.formData.extra
          };
          console.log( self.updateData)
          // 发射数据给父组件 更新父组件列表的字段
          self.factoryModelTypeService.isUpdateSuccess.emit(self.updateData);
          // 关闭该页签
          self.mianTabService.onTabRemove.emit(this.functionCode);
        }
      })
    } else {
      self.alertMsg.push({
        type: "danger",
        msg: self.formData.err_msg,
        timeout: 2000
      });
    }

  }

  // 取消编辑
  onFanctoryTypeCancel() {

    this.mianTabService.onTabRemove.emit(this.functionCode);
  };
}
