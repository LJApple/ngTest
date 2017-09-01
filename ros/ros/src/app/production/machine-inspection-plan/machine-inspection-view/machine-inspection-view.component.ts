import { Component, OnInit } from '@angular/core';
import {MainTabService} from '../../../admin/main-tab/main-tab.service';
import {Observable} from 'rxjs';
import {MachineInspectionPlanService} from '../machine-inspection-plan.service';
import {MachineInspectionViewService} from './machine-inspection-view.service';

@Component({
  selector: 'app-machine-inspection-view',
  templateUrl: './machine-inspection-view.component.html',
  styleUrls: ['./machine-inspection-view.component.scss']
})
export class MachineInspectionViewComponent implements OnInit {

    functionCode: string = 'machine_inspection_view';
    formData: object;

    constructor(private mainTabService: MainTabService,
                private machineInspectionViewService: MachineInspectionViewService,
                private machineInspectionPlanService: MachineInspectionPlanService) {}

    ngOnInit() {
        this.getDataInit(this.machineInspectionViewService.sendDataToView.id);
    }

    getDataInit (id) {
        Observable.fromPromise(this.machineInspectionPlanService.updateFormInitData(id)).subscribe(data => {
            this.formData = data;
            console.log(data)
        });
    }

    machineUpdateInfoClose () {
        this.mainTabService.onTabRemove.emit(this.functionCode);
    }

}
