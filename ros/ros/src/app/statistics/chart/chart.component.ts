import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    private xAxisData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    private data1 = [1, 4, 12, 2, 10, 25, 10, 10, 25, 1, 1, 10];
    private data2 = [-1, -1, -2, -4, -3, -2, -1, -4, -1, -4, -2, -5];
    private data3 = [0, 3, 11, 0, -7, 22, 8, 2, 0, 1, -2, 4];
    colors = ['#62ca96', '#26acf1', '#f5797c', '#aaaaaa','#eeb969','#818181'];

    chartOption = {
        title : {
              text: '年度各月员工变动',

        },
        backgroundColor: '#fff',
        legend: {
            data: ['新进人数', '离职人数', '净增'],
            show: true,
            right: '10px'

        },
        color: this.colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
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
                    color: this.colors[3]
                }
            },
            // max: 10,
            // min: -10,
        }, {
            inverse: false,
            axisLine: {
                show: false,
                lineStyle: {
                    color: this.colors[4]
                }
            }
        
        }],
        grid: {
            left: 30
        },
        series: [
            {
                name: '新进人数',
                type: 'bar',
                stack: 'one',
                data: this.data1,
                barCategoryGap:'55%',
            },
            {
                name: '离职人数',
                type: 'bar',
                stack: 'one',
                data: this.data2,
                barCategoryGap:'55%',
            }
            ,
            {
                name: '净增',
                type: 'line',
                data: this.data3
            }
        ],

    };

    constructor() { }

    ngOnInit() {

    }

}
