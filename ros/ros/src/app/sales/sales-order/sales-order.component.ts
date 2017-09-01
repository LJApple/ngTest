import { Component, OnInit, Directive, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { CommonHelper, HEADER_AND_FOOTER_HEIGHT } from 'app/utils/common.helper';
import { MasterGridComponent } from 'app/admin/master-grid/master-grid.component';
import { MasterListBaseComponent } from 'app/admin/base/master-list-base/master-list-base.component';
import { SalesOrderService } from './sales-order.service';
import * as _ from 'lodash';

/**
 * 销售订单
 */
@Component({
    selector: 'app-sales-order',
    templateUrl: './sales-order.component.html',
    styleUrls: ['./sales-order.component.scss']
})

export class SalesOrderComponent extends MasterListBaseComponent {

    // 功能代码
    public FUNCTION_CODE: string = 'salesOrder';

    // 筛选栏配置
    public filterBarConfig = {

        // 操作按钮
        buttons: [
            {
                'name': '新增', // 名称
                'class': 'create', // 自定义类选择器
                'handleType': CommonHelper.HANDLE_TYPE.TAB, // 操作类型
                'functionCode': 'sales_order_create', // 点击打开的功能code
            }
        ],
        // 搜索控件
        search: {
            'key': '销售单号', // 文本
            'param': '', // 默认搜索参数
            'handleType': CommonHelper.HANDLE_TYPE.HANDLER, // 操作类型
        }
    };

    public masterListFieldConfig = [

        { title: "销售单号", field: "no", width: 100 },
        { title: "客户", field: "customer", width: 100 },
        { title: "客户单号", field: "customer_order_no", width: 100 },
        { title: "结算方式", field: "paytype_text", width: 101 },
        { title: "规格数", field: "paytype_text", width: 101 },
        { title: "原币币种", field: "currency_name", width: 101 },
        { title: "核定金额", field: "detail_price", width: 101 },
        { title: "含税合计", field: "paytype_text", width: 101 },
        { title: "跟单员", field: "taker", width: 101 },
        { title: "下单日期", field: "createtime", width: 201 },
        { title: "状态", field: "state_text", width: 101 },
        { title: "产品代码", field: "detail_product_code", width: 101 },
        { title: "产品名称", field: "detail_product_name", width: 101 },
        { title: "产品规格", field: "detail_product_spec", width: 101 },
        { title: "单位", field: "detail_unit", width: 101 },
        { title: "数量", field: "item_count", width: 101 },
        { title: "单价", field: "detail_quote_price", width: 101 },
        { title: "含税单价", field: "paytype_text", width: 101 },
        { title: "总价", field: "paytype_text", width: 101 },
        { title: "交货日期", field: "paytype_text", width: 101 },
        { title: "申请出库数量", field: "detail_tax_inclusive_amount", width: 101 },
        { title: "已出库数量", field: "order_tax_inclusive_amount", width: 101 },
        { title: "备注", field: "paytype_text", width: 101 }
    ];

    constructor(public salesOrderService: SalesOrderService) {

        super(salesOrderService);
    }

    ngOnInit() {

        this.initMasterList();
    }

    // 筛选栏按钮点击
    onFilterButtonClick($event) {

        console.log($event);
    }

    // 筛选栏搜索按钮点击
    onFilterSearchClick($event) {

        console.log($event);

        /* let params = $event.param;

        this.gridParams = _.merge(this.gridParams, {
            params: params
        });
        this.reloadListData(); */
    }
}

