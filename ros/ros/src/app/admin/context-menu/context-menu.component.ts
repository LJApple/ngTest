import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FunctionUnitService} from '../function-unit/function-unit.service';
import {CommonHelper} from '../../utils/common.helper';

/**
 * 右键菜单组件
 */
@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
    // 菜单配置
    @Input() menuItems: any;
    // 是否显示
    @Input() isShow: boolean;
    // 定位信息
    @Input() position: MenuPosition = new MenuPosition(0, 0);
    // 行数据
    @Input() rowData: any;
    // 行索引
    @Input() rowIndex: any;
    // 传出的事件
    @Output() onItemClick: EventEmitter<any>;

    constructor(private functionUnitService: FunctionUnitService) {
        /* this.menuItems = [
            {
                'name': '新增',
                'code': 'create',
                'functionCode': 'sales_order_form',
                'class': 'glyphicon-ok-sign',
                'handler': function ($event, rowData) {
                    console.log(rowData);
                }
            }
        ] */

        this.onItemClick = new EventEmitter();
    }

    ngOnInit() {
    }

    closeMenuContext() {
        if (this.isShow) {
            this.isShow = false;
        }
        console.log(this.rowData);
    }


    /**
     * 打开指定功能
     */
    invokeFunction (functionCode: string, handleType: number, handler: any) {

        this.onItemClick.emit(this.rowData);

        if (handleType === CommonHelper.HANDLE_TYPE.TAB) {
            this.functionUnitService.onFunctionSelect.emit(functionCode);
            handler(this.rowData);
        } else if (handleType === CommonHelper.HANDLE_TYPE.HANDLER) {
            handler(this.rowData);
        }
    }
}

export class MenuPosition {
    constructor(public clientX: number,
        public clientY: number) {
    }
}
