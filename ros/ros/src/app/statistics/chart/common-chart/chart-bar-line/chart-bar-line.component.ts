import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartBarLine } from './chart-bar-line.model';

@Component({
  selector: 'app-chart-bar-line',
  templateUrl: './chart-bar-line.component.html',
  styleUrls: ['./chart-bar-line.component.scss']
})
export class ChartBarLineComponent implements OnInit {

  @ViewChild('chartLine') echarts: ECharts;
  @Input() ChartBarLineData: ChartBarLine;
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
    if (this.ChartBarLineData) {
      let series = [];
      let length = this.ChartBarLineData.seriesData.length;
      for (let i = 0; i < length - 1; i++) {
        series.push({
          name: this.ChartBarLineData.seriesData[i].name,
          type: 'bar',
          data: this.ChartBarLineData.seriesData[i].value,
          barWidth: this.ChartBarLineData.hasLine ? "30%" : "15%"
        });
      }
      if (this.ChartBarLineData.hasLine) {
        series.push(
          {
            name: this.ChartBarLineData.seriesData[length - 1].name,
            type: 'line',
            yAxisIndex: 2,
            symbolSize: 5,
            showSymbol: false,
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderType: 'solid',
                borderColor: '#F3969C'
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            },
            data: this.ChartBarLineData.seriesData[length - 1].value,
          }
        )
      } else {
        series.push({
          name: this.ChartBarLineData.seriesData[length - 1].name,
          type: 'bar',
          data: this.ChartBarLineData.seriesData[length - 1].value,
          barWidth: this.ChartBarLineData.hasLine ? "30%" : "15%"
        });
      }
      this.option = {
        color: this.ChartBarLineData.colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          backgroundColor: '#0B527D'
        },
        legend: {
          data: this.ChartBarLineData.legendData,
          right: 10
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#B2B2B2'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#000',
              fontSize: 16
            },
            interval: 0,
            rotate: this.ChartBarLineData.hasLine ? 0 : 40
          },
          axisTick: {
            show: false
          },
          data: this.ChartBarLineData.xData
        }],
        yAxis: [{
          type: 'value',
          name: this.ChartBarLineData.yName,
          nameTextStyle: {
            fontSize: 16
          },
          position: 'left',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              fontSize: 14
            }
          }
        }, {
          type: 'value',
          show: false
        }, {
          type: 'value',
          position: 'right',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}%',
            textStyle: {
              fontSize: 16,
              color: '#FABD5D'
            }
          },
          splitLine: {
            show: false
          }
        }],
        series: series
      };
      
      this.echarts.resize();
    }
  }

}
