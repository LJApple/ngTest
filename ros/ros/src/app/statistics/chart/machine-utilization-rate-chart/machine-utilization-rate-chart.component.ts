import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {MachineUtilizationRateChartService} from './machine-utilization-rate-chart.service';
import {EChartOption, ECharts} from 'echarts-ng2';
import {ProductionChartService} from '../production-chart/production-chart.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-machine-utilization-rate-chart',
  templateUrl: './machine-utilization-rate-chart.component.html',
  styleUrls: ['./machine-utilization-rate-chart.component.scss']
})
export class MachineUtilizationRateChartComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('machineEcharts') echarts: ECharts;

    currentDate;

    constructor(private machineUtilizationRateChartService: MachineUtilizationRateChartService,  public productionChartService: ProductionChartService) {

        var self = this;
        // 订阅功能子项的选中事件
        productionChartService.machineRateChartsSelect.subscribe((date) => {
            self.currentDate = '&' + date;
            self.machineUtilizationRateChartService.currentDate = date;
            self.getNewData();

        });
    }

    ngOnInit() {
        var self = this;

        if (self.productionChartService.chartOptions) {

            setTimeout(function () {
                self.echarts.setOption(self.productionChartService.chartOptions);
            }, 0);
        }

        // 屏幕自适应
        window.addEventListener('resize', function () {
            if(self.echarts){
                self.echarts.resize({});
            }
        });
    }

    ngOnChanges (changes: SimpleChanges) {}

    getNewData() {

        var self = this;
        var chartsDataArrX = [];
        var chartsContentArr = [];

        console.log(self.currentDate);
        Observable.fromPromise(this.machineUtilizationRateChartService.getMachineRatechartInfo(self.currentDate)).subscribe(data => {

            self.machineUtilizationRateChartService.machineRate = data;
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                chartsDataArrX.push(data[i].name);
                chartsContentArr.push(data[i].rate * 100);
            }

            self.productionChartService.chartOptions = {
                title: {
                    text: '机台使用率',
                    padding: [30, 0, 0, 30],
                    textStyle: {
                        fontColor: '#333',
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: 700
                    }
                },
                backgroundColor: '#fff',
                color: ['#26acf1'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    data: chartsDataArrX,
                    silent: false,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#aaaaaa'
                        }
                    },
                },
                yAxis: [{
                    name: '单位(%)',
                    min: 0,
                    max: 100,
                    splitNumber: 5,
                    nameGap: 20,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#aaaaaa'
                        }
                    },
                }],
                grid: {
                    top: 100,
                    left: 60,
                    right: 50
                },
                series: [
                    {
                        type: 'bar',
                        stack: 'one',
                        data: chartsContentArr,
                        barCategoryGap: '50%',
                    }
                ],

            };

        })
    }

    ngAfterViewInit() {
        let self = this;
        // 点击进行跳转
        this.echarts.on('click', (params: Object) => {

            let indexDay = params["data"][0];

            _.forEach(self.machineUtilizationRateChartService.machineRate, function (dayData) {
                if (indexDay == dayData["day"]) {
                    var tempObj = {
                        currentDate: self.machineUtilizationRateChartService.currentDate,
                        machine_id: dayData['id']
                    };

                    self.productionChartService.machineUtiSelect.emit(tempObj);
                }
            });
        });
    }

}
