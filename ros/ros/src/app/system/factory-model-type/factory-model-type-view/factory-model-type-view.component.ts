import { Component, OnInit } from '@angular/core';
import { FactoryModelTypeService } from "app/system/factory-model-type/factory-model-type.service";
import { MainTabService } from "../../../admin/main-tab/main-tab.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-factory-model-type-view',
  templateUrl: './factory-model-type-view.component.html',
  styleUrls: ['./factory-model-type-view.component.scss']
})
export class FactoryModelTypeViewComponent implements OnInit {

  public functionCode: string = "factory_model_type_view";
  public id: string;
  public formView;
  constructor(
    private factoryModelTypeService: FactoryModelTypeService,
    private mianTabService: MainTabService,
  ) { }

  ngOnInit() {

    if (this.factoryModelTypeService.rowData) {
      this.id = this.factoryModelTypeService.rowData.id;
    }

    const self = this;
    // 查看请求数据
    Observable.fromPromise(this.factoryModelTypeService.factoryModelTypeView(this.id)).subscribe(data => {

      if(data.result.success == 1){
        self.formView =data.result.extra;
      }
    });
  }

  // 取消编辑
  onFanctoryTypeCancel() {

    this.mianTabService.onTabRemove.emit(this.functionCode);
  };
}
