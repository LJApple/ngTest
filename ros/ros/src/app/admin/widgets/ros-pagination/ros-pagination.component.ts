import { Component, OnInit, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-ros-pagination',
    templateUrl: './ros-pagination.component.html',
    styleUrls: ['./ros-pagination.component.scss']
})
export class RosPaginationComponent implements OnInit {

    public myreg = /^[0-9]*$ /;

    @Input()
    public totalPages: number;
    @Input()
    public totalItems: string;

    public pages: string = '1';

    public selectSize: boolean = false;

    // 下拉框的选项
    public rowSelectItems: string[] = ['15', '30'];
    public rows: string = '15';
    public nowRows: string = '';

    @Output()
    PagesRows: EventEmitter<RowState> = new EventEmitter();
    @Output()
    Refresh: EventEmitter<any> = new EventEmitter();

    // 发射页数和行数
    constructor() {
    }

    emitRowsPages() {
        let RowsState: RowState = new RowState(this.pages, this.rows);
        this.PagesRows.emit(RowsState);
    }

    ngOnInit() {
        if (Number(this.pages) > this.totalPages) {
            this.pages = this.totalPages + '';
        }
        if (Number(this.pages) < 0) {
            this.pages = '1';
        }
        this.emitRowsPages();
    }

    // 选取行数后更新rows
    setRows() {
        this.nowRows = this.rows;
    }


    // 输入页
    inputPage($event) {
        this.emitRowsPages();
    }

    // 下一页
    nextPage($event) {
        if (Number(this.pages) < this.totalPages) {
            this.pages = Number(this.pages) + 1 + '';
            this.emitRowsPages();
        }
    }

    // 上一页
    prevPage($event) {
        if (Number(this.pages) > 1) {
            this.pages = Number(this.pages) - 1 + '';
            this.emitRowsPages();
        }
    }

    refreshList(e) {
       
        this.emitRowsPages();
    }

    // 第一页
    fristPage() {
        this.pages = '1'
        this.emitRowsPages();
    }

    // 最后一页
    lastPage() {
        this.pages = this.totalPages + '';
        this.emitRowsPages();
    }

    // 选择也
    getRowNum() {
        this.emitRowsPages();
    }

    showSelcet() {
        this.selectSize = true;
    }

    hideSelect() {
        this.selectSize = false;
    }

    setSize(size) {
        this.rows = size;
        this.totalPages = Math.ceil(Number(this.totalItems) / Number(size));
        this.emitRowsPages();
    }
}


export class RowState {
    constructor(public page: string,
        public row: string) {
    }
}
