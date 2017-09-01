import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FunctionUnitService} from 'app/admin/function-unit/function-unit.service';
import { CommonHelper } from 'app/utils/common.helper';

/**
 * 列表筛选栏控件
 */
@Component({
    selector: 'app-filter-bar',
    templateUrl: './filter-bar.component.html',
    styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

    // 配置信息
    @Input() config;

    // 按钮点击事件
    @Output() onButtonClick = new EventEmitter<any>();

    // 搜索点击事件
    @Output() onSearchClick = new EventEmitter<any>();

    /*defauLtconfig = {

        // 操作按钮
        buttons: [
            {
                'name': 'TEST', // 名称
                'class': 'create' // 自定义类选择器
            }
        ],
        // 搜索控件
        search: {
            /!**!/
            'key': '不良代码编号', // 文本
            'param': '' // 默认搜索参数
        }
    };*/

    constructor(private functionUnitService: FunctionUnitService) {
    }

    ngOnInit() {

    }

    // 按钮点击事件
    onFunctionButtonClick($event, buttonConfig) {

        if (buttonConfig.handleType == CommonHelper.HANDLE_TYPE.TAB) {
            this.functionUnitService.onFunctionSelect.emit(buttonConfig.functionCode);
        } else if (buttonConfig.handleType == CommonHelper.HANDLE_TYPE.HANDLER) {
            this.onButtonClick.emit(buttonConfig);
        }
    }

    // 搜索点击事件
    onSearchButtonClick($event, searchConfig, param) {

        // 带上搜索参数
        searchConfig.param = param;

        if (searchConfig.handleType == CommonHelper.HANDLE_TYPE.TAB) {
            this.functionUnitService.onFunctionSelect.emit(searchConfig.functionCode);
        } else if (searchConfig.handleType == CommonHelper.HANDLE_TYPE.HANDLER) {
            this.onSearchClick.emit(searchConfig);
        }
    }

}
