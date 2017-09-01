import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FunctionUnit } from "app/admin/function-unit/function-unit.model";

/**
 * 功能单元组件
 */
@Component({
    selector: 'app-function-unit',
    templateUrl: './function-unit.component.html',
    styleUrls: ['./function-unit.component.scss'],
    animations: [trigger(
        'openClose',
        [
            state('collapsed', style({ height: '0px' })),
            state('expanded void', style({ height: '*' })),
            transition(
                'collapsed <=> expanded', [animate(200)])
        ]
    )]
})

export class FunctionUnitComponent implements OnInit {

    @Input() functionUnit: FunctionUnit; // 功能数据
    @Output() onFunctionSelect = new EventEmitter<string>();
    @Output() onReturnModeleList = new EventEmitter();
    stateExpression: string;

    constructor() {

        this.toggle();
    }

    ngOnInit() {
    }

    /**
     * 展开收缩动画
     */
    toggle() {
        this.stateExpression = this.stateExpression == 'expanded' ? 'collapsed' : 'expanded';
    }

    /**
     * 是否展开
     */
    isExpanded() {
        return this.stateExpression == 'expanded';
    }

    /**
     * 功能点击事件
     */
    onItemClick(functionCode:string) {

        if (this.functionUnit.children && this.functionUnit.children.length) {
            this.toggle();
        } else {
            this.onFunctionSelect.emit(functionCode);
        }
    }

    /**
     * 子集功能点击事件
     */
    onDetailItemClick(functionCode:string) {
        this.onFunctionSelect.emit(functionCode);
    }

    /**
     * 判断功能是否选中
     */
    isSelected() {

        return this.functionUnit.active ? true : false;
    }

}
