import { EChartOption, ECharts } from 'echarts-ng2';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HrChartService } from './hr-chart.service';
import { Observable } from 'rxjs/Rx';
import { MainTabService } from "app/admin/main-tab/main-tab.service";


@Component({
    selector: 'app-hr-chart',
    templateUrl: './hr-chart.component.html',
    styleUrls: ['./hr-chart.component.scss']
})
export class HrChartComponent implements OnInit {

    private functionCode = 'analysis_hr';

    @ViewChild('hrEcharts') echarts: ECharts;

    private xAxisData: Array<string> = ["2016-11", "2016-12", "2017-1", "2017-2", "2017-3", "2017-4", "2017-5", "2017-6", "2017-7", "2017-8", "2017-9", "2017-10"]; // 底坐标
    private entrydata: Array<number>
    //= [1, 4, 12, 2, 10, 15, 10, 10, 25, 1, 1, 10];  // 入职人数
    private quitdata: Array<number>
    //= [-1, -1, -2, -4, -3, -2, -1, -4, -1, -4, -2, -5];  // 离职人数
    private growth: Array<number>
    //= [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];  // 净值
    colors = ['#62ca96', '#26acf1', '#f5797c', '#aaaaaa', '#eeb969', '#818181'];


    constructor(private hrChartService: HrChartService, public mainTabService: MainTabService) { }

    ngOnInit() {
        var self = this;
        // 年度各月员工变动数据加载
        Observable.fromPromise(this.hrChartService.getHrchartInfo()).subscribe(data => {

            this.xAxisData = data.xAxisData;
            this.entrydata = data.entrydata;
            this.quitdata = data.quitdata;
            this.growth = data.growth;

            let maxDimissionValue = -data["ordinate"]["maxDimissionValue"]; // 最大离职数
            let maxEntryValue = data["ordinate"]["maxEntryValue"]; // 最大入职数
            let minGrowth = maxDimissionValue * 2;
            let maxGrowth = maxEntryValue * 2;

            this.echarts.setOption({
                title: {
                    text: '年度各月员工变动',
                    textStyle: {
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontWeight: 600
                    }
                },
                backgroundColor: '#fff',
                legend: {
                    data: ['新进人数', '离职人数', '净增'],
                    show: true,
                    right: '10px',
                    top: 35,
                    textStyle: {
                        fontSize: 12,
                        color: '#9e9e9e',
                    },
                    itemWidth: 12,
                    itemHeight: 12,
                    height: 12,
                    itemGap: 20,
                },
                color: this.colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    backgroundColor: '#19577e',
                    color: '#abb0b6'
                },
                xAxis: {
                    data: this.xAxisData,
                    name: '',
                    silent: false,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: this.colors[5]
                        }
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: [{
                    name: '单位：人',
                    inverse: false,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: this.colors[3],
                        }
                    },
                    nameTextStyle: {
                        color: '#aeaeae'
                    },
                    nameGap: 20,
                    max: maxEntryValue,
                    min: maxDimissionValue,
                }, {
                    inverse: false,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: this.colors[4]
                        }
                    },
                    max: maxGrowth,
                    min: minGrowth
                }],
                grid: {
                    left: 30,
                    top: '21%',
                    right: '5%',
                    bottom: '8%',
                },
                series: [
                    {
                        name: '新进人数',
                        type: 'bar',
                        stack: 'one',
                        data: this.entrydata,
                        barCategoryGap: '60%',
                    },
                    {
                        name: '离职人数',
                        type: 'bar',
                        stack: 'one',
                        data: this.quitdata,
                        barCategoryGap: '60%',
                    }
                    ,
                    {
                        name: '净增',
                        type: 'line',
                        data: this.growth
                    }
                ],
            });
            this.echarts.resize();
        });

        //屏幕自适应
        window.addEventListener('resize', function () {

            let selectedFunctionConfig = self.mainTabService.selectedFunctionConfig;
            if (selectedFunctionConfig && self.functionCode == selectedFunctionConfig.functionCode) {
                self.echarts.resize();
            }
        })
    }

}
