import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartLine } from './chart-line.model';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {

  @ViewChild('chartLine') echarts: ECharts;
  @Input() ChartLineData: ChartLine;
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
    if (this.ChartLineData) {
      this.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: this.ChartLineData.title,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        legend: {
          data: this.ChartLineData.legend,
          right: 0,
          top: "45%",
          orient: "vertical",
          textStyle: {
            color: '#000'
          },
        },
        grid: {
          left: '0',
          right: '6%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.ChartLineData.xData,
          axisLine: {
            lineStyle: {
              color: '#838383'
            }
          },
          axisTick: {
            show: false,
          }
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: ['#838383'],
              type: 'solid'
            }
          },

        },
        series: [{
          name: this.ChartLineData.value[0].title,
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
          lineStyle: {
            normal: {
              color: "#97D2ED"
            }
          },
          itemStyle: {
            normal: {
              color: "#97D2ED",
              borderWidth: 2,
              borderColor: "#FFF",
              borderType: "solid"
            }
          },
          data: this.ChartLineData.value[0].data
        }
          // , {
          //   name: "目标",
          //   type: 'line',
          //   symbolSize: 8,
          //   symbol: 'circle',
          //   lineStyle: {
          //     normal: {
          //       color: "#A791C4"
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: "#A791C4",
          //       borderWidth: 2,
          //       borderColor: "#FFF",
          //       borderType: "solid"
          //     }
          //   },
          //   data: this.ChartLineData.value[0].data
          // }
        ]
      };
      this.echarts.resize();
    }
  }
}
