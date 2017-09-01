import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-ros-calendar',
  templateUrl: './ros-calendar.component.html',
  styleUrls: ['./ros-calendar.component.scss']
})
export class RosCalendarComponent implements OnInit {

  size = 'default';

  public year = {
    hideSelect: false,
    data: [],
    select: {}
  }
  public season = {
    hideSelect: true,
    data: [{ label: '第一季度', value: 1 }, { label: '第二季度', value: 1 }, { label: '第三季度', value: 1 }, { label: '第四季度', value: 1 }],
    select: {}
  }
  public month = {
    hideSelect: true,
    data: [
      { label: '1月', value: 1 }, { label: '2月', value: 2 }, { label: '3月', value: 3 }, { label: '4月', value: 4 },
      { label: '5月', value: 5 }, { label: '6月', value: 6 }, { label: '7月', value: 7 }, { label: '8月', value: 8 },
      { label: '9月', value: 9 }, { label: '10月', value: 10 }, { label: '11月', value: 11 }, { label: '12月', value: 12 }],
    select: {}
  }
  public buttonGroups: Array<any> = [
    {
      id: 'year',
      name: '年',
      isActive: true
    },
    {
      id: 'season',
      name: '季',
      isActive: false
    },
    {
      id: 'month',
      name: '月',
      isActive: false
    }
  ]

  constructor() { }

  ngOnInit() {
    let nowDate = new Date;

    for (let i = nowDate.getFullYear() - 10; i < nowDate.getFullYear() + 10; i++) {
      this.year.data.push({ label: i + '年', value: i });
    }

    this.year.select = this.year.data[10];
    this.season.select = this.season.data[0];
    this.month.select = this.month.data[0];
  }

  checkType(id) {
    if (id == 'month') {
      this.month.hideSelect = false;
      this.season.hideSelect = true;
    } else if (id == 'season') {
      this.month.hideSelect = true;
      this.season.hideSelect = false;
    } else {
      this.month.hideSelect = true;
      this.season.hideSelect = true;
    }
    _.forEach(this.buttonGroups, function (button) {
      if (button.id == id) {
        button.isActive = true;
      } else {
        button.isActive = false;
      }
    });
  }
  
}
