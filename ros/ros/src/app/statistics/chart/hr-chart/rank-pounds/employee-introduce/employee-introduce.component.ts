import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HrChartService } from '../../hr-chart.service';
import { RankTabsService } from "app/statistics/chart/hr-chart/rank-pounds/rank-tabs/rank-tabs.service";
import { EmployeeClockService } from "app/statistics/chart/hr-chart/rank-pounds/employee-clock/employee-clock.service";
import { EmployeeIntroduceService } from "app/statistics/chart/hr-chart/rank-pounds/employee-introduce/employee-introduce.service";

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-employee-introduce',
  templateUrl: './employee-introduce.component.html',
  styleUrls: ['./employee-introduce.component.scss']
})
export class EmployeeIntroduceComponent implements OnInit {

  public employeeIntroduce;
  public arrColor: Array<string> = ['#47c17e', '#51bdf4', '#fabd5d', '#ef757d']
  public backgroundColor: Object;
  public dataNum;


  constructor(private hrChartService: HrChartService,
    private rankTabsService: RankTabsService,
    private employeeClockService: EmployeeClockService,
    private employeeIntroduceService: EmployeeIntroduceService) {


    this.hrChartService.onRankTabsSelect.subscribe((employeeId) => {
      // 联动
      Observable.forkJoin(this.employeeIntroduceService.getEmployeeIntroduce(employeeId)).subscribe(data => {
       
         this.employeeIntroduce = data[0];
      //   console.log(this.employeeIntroduce.employee)
      });
    });
  }

  ngOnInit() {

    this.dataNum = Math.floor(Math.random() * (3 + 1));
    this.backgroundColor = {
      'background': this.arrColor[this.dataNum]
    }
  };

}
