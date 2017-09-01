import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartPieRadius } from './chart-pie-radius.model'

@Component({
  selector: 'app-chart-pie-radius',
  templateUrl: './chart-pie-radius.component.html',
  styleUrls: ['./chart-pie-radius.component.scss']
})
export class ChartPieRadiusComponent implements OnInit {

  @ViewChild('chartPieRadius') echarts: ECharts;
  @Input() ChartPieRadiusData: ChartPieRadius;
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
    if (this.ChartPieRadiusData) {
      this.option = {
        color: ['#80C269', '#B0504E', '#D5D15E', '#62ABBB', '#B07DAA', '#869EBF', '#45647A', '#D48671'],
        title: {
          text: this.ChartPieRadiusData.title,
          x: 'left',
          left: 20,
          top: 20,
          show: this.ChartPieRadiusData.showTitle
        },
        grid: {
          top: 0
        },
        tooltip: {
          trigger: 'item',
          formatter: "费用 : {c} <br/>占比 : {d}%",
          backgroundColor: '#0B527D'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: this.ChartPieRadiusData.legendData,
          width: 300
        },
        series: [
          {
            type: 'pie',
            center: this.ChartPieRadiusData.showTitle?['50%', '50%']:['50%', '45%'],
            radius: [40, 150],
            roseType: 'radius',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: this.ChartPieRadiusData.value
          }
        ]
      };
      this.echarts.resize();
    }
  }

}
