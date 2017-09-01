import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FunctionUnit } from 'app/admin/function-unit/function-unit.model';
import { FunctionUnitService } from 'app/admin/function-unit/function-unit.service';
import * as _ from 'lodash';

/**
 * 功能列表组件
 */
@Component({
    selector: 'app-function-list',
    templateUrl: './function-list.component.html',
    styleUrls: ['./function-list.component.scss']
})
export class FunctionListComponent implements OnInit, OnChanges {

    @Input() functionList; // 功能数据
    @Input() currentModuleCode; // 当前模块代码
    @Input() sideBarState; // 导航状态（展开or收缩）
    @Input() showSeconde; //是否显示二级菜单
    @Output() onReturnModuleList = new EventEmitter();
    @Output() onReturnPage = new EventEmitter();

    currentModuleName: string = '模块名称'; // 当前模块名称
    currentFunctionList: Array<object>; // 当前模块的功能列表
    selectedFunctionCode; // 选中的功能代码
    selectedFunctionUnit: FunctionUnit; // 选中的功能

    constructor(public functionUnitService: FunctionUnitService) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

        if ((changes['functionList'] && changes['functionList'].currentValue) || (changes['currentModuleCode'] && changes['currentModuleCode'].currentValue)) {
            this.filtByModule(this.currentModuleCode);
        }
    }

    /**
     * 根据指定模块code控制当前显示的功能
     */
    filtByModule(moduleCode) {

        // 首先筛选出当前模块的所有功能列表
        var functionList = [];
        _.forEach(this.functionList, function (functionItem: FunctionUnit) {

            if (functionItem.module_code == moduleCode) {
                functionList.push(functionItem);
            }
        });

        // 筛选二级功能
        var structureList = [];
        _.forEach(functionList, function (functionItem: FunctionUnit) {

            if (functionItem.level == 2) {
                structureList.push(functionItem);
            }
        });

        // 往二级功能的children属性添加附属三级功能

        _.forEach(structureList, function (secondFunctionItem) {

            secondFunctionItem.children = [];
            _.forEach(functionList, function (functionItem: FunctionUnit) {

                if (secondFunctionItem.id == functionItem.parent_id) {
                    secondFunctionItem.children.push(functionItem);
                }
            });
        });

        if (structureList.length) {
            this.currentFunctionList = structureList; // 结构化的二三级功能列表数据
            this.currentModuleName = structureList[0].module_name; // 当前模块名称
        }
    }

    /**
     * 判断导航是否处于收缩状态
     */
    isSideBarCollapsed() {

        return this.sideBarState == 'collapsed' ? true : false;
    }

    /**
     * 选中指定功能
     */
    selectFunction(functionCode: string) {

        //console.log('selected function code:' + functionCode);

        var self = this;
        self.selectedFunctionCode = functionCode;
        console.log(self.selectedFunctionCode);
        _.forEach(this.currentFunctionList, function (functionUnit) {
            if (functionUnit.value == functionCode) {
                functionUnit.active = true;
                self.selectedFunctionUnit = functionUnit;
            } else {
                functionUnit.active = false;
            }

            if (functionUnit.children && functionUnit.children.length) {
                _.forEach(functionUnit.children, function (childFunctionUnit) {
                    if (childFunctionUnit.value == functionCode) {
                        childFunctionUnit.active = true;
                        self.selectedFunctionUnit = childFunctionUnit;
                    } else {
                        childFunctionUnit.active = false;
                    }
                });
            }
        });

        self.functionUnitService.onFunctionSelect.emit(functionCode);
    }

    /**
     * 捕获子组件的选中事件
     */
    onFunctionSelect(functionCode: string) {
        console.log(functionCode)
        this.onReturnPage.emit();
        this.selectFunction(functionCode);
    }

    returnModuleList($event){
        this.onReturnModuleList.emit();
    }
}
