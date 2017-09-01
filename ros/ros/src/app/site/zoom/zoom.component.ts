import { Component, OnInit, Output, EventEmitter } from '@angular/core';

/**
 * 导航隐藏按钮组件
 */
@Component({
    selector: 'app-zoom',
    templateUrl: './zoom.component.html',
    styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

    @Output() onZoomClick = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    /**
     * 选中模块
     */
    toggleSideBar() {

        this.onZoomClick.emit();
    }

}
