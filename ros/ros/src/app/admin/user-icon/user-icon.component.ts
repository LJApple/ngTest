import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * 用户头像信息组件
 */
@Component({
    selector: 'app-user-icon',
    templateUrl: './user-icon.component.html',
    styleUrls: ['./user-icon.component.scss'],
    animations: [trigger(
        'menuAnimation',
        [
            state('collapsed void', style({ display: 'none' })),
            state('expanded', style({ display: 'block' })),
            transition(
                'collapsed <=> expanded', [animate(0)])
        ]
    )]
})
export class UserIconComponent implements OnInit {

    @Input() sideBarState; // 导航状态（展开or收缩）
    menuState: string = 'collapsed'; // 下拉菜单状态（expanded or collapsed）

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
     * 控制下拉菜单
     */
    toogleMenu() {

        this.menuState = this.menuState == 'expanded' ? 'collapsed' : 'expanded';
    }

}
