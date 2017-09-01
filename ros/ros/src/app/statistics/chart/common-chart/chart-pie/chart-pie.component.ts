import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartPie } from './chart-pie.model'
import { FunctionUnitService } from "app/admin/function-unit/function-unit.service";
import { FunctionUnit } from "app/admin/function-unit/function-unit.model";

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {

  @ViewChild('chartPie') echarts: ECharts;

  @Input() PieData: ChartPie;
  option: EChartOption;

  constructor(private functionUnitService: FunctionUnitService) { }

  ngOnInit() {
    let that = this;
    // 屏幕自适应
    window.addEventListener('resize', function () {
      if (that.echarts) {
        that.echarts.resize();
      }
    })
  }
  ngOnChanges() {
    if (this.PieData) {
      this.option = {
        title: [{
          text: this.PieData.show_rate_text,
          textAlign: 'center',
          top: '40%',
          left: '48%',
          subtext: '———\n' + this.PieData.show_rate_title,
          subtarget: 'blank'
        }],
        tooltip: {
          show: false,
          trigger: 'item',
          formatter: "{a} <br/>{b}{d}%"
        },
        series: [{
          name: this.PieData.title,
          type: 'pie',
          radius: ['65%', '70%'],
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: (100 - this.PieData.show_rate).toFixed(2),
            itemStyle: {
              normal: {
                label: {
                  "show": true
                },
                labelLine: {
                  "show": false
                },
                color: "#53E69D",
                borderColor: "#53E69D",
                borderWidth: 3
              },
              emphasis: {
                color: "#53E69D",
                borderColor: "#53E69D",
                borderWidth: 3
              }
            },
            hoverAnimation: false
          }, {
            value: this.PieData.show_rate.toFixed(2),
            itemStyle: {
              normal: {
                label: {
                  "show": true
                },
                labelLine: {
                  "show": false
                },
                color: "#37AFE4",
                borderColor: "#37AFE4",
                borderWidth: 0
              },
              emphasis: {
                color: "#37AFE4",
                borderColor: "#37AFE4",
                borderWidth: 0
              }
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          }]
        }]
      };
      this.echarts.resize();
    }
  }
  jumpTo() {
    if (this.PieData.drill_target_code !== null) {
      this.functionUnitService.onFunctionSelect.emit(this.PieData.drill_target_code);
    }
  }
}
