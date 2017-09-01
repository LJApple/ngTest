import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonHelper } from "app/utils/common.helper";
import { Module } from "app/admin/module/module.model";

/**
 * 模块单元组件
 */
@Component({
    selector: 'app-module',
    templateUrl: './module.component.html',
    styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

    @Input() module: Module; // 模块数据
    @Input() sideBarState; // 导航状态（展开or收缩）
    @Output() onSelectModule = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    /**
     * 判断导航是否处于收缩状态
     */
    isSideBarCollapsed() {

        return this.sideBarState == 'collapsed' ? true : false;
    }

    /**
     * 判断模块是否选中
     */
    isModuleSelected() {

        return this.module.active ? true : false;
    }

    /**
     * 选中模块
     */
    selectModule() {
        this.onSelectModule.emit(this.module.code);
    }
}
