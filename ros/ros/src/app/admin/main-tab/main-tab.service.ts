import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MainTabService {

    // 功能选中事件
    public onTabRemove: EventEmitter<String>;

    // 选中的tab配置信息
    public selectedFunctionConfig;

    constructor() {

        this.onTabRemove = new EventEmitter();
    }

}
