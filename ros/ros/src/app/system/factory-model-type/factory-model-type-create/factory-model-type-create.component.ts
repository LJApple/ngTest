import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FactoryModelTypeService } from "app/system/factory-model-type/factory-model-type.service";
import { Observable } from 'rxjs';
import { onlyNumberFilter, chineseNumberEnglishFilter } from "../../../admin/validator/validators";
import { MainTabService } from "../../../admin/main-tab/main-tab.service";


@Component({
  selector: 'app-factory-model-type-create',
  templateUrl: './factory-model-type-create.component.html',
  styleUrls: ['./factory-model-type-create.component.scss']
})
export class FactoryModelTypeCreateComponent implements OnInit {

  createFanctoryModel: FormGroup;
  public functionCode: string = "factory_model_type_create";
  public flag: boolean; // 是否成功
  public type: number = 1;
  public active: boolean = true;
  public alertMsg: any = [];
  public parentModelOptions :any;
  public isHide : boolean =  true;

  constructor(
    private Fbuilder: FormBuilder,
    private factoryModelTypeService: FactoryModelTypeService,
    private mianTabService: MainTabService,
  ) {
    this.createFanctoryModel = Fbuilder.group({
      'no': ['', onlyNumberFilter],
      'name': ['', chineseNumberEnglishFilter],
      'parent_id': ['',Validators.required ],
    });

  }

  ngOnInit() {
     
    // 获取上级工厂模型下拉数据
    Observable.fromPromise(this.factoryModelTypeService.getParentModelType()).subscribe(data => {

      if( data.rows.length > 0){
        this.parentModelOptions = data.rows
      }
    });
  }

  isHideSelected(){
     this.isHide = false;
  };

  // 保存数据
  onFanctoryTypeSave() {

    const self = this;
    let noValid: boolean = this.createFanctoryModel.get('no').valid;
    let nameValid: boolean = this.createFanctoryModel.get('name').valid;
    let parentIdValid: boolean = this.createFanctoryModel.get('parent_id').valid;

    if(!parentIdValid){     
      return;
    }
 
    if (noValid && nameValid && parentIdValid) {
      Observable.fromPromise(this.factoryModelTypeService.saveFactoryModelType(this.createFanctoryModel.value)).subscribe(data => {

        
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
          console.log(tempData)
          self.factoryModelTypeService.isCreateSuccess.emit(tempData);
        } else {
          self.alertMsg.push({
            type: "danger",
            msg: data.result.err_msg,
            timeout: 2000
          })
        }
      })
    } else {
      self.alertMsg.push({
        type: "danger",
        msg: "请按要求填写数据!",
        timeout: 2000
      })
    }
  };

  // 取消编辑
  onFanctoryTypeCancel() {

     this.mianTabService.onTabRemove.emit(this.functionCode);
  };
}
