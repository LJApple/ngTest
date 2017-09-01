import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import * as _ from 'lodash';
import { BarCodeTypeService } from './procedure-bar-code.service';
import { CreateProcedureManagementService } from "app/procedure/create-procedure-management/create-procedure-management.service";
import { UpdateProcedureManagementService } from "app/procedure/update-procedure-management/update-procedure-management.service";
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";


@Component({
  selector: 'app-procedure-bar-code',
  templateUrl: './procedure-bar-code.component.html',
})
export class ProcedureBarCodeComponent implements OnInit {

  @Input() procedureFormModel;
  public formModule: FormGroup;


  // &page=' + this.RowState.page + '&rows=' + this.RowState.row;
  RowState: RowState = new RowState('1', '15');
  public isRulesActive: boolean;
  public isBlock: Object;
  public codeName;
  public barcode_rule_type: any = '';
  public barcode_rule;
  public loadGridUrl = 'v1/production/barcodeRules/';
  public params = '0&FUNCTION_CODE=barcode_rule';
  public fieldName: string = 'barcode_text';
  public setWidth: number = 170;
  public gridWidth: number = 202;
  public isGridHide: boolean = true;
  public isActive: boolean;
  public bottom: number;
  public selectOptions;
  public value;
  public alertMsg: any = [];
  @Input() type;

  public position = {
    clientX: 0,
    clientY: 0
  };

  public barRuleOptions = [
    {
      id: 1,
      title: '固定值',
      code: 'fixValue',
      isSelected: true
    },
    {
      id: 2,
      title: '条码长度',
      code: 'codeLength',
      isSelected: false,
    },
    {
      id: 3,
      title: '非法字符',
      code: 'lllegalCode',
      isSelected: false,
    },
    {
      id: 4,
      title: '允许字符',
      code: 'allowCode',
      isSelected: false,
    }
  ];
  // 下拉GRID数据模型初始化
  public gridArrOptions: any = [
    { headerName: "id", field: "id", width: 100, hide: true },
    { headerName: "规则编码", field: "code", width: 100 },
    { headerName: "规则名称", field: "preview", width: 100 },
  ];

  constructor(
    Fbuilder: FormBuilder,
    private barCodeTypeService: BarCodeTypeService,
    private createProcedureManagementService: CreateProcedureManagementService,
    private updateProcedureManagementService: UpdateProcedureManagementService, ) {

    this.formModule = Fbuilder.group({
      'fixValue': ['', []],
      'codeLength': ['', []],
      'lllegalCode': ['', []],
      'allowCode': ['', []]
    });
  }

  ngOnInit() {

    const self = this;
    Observable.fromPromise(this.barCodeTypeService.getSNTypes()).subscribe(data => {
      this.bottom = -(data.data.length * 24 + 24);
      this.selectOptions = data.data;
    });
    // 条码规则下拉数据
    if (this.type == 2) {

      self.updateProcedureManagementService.barcodeTypeValue.subscribe((data) => {


        self.barcode_rule = data.barcodeRule;
        self.barcode_rule_type = data.barcodeRuleType;

        if (data.barcodeRuleType == 1) {

          this.formModule.patchValue({
            'fixValue': data.barcodeRule
          });
        } else if (data.barcodeRuleType == 2) {

          this.formModule.patchValue({
            'codeLength': data.barcodeRule
          });
        } else if (data.barcodeRuleType == 3) {

          this.formModule.patchValue({
            'lllegalCode': data.barcodeRule
          });
        } else if (data.barcodeRuleType == 4) {

          this.formModule.patchValue({
            'allowCode': data.barcodeRule
          });
        }

      });
    }

  };

  // 点击下拉 赋值给表单  这里注意使用patchValue
  // 借助patchValue，我们可以更灵活地解决数据模型和表单模型之间的差异。 但是和setValue不同，patchValue不会检查缺失的控件值，并且不会抛出有用的错误信息。
  onGridClick($event) {
    let data = $event;
    this.procedureFormModel.patchValue({
      'barcode_id': data.id,
      'barcode_text': data.preview
    })
  }

  // combogrid组件隐藏事件
  forbidDefault($event) {
    if ($event.target.id && $event.target.id == 'speInput' || $event.target.id == 'speBtn') {
      this.isGridHide = true;
      this.isGridHide = false;
      this.isActive = true;
      this.isRulesActive = false;
      this.isBlock = { 'display': 'none' };
      return;
    } else {
      this.isGridHide = true;
      this.isActive = false;

      return;
    }
  }


  // 滑入滑出事件
  closeMenuContext() {

    this.isRulesActive = false;
    this.isBlock = { 'display': 'none' };
  };

  //  显示隐藏
  onbarCodeselected(event) {


    this.position.clientX = event.clientX - 280;
    this.position.clientY = event.clientY - 120;

    if (this.isRulesActive) {
      this.isRulesActive = false;
      this.isBlock = { 'display': 'none' };
    } else {
      this.isRulesActive = true;
      this.isBlock = { 'display': 'block' };

      if (this.type == 2) {
        _.forEach(this.barRuleOptions, function (data) {
          data.isSelected = false;
        });
        if (this.barcode_rule_type) {

          this.barRuleOptions[this.barcode_rule_type - 1].isSelected = true;
        }
      }
    }
  }

  // 校验规则单选点击
  onSelected(item) {

    this.clearSelectedRules();
    item.isSelected = true;
    this.formModule.patchValue({
      'fixValue': '',
      'codeLength': '',
      'lllegalCode': '',
      'allowCode': ''
    })
  };

  // 取消所有选中方法
  clearSelectedRules() {
    _.forEach(this.barRuleOptions, function (data) {
      data.isSelected = false;
      $('.rule-contain-msg').val('');
    });
  };

  // 校验表单取消
  onBarCodeRuleClose() {

    this.isRulesActive = false;
    this.isBlock = { 'display': 'none' };
  };

  createValue() {

  };

  fixValueThree(control: FormControl) {
    const reg3 = /^([a-zA-Z0-9\*\?]+)$/;
    let valid = reg3.test(control.value);
    return valid ? null : { message: true };
  }


  codeLength(control: FormControl) {

    const myreg = /^([0-9]){1,2}$/
    let valid = myreg.test(control.value);
    return valid ? null : { message: true };
  }

  lllegalCode(control: FormControl) {

    let arr = control.value.split('');
    let valid
    var arr_tmp = arr
    arr = _.uniq(arr);
    if (arr.length != arr_tmp.length) {
      valid = false
      return valid ? null : { message: true };
    } else {
      valid = true
      return valid ? null : { message: true };
    }
  }


  onBarCodeRuleSubmit() {

    let fixValue = this.formModule.get('fixValue').value;
    let codeLengthValue = this.formModule.get('codeLength').value;
    let lllegalCodeValue = this.formModule.get('lllegalCode').value;
    let allowCodeValue = this.formModule.get('allowCode').value;

    const self = this;
    if (fixValue) {

      const reg1 = /\*\?/;
      const reg2 = /\*\*/;
      const reg3 = /^([a-zA-Z0-9\*\?]+)$/;

      let validOne = reg1.test(fixValue);
      let validTwo = reg2.test(fixValue);
      let validThree = reg3.test(fixValue);
      if (validThree && !validOne && !validTwo) {
        self.barcode_rule_type = 1;
        self.isBlock = { 'display': 'none' };
        self.isRulesActive = false;
        self.procedureFormModel.patchValue({
          'barcode_rule': fixValue
        });
        self.formModule.patchValue({
          'fixValue': fixValue
        })
      } else {
        self.barcode_rule_type = '';
        self.alertMsg.push({
          type: "danger",
          msg: '*只能输入一次，英文？可以输入多个，不能同时输入？或*',
          timeout: 2000
        });
      }
    } else if (codeLengthValue) {

      const myreg = /^([0-9]){1,2}$/
      let valid = myreg.test(codeLengthValue);
      if (valid &&  codeLengthValue <= 32 && codeLengthValue>0) {
        self.barcode_rule_type = 2;
        self.isBlock = { 'display': 'none' };
        self.isRulesActive = false;
        self.procedureFormModel.patchValue({
          'barcode_rule': codeLengthValue
        });
        this.formModule.patchValue({
          'codeLength': codeLengthValue
        });
      } else {
        self.barcode_rule_type = '';
        self.alertMsg.push({
          type: "danger",
          msg: '请输入1-32之间的数值',
          timeout: 2000
        });
      }
    } else if (lllegalCodeValue) {

      let number = 3;
      this.onCodeValidater(lllegalCodeValue, self, number, 'lllegalCode');
    } else if (allowCodeValue) {

      let number = 4;
      this.onCodeValidater(allowCodeValue, self, number, 'allowCode');
    } else {
      self.alertMsg.push({
        type: "danger",
        msg: '请输入序列号校验规则！',
        timeout: 2000
      });
    }
    /* console.log(allowCodeValue)
    console.log(codeLengthValue)
    console.log(lllegalCodeValue)
    console.log(fixValue) */

  }

  //  不能输入重复字符
  onCodeValidater(value, self, number, fromW) {

    let arr = value.split('')
    var arr_tmp = arr
    arr = _.uniq(arr);
    if (arr.length != arr_tmp.length) {
      self.barcode_rule_type = '';
      self.alertMsg.push({
        type: "danger",
        msg: '不能输入重复的字符，请重新输入',
        timeout: 2000
      });
    } else {
      self.barcode_rule_type = number;
      self.isBlock = { 'display': 'none' };
      self.isRulesActive = false;
      self.procedureFormModel.patchValue({
        'barcode_rule': value
      });
      self.formModule.patchValue({
        fromW: value
      });
    }
  };

  //  取消保存
  onBarCodeRuleCancel() {


    let self = this;
    self.clearSelectedRules();
    if (self.type == 2) {

      if (self.barcode_rule_type == 1) {

        self.barRuleOptions[0]["isSelected"] = true;
        let type = self.barcode_rule_type
        self.formModule.patchValue({
          'fixValue': self.barcode_rule,
          'codeLength': '',
          'lllegalCode': '',
          'allowCode': ''
        });
        self.valueFunction(type);
      } else if (self.barcode_rule_type == 2) {

        self.barRuleOptions[1]["isSelected"] = true;
        self.formModule.patchValue({
          'codeLength': self.barcode_rule,
          'fixValue': '',
          'lllegalCode': '',
          'allowCode': ''
        });
        let type = self.barcode_rule_type
        self.valueFunction(type);
      } else if (self.barcode_rule_type == 3) {

        self.formModule.patchValue({
          'lllegalCode': '',
          'codeLength': self.barcode_rule,
          'fixValue': '',
          'allowCode': ''
        });
        self.barRuleOptions[2]["isSelected"] = true;
        let type = self.barcode_rule_type
        self.valueFunction(type);
      } else if (self.barcode_rule_type == 4) {

        self.formModule.patchValue({
          'allowCode': self.barcode_rule,
          'lllegalCode': '',
          'codeLength': '',
          'fixValue': '',
        });
        self.barRuleOptions[3]["isSelected"] = true;
        let type = self.barcode_rule_type
        self.valueFunction(type);
      }
    } else {

      self.barRuleOptions[0]["isSelected"] = true;
      self.barcode_rule_type = '';
      self.procedureFormModel.patchValue({
        'barcode_rule': ''
      });
    }
    self.isRulesActive = false;
    self.isBlock = { 'display': 'none' };

  };

  valueFunction(type) {
    this.procedureFormModel.patchValue({
      'barcode_rule': this.barcode_rule
    });
    _.forEach(this.barRuleOptions, function (data) {

      if (type == data.isSelected) {
        data.isSelected = true
      }
      data.isSelected = false;
    });
  }
}
