import { Component, OnInit } from '@angular/core';
import { ViewProcedureManagementService } from "app/procedure/view-procedure-management/view-procedure-management.service";

@Component({
  selector: 'app-procedure-bar-code-view',
  templateUrl: './procedure-bar-code-view.component.html',
  styleUrls: ['./procedure-bar-code-view.component.scss']
})
export class ProcedureBarCodeViewComponent implements OnInit {

  public barcode_type_text;
  public barcode_rule;
  public barcode_text;

  constructor(private viewProcedureManagementService: ViewProcedureManagementService) { }

  ngOnInit() {

     this.viewProcedureManagementService.barcode.subscribe((data) => {
      this.barcode_type_text = data.barcode_type_text;
      this.barcode_rule = data.barcode_rule;
      this.barcode_text = data.barcode_text;
    });
  }

}
