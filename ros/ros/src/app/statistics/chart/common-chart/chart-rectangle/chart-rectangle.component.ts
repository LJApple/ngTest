import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartRectangle } from './chart-rectangle.model'

@Component({
  selector: 'app-chart-rectangle',
  templateUrl: './chart-rectangle.component.html',
  styleUrls: ['./chart-rectangle.component.scss']
})
export class ChartRectangleComponent implements OnInit {

  @ViewChild('echartRectangle') echarts: ECharts;
  @Input() RectangleData: ChartRectangle;
  @Output() change = new EventEmitter<any>();
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
    if (this.RectangleData) {
      this.option = {
        title: {
          text: this.RectangleData.title
        },
        textStyle: {
          color: "#000"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '￥{c0}<br/>{b0}'
        },
        grid: {
           left: '80'
        },
        xAxis: {
          data: this.RectangleData.xData,

          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#000"
            }
          }
        },

        yAxis: {
          splitLine: {
            lineStyle: {
              color: "#F5F5F5"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
        },
        series: [{
          type: 'bar',
          data: this.RectangleData.Data,
          itemStyle: {
            normal: {
              color: "#26ACF1"
            },
            emphasis: {
              color: "#F1A726"
            }
          },
          barWidth: "30%",
        }]
      };
      this.echarts.resize();
    }
  }

  ngAfterViewInit() {
    this.echarts.on('click', (params: Object) => {
      this.change.emit(params["data"].name);
    });
  }

}
