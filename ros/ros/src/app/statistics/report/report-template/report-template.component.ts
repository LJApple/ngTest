import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { Observable, Subscription } from 'rxjs/Rx';
import { CommonHelper, HEADER_AND_FOOTER_HEIGHT } from 'app/utils/common.helper';
import { ReportService, RequestType } from "app/statistics/report/report.service";
import * as _ from 'lodash';
import { RowState } from "app/admin/widgets/ros-pagination/ros-pagination.component";

@Component({
  selector: 'app-report-template',
  templateUrl: './report-template.component.html',
  styleUrls: ['./report-template.component.scss']
})
export class ReportTemplateComponent implements OnInit {

  @ViewChild('rosCalendar') rosCalendar; //筛选栏日历
  @Input() d1; //第一和第二维度下拉框
  @Input() d3; //第三维度下拉框
  @Input() requestType; //请求类型 用来获取对应的接口

  busy: Subscription; //数据加载loading...
  public gridOptions: GridOptions;
  public gridBodyHeigt: number;
  public columnDefs: any = [{ headerName: "序号", field: "no", width: 50 }];

  //初始化维度下拉框
  public d1Select;
  public d2Select;
  public d3Select;

  //列求和对象
  public sumColumn = {};

  // 分页组件
  RowState: RowState = new RowState('1', '15');
  public totalItems: string;
  public totalPages: number;


  //服务器返回总数据
  public totalRows = [];

  //错误提示消息
  public showError: boolean = false;
  public errorMessage: string;

  constructor(private reportService: ReportService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [];
    this.gridOptions.rowData = [];
    this.gridOptions.enableColResize = true;

    // 定义grid表格以字段id为索引进行获取下标
    this.gridOptions.getRowNodeId = function (data) {
      return data.id;
    };

    const self = this;
    const currentHeight = document.body.clientHeight - HEADER_AND_FOOTER_HEIGHT - 100;
    this.gridBodyHeigt = currentHeight;
    window.onresize = function () {
      const currentHeight = document.body.clientHeight;
      self.gridBodyHeigt = currentHeight - HEADER_AND_FOOTER_HEIGHT;
      self.gridOptions.api.sizeColumnsToFit();
    };
  }
  ngOnInit() {
    //初始化维度下拉框
    this.d1Select = this.d1[0];
    this.d2Select = this.d1[0];
    this.d3Select = this.d3[0];

    let nowDate = new Date;

    //初始化年份下拉框为当前年份
    this.getSalesReportForm(this.d1[0], this.d3[0], nowDate.getFullYear, this.d1[0]);
  }

  //筛选
  filter(e) {
    this.filterAndFillData()
  }

  //根据下拉框选择筛选数据并填充
  filterAndFillData() {
    let d1 = this.d1Select;
    let d2 = this.d2Select;
    let d3 = this.d3Select;

    let type_value = this.rosCalendar.year.select.value
    if (!this.rosCalendar.season.hideSelect) {
      type_value = type_value + '|' + this.rosCalendar.season.select.value
    } else if (!this.rosCalendar.month.hideSelect) {
      type_value = type_value + '-' + this.rosCalendar.month.select.value
    }

    this.getSalesReportForm(d1, d3, type_value, d2);
  }

  //根据下拉框选择筛选数据并填充
  getSalesReportForm(d1: any, d3: any, type_value: any, d2?: any) {
    this.busy = Observable.fromPromise(this.reportService.getReportFormByType(this.requestType, d1.value, d3.value, type_value, d2 == null ? '' : d2.value)).subscribe(data => {
      //1.初始化表格数据
      debugger
      this.gridOptions.api.setColumnDefs([])
      this.gridOptions.api.setRowData([]);
      this.totalRows = [];
      //2.判断后端数据是否有错误
      if (data.result) {
        this.showError = true;
        this.errorMessage = data.result.err_msg;
      } else {
        console.log(data)
        //3.根据选择维度动态添加表头
        this.columnDefs = [{
          headerName: "序号", field: "no", width: 50, colSpan: function (params) {
            if (params.data.section == 'total') {
              return (d2 != null && d2) ? 3 : 2;
            }
          },
          cellClassRules: {
            'center': 'data.section === "total"',
          }
        }];
        this.columnDefs.push({ headerName: d1.label, field: d1.text, width: 200 });
        if (d2 != null && d2) {
          this.columnDefs.push({ headerName: d2.label, field: d2.text, width: 200 });
        }

        //4.根据选择‘年’，‘季’，‘月’添加表头列
        if (data.dataPrefix == 'month') {
          for (let i = 1; i < 13; i++) {
            let name = i < 10 ? '0' + i : i + '';
            this.columnDefs.push({ headerName: name, field: name, enableValue: true, width: 60 });
            this.sumColumn[name] = 0;
          }
        } else if (data.dataPrefix == 'day') {
          let date = new Date(this.rosCalendar.year.select.value, this.rosCalendar.month.select.value, 0);
          for (let i = 1; i < date.getDate() + 1; i++) {
            let name = i < 10 ? '0' + i : i + '';
            this.columnDefs.push({ headerName: name, field: name, enableValue: true, width: 60 });
            this.sumColumn[name] = 0;
          }
        } else {
          for (let i = 1; i < 5; i++) {
            let name = i + '';
            this.columnDefs.push({ headerName: name, field: name, enableValue: true, width: 150 });
            this.sumColumn[name] = 0;
          }
        }

        //5.添加累计数据头名称
        this.columnDefs.push({ headerName: '累计', field: 'total', width: 150 });
        this.sumColumn['total'] = 0;

        //6.循环返回数据拼接成对应的数组
        this.totalItems = data.rows.length;
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(this.RowState.row));
        for (let i = 0; i < data.rows.length; i++) {
          let first = true;
          let row = {};
          if (data.rows[i].data) {
            for (let j = 0; j < data.rows[i].data.length; j++) {
              if (first) {
                for (let key in data.rows[i].data[0]) {
                  row[key] = data.rows[i].data[0][key];
                }
                first = false;
              }
              let value = Number.parseFloat(data.rows[i].data[j].quantity || data.rows[i].data[j].count || data.rows[i].data[j].amount
                || data.rows[i].data[j].finaAmount || data.rows[i].data[j].replenishment || data.rows[i].data[j].finish_quantity || data.rows[i].data[j].plan_quantity);

              //设置对应row的单元格数值
              row[data.rows[i].data[j].time] = value;
              //设置纵向总和
              this.sumColumn[data.rows[i].data[j].time] = this.sumColumn[data.rows[i].data[j].time] + value;
            }
          }
          this.totalRows.push(row);
        }

        //设置ng-grid表格头
        this.gridOptions.api.setColumnDefs(this.columnDefs)
        //根据分页参数显示数据
        this.getPagenationData();
      }
    });
  }

  //设置ng-grid数据呈现
  setGridData(rowDatas) {
    this.gridOptions.api.setRowData(rowDatas);
    this.gridOptions.api.setPinnedBottomRowData(this.createPinnedRow());
  }

  //创建固定在底部的固定行
  createPinnedRow() {
    let result = [];
    let obj = { section: 'total', no: '总计' };
    for (let i = 1; i < this.columnDefs.length; i++) {
      obj[this.columnDefs[i].field] = this.sumColumn[this.columnDefs[i].field];
    }

    result.push(obj);
    return result;
  }

  //根据分页参数获取数据
  getPagenationData() {
    let rowDatas = [];
    let begin = (Number.parseInt(this.RowState.page) - 1) * Number.parseInt(this.RowState.row);
    let end = Number.parseInt(this.RowState.page) * Number.parseInt(this.RowState.row);
    rowDatas = this.totalRows.slice(begin, end);

    this.sumRowData(rowDatas);
    this.setGridData(rowDatas)
  }

  //每行数据求和
  sumRowData(rowDatas) {
    for (let i = 0; i < rowDatas.length; i++) {
      let total = 0;
      for (let key in rowDatas[i]) {
        if (Number.parseInt(key)) {
          total = total + Number.parseFloat(rowDatas[i][key]);
        }
      }
      rowDatas[i].no = i + 1;
      rowDatas[i].total = total;
      this.sumColumn['total'] = this.sumColumn['total'] + total;
    }
  }

  //获取分页行（插件事件）
  getPagesRows(event: RowState) {
    if (this.totalRows.length > 0) {
      this.RowState = event;
      this.getPagenationData();
    }
  }

  //刷新ng-grid
  refreshDataGrid(e) {
    this.filterAndFillData()
  }

  //错误提示框关闭后
  afterClose() {
    this.showError = false;
  }
}
