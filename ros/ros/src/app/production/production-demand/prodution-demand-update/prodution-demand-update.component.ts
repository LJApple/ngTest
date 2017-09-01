import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { identifierValidator, normalTextValidator } from "../../../admin/validator/validators";
import { Observable } from 'rxjs';
import { MainTabService } from "../../../admin/main-tab/main-tab.service";
import { ProductionDemandService } from "app/production/production-demand/production-demand.service";

@Component({
  selector: 'app-prodution-demand-update',
  templateUrl: './prodution-demand-update.component.html',
  styleUrls: ['./prodution-demand-update.component.scss']
})
export class ProdutionDemandUpdateComponent implements OnInit {

  private functionCode = "production_model_type_update";
  updateFanctoryModel: FormGroup;
  public id: string;
  public alertMsg: any = [];
  public formData: any;
  updata:any;
  public parentModelOptions: any;
  public flag: boolean;
  public active: boolean;
  public isHide: boolean = true;

  constructor(
    private Fbuilder: FormBuilder,
    private productionDemandService: ProductionDemandService,
    private mainTableService: MainTabService
  ) {
    this.updateFanctoryModel = Fbuilder.group({
      'no': ['', [identifierValidator, Validators.required]],
      'name': ['', [normalTextValidator, Validators.required]],
      'parent_id': ['', [Validators.required]]
    });
  }
  
  isHideSelected() {
    this.isHide = false;
  };
  ngOnInit() {
    const self = this;
    if (this.productionDemandService.rowData) {
      this.id = this.productionDemandService.rowData.id;
    }

    Observable.fromPromise(this.productionDemandService.getParentModelType()).subscribe(data => {
      console.log(data);
      if (data.rows.length > 0) {
        self.parentModelOptions = data.rows;
      }
    });
    Observable.fromPromise(this.productionDemandService.factoryModelTypeView(this.id)).subscribe(data => {
      this.updateFanctoryModel.patchValue({
        'no': data.result.extra.no,
        'name': data.result.extra.name,
        'parent_id': data.result.extra.parent_id
      });
    });

  }
  // 保存数据
  onFanctoryTypeUpdateSave() {
    const self = this;
    let noValue = this.updateFanctoryModel.get('no').valid;
    let nameValue = this.updateFanctoryModel.get("name").valid;
    let parentIdValue = this.updateFanctoryModel.get("parent_id").valid;

    if (!parentIdValue){
      return;
    }
    if (noValue && nameValue && parentIdValue) {
      Observable.fromPromise(this.productionDemandService.factoryModelTypeUpdata(this.id,this.updateFanctoryModel.value)).subscribe(data => {
        this.formData = data.result;
        if (this.formData.success === 1) {
          self.flag = true;
          self.updata = {
            flag: self.flag,
            data: this.formData.extra
          };
          self.productionDemandService.isUpdateSuccess.emit(self.updata);
          self.mainTableService.onTabRemove.emit(this.functionCode);
        }
      });
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
    this.mainTableService.onTabRemove.emit(this.functionCode);
  };
}
