import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonHelper } from 'app/utils/common.helper';

/**
 * 默认入口组件
 */
@Component({
    selector: 'ros-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {
        const isLoggedIn = CommonHelper.isLogined();

        if (isLoggedIn) {
            this.router.navigate(['index']);
        } else {
            this.router.navigate(['login']);
        }
    }

}
