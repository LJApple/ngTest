import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {EChartOption, ECharts} from 'echarts-ng2';
import {Observable} from 'rxjs';
import {ProductionChartService} from '../production-chart.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-num-rate-chart',
  templateUrl: './num-rate-chart.component.html',
  styleUrls: ['./num-rate-chart.component.scss']
})
export class NumRateChartComponent implements OnInit , OnChanges, AfterViewInit {

    @ViewChild('proEcharts') echarts: ECharts;
    option: EChartOption;

    pre_production_order: any;
    production_order: any;
    myChartData: any;
    myYLength: number;

    constructor(private productionChartService: ProductionChartService) { }

    ngOnInit() {
        // 生产车间产量统计图的渲染
        Observable.fromPromise(this.productionChartService.getProductionChartInfo()).subscribe(data => {

            // 将服务端的data数据保存到本地变量中
            this.pre_production_order = data.pre_production_order;
            this.production_order = data.production_order;

            // 定义两个数组用来生成echarts控件可以识别的数据类型
            let preChartData = [];
            let chartData = [];

            for (let i = 0; i < this.pre_production_order.length; i++) {
                let tempArr = [];
                tempArr.push(this.pre_production_order[i].day);
                tempArr.push(this.pre_production_order[i].quantity);
                preChartData.push(tempArr);
            }

            for (let i = 0; i < this.production_order.length; i++) {
                let tempArr = [];
                tempArr.push(this.production_order[i].day);
                tempArr.push(this.production_order[i].quantity);
                chartData.push(tempArr);
            }

            // 获取到服务端的数据后，重置echarts控件的参数配置
            this.option = {
                title: {
                    text: '车间产量统计',
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
                        },
                        {
                            name: '上月',
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
                    max: this.pre_production_order.length,
                    type: 'value',
                    splitNumber: 6,
                    axisLine: {
                        lineStyle: {
                            color: '#aaaaaa'
                        }
                    },
                },
                yAxis: {
                    name: '单位(千件)',
                    min: 0,
                    max: 70,
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
                        data: chartData,
                        itemStyle: {
                            normal: {
                                color: '#77CBF6'
                            }
                        },
                    },
                    {
                        name: '上月',
                        id: 'b',
                        smooth: false,
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: true,
                        data: preChartData,
                        itemStyle: {
                            normal: {
                                color: '#4dc382'
                            }
                        },
                    }
                ]
            };

        });

        let self = this;
         window.addEventListener('resize', function(){
             if(self.echarts){
                 self.echarts.resize({});
             }
         })

    }

    // 使用SimpleChanges对象来监听组件中属性和值的变化 changes: SimpleChanges
    ngOnChanges(changes: SimpleChanges) {

    }

    ngAfterViewInit() {
        let self = this;
        let isAct = false;
        this.echarts.on('click', (params: Object) => {
            let indexDay = params["data"][0];
            self.productionChartService.forbidActShow.emit(isAct);

            if (params["seriesName"] === '上月') {
                _.forEach(this.pre_production_order, function (dayData) {
                    if (indexDay == dayData["day"]) {
                        self.productionChartService.onEchartsSelect.emit(dayData);
                    }
                });
            }else if(params["seriesName"] === '本月') {
                _.forEach(this.production_order, function (dayData) {
                    if (indexDay == dayData["day"]) {
                        self.productionChartService.onEchartsSelect.emit(dayData);
                    }
                });
            }
        });
    }

}
