import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { EChartOption, ECharts } from 'echarts-ng2';
import {Observable, Subscription} from 'rxjs';
import {ProductionChartService} from '../production-chart.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-machine-utilization-chart',
  templateUrl: './machine-utilization-chart.component.html',
  styleUrls: ['./machine-utilization-chart.component.scss']
})
export class MachineUtilizationChartComponent implements OnInit, AfterViewInit {

    @ViewChild('machineEcharts') echarts: ECharts;

    option: EChartOption;

    machineRate: any;

    constructor(private productionChartService: ProductionChartService) { }

    ngOnInit() {

        let self = this;

        Observable.fromPromise(this.productionChartService.getProductionChartInfo()).subscribe(data => {

            this.machineRate = data.machine_utilization_rate;
            let machineRateArr = [];

            for (let i = 0; i < this.machineRate.length; i++) {
                let tempArr = [];
                tempArr.push(this.machineRate[i].day);
                tempArr.push(this.machineRate[i].machine_use_rate);
                machineRateArr.push(tempArr);
            }

            // 获取到服务端的数据后，重置echarts控件的参数配置
            this.option = {
                title: {
                    text: '机台利用率',
                    padding: [20, 0, 0, 30],
                    textStyle: {
                        fontColor: '#333',
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: 700
                    }
                },
                tooltip: {
                    showContent: true,
                    trigger: 'axis',
                    axisPointer: {
                        label: true
                    }
                },
                legend: {
                    right: '50',
                    top: '50',
                    data: [
                        {
                            name: '本月',
                            icon: 'line',
                            textStyle: {
                                color: '#444'
                            }
                        }
                    ],
                    tooltip: {
                        showContent: true,
                        trigger: 'axis',
                        axisPointer: {
                            label: true
                        }
                    },
                },
                grid: {
                    top: '20%',
                    left: '8%',
                    right: '8%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: {
                    min: 1,
                    max: this.machineRate.length,
                    type: 'value',
                    splitNumber: 6,
                    axisLine: {
                        lineStyle: {
                            color: '#aaaaaa'
                        }
                    },
                },
                yAxis: {
                      name: '单位(%)',
                    min: 0,
                    max: 100,
                    splitNumber: 2,
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#aaaaaa'
                        }
                    },
                },
                series: [
                    {
                        name: '本月',
                        id: 'a',
                        smooth: false,
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: true,
                        data: machineRateArr,
                        itemStyle: {
                            normal: {
                                color: '#77CBF6'
                            }
                        },
                    }
                ]
            };
        });

        // 屏幕自适应
        window.addEventListener('resize', function () {
            if(self.echarts){
                self.echarts.resize({});
            }
        })
    }

    ngAfterViewInit() {
        let self = this;
        this.echarts.on('click', (params: Object) => {
            let indexDay = params["data"][0];

            _.forEach(this.machineRate, function (dayData) {
                if (indexDay == dayData["day"]) {
                    console.log(dayData);
                    self.productionChartService.machineRateChartsSelect.emit(dayData['date']);
                }
            });
        });
    }

}
