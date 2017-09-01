import {Component, OnInit} from '@angular/core';
import {DefectCodeService} from "../defect-code.service";
import {Observable} from 'rxjs';
import {MainTabService} from "../../../admin/main-tab/main-tab.service";
import {MachineInspectionPlanService} from "../../machine-inspection-plan/machine-inspection-plan.service";

@Component({
    selector: 'app-defect-code-view',
    templateUrl: './defect-code-view.component.html',
    styleUrls: ['./defect-code-view.component.scss']
})
export class DefectCodeViewComponent implements OnInit {

    public DefectCodeData: any;
    public id: string;
    public functionCode: string = 'defect_code_view';

    constructor(private defectcodeService: DefectCodeService,
                private mainTabService: MainTabService) {
    }

    ngOnInit() {
        this.id = this.defectcodeService.rowData.id;
        Observable.fromPromise(this.defectcodeService.DefectCodeView(this.id)).subscribe(data => {
            if (data) {
                this.DefectCodeData = data.data;
                console.log(this.DefectCodeData);
            }
        });
    }

    cancelView() {
        this.mainTabService.onTabRemove.emit(this.functionCode);
    }

    // $event: rowData
}
