import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { BusinessChartComponent } from "app/statistics/chart/business-chart/business-chart.component";
// import { DynamicWrapperComponent } from 'app/admin/dynamic-wrapper/dynamic-wrapper.component';
import { AssetStatisticsComponent } from './asset-statistics/asset-statistics.component';
import { CashFlowComponent } from "app/statistics/chart/finance-chart/cash-flow/cash-flow.component";
import { DebtEquityComponent } from "app/statistics/chart/finance-chart/debt-equity/debt-equity.component";
import { MonetaryCapitalComponent } from "app/statistics/chart/finance-chart/monetary-capital/monetary-capital.component";
import { ProfitAnalysisComponent } from "app/statistics/chart/finance-chart/profit-analysis/profit-analysis.component";
import { CostAnalysisComponent } from "app/statistics/chart/finance-chart/cost-analysis/cost-analysis.component";
import { FinanceChartService } from './finance-chart.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-finance-chart',
  templateUrl: './finance-chart.component.html',
  styleUrls: ['./finance-chart.component.scss']
})

export class FinanceChartComponent implements OnInit {

  public modules: any[] = [
    { title: '资产分析', code: 'asset', component: AssetStatisticsComponent, disabled: false, removable: false, active: true },
    { title: '负债权益分析', code: 'debt', component: DebtEquityComponent, disabled: false, removable: false, active: false },
    { title: '货币资金分析', code: 'monetary', component: MonetaryCapitalComponent, disabled: false, removable: false, active: false },
    { title: '费用分析', code: 'cost', component: CostAnalysisComponent, disabled: false, removable: false, active: false },
    { title: '现金流量分析', code: 'cash', component: CashFlowComponent, disabled: false, removable: false, active: false },
    { title: '利润分析', code: 'profit', component: ProfitAnalysisComponent, disabled: false, removable: false, active: false }
  ]
  component: Component;

  constructor(private financeChartService: FinanceChartService) { }

  ngOnInit() {
  }

  switch(code) {
    let self = this;
    _.forEach(this.modules, function (module) {
      if (module.code == code) {
        module.active = true;
        // self.component = module.component;
      } else {
        module.active = false;
      }
    });
  }
}
