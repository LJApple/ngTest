import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartPieSimple } from './chart-pie-simple.model';

@Component({
  selector: 'app-chart-pie-simple',
  templateUrl: './chart-pie-simple.component.html',
  styleUrls: ['./chart-pie-simple.component.scss']
})
export class ChartPieSimpleComponent implements OnInit {

  @ViewChild('chartPieSimple') echarts: ECharts;

  @Input() ChartPieSimpleData: ChartPieSimple;
  option: EChartOption;

  constructor() { }

  ngOnInit() {
    let that = this;
    // 屏幕自适应
    window.addEventListener('resize', function () {
      that.echarts.resize();
    })
  }

  ngOnChanges() {
    if (this.ChartPieSimpleData) {
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b} <br/>合计 : " + this.ChartPieSimpleData.total + " <br/>占比 : {d}%",
          backgroundColor: '#0B527D'
        },
        title: {
          text: this.ChartPieSimpleData.title,
          left: '20px',
          top: '20px',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        legend: {
          orient: 'vertical',
          right: '3%',
          top: '10%',
          data: this.ChartPieSimpleData.legendData
        },
        series: [{
          name: '非流动资产',
          type: 'pie',
          radius: '65%',
          clockwise: false,
          data: this.ChartPieSimpleData.value,
          label: {
            normal: {
              position: 'inner',
              formatter: '{c}',
              textStyle: {
                color: '#FFF',
                fontSize: '14px',
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }],
        color: this.ChartPieSimpleData.colors
      };
      this.echarts.resize();
    }
  }

}
