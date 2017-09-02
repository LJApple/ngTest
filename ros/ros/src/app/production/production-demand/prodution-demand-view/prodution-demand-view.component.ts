import { ProductionDemandService } from 'app/production/production-demand/production-demand.service';
import { Component, OnInit } from '@angular/core';
import { MainTabService } from "../../../admin/main-tab/main-tab.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prodution-demand-view',
  templateUrl: './prodution-demand-view.component.html',
  styleUrls: ['./prodution-demand-view.component.scss']
})
export class ProdutionDemandViewComponent implements OnInit {

  public functionCode: string = "production_model_type_view";
  public id: string;
  public formView;
  constructor(
    private productionDemandService: ProductionDemandService,
    private mainTaaService: MainTabService
  ) { }

  ngOnInit() {
    console.log(this.productionDemandService.rowData)
    if (this.productionDemandService.rowData) {
      this.id = this.productionDemandService.rowData.id;
    }

    const self = this;
    Observable.fromPromise(this.productionDemandService.factoryModelTypeView(this.id)).subscribe(data => {
      self.formView = data.result.extra;
    });
  }
  onFanctoryTypeCancel() {
    this.mainTaaService.onTabRemove.emit(this.functionCode);
  };
}
