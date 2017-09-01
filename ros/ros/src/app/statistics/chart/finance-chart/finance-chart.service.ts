import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SERVICE_BASE_ADDR, HttpResult } from "app/utils/utils";
import { CommonHelper } from "app/utils/common.helper";
import { Observable } from 'rxjs/Observable';

/**
 * 财务分析接口
 */
const FINANCE_ANALYSIS_URL = SERVICE_BASE_ADDR + "statistics/FinanceReport/AnalysisList";

/**
 * 资产和负债 联动接口
 */
const FINANCE_LASYEARANALYSIS_URL = SERVICE_BASE_ADDR + "statistics/FinanceReport/LastYearAnalysisData";

/**
 * 费用分析 联动接口
 */
const FINANCE_COSTANALYSIS_URL = SERVICE_BASE_ADDR + "statistics/FinanceReport/CostAnalysisData";

/**
 * 现金流量分析 联动接口
 */
const FINANCE_CASHITEM_URL = SERVICE_BASE_ADDR + "statistics/FinanceReport/CashItemAnalysisData";

/**
 * 利润分析 联动接口
 */
const FINANCE_PROFIT_URL = SERVICE_BASE_ADDR + "statistics/FinanceReport/ProfitAnalysisData";


@Injectable()
export class FinanceChartService {

  constructor(private http: Http) { }

  //type 1.资产, 2.负债, 3.货币资金, 4.费用, 5.现金流量, 6.利润分析
  public getFinanceChartInfo(type): Observable<any> {
    return this.http.get(CommonHelper.getUrl(FINANCE_ANALYSIS_URL, { "type": type })).map((res: Response) => { return res.json() });
  }

  public getLastYearAnalysisData(accountName): Observable<any> {
    return this.http.get(CommonHelper.getUrl(FINANCE_LASYEARANALYSIS_URL, { "accountName": accountName })).map((res: Response) => { return res.json() });
  }

  public getCashItemAnalysisData(cashName): Observable<any> {
    return this.http.get(CommonHelper.getUrl(FINANCE_CASHITEM_URL, { "cashName": cashName })).map((res: Response) => { return res.json() });
  }

  public getCostAnalysisData(accountId): Observable<any> {
    return this.http.get(CommonHelper.getUrl(FINANCE_COSTANALYSIS_URL, { "accountId": accountId })).map((res: Response) => { return res.json() });
  }

  public getProfitAnalysisData(profitName): Observable<any> {
    return this.http.get(CommonHelper.getUrl(FINANCE_PROFIT_URL, { "profitName": profitName })).map((res: Response) => { return res.json() });
  }

  public getLinkRelativeData(data) {
    if (data) {
      let date = new Date;
      let nowYearData = data[date.getFullYear()];
      let xData = [];
      let currentPeriod = [];
      let scale = [];
      let prevKey = '0';
      for (let key in nowYearData) {
        xData.push(key);
        currentPeriod.push(nowYearData[key]);
        scale.push(prevKey == '0' ? 0 : (nowYearData[key] - nowYearData[prevKey]) / nowYearData[prevKey] * 100);
        prevKey = key;
      }
      return {
        colors: ['#75D19E', '#F3969C'],
        legendData: ['本期', '环比比例'],
        xData: xData,
        yName: '单位(万元)',
        seriesData: [
          {
            name: '本期',
            value: currentPeriod
          },
          {
            name: '环比比例',
            value: scale
          }],
        hasLine: true
      };
    }
  }

  public  getyearOnYearData(data) {
    if (data) {
      let date = new Date;
      let nowYearData = data[date.getFullYear()];
      let lastYearData = data[date.getFullYear() - 1];
      let xData = [];
      let currentPeriod = [];
      let lastYear = [];
      let scale = [];
      for (let key in nowYearData) {
        xData.push(key);
        currentPeriod.push(nowYearData[key]);
      }
      for (let key in lastYearData) {
        lastYear.push(lastYearData[key]);
      }
      for (let i = 0; i < currentPeriod.length; i++) {
        scale.push(lastYear[i] == 0 || lastYear[i] == undefined ? 0 : (currentPeriod[i] - lastYear[i]) / lastYear[i] * 100);
      }

      return {
        colors: ['#51BDF4', '#FABD5D', '#F3969C'],
        legendData: ['本期', '同期', '同比比例'],
        xData: xData,
        yName: '单位(万元)',
        seriesData: [
          {
            name: '本期',
            value: currentPeriod
          },
          {
            name: '同期',
            value: lastYear,
          },
          {
            name: '同比比例',
            value: scale
          }],
        hasLine: true
      };
    }
  }
}
