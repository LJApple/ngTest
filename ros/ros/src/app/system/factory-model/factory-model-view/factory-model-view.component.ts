import { Component, OnInit } from '@angular/core';
import { FactoryModelService } from "app/system/factory-model/factory-model.service";
import { MainTabService } from "../../../admin/main-tab/main-tab.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-factory-model-view',
  templateUrl: './factory-model-view.component.html',
  styleUrls: ['./factory-model-view.component.scss']
})
export class FactoryModelViewComponent implements OnInit {

  public no;
  public name;
  public status_text;
  public description;
  public id: string;
  public functionCode: string = 'factory_model_view';
  public factoryViewData: any;
  public accountBookInfo;

  constructor(private factoryModelService: FactoryModelService,
    private mainTabService: MainTabService) { }

  ngOnInit() {
    const self = this;

    //  获取账套信息
    Observable.fromPromise(this.factoryModelService.getAccountBookInfo()).subscribe(data => {

      if (data.result.success == 1) {
        self.accountBookInfo = data.result.extra.name;
      }
    });

    this.id = this.factoryModelService.rowData.id;
    Observable.fromPromise(this.factoryModelService.factoryModelView(this.id)).subscribe(data => {

      if (data) {
        self.factoryViewData = data.result.extra;
      }
    });
  }

  cancelView() {
    this.mainTabService.onTabRemove.emit(this.functionCode);
  }
}

