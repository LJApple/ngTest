import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonHelper } from "app/utils/common.helper";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * 侧边栏组件
 */
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [trigger(
        'openClose',
        [
            state('collapsed', style({ width: '60px' })),
            state('expanded void', style({ width: '*' })),
            transition(
                'collapsed <=> expanded', [animate(0)])
        ]
    )]
})
export class SidebarComponent implements OnInit {

    @Input() moduleList; // 模块列表数据
    @Input() functionList; // 功能列表数据
    @Output() onSideBarChange = new EventEmitter<string>();
    currentModuleCode; // 当前选中的模块code
    stateExpression: string = 'expanded';
    isActive: boolean = false;
    showSeconde: boolean = false; //是否显示二级菜单
    showFirst: boolean = true; //是否显示一级菜单

    constructor() { }

    ngOnInit() {

    }

    /**
     * 捕获模块列表子组件的选中事件
     */
    onSelectModule(moduleCode: string) {
        this.showFirst = false;
        this.showSeconde = true;
        this.currentModuleCode = moduleCode;
    }

    /**
     * 展开收缩动画
     */
    onZoomClick($event) {
        this.stateExpression = this.stateExpression == 'expanded' ? 'collapsed' : 'expanded';
        this.onSideBarChange.emit(this.stateExpression);
    }

    /**
     * 判断导航是否处于收缩状态
     */
    isSideBarCollapsed() {

        return this.stateExpression == 'collapsed' ? true : false;
    }

    rightClick($event) {
        this.isActive = !this.isActive;
    }

    returnModuleList($event) {
        this.showFirst = true;
        this.showSeconde = false;
    }

    returnPage($event){
        this.rightClick($event);
    }
}
