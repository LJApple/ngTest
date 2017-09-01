import {Component, OnInit} from '@angular/core';
import {MachineInspectionPlanService} from "../../../machine-inspection-plan/machine-inspection-plan.service";
import {MainTabService} from "../../../../admin/main-tab/main-tab.service";
import {WorkshopManagementService} from "../../workshop-management.service";
import {Observable} from 'rxjs';

@Component({
    selector: 'app-workshop-machine-view',
    templateUrl: './workshop-machine-view.component.html',
    styleUrls: ['./workshop-machine-view.component.scss']
})
export class WorkshopMachineViewComponent implements OnInit {

    public workshopData: any;
    public id: string;
    public functionCode: string = 'workshop_machine_view';

    constructor(private workshopService: WorkshopManagementService,
                private mainTabService: MainTabService) {
    }

    ngOnInit() {
        this.id = this.workshopService.rowData.id;
        Observable.fromPromise(this.workshopService.view(this.id)).subscribe(data => {
            if (data) {
                this.workshopData = data;
                console.log(this.workshopData);
            }
        });
    }

    cancelView() {
        this.mainTabService.onTabRemove.emit(this.functionCode);
    }

}
