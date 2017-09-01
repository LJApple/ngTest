import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {identifierValidator, normalTextValidator} from "../../../admin/validator/validators";
import {DefectCodeService} from "../defect-code.service";
import {Observable} from 'rxjs';
import {MainTabService} from "../../../admin/main-tab/main-tab.service";
import {MachineInspectionPlanComponent} from "../../machine-inspection-plan/machine-inspection-plan.component";
import {MachineInspectionPlanService} from "../../machine-inspection-plan/machine-inspection-plan.service";

@Component({
    selector: 'app-defect-code-updata',
    templateUrl: './defect-code-updata.component.html',
    styleUrls: ['./defect-code-updata.component.scss']
})
export class DefectCodeUpdataComponent implements OnInit {

    private functionCode = 'defect_code_updata';
    defectGroupModel: FormGroup;
    public id: string;
    public formData: any;
    public code: any;
    public flag: boolean;
    public type: number = 2;
    public active: boolean;
    public alertMsg: any = [];

    constructor(private Fbuilder: FormBuilder,
                private defectCodeService: DefectCodeService,
                private mainTabService: MainTabService) {
        this.defectGroupModel = Fbuilder.group({
            'no': ['', identifierValidator],
            'name': ['', normalTextValidator],
            'description': ['', Validators.maxLength(64)],
            'status': ['1'],
            'id': [''],
        });
    }

    ngOnInit() {
        // this.id = this.defectCodeService.rowData.id;
        if (this.defectCodeService.rowData) {
            this.id = this.defectCodeService.rowData.id;
        }
        Observable.fromPromise(this.defectCodeService.DefectCodeView(this.id)).subscribe(data => {
            this.formData = data.data;
            this.code = this.formData.no;
            if (this.formData) {
                this.defectGroupModel.setValue({
                    'no': this.formData.no,
                    'name': this.formData.name,
                    'description': this.formData.description,
                    'status': this.formData.status,
                    'id': this.id,
                })
            }
            if (this.formData.status === '是') {
                this.active = true;
                this.defectGroupModel.patchValue({
                    'status': 1,
                })
            } else {
                this.defectGroupModel.patchValue({
                    'status': 0,
                })
            }
        })
    }

    defectCodeUpdata() {
        const self = this;
        let noValid: boolean = this.defectGroupModel.get('no').valid;
        let nameValid: boolean = this.defectGroupModel.get('name').valid;
        let descValid: boolean = this.defectGroupModel.get('description').valid;
        if (noValid && nameValid && descValid) {
            Observable.fromPromise(this.defectCodeService.DefectCodeUpdata(this.id, this.defectGroupModel.value)).subscribe(data => {
                this.formData = data.data;
                if (data.code === 0) {
                    self.alertMsg.push({
                        type: "success",
                        msg: data.message,
                        timeout: 2000
                    })
                    // 关闭TAB事件
                    this.mainTabService.onTabRemove.emit(this.functionCode);

                    // 更新数据网格的数据
                    self.flag = true;
                    let tempData = {
                        flag: self.flag,
                        data: data.data,
                        type: self.type,
                        msg: data.message
                    }
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

    cancelUpdate() {
        this.mainTabService.onTabRemove.emit(this.functionCode);
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
