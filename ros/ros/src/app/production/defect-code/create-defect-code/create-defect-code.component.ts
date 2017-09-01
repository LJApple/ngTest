import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DefectCodeService} from "../defect-code.service";
import {Observable} from 'rxjs';
import {identifierValidator, normalTextValidator} from "../../../admin/validator/validators";
import {MainTabService} from "../../../admin/main-tab/main-tab.service";
import {MachineInspectionPlanService} from "../../machine-inspection-plan/machine-inspection-plan.service";


@Component({
    selector: 'app-create-defect-code',
    templateUrl: './create-defect-code.component.html',
    styleUrls: ['./create-defect-code.component.scss']
})
export class CreateDefectCodeComponent implements OnInit {
    defectGroupModel: FormGroup;
    public functionCode: string = "create_defect_code";
    public flag: boolean; // 是否成功
    public type: number = 1;
    public active: boolean = true;
    public alertMsg: any = [];


    constructor(private Fbuilder: FormBuilder,
                private defectCodeService: DefectCodeService,
                private mianTabService: MainTabService) {
        this.defectGroupModel = Fbuilder.group({
            'no': ['', identifierValidator],
            'name': ['', normalTextValidator],
            'description': ['', Validators.maxLength(64)],
            'status': ['1']
        });

    }

    ngOnInit() {

    }

    defectCodeSave() {
        const self = this;
        let noValid: boolean = this.defectGroupModel.get('no').valid;
        let nameValid: boolean = this.defectGroupModel.get('name').valid;
        let descValid: boolean = this.defectGroupModel.get('description').valid;
        if (noValid && nameValid && descValid) {
            Observable.fromPromise(this.defectCodeService.saveNewDefectCode(this.defectGroupModel.value)).subscribe(data => {
                if (data.code === 0) {
                    self.alertMsg.push({
                        type: "success",
                        msg: data.message,
                        timeout: 2000
                    })
                    // 关闭新增页面
                    this.mianTabService.onTabRemove.emit(this.functionCode);
                    // 更新数据网格的数据
                    self.flag = true;
                    const tempData = {
                        flag: self.flag,
                        data: data.data,
                        msg: data.message,
                        type: self.type
                    };
                    self.defectCodeService.isUpdateSuccess.emit(tempData);
                } else {
                    self.alertMsg.push({
                        type: "danger",
                        msg: data.message,
                        timeout: 2000
                    })
                }
            })
        } else {
            self.alertMsg.push({
                type: "danger",
                msg: "请按要求填写数据!",
                timeout: 2000
            })
        }
    }

    createCancel() {
        this.mianTabService.onTabRemove.emit(this.functionCode);
    }

    changeActive() {
        this.active = !this.active;
        if (!this.active) {
            this.defectGroupModel.patchValue({
                'status': 0
            })
        }
        if (this.active) {
            this.defectGroupModel.patchValue({
                'status': 1
            })
        }
    }

}
