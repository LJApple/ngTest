import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HrChartService } from '../../hr-chart.service';
import { EmployeeClockService } from "app/statistics/chart/hr-chart/rank-pounds/employee-clock/employee-clock.service";
import { EmployeeIntroduceService } from "app/statistics/chart/hr-chart/rank-pounds/employee-introduce/employee-introduce.service";

import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-rank-tab',
  templateUrl: './rank-tabs.component.html',
  styleUrls: ['./rank-tabs.component.scss']
})
export class RankTabsComponent implements OnInit {

  @Input() ranksData;
  @Input() employeeIntroduceData;
  @Input() calendarOptions;
  public ranks;
  public backgroundStyle: Object;
  public arrColors: Array<Object> = [
    {
      'background': '#47c17e'
    }, {
      'background': '#51bdf4'
    }, {
      'background': '#fabd5d'
    }, {
      'background': '#ef757d'
    }, {
      'background': '#47c17e'
    }
  ];
  public color: string;
  data

  constructor(private hrChartService: HrChartService,
    private employeeClockService: EmployeeClockService,
    private employeeIntroduceService: EmployeeIntroduceService) { }

  ngOnInit() {

  };

  ngOnChanges(changes: SimpleChanges) {

    if (changes['ranksData'] && changes['ranksData'].currentValue) {
      let rankTabCurrentValue = changes['ranksData'].currentValue;
      this.ranks = rankTabCurrentValue;
    }
  }
  /* 
    员工排行榜选中事件
  */
  employeeSelected(data, targetEmployee) {

    let self = this;
    _.forEach(data, function (employeeItem, index) {

      employeeItem.active = false;
      if (employeeItem.employeeId == targetEmployee.employeeId) {
        targetEmployee.active = true;
        self.hrChartService.onRankTabsSelect.emit(targetEmployee.employeeId);
      }
    });
  };

  employeeTabSelected(target) {

    let self = this;
    let employeeDetailArr = target.employeeDetail
    _.forEach(employeeDetailArr, function (employeeItem, index) {
  
       if(employeeItem.active){
          self.hrChartService.onRankTabsSelect.emit(employeeItem.employeeId);
      } 
    });
  };

}
