import {Component, OnInit, Input} from '@angular/core';
import {FunctionUnitService} from "../function-unit/function-unit.service";

@Component({
    selector: 'app-function-button',
    templateUrl: './function-button.component.html',
    styleUrls: ['./function-button.component.scss']
})
export class FunctionButtonComponent implements OnInit {

    @Input()
    functionCode: string;
    @Input()
    show: boolean;

    constructor(private functionUnitService: FunctionUnitService) {
    }

    ngOnInit() {
        // this.test = 'sales_order_form';
    }

    createOrder() {
        this.functionUnitService.onFunctionSelect.emit(this.functionCode);
    }
}
