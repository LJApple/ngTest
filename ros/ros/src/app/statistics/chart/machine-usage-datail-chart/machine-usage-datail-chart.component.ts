import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MachineUsageDetailChartService} from './machine-usage-detail-chart.service';
import {Observable, Subscription} from 'rxjs';
import {ProductionChartService} from '../production-chart/production-chart.service';

@Component({
  selector: 'app-machine-usage-datail-chart',
  templateUrl: './machine-usage-datail-chart.component.html',
  styleUrls: ['./machine-usage-datail-chart.component.scss']
})
export class MachineUsageDatailChartComponent implements OnInit {

    @ViewChild('myMachineChart') mycharts: ElementRef;


    /**
     * 创建一个对象来保存以供模板循环遍历渲染数据使用
     * */
    chartData: Array<any> = [];
    isChartShow: boolean;
    test;

    constructor(private machineUsageDetailChartService: MachineUsageDetailChartService, public productionChartService: ProductionChartService) {
        var self = this;
        // 订阅功能子项的选中事件
        productionChartService.machineUtiSelect.subscribe((machineInfo) => {
            self.machineUsageDetailChartService.machineInfo = machineInfo;
        });

    }

    ngOnInit() {

        let self = this;

        self.test = self.machineUsageDetailChartService.machineInfo;

        Observable.fromPromise(this.machineUsageDetailChartService.getMachineRatechartInfo(self.machineUsageDetailChartService.machineInfo)).subscribe(data => {

            if(data){
                self.createChartDataArr(data);
            }

        })

    }

    // 鼠标滑入滑出 显示信息的隐藏和显示
    detailMouseIn (event) {
        event['srcElement']['firstElementChild']['hidden'] = false;
    };

    detailMouseOut (event) {
        event['srcElement']['firstElementChild']['hidden'] = true;
    }

    createChartDataArr (data) {

        let self = this;

        // 获取机台使用图表的宽度
        var $width = self.mycharts.nativeElement.clientWidth - 50;

        // 如果没数据则不进行一下判断处理
        if (data.length === 0) {
            self.isChartShow = false;
            return false;
        }else{
            self.isChartShow = true;
        }

        // 循环遍历数据 处理
        for (let i = 0; i < data.length; i++) {

            let product_code = data[i].product_code,
                product_no = data[i].no,
                state_text = data[i].state_text,
                todyMillion = (new Date('2017-06-27 00:00:00')).getTime(),
                standardMillionDay = 24 * 60 * 60 * 1000;

            if (data[i].state == 16) { // 机台使用情况为 【已完成】状态

                // 获取res中的数据保存
                var start_time = (new Date(data[i].actual_start_time)).getTime(),
                    end_time = (new Date(data[i].actual_end_time)).getTime(),
                    timeRest = data[i].actual_start_time + '~' + data[i].actual_end_time;

                if (start_time <= todyMillion) {// 若果开始时间在当天00:00以前

                    // 获取宽度比例系数
                    var rate = (end_time - todyMillion) / standardMillionDay,
                        offsetLeft = '0px',
                        boxWidth = 100 * rate + '%'; // 得到实际宽度

                    if ($width * rate < 200) {
                        var isPosition = true;
                    } else {
                        var isPosition = false;
                    }

                    var isRight = true;

                }else if (start_time > todyMillion && end_time < todyMillion + 86400000) { // 如果开始时间发生在当天之中

                    var offsetLeft = ((start_time - todyMillion) / standardMillionDay) * 100 + '%',
                        boxWidth = ((end_time - start_time) / standardMillionDay) * 100 + '%';

                    if (((end_time - start_time) / standardMillionDay) * $width < 200) {
                        var isPosition = true;
                    } else {
                        var isPosition = false;
                    }

                    if ((start_time - todyMillion) / standardMillionDay > 0.5) {
                        var isRight = false;
                    }else {
                        var isRight = true;
                    }

                }

                let tempObj = {
                    boxWidth: boxWidth,
                    offsetLeft: offsetLeft,
                    timeRest: timeRest,
                    product_code: product_code,
                    product_no: product_no,
                    backgroundColor: '#19b25e',
                    isPosition: isPosition,
                    isRight: isRight
                };

                self.chartData.push(tempObj);

            }else if(data[i].state == 2){ // 机台使用情况为 【待生产】状态

                var start_time = (new Date(data[i].plan_start_time)).getTime(),
                    end_time = (new Date(data[i].plan_end_time)).getTime(),
                    timeRest = data[i].plan_start_time +'~'+ data[i].plan_end_time;

                if (start_time <= todyMillion) { // 开始时间小于今天00:00

                    var offsetLeft = '0px',
                        boxWidth = ((end_time - todyMillion) / standardMillionDay) * 100 + '%';

                    if (((end_time - todyMillion) / standardMillionDay) * $width < 200) {
                        var isPosition = true;
                    } else {
                        var isPosition = false;
                    }

                    var isRight = true;

                }else if (start_time > todyMillion && end_time < todyMillion + 86400000){ // 发生在今天之中

                    var offsetLeft = ((start_time-todyMillion)/standardMillionDay) * 100 + '%',
                        boxWidth = ((end_time - start_time)/standardMillionDay) * 100 + '%';

                    if (((end_time - start_time)/standardMillionDay) * $width < 200) {
                        var isPosition = true;
                    }else{
                        var isPosition = false;
                    }

                    if ((start_time - todyMillion) / standardMillionDay > 0.5) {
                        var isRight = false;
                    }else {
                        var isRight = true;
                    }

                }

                let tempObj = {
                    boxWidth: boxWidth,
                    offsetLeft: offsetLeft,
                    timeRest: timeRest,
                    product_code: product_code,
                    product_no: product_no,
                    backgroundColor: '#19b25e',
                    isPosition: isPosition,
                    isRight: isRight
                };

                self.chartData.push(tempObj);

            }else if(data[i].state == 4){ // 机台使用情况为 【生产中】状态

                var rightNowTime = new Date().getTime(),
                    start_time = (new Date(data[i].actual_start_time)).getTime(),
                    timeRest = data[i].actual_start_time +'~ 现在';

                if(start_time <= todyMillion){ // 开始时间早于今天 00:00
                    var rate = (rightNowTime-todyMillion)/standardMillionDay,
                        offsetLeft = '0px',
                        boxWidth = 100 * rate+'%';

                    if ($width * rate < 200) {
                        var isPosition = true;
                    } else {
                        var isPosition = false;
                    }

                    var isRight = true;

                }else {
                    var offsetLeft = ((start_time-todyMillion)/standardMillionDay) * 100 + '%',
                        boxWidth = ((rightNowTime - start_time)/standardMillionDay) * 100 + '%';

                    if (((rightNowTime - start_time)/standardMillionDay) * $width < 200) {
                        var isPosition = true;
                    }else{
                        var isPosition = false;
                    }

                    if ((start_time - todyMillion) / standardMillionDay > 0.5) {
                        var isRight = false;
                    }else {
                        var isRight = true;
                    }

                };

                let tempObj = {
                    boxWidth: boxWidth,
                    offsetLeft: offsetLeft,
                    timeRest: timeRest,
                    product_code: product_code,
                    product_no: product_no,
                    backgroundColor: '#19b25e',
                    isPosition: isPosition,
                    isRight: isRight
                };

                self.chartData.push(tempObj);
            }
        }
    }

}
