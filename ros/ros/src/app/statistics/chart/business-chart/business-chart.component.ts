import { Component, OnInit } from '@angular/core';
import { BusinessChartService } from './business-chart.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { BusinessChart } from "./business-chart.model";
import { ChartPie } from '../common-chart/chart-pie/chart-pie.model';
import { ChartGauge } from '../common-chart/chart-gauge/chart-gauge.model';
import { ChartTable } from '../common-chart/chart-table/chart-table.model';
import { ChartRectangle } from '../common-chart/chart-rectangle/chart-rectangle.model';
import { ChartProgress } from '../common-chart/chart-progress/chart-progress.model';
import { FunctionUnit } from "app/admin/function-unit/function-unit.model";
import * as _ from 'lodash';

@Component({
  selector: 'app-business-chart',
  templateUrl: './business-chart.component.html',
  styleUrls: ['./business-chart.component.scss']
})
export class BusinessChartComponent implements OnInit {
  PieData_sale: ChartPie;
  PieData_timely: ChartPie;
  GaugeData_saleReturn: ChartGauge;
  saleTable: ChartTable;
  CustomerTop10: ChartRectangle;
  productTop: Array<ChartProgress>;
  productTop_Customer: string;
  productTop_Customer_tooltip: string;
  customerTotal: number;
  poductTotal: number;
  busy: Subscription;
  busy_two: Subscription;

  constructor(private businessChartService: BusinessChartService) { }

  ngOnInit() {
    this.busy = Observable.forkJoin(this.businessChartService.getBusinessChartInfo()).subscribe(data => {
      debugger
      var saleData = data[0];
      var customerTop10_Name = [];
      var customerTop10_Value = [];
      this.customerTotal = saleData.product_top10_list.total;
      this.poductTotal = saleData.product_top10_list.total;

      //销售额
      let sale_functionCode = "salesChart";
      this.PieData_sale = {
        title: "销售额",
        show_rate: 100,
        show_rate_text: "100%",
        show_rate_title: "完成率",
        rec_one_text: "实际销售额",
        rec_one_value: saleData.sales_amount,
        rec_two_text: "近12个月最大值",
        rec_two_value: saleData.max_amount,
        rec_unit: "￥",
        rec_unit_atPev: true,
        drill_target_code: sale_functionCode
      };

      //出货及时率
      this.PieData_timely = {
        title: "出货及时率",
        show_rate: saleData.timely_delivery_rate,
        show_rate_text: saleData.timely_delivery_rate + "%",
        show_rate_title: "及时率",
        rec_one_text: "正常出货量",
        rec_one_value: saleData.normal_qunatity,
        rec_two_text: "延期出货量",
        rec_two_value: saleData.abnormal_qunatity,
        rec_unit: "PCS",
        rec_unit_atPev: false,
        drill_target_code: null
      };

      //销售退货率
      let return_functionCode = "salesReturnChart";
      this.GaugeData_saleReturn = {
        title: "销售退货率",
        show_rate: parseFloat(saleData.sales_return_rate.toFixed(3)),
        rec_one_text: "销售总量",
        rec_one_value: saleData.sales_quantity,
        rec_two_text: "退货量",
        rec_two_value: saleData.return_quantity,
        rec_unit: "PCS",
        rec_unit_atPev: false,
        drill_target_code: return_functionCode
      };

      //销售业绩数据中添加一项“名次”
      for (var i = 0; i < saleData.sales_rank.length; i++) {
        saleData.sales_rank[i].rankId = i + 1;
        saleData.sales_rank[i].returnRate = saleData.sales_rank[i].returnRate.toFixed(2) + "%";
      }

      //销售业绩
      let table_functionCode = "salesPersonageChart";
      this.saleTable = {
        title: "销售业绩",
        href: "",
        head: [{ "Text": "名次", "Value": "rankId" }, { "Text": "姓名", "Value": "taker" }, { "Text": "销售额", "Value": "amount" },
        { "Text": "去年同期", "Value": "pastAmount" }, { "Text": "增长额", "Value": "received_quantity" }, { "Text": "退货率", "Value": "returnRate" }],
        data: saleData.sales_rank,
        drill_target_code: table_functionCode
      };

      //客户销售额排行
      //客户销售额前十处理成可以供Echarts使用的两个数组
      for (var i = 0; i < saleData.customer_top10_list.length; i++) {
        customerTop10_Name.push(saleData.customer_top10_list[i].customer);
        customerTop10_Value.push({ "name": saleData.customer_top10_list[i].customer_id, "value": saleData.customer_top10_list[i].amount })
      }
      this.CustomerTop10 = {
        title: "客户销售额排行前十",
        xData: customerTop10_Name,
        Data: customerTop10_Value
      }

      //产品的销售排行
      this.productTop_Customer = "产品的排行销售"
      this.productTop_Customer_tooltip = "";
      this.getProductTop(saleData.product_top10_list);
    });

  }

  onChange(customerID) {
    this.busy_two = Observable.fromPromise(this.businessChartService.getProductTopByCustomer(customerID)).subscribe(data => {
      this.getProductTop(data);
    });
  }

  //获取产品销售额排行
  getProductTop(data: any) {
    let preTotal: number = 0;
    if (this.productTop_Customer === data[0].customer) {
      return;
    } else {
      if (data[0].customer) {
        this.productTop_Customer = data[0].customer;
        this.productTop_Customer_tooltip = "（产品销售额排行）";
      }
      this.poductTotal = data.total;
      this.productTop = [];
    }
    for (var i = 0; i < 5; i++) {
      preTotal = preTotal + Number.parseFloat(data[i].amount);
      this.productTop.push({
        toolTipText: "销售额",
        rightContent: ((data[i].amount / data.total) * 100).toFixed(2) + "%",
        centerContent: "￥" + data[i].amount,
        leftContent: data[i].product_name,
        value: (data[i].amount / data.total) * 100
      });
    }
    this.productTop.push({
      toolTipText: "销售额",
      rightContent: data.total - preTotal < 0 ? "0.00%" : ((data.total - preTotal) / data.total * 100).toFixed(2) + "%",
      centerContent: data.total - preTotal < 0 ? "￥0.00" : "￥" + (data.total - preTotal).toFixed(2),
      leftContent: "其它",
      value: (data.total - preTotal) / data.total * 100
    })
  }

}
