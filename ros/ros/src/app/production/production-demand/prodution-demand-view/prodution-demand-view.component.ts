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

  constructor() { }

  ngOnInit() {
  }

}
