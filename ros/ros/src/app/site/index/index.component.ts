import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LicenseManager } from "ag-grid-enterprise/main";

import { ProfileService } from "app/site/index/profile.service";
import { ModuleService } from "app/admin/module/module.service";
import { FunctionUnitService } from "app/admin/function-unit/function-unit.service";
import { CommonHelper } from "app/utils/common.helper";

/**
 * 系统首页组件
 */
@Component({
    selector: 'ros-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    moduleList; // 模块数据
    functionList; // 功能数据
    sideBarState: string = 'expanded'; // 侧边栏状态

    constructor(private profileService: ProfileService, private moduleService: ModuleService, private functionUnitService: FunctionUnitService) {

        // ag-grid授权验证
        LicenseManager.prototype.validateLicense = function () {};
        LicenseManager.setLicenseKey("123");
     }

    ngOnInit() {
        Observable.forkJoin(this.profileService.get(), this.moduleService.getList(), this.functionUnitService.getList()).subscribe(data => {

            // data[0]是profile，data[1]是模块列表，data[2]是功能列表
            this.profileService.profile = data[0];
            this.moduleService.moduleList = data[1];
            this.functionUnitService.functionList = data[2];

            this.moduleList = data[1];
            this.functionList = data[2];
        });
    }

    /**
     * 捕获模块列表子组件的选中事件
     */
    onSideBarChange(sideBarState: string) {

        this.sideBarState = sideBarState;
    }
}
