import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartLineTwo } from './chart-line-two.model';

@Component({
  selector: 'app-chart-line-two',
  templateUrl: './chart-line-two.component.html',
  styleUrls: ['./chart-line-two.component.scss']
})
export class ChartLineTwoComponent implements OnInit {

  @ViewChild('chartLineTwo') echarts: ECharts;
  @Input() ChartLineTwoData: ChartLineTwo;
  option: EChartOption;

  constructor() {
    let that = this;
    // 屏幕自适应
    window.addEventListener('resize', function () {
      that.echarts.resize();
    })
  }

  ngOnInit() {
    let that = this;
    // 屏幕自适应
    window.addEventListener('resize', function () {
      that.echarts.resize();
    })
  }

  ngOnChanges(){
    if (this.ChartLineTwoData) {
      this.option = {
        color: ['#21ACF2', '#EEAB57'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          backgroundColor: '#0B527D'
        },
        legend: {
          data: this.ChartLineTwoData.legendData,
          right: 20
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#999999'
              }
            },
            splitLine: {
              show: true
            },
            data: this.ChartLineTwoData.xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            position: 'left',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#999999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: this.ChartLineTwoData.value[0].name,
            type: 'line',
            symbolSize: 12,
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderType: 'solid',
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            },
            data: this.ChartLineTwoData.value[0].value
          },
          {
            name: this.ChartLineTwoData.value[1].name,
            type: 'line',
            symbolSize: 12,
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderType: 'solid',
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            },
            data: this.ChartLineTwoData.value[1].value
          }
        ]
      }
      this.echarts.resize();
    }
  }

}
