import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MachineInspectionPlanService} from '../machine-inspection-plan.service';
import {Observable} from 'rxjs';
import {MainTabService} from '../../../admin/main-tab/main-tab.service';
import {chineseEnglishNumberFilter, EnglishNumberFilter, numberFilter} from '../../../admin/validator/validators';

@Component({
  selector: 'app-machine-inspection-update',
  templateUrl: './machine-inspection-update.component.html',
  styleUrls: ['./machine-inspection-update.component.scss']
})
export class MachineInspectionUpdateComponent implements OnInit {

    id: number;
    flag: boolean = false;
    contentShow: boolean = false;
    updateData: any;
    functionCode: string = 'machine_inspection_update';
    public alertMessage: any = [];

    public formModel: FormGroup;
    public machineGroupModel: FormGroup;
    public loadGridUrl: string = '/production/machine/infoList';
    public fieldName: string = 'MachineCheck[machine_no]';
    public setWidth: number = 190;
    public gridWidth: any = 320;
    public isGridHide: boolean = true;
    public noShow: boolean = false;
    public periodShow: boolean = false;
    public isActive: boolean;
    public comboValue: boolean;
    public periodValue: any;
    public idValue: any;
    // 下拉GRID数据模型初始化
    public gridArrOptions: any = [
        {headerName: "机台编号", field: "no", width: 100},
        {headerName: "机台名称", field: "name", width: 100},
        {headerName: "机台分类", field: "type", width: 100},
    ];

    constructor(private machineInspectionPlanService: MachineInspectionPlanService,
                private mainTabService: MainTabService,
                private Fbuilder: FormBuilder) {
        const self = this;
        machineInspectionPlanService.afterUpdateSuccess.subscribe((flag) => {
            if (flag) {
                self.flag = false;
                console.log(self.flag);
            }
        });

        // 表单数据模型初始化表单
        this.machineGroupModel = Fbuilder.group ({
            'MachineCheck[no]' : [''],
            'MachineCheck[machine_no]' : [''],
            'MachineCheck[machine_name]': [''],
            'MachineCheck[content]': ['', chineseEnglishNumberFilter],
            'MachineCheck[machine_category_name]': [''],
            'MachineCheck[period]': ['', numberFilter],
            'MachineCheck[machine_id]': [''],
            'MachineCheck[id]': [''],
        });
    }

    ngOnInit() {
        console.log(this.machineInspectionPlanService.rowData);
        this.getDataInit(this.machineInspectionPlanService.rowData.id)
    }

    getDataInit (id) {
        Observable.fromPromise(this.machineInspectionPlanService.updateFormInitData(id)).subscribe(data => {
            console.log(data);

            this.machineGroupModel.patchValue({
                'MachineCheck[no]' : data.no,
                'MachineCheck[machine_no]' : data.machine_no,
                'MachineCheck[machine_id]': data.machine_id,
                'MachineCheck[machine_name]': data.machine_name,
                'MachineCheck[machine_category_name]': data.machine_category_name,
                'MachineCheck[content]': data.content,
                'MachineCheck[period]': data.period,
                'MachineCheck[id]': data.id
            })
        });
    }

    machineUpdateInfoSave () {

        const self = this;
        let contentValid: boolean = this.machineGroupModel.get('MachineCheck[content]').valid;
        let periodValue = this.periodValue;
        if (contentValid && periodValue && this.idValue) {

            Observable.fromPromise(this.machineInspectionPlanService.updateFormData(this.id, this.machineGroupModel.value)).subscribe(data => {
                console.log(data);
                if (data.result.success) {
                    self.flag = true;
                    self.updateData = {
                        flag: self.flag,
                        data: data.result.extra
                    };
                    // 发射数据给父组件 更新父组件列表的字段
                    self.machineInspectionPlanService.isUpdateSuccess.emit(self.updateData);
                    // 关闭该页签
                    this.mainTabService.onTabRemove.emit(this.functionCode);
                }
            });
        }else {
            self.alertMessage = [{
                type: 'danger',
                msg: '请填写完整信息并确认其符合格式要求',
                timeout: 2000
            }];
            return;
        }
    }

    // 关闭该页签
    machineUpdateInfoClose () {
        this.mainTabService.onTabRemove.emit(this.functionCode);
    }

    // 点击下拉 赋值给表单  这里注意使用patchValue
    // 借助patchValue，我们可以更灵活地解决数据模型和表单模型之间的差异。 但是和setValue不同，patchValue不会检查缺失的控件值，并且不会抛出有用的错误信息。
    onGridClick ($event) {
        let data = $event;
        this.machineGroupModel.patchValue({
            'MachineCheck[machine_no]' : data.no,
            'MachineCheck[machine_name]': data.name,
            'MachineCheck[machine_category_name]': data.type,
            'MachineCheck[machine_id]': data.id,
        })
    }

    isMyInputEmpty ($event) {
        if ($event) {
            this.comboValue = true;
        } else {
            this.comboValue = false;
        }
    }

    forbidDefault ($event) {
        if ($event.target.id && $event.target.id == 'speInput' || $event.target.id == 'speBtn' ){
            this.isGridHide = true;
            this.isGridHide = false;
            this.isActive = true;
        }else {
            console.log('可以隐藏!');
            this.isGridHide = true;
            this.isActive = false;
        }
    }

    // 点检项目失去焦点
    contentOnBlur ($event) {
        let contentValid: boolean = this.machineGroupModel.get('MachineCheck[content]').valid;
        this.contentShow = !contentValid;
        if (this.contentShow) {
            this.machineGroupModel.patchValue({
                'MachineCheck[content]' : '',
            });
        }
    }

    periodOnBlur ($event) {
        let periodValid: boolean = this.machineGroupModel.get('MachineCheck[period]').valid;
        this.periodShow = !periodValid;
        console.log(periodValid);
        if (this.periodShow) {
            this.machineGroupModel.patchValue({
                'MachineCheck[period]' : '',
            });
        }
    }
}
