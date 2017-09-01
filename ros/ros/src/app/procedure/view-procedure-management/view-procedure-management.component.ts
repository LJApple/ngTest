import { Component, OnInit ,Output,EventEmitter,ViewChild} from '@angular/core';
import { MainTabService } from "app/admin/main-tab/main-tab.service";
import { ViewProcedureManagementService } from "app/procedure/view-procedure-management/view-procedure-management.service";
import { Observable, Subscription } from 'rxjs/Rx';
import { ProcedureManagementService } from "app/procedure/procedure-management/procedure-management.service";
import { ProcedureAttributeViewComponent } from "./procedure-attribute-view/procedure-attribute-view.component"

@Component({
  selector: 'app-view-procedure-management',
  templateUrl: './view-procedure-management.component.html',
  styleUrls: ['./view-procedure-management.component.scss']
})
export class ViewProcedureManagementComponent implements OnInit {

  private  id;
  public stations;
  public attributes;
  public switchActive = true;
  public switchActiveStations =true;
  public stationData;
  public attributesData;
  public barcode = {
    barcode_type_text: '',
    barcode_rule: '',
    barcode_text: ''
  }
  public procedureMsg = {
    no: '',
    name: '',
    status_text :'',
    description : '',
  } 
  
  private functionCode = 'procedure_management_view';

  @ViewChild(ProcedureAttributeViewComponent) attributesViewChild: ProcedureAttributeViewComponent;

  constructor(private mainTabService: MainTabService,
    private viewProcedureManagementService: ViewProcedureManagementService,
    private procedureManagementService: ProcedureManagementService) { }

  ngOnInit() {
    // 加载列表数据
    this.id = this.procedureManagementService.rowData.id;
    Observable.fromPromise(this.viewProcedureManagementService.ViewFormData(this.id)).subscribe(data => {

      // console.log(data)
      // 工位
      this.stationData = data.data.stations;
     
      // 参数属性
      this.attributesData = data.data.attributes;
      
      this.barcode.barcode_type_text= data.data.barcode_type_text;
      this.barcode.barcode_rule= data.data.barcode_rule;
      this.barcode.barcode_text= data.data.barcode_text;
      this.viewProcedureManagementService.barcode.emit(this.barcode);

      this.procedureMsg.no = data.data.no;
      this.procedureMsg.name = data.data.name;
      this.procedureMsg.status_text = data.data.status_text;
      this.procedureMsg.description = data.data.description;
      
      this.viewProcedureManagementService.procedureMsg.emit(this.procedureMsg);
    });
  }

  switch(code) {
    let self = this;
    if (code == "attributes" && self.switchActive) {
      self.switchActive = false;
       self.viewProcedureManagementService.attributes.emit(self.attributesData );
    }else if(code == "stations" && self.switchActiveStations){
      self.switchActiveStations = false;
      self.viewProcedureManagementService.stations.emit(self.stationData);
    }
  };
  
  // 取消查看
  cancelView() {

    this.mainTabService.onTabRemove.emit(this.functionCode);
  }
}
