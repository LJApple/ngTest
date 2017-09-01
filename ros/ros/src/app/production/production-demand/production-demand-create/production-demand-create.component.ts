import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from "@angular/forms";
import { ProductionDemandService } from "app/production/production-demand/production-demand.service";
import { MainTabService } from "app/admin/main-tab/main-tab.service";
import { onlyNumberFilter, chineseNumberEnglishFilter } from "app/admin/validator/validators";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-production-demand-create',
  templateUrl: './production-demand-create.component.html',
  styleUrls: ['./production-demand-create.component.scss']
})
export class ProductionDemandCreateComponent implements OnInit {

  createFanctoryModel:FormGroup;
  public functionCode: string = "production_model_type_create";
  public flag: boolean; // 是否成功
  public type: number = 1;
  public active: boolean = true;
  public alertMsg: any = [];
  public parentModelOptions :any;
  public isHide : boolean =  true;
  constructor(
    private Fbuilder:FormBuilder,
    private ProductionDemandService:ProductionDemandService,
    private mainTalService: MainTabService
  ) { 
    this.createFanctoryModel = Fbuilder.group({
      'no':['',onlyNumberFilter],
      'name': ['', chineseNumberEnglishFilter],
      'parent_id':['',Validators.required]
    });
  }

  ngOnInit() {
    // 上级工厂类型下拉数据
    Observable.fromPromise(this.ProductionDemandService.getParentModelType()).subscribe(data => {
        console.log(data);
        if (data.rows.length > 0) {
          this.parentModelOptions = data.rows;
        }
    });
  }
  // 控制必填项显示隐藏
  isHideSelected() {
    this.isHide = false;
  }
  /**
   * 保存数据
   */
  saveData(){
    const self =this;
    let noValue = this.createFanctoryModel.get('no').valid;
    let nameValue = this.createFanctoryModel.get('name').valid;
    let parentIdValue = this.createFanctoryModel.get('name').valid;
    console.log(noValue+":"+nameValue+":"+parentIdValue);
    if (noValue && nameValue && parentIdValue) {
      Observable.fromPromise(this.ProductionDemandService.saveFactoryModelType(this.createFanctoryModel.value)).subscribe(data => {
        console.log(data);
        if (data.result.success === 1) {
          self.alertMsg.push({
            type: "success",
            alertMsg:data.result.err_msg,
            time:2000
          });
          this.mainTalService.onTabRemove.emit(this.functionCode);
          // 更新表格数据
          self.flag = true;
          const tempData = {
              flag:self.flag,
              data:data.result.extra,
              msg:data.result.err_msg,
              type:self.type
          };
          self.ProductionDemandService.isCreateSuccess.emit(tempData);
        } else {
          self.alertMsg.push({
            type: "danger",
            alertMsg:data.result.err_msg,
            time:2000
          });
        }
      });
    } else {
      self.alertMsg.push({
        type: "danger",
        msg: "请按要求填写数据!",
        timeout: 2000
      })
    }
  }
  /**
   * 取消保存数据并且关闭当前窗口
   */
  unSaveData() {
    this.mainTalService.onTabRemove.emit(this.functionCode);
  }
}
