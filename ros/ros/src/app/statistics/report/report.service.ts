import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { CommonHelper } from "app/utils/common.helper";
import { Observable } from 'rxjs/Observable';

/**
 * 销售报表接口
 */
const SALES_REPORT_URL = SERVICE_BASE_ADDR + "statistics/SalesReportForms/GetReportSalesOrder";

/**
 * 销售报价单接口
 */
const QUOTATION_REPORT_URL = SERVICE_BASE_ADDR + "statistics/SalesReportForms/GetReportSalesQuotation";

/**
 * 销售退货单接口
 */
const SALES_RETURN_URL = SERVICE_BASE_ADDR + "statistics/SalesReportForms/SalesReturnOrder";

/**
 * 销售备货订单接口
 */
const REPORT_ADVANCE_URL = SERVICE_BASE_ADDR + "statistics/SalesReportForms/GetReportAdvanceSalesOrder";

/**
 * 采购订单接口
 */
const PURCHASE_ORDER_URL = SERVICE_BASE_ADDR + "statistics/PurchaseReportForms/GetReportPurchaseOrder";

/**
 * 委外订单接口
 */
const OUT_SOURCE_ORDER_URL = SERVICE_BASE_ADDR + "statistics/PurchaseReportForms/GetReportOutsourceOrder";

/**
 * 采购退货订单接口
 */
const PURCHASE_RETURN_URL = SERVICE_BASE_ADDR + "statistics/PurchaseReportForms/GetReportPurchseReturnOrder";

/**
 * 生产任务订单接口
 */
const PRODUCT_REPORT_URL = SERVICE_BASE_ADDR + "statistics/ProductionReportForms/GetReportProductionTask";

/**
 * 车间生产订单接口
 */
const PRODUCT_ORDER_URL = SERVICE_BASE_ADDR + "statistics/ProductionReportForms/GetReportProductionOrder";

/**
 * 品管报表接口
 */
const INSPECT_ORDER_URL = SERVICE_BASE_ADDR + "statistics/ProductionReportForms/GetReportInspectOrder";


export enum RequestType {
  //销售订单
  SalesOrder = 0,
  //销售订货单
  SalesQuotation = 1,
  //销售退货单
  SalesReturn = 2,
  //销售备货订单
  SalesGoodsOrder = 3,
  //采购订单
  PurchaseOrder = 4,
  //委外订单
  OutSourceOrder = 5,
  //采购退货订单
  PurchaseReturn = 6,
  //生产任务订单
  ProductTask = 7,
  //车间生产订单
  ProductOrder = 8,
  //品管报表订单
  InspectOrder = 9
}

@Injectable()
export class ReportService {

  constructor(private http: Http) { }

  public getReportFormByType(requestType: RequestType, d1: string, d3: string, type_value: string, d2?: any): Promise<any> {

    switch (requestType) {
      case RequestType.SalesOrder:
        return this.http.get(CommonHelper.getUrl(SALES_REPORT_URL, { "d1": d1, "d2": d2, "d3": d3, "type_value": type_value })).toPromise().then((res: Response) => { return res.json() });
      case RequestType.SalesQuotation:
        return this.http.get(CommonHelper.getUrl(QUOTATION_REPORT_URL, { "d1": d1, "d2": d2, "d3": d3, "type_value": type_value })).toPromise().then((res: Response) => { return res.json() });
      case RequestType.SalesReturn:
        return this.http.get(CommonHelper.getUrl(SALES_RETURN_URL, { "d1": d1, "d2": d2, "d3": d3, "type_value": type_value })).toPromise().then((res: Response) => { return res.json() });
      case RequestType.SalesGoodsOrder:
        return this.http.get(CommonHelper.getUrl(REPORT_ADVANCE_URL, { "d1": d1, "d2": d2, "d3": d3, "type_value": type_value })).toPromise().then((res: Response) => { return res.json() });
      case RequestType.PurchaseOrder:
        return this.http.get(CommonHelper.getUrl(PURCHASE_ORDER_URL, { "d1": d1, "d2": d2, "d3": d3, "type_value": type_value })).toPromise().then((res: Response) => { return res.json() });
      case RequestType.OutSourceOrder:
        return this.http.get(CommonHelper.getUrl(OUT_SOURCE_ORDER_URL, { "d1": d1, "d2": d2, "d3": d3, "type_value": type_value })).toPromise().then((res: Response) => { return res.json() });
      case RequestType.PurchaseReturn:
        return this.http.get(CommonHelper.getUrl(PURCHASE_RETURN_URL, { "d1": d1, "d2": d2, "d3": d3, "type_value": type_value })).toPromise().then((res: Response) => { return res.json() });
      case RequestType.ProductTask:
        return this.http.get(CommonHelper.getUrl(PRODUCT_REPORT_URL, { "d1": d1, "d2": d2, "d3": d3, "type_value": type_value })).toPromise().then((res: Response) => { return res.json() });
      case RequestType.ProductOrder:
        return this.http.get(CommonHelper.getUrl(PRODUCT_ORDER_URL, { "d1": d1, "d2": d2, "d3": d3, "type_value": type_value })).toPromise().then((res: Response) => { return res.json() });
      case RequestType.InspectOrder:
        return this.http.get(CommonHelper.getUrl(INSPECT_ORDER_URL, { "d1": d1, "d2": d2, "d3": d3, "type_value": type_value })).toPromise().then((res: Response) => { return res.json() });
    }


  }
}
