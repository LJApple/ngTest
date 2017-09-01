import { Component, OnInit, Input, EventEmitter, Output,SimpleChanges } from '@angular/core';
import { UpdateProcedureManagementService } from "app/procedure/update-procedure-management/update-procedure-management.service";
import { CreateProcedureManagementService } from "app/procedure/create-procedure-management/create-procedure-management.service";
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() procedureFormModel;
  @Input() bottom;
  @Input() values;
  @Input() defaultValue;
  @Output() selectedId: EventEmitter<any> = new EventEmitter();
  public isFocus: boolean;
  public isBlur: boolean;
  public isHide: Object;
  public value;
  public obj= {
    text : '',
    id:''
  };

  option

  constructor(private updateProcedureManagementService: UpdateProcedureManagementService,
 private createProcedureManagementService: CreateProcedureManagementService, ) {
   
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  

  }

  showSelcet(event) {

    this.isHide = { 'display': 'block' };
  };

  hideSelect(event) {
    this.isHide = { 'display': 'none' };
  };

  focus(event) {
    this.isFocus = true;
    $('.status-dropup').addClass('focus');
  }

  blur(event) {
    $('.status-dropup').removeClass('focus');
  };

  setValue(event) {

    this.isHide = { 'display': 'none' };
    this.value = event.toElement.innerText;
    let itemId = $(event.toElement.children[0]).attr('id');
    this.defaultValue["text"] = event.toElement.innerText;
    console.log(itemId)
    this.selectedId.emit(itemId);
  }
}
