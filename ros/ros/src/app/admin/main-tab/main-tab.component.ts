import { Component, OnInit } from '@angular/core';
import { FunctionUnitService } from "app/admin/function-unit/function-unit.service";
import { MainTabService } from "app/admin/main-tab/main-tab.service";
import * as _ from 'lodash';
import {BadCodeTypeComponent} from "../../production/bad-code-type/bad-code-type.component";
/**
 * tab页签组件
 */
@Component({
    selector: 'app-main-tab',
    templateUrl: './main-tab.component.html',
    styleUrls: ['./main-tab.component.scss']
})
export class MainTabComponent implements OnInit {

    public currentCodeArr: any[] = ['workbench'];
    public preCode;

    private index: number;

    // tab配置信息
    public tabs: any[] = [
        /*{
            title: '员工', // 功能标题
            code: 'employee', // 功能代码
            component: EmployeeComponent, // 对应的组件
            disabled: false, // 是否不可选
            removable: true, // 是否可关闭
            active: false // 是否选中
        }*/
    ];

    constructor(public functionUnitService: FunctionUnitService, public mainTabService: MainTabService) {

        // 订阅功能子项的选中事件
        functionUnitService.onFunctionSelect.subscribe((functionCode: string) => {
            // 新增tab
            this.addTab(functionCode);
            this.currentCodeArr.push(functionCode);
        });

        // 订阅tab关闭事件
        mainTabService.onTabRemove.subscribe((functionCode: string) => {
            // 关闭tab
            this.removeTab(functionCode);

        });

        // 订阅操作类功能的选中事件
        functionUnitService.onOperationExecute.subscribe((functionCode: string) => {
            // 新增tab
            this.addTab(functionCode);
        });
    }

    ngOnInit() {
    }

    /**
     * 新增tab
     */
    public addTab(functionCode: string): void {

        // 判断是否已经打开，如果是，选中即可
        let index = _.findIndex(this.tabs, ['code', functionCode]);
        if (index >= 0) {
            let isUnique = this.functionUnitService.isUnique(functionCode);
            if (isUnique) {
                this.selectTab(functionCode);
                return;
            }
            this.removeTab(functionCode);
        }

        let functionUnitConfig = this.functionUnitService.getConfig(functionCode); // 功能配置信息
        if (!functionUnitConfig) {
            return;
        }

        let component = functionUnitConfig.component; // 功能对应的组件
        this.tabs.push({
            title: functionUnitConfig.functionName,
            code: functionUnitConfig.functionCode,
            component: functionUnitConfig.component,
            disabled: false,
            removable: true
        });

        // 选中新增的tab
        this.selectTab(functionCode);
    }

    /**
     * 关闭tab
     */
    public removeTab(functionCode: string) {

        const self = this;
        let index = _.findIndex(this.tabs, ['code', functionCode]);
        this.tabs.splice(index, 1);

        // 激活上一个tab
        for (let i = 0; i < this.currentCodeArr.length; i++) {
            if (this.currentCodeArr[i] === functionCode) {
                this.index = i - 1;
                self.currentCodeArr.splice(i,1);
                self.preCode = self.currentCodeArr[this.index];
            }
        }

        for (let i = this.tabs.length - 1; i !== -1; i--) {
            if (this.tabs[i].code === this.preCode) {
                this.tabs[i].active = true;
            }
        }

    }

    /**
     * 选中tab
     */
    public selectTab(functionCode: string) {

        //console.log(functionCode);

        let self = this;
        let index = 0;

        _.forEach(this.tabs, function (tabItem) {

            if (tabItem.code == functionCode) {
                tabItem.active = true;
                self.mainTabService.selectedFunctionConfig = self.functionUnitService.getConfig(functionCode); // 功能配置信息
            } else {
                tabItem.active = false;
            }

            index++;
        });
    }

    /**
     * 判断tab是否选中
     */
    isSelected(functionCode: string) {

        return _.find(this.tabs, { code: functionCode }).active;
    }
}
