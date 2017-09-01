import { Component, OnInit, Input } from '@angular/core';
import { ChartTable } from './chart-table.model';
import { FunctionUnitService } from "app/admin/function-unit/function-unit.service";
import { FunctionUnit } from "app/admin/function-unit/function-unit.model";

@Component({
  selector: 'app-chart-table',
  templateUrl: './chart-table.component.html',
  styleUrls: ['./chart-table.component.scss']
})
export class ChartTableComponent implements OnInit {

  @Input() TableData: ChartTable;

  constructor(private functionUnitService: FunctionUnitService) { }

  ngOnInit() {
  }

  jumpTo() {
    if (this.TableData.drill_target_code !== null) {
      this.functionUnitService.onFunctionSelect.emit(this.TableData.drill_target_code);
    }
  }
}
