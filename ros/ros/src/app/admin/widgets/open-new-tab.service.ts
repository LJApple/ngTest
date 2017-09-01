import {Injectable} from '@angular/core';
import {FunctionUnitService} from "../function-unit/function-unit.service";




@Injectable()
export class OpenNewTabService  {
    constructor(private functionUnitService: FunctionUnitService) {

    }
    createTab (functionCode) {
        this.functionUnitService.onFunctionSelect.emit(functionCode);
    }
}
