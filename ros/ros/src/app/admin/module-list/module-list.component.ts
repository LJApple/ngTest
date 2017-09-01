import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonHelper } from 'app/utils/common.helper';
import * as _ from 'lodash';

/**
 * 模块列表组件
 */
@Component({
    selector: 'app-module-list',
    templateUrl: './module-list.component.html',
    styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit, OnChanges {

    @Input() moduleList; // 模块数据
    @Input() sideBarState; // 导航状态（展开or收缩）
    @Output() onTopSelectModule = new EventEmitter<string>();
    @Input() showFirst; //是否显示一级菜单
    selectedModuleCode; // 选中的模块代码

    constructor() { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {

       // 默认选中第一个
        // if (changes['moduleList'] && changes['moduleList'].currentValue) {
        //     var hasActive = false;
        //     _.forEach(this.moduleList, function (module) {
        //         if (module.active) {
        //             hasActive = true;
        //         }
        //     });
        //     if (!hasActive) {
        //         this.selectModule(this.moduleList[0].code);
        //     }
        // }
    }

    /**
     * 选中指定模块
     */
    selectModule(moduleCode) {

        this.selectedModuleCode = moduleCode;
        this.onTopSelectModule.emit(moduleCode);

        _.forEach(this.moduleList, function (module) {
            if (module.code == moduleCode) {
                module.active = true;
            } else {
                module.active = false;
            }
        });
    }

    /**
     * 捕获子组件的选中事件
     */
    onSelectModule(moduleCode: string) {

        this.selectModule(moduleCode);
    }

    /**
     * 判断导航是否处于收缩状态
     */
    isSideBarCollapsed() {

        return this.sideBarState == 'collapsed' ? true : false;
    }
}
