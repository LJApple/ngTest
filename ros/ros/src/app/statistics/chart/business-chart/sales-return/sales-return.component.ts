import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { BusinessChartService } from '../business-chart.service';
import { ChartLine } from 'app/statistics/chart/common-chart/chart-line/chart-line.model';
import { ChartPieSector } from 'app/statistics/chart/common-chart/chart-pie-sector/chart-pie-sector.model';
import { SalesReturn } from './sales-return.model';

@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.scss']
})
export class SalesReturnComponent implements OnInit {
  last12Sales_Return: ChartLine;
  last12Sales_Person: ChartPieSector;
  last12Sales_Customer: ChartPieSector;
  last12Sales_Product: ChartPieSector;
  busy: Subscription;

  constructor(private businessChartService: BusinessChartService) { }

  ngOnInit() {
    this.busy = Observable.fromPromise(this.businessChartService.getPath12MouthSalesReturn()).subscribe(data => {
      if (data) {
        let lastMothName = [];
        let realitySales = { "title": "实际", "data": [] };
        for (let i = 0; i < data.salesReturnAmount.length; i++) {
          lastMothName.push(data.salesReturnAmount[i].month)
          realitySales.data.push(data.salesReturnAmount[i].amount)
        }
        this.last12Sales_Return = {
          title: "近12个月销售退货趋势分析",
          // legend: ["实际", "目标"],
          legend: ["实际"],
          xData: lastMothName,
          value: [realitySales]
        };


        //近12个月销售人员退货占比
        let takerName = [];
        let takerData = [];
        let takertTotal = 0;
        for (let i = 0; i < 9; i++) {
          if (!data.takerAmount[i]) {
            break;
          }
          takerName.push(data.takerAmount[i].taker);
          takerData.push({ value: data.takerAmount[i].amount, name: data.takerAmount[i].taker });
          takertTotal = takertTotal + Math.floor(Number.parseFloat(data.takerAmount[i].amount) * 100) / 100;
        }
        if (data.takerAmount[9]) {
          takerName.push("其它");
          takerData.push({ value: data.takerAmount.total - takertTotal, name: "其它" });
        }
        this.last12Sales_Person = {
          title: "近12个月销售人员退货占比",
          legend: takerName,
          toolTipText: "销售人员退货占比",
          value: takerData
        };
        console.log(this.last12Sales_Person);

        //近12个月客户退货占比
        let customerName = [];
        let customerData = [];
        let customerTotal = 0;
        for (let i = 0; i < 9; i++) {
          if (!data.customerAmount[i]) {
            break;
          }
          customerName.push(data.customerAmount[i].customer)
          customerData.push({ value: data.customerAmount[i].amount, name: data.customerAmount[i].customer });
          customerTotal = customerTotal + Math.floor(Number.parseFloat(data.customerAmount[i].amount) * 100) / 100;
        }
        if (data.customerAmount[9]) {
          customerName.push("其它");
          customerData.push({ value: data.customerAmount.total - customerTotal, name: "其它" });
        }
        this.last12Sales_Customer = {
          title: "近12个月客户退货占比",
          legend: customerName,
          toolTipText: "客户退货占比",
          value: customerData
        };

        //近12个月产品退货占比
        let productName = [];
        let productData = [];
        let productTotal = 0;
        for (let i = 0; i < 9; i++) {
          if (!data.productAmount[i]) {
            break;
          }
          productName.push(data.productAmount[i].product_name)
          productData.push({ value: data.productAmount[i].amount, name: data.productAmount[i].product_name });
          productTotal = productTotal + Math.floor(Number.parseFloat(data.productAmount[i].amount) * 100) / 100;
        }
        if (data.productAmount[9]) {
          productName.push("其它");
          productData.push({ value: data.productAmount.total - productTotal, name: "其它" });
        }
        this.last12Sales_Product = {
          title: "近12个月产品退货占比",
          legend: productName,
          toolTipText: "产品退货占比",
          value: productData
        };
      }
    });
  }

}
