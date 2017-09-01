import { EChartOption, ECharts } from 'echarts-ng2';
import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';

import { HrChartService } from '../../hr-chart.service';
import { RankTabsService } from "app/statistics/chart/hr-chart/rank-pounds/rank-tabs/rank-tabs.service";
import { EmployeeClockService } from "app/statistics/chart/hr-chart/rank-pounds/employee-clock/employee-clock.service";
import { EmployeeIntroduceService } from "app/statistics/chart/hr-chart/rank-pounds/employee-introduce/employee-introduce.service";

import { Observable } from 'rxjs/Rx';
import { CalendarComponent } from "ap-angular2-fullcalendar";
import * as _ from 'lodash';
declare var $: any;


@Component({
  selector: 'app-employee-clock',
  templateUrl: './employee-clock.component.html',
  styleUrls: ['./employee-clock.component.scss'],
})
export class EmployeeClockComponent implements OnInit {

  @Input() calendarOptions;
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  public options;
  public clockTimeArr: Array<any>;
  public isBlock: boolean;
  public clockStyle: Object;
  public mouth: number;


  constructor(private ref: ChangeDetectorRef,
    private hrChartService: HrChartService,
    private rankTabsService: RankTabsService,
    private employeeClockService: EmployeeClockService,
    private employeeIntroduceService: EmployeeIntroduceService) {

    ref.detach();
    // 订阅排行版选中事件
    this.hrChartService.onRankTabsSelect.subscribe((employeeId) => {

      var self = this;
      // 联动
      Observable.forkJoin(this.employeeClockService.getEmployeeClock(employeeId, '76005')).subscribe(data => {

        if (data[0]) {

          let clockCurrentValue = data[0];
          self.mouth = clockCurrentValue["mouth"];

          self.options = {
            height: '324px',
            fixedWeekCount: false,
            defaultDate: clockCurrentValue["defaultDate"],
            editable: false,
            eventLimit: true, // allow "more" link when too many events
            dayNamesShort: ["一", "二", "三", "四", "五", "六", "日"],
            dayNames: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            contentHeight: this.rowCount(clockCurrentValue) > 5 ? 411 : 340,
            eventSources: [
              {
                events: clockCurrentValue["eventOne"],
                textColor: '#fff'
              }, {
                events: clockCurrentValue["eventTwo"],
                color: '#f3979e',
                textColor: '#fff'
              }
            ],
            eventMouseover: function (data, jsEvent, view) {

              var x = jsEvent.clientX;
              var y = jsEvent.clientY;
              var offsetLeft = $('.rank-tab-container').offset().left;
              var offsetTop = $('.employee-clock-time').offset().top;

              self.clockTimeArr = data.clock_time;
              self.isBlock = true;
              self.clockStyle = { "left": (x - offsetLeft + 10) + "px", "top": (y - offsetTop + 40) + "px", "display": 'block' };

              self.ref.detectChanges();
            },
            eventMouseout: function (data, jsEvent, view) {

            //  console.log(self.clockTimeArr)
              self.clockTimeArr= [];
              self.clockStyle ={"display":'none'};

              self.ref.detectChanges();
            }
          };

          //  self.myCalendar.fullCalendar('refetchEvents');
          //  $('angular2-fullcalendar').fullCalendar(self.options);

          self.ref.detectChanges();
        }
      });

    });
  }
  ngOnInit() {
  };

  // 是否为闰年
  isLeapYear = function (year) {
    year = year ? parseFloat(year) : -1;
    if (year % 100 == 0) {
      return year % 400 == 0;
    } else {
      return year % 4 == 0;
    }
  };

  // 日历行数
  rowCount = function (clockCurrentValue) {

    let dateData = new Date(clockCurrentValue.defaultDate); // 根据指定日期获取Date信息
    let currentYear = dateData.getFullYear(); // 年份
    let currentMonth = dateData.getMonth(); // 月份
    let firstDateData = new Date(currentYear, currentMonth, 1); // 当月第一天Date资讯 
    let firstDay = firstDateData.getDay(); // 当月第一天星期几
    firstDay = firstDay ? firstDay : 7; // 周日getDay得到0，转换一下
    let monthDays = new Array(31, this.isLeapYear(currentYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); // 各月份的总天数

    let rowCount = Math.ceil((monthDays[currentMonth] + firstDay) / 7); // 表格所需要行数

    return rowCount
  };


  /*  function (start, end, timezone, callback) {

                  $.ajax({
                    url: 'http://192.168.0.179:8080/statistics/HrAnalysis/GetPunchDetails/periodId/76005/employeeId/' + employeeId + '?token=8094f2e3138614011729366a5a00c3a6',
                    data: {
                    },
                    success: function (doc) {
                      var events
                      var doc = JSON.parse(doc);
                      events = doc["eventOne"];
                      callback(events);
                    }
                  })
                } */
}
