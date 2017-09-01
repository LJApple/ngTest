import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartPieSector } from './chart-pie-sector.model';

@Component({
  selector: 'app-chart-pie-sector',
  templateUrl: './chart-pie-sector.component.html',
  styleUrls: ['./chart-pie-sector.component.scss']
})
export class ChartPieSectorComponent implements OnInit {

  @ViewChild('chartPieSector') echarts: ECharts;

  @Input() ChartPieSectorData: ChartPieSector;
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
    if (this.ChartPieSectorData) {
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} <br/>占比 : {d}%",
          backgroundColor: '#0B527D'
        },
        title: {
          text: this.ChartPieSectorData.title,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        legend: {
          orient: 'vertical',
          right: '3%',
          top: '10%',
          data: this.ChartPieSectorData.legend
        },
        series: [{
          name: this.ChartPieSectorData.toolTipText,
          type: 'pie',
          radius: '68%',
          center: ['30%', '50%'],
          clockwise: false,
          data: this.ChartPieSectorData.value,
          label: {
            normal: {
              position: 'inner',
              formatter: '{d}%',
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
        color: [
          '#6DD4B3',
          '#A6E59F',
          '#E7F3A8',
          '#59BFCB',
          '#6A92D2',
          '#29BDFF',
          '#FFFD58',
          '#E58BF3',
          '#FFBE3A',
          '#FF5A66'
        ]
      };
      this.echarts.resize();
    }
  }

}
