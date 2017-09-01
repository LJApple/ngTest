import { Component, OnInit } from '@angular/core';
import { ViewProcedureManagementService } from "app/procedure/view-procedure-management/view-procedure-management.service";
@Component({
  selector: 'app-procedure-description-view',
  templateUrl: './procedure-description-view.component.html',
  styleUrls: ['./procedure-description-view.component.scss']
})
export class ProcedureDescriptionViewComponent implements OnInit {

  public no;
  public name;
  public status_text;
  public description;
  constructor(private viewProcedureManagementService: ViewProcedureManagementService) { }

  ngOnInit() {

    this.viewProcedureManagementService.procedureMsg.subscribe((data) => {
      this.no = data.no;
      this.name = data.name;
      this.status_text = data.status_text;
      this.description = data.description;
    });
  }

}
