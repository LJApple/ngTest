import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MachineInspectionPlanService} from '../machine-inspection-plan.service';
import {Observable} from 'rxjs';
import {MainTabService} from '../../../admin/main-tab/main-tab.service';
import {chineseEnglishNumberFilter, EnglishNumberFilter, numberFilter} from '../../../admin/validator/validators';

@Component({
    selector: 'app-machine-inspection-create',
    templateUrl: './machine-inspection-create.component.html',
    styleUrls: ['./machine-inspection-create.component.scss']
})
export class MachineInspectionCreateComponent implements OnInit {

    public formModel: FormGroup;
    public loadGridUrl: string = '/production/machine/infoList';
    public fieldName: string = 'MachineCheck[machine_no]';
    public setWidth: number = 190;
    public isGridHide: boolean = true;
    public isActive: boolean;
    public gridWidth: any = 320;
    // 下拉GRID数据模型初始化
    public gridArrOptions: any = [
        {headerName: "机台编号", field: "no", width: 100},
        {headerName: "机台名称", field: "name", width: 100},
        {headerName: "机台分类", field: "type", width: 100},
    ];

    flag: boolean;
    noShow: boolean = false;
    contentShow: boolean = false;
    periodShow: boolean = false;
    createData: object;
    functionCode: string = 'machine_inspection_create';
    machineGroupModel: FormGroup;
    public alertMessage: any = [];
    public periodValue;
    public nameValue;
    public typeValue;
    public idValue;
    public comboValue: boolean;

    constructor(private machineInspectionPlanService: MachineInspectionPlanService,
                private mainTabService: MainTabService,
                private Fbuilder: FormBuilder) {
        const self = this;
        // 关闭开关  禁止在系统出现BUG 新增页面未关闭的时候重复编辑同一单id数据
        machineInspectionPlanService.afterUpdateSuccess.subscribe((flag) => {
            if (flag) {
                self.flag = false;
            }
        });

        // 表单数据模型初始化表单
        this.machineGroupModel = Fbuilder.group ({
            'MachineCheck[no]' : ['', EnglishNumberFilter],
            'MachineCheck[machine_no]' : [''],
            'MachineCheck[machine_name]': [''],
            'MachineCheck[content]': ['', chineseEnglishNumberFilter],
            'MachineCheck[machine_category_name]': [''],
            'MachineCheck[period]': ['', numberFilter],
            'MachineCheck[machine_id]': [''],
        });
    }

    ngOnInit() {
    }

    machineUpdateInfoClose () {
        this.mainTabService.onTabRemove.emit(this.functionCode);
    }

    // 提交表单动作
    machineUpdateInfoSave () {
        let contentValid: boolean = this.machineGroupModel.get('MachineCheck[content]').valid;
        let noValid: boolean = this.machineGroupModel.get('MachineCheck[no]').valid;
        let periodValid: boolean = this.machineGroupModel.get('MachineCheck[period]').valid;
        let periodValue = this.periodValue;
        let idValue = this.idValue;
        if (noValid && contentValid && periodValue && periodValid && idValue) {
            this.getData(this.machineGroupModel.value);
        }else{
            this.alertMessage = [{
                type: 'danger',
                msg: '请填写完整信息并确认其符合格式要求',
                timeout: 2000
            }];
        }
        console.log(this.machineGroupModel.value);

    }

    // 调用service中提交表单接口方法
    getData (data) {
        const self = this;
        Observable.fromPromise(this.machineInspectionPlanService.createFormData(data)).subscribe(data => {
            console.log(data);
            if (data.result.success) { // 保存成功
                self.flag = true;
                self.createData = {
                    flag: self.flag,
                    data: data.result.extra
                };
                self.machineInspectionPlanService.isCreateSuccess.emit(self.createData);
                this.mainTabService.onTabRemove.emit(this.functionCode);
            } else { // 保存失败
                self.alertMessage = [{
                    type: 'danger',
                    msg: data.result.err_msg,
                    timeout: 2000
                }];
                return;
            }
        });
    };

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

    // 点检计划编号是否存在在数据库
    noOnBlur ($event) {
        const self = this;
        let no = $event.target.value;
        let noValid: boolean = this.machineGroupModel.get('MachineCheck[no]').valid;
        Observable.fromPromise(this.machineInspectionPlanService.isNoExist(no)).subscribe(data => {
            if (data.isExist || !noValid) {
                self.machineGroupModel.patchValue({
                    'MachineCheck[no]' : '',
                });
                self.noShow = true;
            } else {
                self.noShow = false;
            }
        })
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
