import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-barcode-template-create',
    templateUrl: './barcode-template-create.component.html',
    styleUrls: ['./barcode-template-create.component.scss']
})
export class BarcodeTemplateCreateComponent implements OnInit {

    public FUNCTION_CODE = 'barcode_template_create';
    public formModel: FormGroup;

    // 成品物料combogrid配置
    public productFieldName: string = 'product_name';
    public productCombogridUrl: string = '/Product/InfoList';
    public setWidth: number = 250;
    public isGridHide: boolean = true;
    public gridArrOptions: any = [
        {headerName: "产品代码", field: "code", width: 100},
        {headerName: "产品名称", field: "name", width: 100},
        {headerName: "产品规格", field: "spec", width: 100},
    ];

    constructor(
        private formBuilder: FormBuilder
    ) {

        // 表单数据模型初始化表单
        this.formModel = formBuilder.group ({
            'product_id': [],
            'product_name': [],
        });
    }

    ngOnInit() {
    }

    // 点击下拉 赋值给表单  这里注意使用patchValue
    // 借助patchValue，我们可以更灵活地解决数据模型和表单模型之间的差异。 但是和setValue不同，patchValue不会检查缺失的控件值，并且不会抛出有用的错误信息。
    onGridClick ($event) {
        let data = $event.data;
        this.formModel.patchValue({
            'product_id': data.id,
            'product_name': data.name
        })
    }

    forbidDefault ($event) {
        if ($event.target.id && $event.target.id == 'speInput' || $event.target.id == 'speBtn' ){
            this.isGridHide = true;
            this.isGridHide = false;
        }else {
            console.log('可以隐藏!');
            this.isGridHide = true;
        }
    }

    machineUpdateInfoClose () {
        //this.mainTabService.onTabRemove.emit(this.functionCode);
    }

    // 提交表单动作
    machineUpdateInfoSave () {

        /* let contentValid: boolean = this.machineGroupModel.get('MachineCheck[content]').valid;
        let noValid: boolean = this.machineGroupModel.get('MachineCheck[no]').valid;

        if (noValid && contentValid) {
            this.getData(this.machineGroupModel.value);
        }else{
            alert('请填写完整信息并确认其符合格式要求!');
        }
        console.log(this.machineGroupModel.value); */

    }

}
