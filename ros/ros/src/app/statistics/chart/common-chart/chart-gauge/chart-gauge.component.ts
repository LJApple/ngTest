import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EChartOption, ECharts } from 'echarts-ng2';
import { ChartGauge } from './chart-gauge.model'
import { FunctionUnitService } from "app/admin/function-unit/function-unit.service";
import { FunctionUnit } from "app/admin/function-unit/function-unit.model";

@Component({
  selector: 'app-chart-gauge',
  templateUrl: './chart-gauge.component.html',
  styleUrls: ['./chart-gauge.component.scss']
})
export class ChartGaugeComponent implements OnInit {

  @ViewChild('chartGague') echarts: ECharts;

  @Input() GaugeData: ChartGauge;//仪表图模块数据
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
    if (this.GaugeData) {
      this.option = {
        backgroundColor: '#fff',
        tooltip: {
          formatter: this.GaugeData.title + "<br/>{c}%",
          trigger: 'item'
        },
        series: [{
          max: Math.floor(this.GaugeData.show_rate) + 5,
          radius: '75%',
          splitNumber: 4,
          splitLine: {
            show: false
          },
          tooltip: {
            position: ['50%', '0']
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 15,
              shadowBlur: 0,
              color: [
                [0.5, '#EFB757'],
                [0.5, '#FB7273'],
                [1, '#D87A80']
              ]
            }
          },
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          axisTick: {
            splitNumber: 1,
            length: 0
          },
          axisLabel: {
            distance: -50,
            textStyle: {
              color: "#000"
            }
          },
          detail: {
            formatter: "{value}%",
            offsetCenter: [0, "40%"],
            textStyle: {
              fontSize: 25,
              color: "#000"
            }
          },
          pointer: {
            length: '95%'
          },
          itemStyle: {
            normal: {
              color: '#000'
            }
          },
          markLine: {
            precision: 5
          },
          data: [{
            value: this.GaugeData.show_rate
          }]
        }]
      };
      this.echarts.resize();
    }
  }

  jumpTo() {
    if (this.GaugeData.drill_target_code !== null) {
      this.functionUnitService.onFunctionSelect.emit(this.GaugeData.drill_target_code);
    }
  }
}
