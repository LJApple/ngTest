import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { EChartOption, ECharts } from 'echarts-ng2';
import { BusinessChartService } from '../business-chart.service';


@Component({
  selector: 'app-sales-personage',
  templateUrl: './sales-personage.component.html',
  styleUrls: ['./sales-personage.component.scss']
})
export class SalesPersonageComponent implements OnInit {
  @ViewChild('chartLine') echarts: ECharts;

  option: EChartOption;
  busy: Subscription;

  constructor(private businessChartService: BusinessChartService) { }

  ngOnInit() {
    this.busy = Observable.forkJoin(this.businessChartService.getBusinessChartInfo()).subscribe(data => {
      var saleData = data[0];
      saleData.sales_rank;
      let sales_name = [];
      let lastYear = [];
      let nowYear = [];
      for (let i = 0; i < saleData.sales_rank.length; i++) {
        sales_name.push(saleData.sales_rank[i].taker);
        lastYear.push(saleData.sales_rank[i].pastAmount);
        nowYear.push(saleData.sales_rank[i].amount);
      }
      this.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: "销售额对比",
          textAlign: "center",
          left: "50%",
          top: "10px",
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder'
          }
        },
        legend: {
          data: ["去年销售额", "今年销售额"],
          right: "auto",
          bottom: "0",
          orient: "horizontal",
          textStyle: {
            color: '#000'
          },
        },
        grid: {
          left: '0',
          right: '6%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: sales_name,
          axisLine: {
            lineStyle: {
              color: '#838383'
            }
          },
          axisTick: {
            show: false,
          }
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: ['#838383'],
              type: 'solid'
            }
          },

        },
        series: [{
          name: '去年销售额',
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
          lineStyle: {
            normal: {
              color: "#63B2EE"
            }
          },
          itemStyle: {
            normal: {
              color: "#63B2EE",
              borderWidth: 2,
              borderColor: "#FFF",
              borderType: "solid"
            }
          },
          data: lastYear
        }
          , {
          name: "今年销售额",
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
          lineStyle: {
            normal: {
              color: "#76DA91"
            }
          },
          itemStyle: {
            normal: {
              color: "#76DA91",
              borderWidth: 2,
              borderColor: "#FFF",
              borderType: "solid"
            }
          },
          data: nowYear
        }
        ]
      };
    })

    
    let that = this;
    // 屏幕自适应
    window.addEventListener('resize', function () {
      that.echarts.resize();
    })
  }


}
