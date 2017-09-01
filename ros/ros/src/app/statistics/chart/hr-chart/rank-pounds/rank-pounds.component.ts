import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { HrChartService } from '../hr-chart.service';
import { RankTabsService } from "app/statistics/chart/hr-chart/rank-pounds/rank-tabs/rank-tabs.service";
import { EmployeeClockService } from "app/statistics/chart/hr-chart/rank-pounds/employee-clock/employee-clock.service";
import { EmployeeIntroduceService } from "app/statistics/chart/hr-chart/rank-pounds/employee-introduce/employee-introduce.service";

import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-rank-pounds',
  templateUrl: './rank-pounds.component.html',
  styleUrls: ['./rank-pounds.component.scss']
})
export class RankPoundsComponent implements OnInit {

  public ranksData: Array<any>; // 排行版
  public employeeIntroduceData; // 打卡记录
  public calendarOptions: Object; // 个人履历
  public clockTimeArr: Array<string>;
  public isBlock: boolean;
  public clockStyle: Object;
  public isLeapYear;

  public options;

  constructor(private hrChartService: HrChartService,
    private rankTabsService: RankTabsService) {

  }


  ngOnInit() {


    // 数据加载处理
    Observable.forkJoin(this.rankTabsService.getRankTabs('76005')).subscribe(data => {
       var self = this;
       this.ranksData = data[0];
    
        _.forEach(this.ranksData[0].employeeDetail, function (item, index) {

            if (item.active) {
              self.hrChartService.onRankTabsSelect.emit(item.employeeId);
              return
            }
            return;
      });
    });
  };
}
