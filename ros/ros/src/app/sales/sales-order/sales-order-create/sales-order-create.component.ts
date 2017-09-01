import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import * as _ from 'lodash';

import { FunctionCreateBaseComponent } from 'app/admin/base/function-create-base/function-create-base.component';

/*
 * 销售订单新增
 */
@Component({
    selector: 'app-sales-order-create',
    templateUrl: './sales-order-create.component.html',
    styleUrls: ['./sales-order-create.component.scss']
})
export class SalesOrderCreateComponent extends FunctionCreateBaseComponent {

    // 客户下拉列表地址
    public customerGridUrl = '/Customer/myCustomerList';
    public setWidth: number = 190;
    public isGridHide: boolean = true;
    public isActive: boolean;
    public gridWidth: any = 320;
    public fieldName: string = 'SalesOrder[no]';
    // 下拉GRID数据模型初始化
    public gridArrOptions: any = [
        {headerName: "机台编号", field: "no", width: 100},
        {headerName: "机台名称", field: "name", width: 100},
        {headerName: "机台分类", field: "type", width: 100},
    ];

    // 主单字段配置
    public fieldConfig = [
        { name: 'SalesOrder[id]', title: 'id', hidden: true },
        { name: 'SalesOrder[version]', title: '版本号', hidden: true },
        { name: 'SalesOrder[item_count]', title: '规格数' },
        { name: 'SalesOrder[exchange_rate]', title: '汇率' },
        { name: 'SalesOrder[quantity]', title: '数量' },
        { name: 'SalesOrder[state]', title: '状态' },
        { name: 'SalesOrder[customer_pay_type]', title: '客户结算方式' },
        { name: 'SalesOrder[source_type]', title: '来源类型' },
        { name: 'SalesOrder[sourceid]', title: '来源id' },
        { name: 'SalesOrder[no]', title: '单号' },
        { name: 'SalesOrder[customerid]', title: '客户id' },
        { name: 'SalesOrder[customer_order_no]', title: '客户单号' },
        { name: 'SalesOrder[out_warehouse_id]', title: '出库单id' },
        { name: 'SalesOrder[production_cycle]', title: '生产周期' },
        { name: 'SalesOrder[taxid]', title: '税费类型id' },
        { name: 'SalesOrder[tax_rate]', title: '税率' },
        { name: 'SalesOrder[tax]', title: '税费' },
        { name: 'SalesOrder[amount]', title: '合计' },
        { name: 'SalesOrder[tax_inclusive_amount]', title: '含税合计' },
        { name: 'SalesOrder[approved_amount]', title: '核定金额' },
        { name: 'SalesOrder[currency_id]', title: '币种id' },
        { name: 'SalesOrder[order_date]', title: '下单日期' },
        { name: 'SalesOrder[remark]', title: '备注' },
        { name: 'SalesOrder[takerid]', title: '跟单员id' },
    ];

    constructor(protected formBuilder: FormBuilder) {

        super(formBuilder);
        this.initFormModel();
    }

    ngOnInit() {
    }

    submitSalesOder() {
        console.log("qwe")
    }

    onGridClick($event) {
        console.log($event);
    }
}

export class SalesOrder {
    constructor(id: any) {
    }
}
