import { Component, OnInit } from '@angular/core';
import { FunctionUnitService } from 'app/admin/function-unit/function-unit.service';

@Component({
    selector: 'app-master-list-base-child',
    templateUrl: './master-list-base-child.component.html',
    styleUrls: ['./master-list-base-child.component.scss']
})
export class MasterListBaseChildComponent implements OnInit {

    constructor(private functionUnitService: FunctionUnitService) { }

    ngOnInit() {
    }

    // 新增或选中功能tab
    onFunctionSelect(functionCode) {
        this.functionUnitService.onFunctionSelect.emit(functionCode);
    }

}
