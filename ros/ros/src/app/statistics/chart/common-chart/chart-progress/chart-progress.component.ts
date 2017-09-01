import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartProgress } from './chart-progress.model';
import { EChartOption, ECharts } from 'echarts-ng2';

@Component({
  selector: 'app-chart-progress',
  templateUrl: './chart-progress.component.html',
  styleUrls: ['./chart-progress.component.scss']
})
export class ChartProgressComponent implements OnInit {

  @ViewChild('chartProgress') echarts: ECharts;

  @Input() ProgressData: ChartProgress;
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
    if (this.ProgressData) {
      this.option = {
        tooltip: {
          show: true,
          formatter: "{b} {c}%"
        },
        grid: {
          top: 0,
          left: 0,
          bottom: '0',
          right: '0'
        },
        xAxis: [
          {
            max: 100,
            type: 'value',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: [this.ProgressData.toolTipText],
            nameTextStyle: { color: '#b7ce9e', fontSize: '18px' },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { show: false }
          }
        ],
        graphic: [
          {
            type: 'text',
            z: -10,
            left: 0,
            top: 0,
            style: {
              fill: '#383838',
              text: this.ProgressData.leftContent,
              font: 'normal 14px fantasy'
            }
          },
          {
            type: 'text',
            z: -10,
            right: 100,
            top: 0,
            style: {
              fill: '#26ACF1',
              text: this.ProgressData.centerContent,
              font: 'normal 14px system-ui'
            }
          },
          {
            type: 'text',
            z: -10,
            right: 0,
            top: 0,
            style: {
              fill: '#A8A8A8',
              text: this.ProgressData.rightContent,
              font: 'normal 14px system-ui'
            }
          }
        ],
        series: [
          {
            name: ' ',
            type: 'bar',
            barWidth: 12,
            silent: true,
            itemStyle: { normal: { color: '#ccc' } },
            barGap: '-100%',
            barCategoryGap: '50%',
            data: [{ value: 100 }],
          },
          {
            name: ' ',
            type: 'bar',
            barWidth: 12,
            label: { normal: { show: false, position: 'right', formatter: '{c}%' } },
            data: [{ value: this.ProgressData.value.toFixed(2), itemStyle: { normal: { color: '#f80' } } }]
          }
        ]
      };
      this.echarts.resize();
    }
  }
}
