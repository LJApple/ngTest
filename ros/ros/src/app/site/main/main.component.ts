import { Component, OnInit, Input } from '@angular/core';

/**
 * 主内容组件
 */
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    @Input() sideBarState;

    constructor() {

    }

    ngOnInit() {
    }

    /**
     * 判断导航是否处于收缩状态
     */
    isSideBarCollapsed() {

        return this.sideBarState == 'collapsed' ? true : false;
    }

}
