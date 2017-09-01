import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { Observable } from 'rxjs/Rx';
import { GetDataListService } from "../get-data-list.service";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
@Component({
    selector: 'app-combogrid',
    templateUrl: './combogrid.component.html',
    styleUrls: ['./combogrid.component.scss']
})
export class CombogridComponent implements OnInit, OnChanges {

    // 数据网格
    @Input() group: FormGroup;
    @Input() fieldName: any;
    @Input() loadGridUrl: string;
    @Input() gridArrOptions: any;
    @Input() setWidth: number;
    @Input() gridWidth: number;
    @Input() params: any = '';
    @Input() isGridHide: boolean;
    @Input() isActive: boolean = false;
    // 传出的事件
    @Output() onGridClick: EventEmitter<any>;
    @Output() isMyInputEmpty: EventEmitter<any>;

    public gridOptions: GridOptions;
    public totalItems: number;
    public name: string;
    public formModel: FormGroup;
    public comboValue: any;
    public flag: boolean;
    public isMyInputRealData: object;

    constructor(public getDataList: GetDataListService,
        public FB: FormBuilder
    ) {
        this.onGridClick = new EventEmitter();
        this.isMyInputEmpty = new EventEmitter();
    }


    ngOnInit() {

        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = this.gridArrOptions;
        console.log(this.gridOptions.columnDefs);
        this.gridOptions.rowData = [];
        this.gridOptions.enableColResize = true;
        this.gridOptions.onGridReady = function (params) {
            // params.api.sizeColumnsToFit();
        };
        this.formModel = this.FB.group({

        });
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    public onCellValueChanged($event) {
    }

    public onRowClicked($event) {
        console.log('三特');
        //debugger;
        this.onGridClick.emit($event.data);
        this.isGridHide = true;
        this.isActive = false;
    }

    public closeMenuContext() {
        this.isGridHide = true;
        this.isActive = false;
    }

    public onInputFocus($event) {
        this.isGridHide = false;
        this.isActive = true;
        let url = this.loadGridUrl;
        let q = $event.target.value;
        this.getData(url, q);
    }

    public onInputBlur($event) {
        //debugger;
        if (this.isMyInputRealData) {

            if (this.isMyInputRealData['q'] == '') {
                let data = {
                    id: '',
                    no: '',
                    name: '',
                    type: '',
                };
                this.onGridClick.emit(data);
            } else {
                this.onGridClick.emit(this.isMyInputRealData['data']);
            }

        }

    }

    getData(url, q) {
        const self = this;
        Observable.fromPromise(this.getDataList.getDataList(url, q)).subscribe(data => {

            if (data.code == 0) {
                self.totalItems = data.data.total;
                self.gridOptions.api.setRowData(data.data.rows);
                if (data.data.total && data.data.total == 1) {
                    self.isMyInputRealData = {
                        flag: true,
                        data: data.data.rows[0],
                        q: ''
                    }
                } else if (data.data.total && data.data.total >= 2) {
                    self.isMyInputRealData = {
                        flag: true,
                        data: data.data.rows[0],
                        nor: true,
                        q: ''
                    }
                } else {
                    let data = {
                        id: '',
                        no: '',
                        name: '',
                        type: '',
                    };
                    self.isMyInputRealData = {
                        flag: false,
                        data: data,
                        q: ''
                    }
                }
            } else if (!data.code) {

                self.totalItems = data.total;
                self.gridOptions.api.setRowData(data.rows);
                if (data.total && data.total == 1) {
                    self.isMyInputRealData = {
                        flag: true,
                        data: data.rows[0],
                        q: ''
                    }
                } else if (data.total && data.total >= 2) {
                    self.isMyInputRealData = {
                        flag: true,
                        data: data.rows[0],
                        nor: true,
                        q: ''
                    }
                } else {
                    let data = {
                        id: '',
                        no: '',
                        name: '',
                        type: '',
                    };
                    self.isMyInputRealData = {
                        flag: false,
                        data: data,
                        q: ''
                    }
                }
            }
            console.log(data);
        });
    }

    public todo($event) {
        console.log('间听到了吗');
        if ($event.target.value == '') {
            this.flag = true;
            this.isMyInputEmpty.emit(this.flag);
        } else {
            this.flag = false;
            this.isMyInputEmpty.emit(this.flag);
        }
        let url = this.loadGridUrl;
        let q = $event.target.value;
        console.log($event)
        this.getData(url, q);
        this.isGridHide = false;
    }

    public dropDownGrid($event) {
        if ($event.target.id && $event.target.id == 'speBtn') {
            this.isGridHide = false;
            this.isActive = true;
        } else {
            this.isGridHide = false;
            this.isGridHide = true;
            this.isActive = false;
        }
        let url = this.loadGridUrl;
        this.getData(url, this.params);
    }
}
