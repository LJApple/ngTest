import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-master-grid',
    templateUrl: './master-grid.component.html',
    styleUrls: ['./master-grid.component.scss']
})
export class MasterGridComponent implements OnInit {

    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    constructor() { }

    ngOnInit() {
    }

}
