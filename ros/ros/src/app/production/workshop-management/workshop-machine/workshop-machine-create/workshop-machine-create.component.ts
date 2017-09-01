import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MainTabService} from "app/admin/main-tab/main-tab.service";
import {
    identifierValidator, normalTex64tValidator, normalTextValidator, Num32Validator
} from "app/admin/validator/validators";
import {WorkshopManagementService} from "../../workshop-management.service";
import {Observable} from 'rxjs';
import {DateFormat} from "app/admin/widgets/format";

@Component({
    selector: 'app-workshop-machine-create',
    templateUrl: './workshop-machine-create.component.html',
    styleUrls: ['./workshop-machine-create.component.scss']
})
export class WorkshopMachineCreateComponent implements OnInit {

    public Code = 'workshop_machine_create';
    formModel: FormGroup;
    // 机台车间选项集合
    public _workshopOptions: any;
    // 机台分类集合
    public _categoryOptions: any;
    // 工位集合
    public _stationOptions: any;
    // 车间id
    public workshopId: any;
    // 弹窗提示
    public alertMsg: any = [];
    public flag: boolean; // 是否成功
    public type = 1;
    // 表单提交的数据
    public submitData: any;
    // 是否可以选择工位
    public canSelect: boolean = true;
    // 表单验证
    public machineShow: boolean = true;
    public workshopValid: boolean = true;
    public buyTimeValid: boolean = true;
    public addTimeValid: boolean = true;

    constructor(private Fbuilder: FormBuilder,
                private mianTabService: MainTabService,
                private workshopService: WorkshopManagementService) {
        this
            .formModel = Fbuilder.group({
            'no': ['', identifierValidator],
            'name': ['', normalTextValidator],
            'norms': ['', Validators.required],
            'model': ['', normalTextValidator],
            'category': ['', Validators.required],
            'workshop_id': ['', Validators.required],
            'remark': [''],
            'firm_name': [''],
            'buy_time': ['', Validators.required],
            'ip': ['', Validators.maxLength(32)],
            'power': [''],
            'firm_time': [''],
            'collection_no': ['', Num32Validator],
            'location': ['', normalTex64tValidator],
            'station_id': [''],
            'useful_year': [''],
            'add_time': ['', Validators.required],
            'state': true
        });
    }

    ngOnInit() {
        const self = this;
        Observable.fromPromise(this.workshopService.getWorkshopOptions()).subscribe(data => {
            console.log(data);
            this._workshopOptions = data.rows;
        });
        Observable.fromPromise(this.workshopService.getMachineCat()).subscribe(data => {
            this._categoryOptions = data.machine_category;
        });
    }


// 提交表单
    saveFrom() {
        const self = this;
        // 表单验证
        const noValid: boolean = this.formModel.get('no').valid;
        const nameValid: boolean = this.formModel.get('name').valid;
        const modelValid: boolean = this.formModel.get('model').valid;
        const catValid: boolean = this.formModel.get('category').valid;
        const ipValid: boolean = this.formModel.get('ip').valid;
        const workshopValid: boolean = this.formModel.get('workshop_id').valid;
        const buyTimeValid: boolean = this.formModel.get('buy_time').valid;
        const addTimeValid: boolean = this.formModel.get('add_time').valid;
        const collectionValid: boolean = this.formModel.get('collection_no').valid;
        // 判断必填下拉是否选择
        if (!catValid) {
            this.machineShow = false;
        }
        if (!workshopValid) {
            this.workshopValid = false;
        }
        if (!buyTimeValid) {
            this.buyTimeValid = false;
        }
        if (!addTimeValid) {
            this.addTimeValid = false;
        }

        console.log(noValid, nameValid, modelValid, catValid, ipValid, collectionValid);
        if (noValid && nameValid && modelValid && catValid && ipValid && collectionValid) {
            // 格式化时间
            this.submitData = self.formModel.value;
            const add_time = self.formModel.value.add_time;
            const buy_time = self.formModel.value.buy_time;
            const firm_time = self.formModel.value.firm_time;
            const state = self.formModel.value.state;
            if (add_time) {
                self.submitData.add_time = DateFormat(add_time, "yyyy-MM-dd hh:mm:ss");
            } else {
                self.submitData.add_time = "";
            }
            if (buy_time) {
                self.submitData.buy_time = DateFormat(buy_time, "yyyy-MM-dd hh:mm:ss");
            } else {
                self.submitData.buy_time = "";
            }
            if (firm_time) {
                self.submitData.firm_time = DateFormat(firm_time, "yyyy-MM-dd hh:mm:ss");
            } else {
                self.submitData.firm_time = "";
            }
            if (state) {
                self.submitData.state = 2;
            } else {
                self.submitData.state = 1;
            }
            console.log(self.submitData);
            Observable.fromPromise(this.workshopService.save(self.submitData)).subscribe(data => {
                console.log(data);
                if (data.code === 1) {
                    self.alertMsg.push({
                        type: "success",
                        msg: "添加成功",
                        timeout: 2000
                    })
                    // 关闭新增页面
                    this.mianTabService.onTabRemove.emit(this.Code);
                    // 更新数据网格的数据
                    self.flag = true;
                    const tempData = {
                        flag: self.flag,
                        data: data.data,
                        msg: data.message,
                        type: self.type
                    };
                    self.workshopService.isUpdateSuccess.emit(tempData);
                } else {
                    self.alertMsg.push({
                        type: "danger",
                        msg: data.result.err_msg,
                        timeout: 2000
                    })
                }
            })
        } else {
            self.alertMsg.push({
                type: "danger",
                msg: '请按要求填写数据，带的 * 是必填项!',
                timeout: 2000
            })
        }
    }

    // 取消保存
    canceledit() {
        this.mianTabService.onTabRemove.emit(this.Code);
    }

    // 表单验证事件
    _machine() {
        this.machineShow = false;
    }

    // 选择车间后获取工位选项数据
    _workshopSelect() {
        this.workshopValid = false;
        // console.log(this.formModel.get('workshop_id').valid);
        if (this.formModel.get('workshop_id').valid) {
            this.workshopId = this.formModel.get('workshop_id').value;
            this.canSelect = false;
            // 获取工位信息
            Observable.fromPromise(this.workshopService.getStation(this.workshopId)).subscribe(data => {
                console.log(data);
                if (data.result.success === 1) {
                    this._stationOptions = data.result.extra;
                }
            });
        } else {
            this.canSelect = true;

        }
    }

    _buyTimeClick() {
        this.buyTimeValid = false;
    }

    _addTimeClick() {
        this.addTimeValid = false;
    }
}
