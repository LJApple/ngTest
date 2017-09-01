import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { UpdateProcedureManagementService } from "app/procedure/update-procedure-management/update-procedure-management.service";
import { CreateProcedureManagementService } from "app/procedure/create-procedure-management/create-procedure-management.service";
@Component({
  selector: 'app-procedure-description',
  templateUrl: './procedure-description.component.html',
  styleUrls: ['./procedure-description.component.scss']
})
export class ProcedureDescriptionComponent implements OnInit {

  @Input() procedureFormModel;
  @Input() type;
  public description = "procedure-description"
  public value;
  public bottom: number = -70;
  public defaultValue;
  public selectOptions: any;

  constructor(private FB: FormBuilder, private updateProcedureManagementService: UpdateProcedureManagementService,
  private createProcedureManagementService: CreateProcedureManagementService) {
  }

  ngOnInit() {

    const self = this;
    self.selectOptions = [
      { text: '启用', id: '1' },
      { text: '停用', id: '0' },
    ];
    self.procedureFormModel.patchValue({
      'status': self.selectOptions[0]["id"]
    });
  }

}
