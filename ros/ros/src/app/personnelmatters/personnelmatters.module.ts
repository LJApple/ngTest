import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuchrecordingComponent } from './checkworkattendance/puchrecording/puchrecording.component';
import { CheckworkattendanceService } from "app/personnelmatters/checkworkattendance/checkworkattendance.service";
import { WorkSchedulePlanComponent } from './checkworkattendance/work-schedule-plan/work-schedule-plan.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PuchrecordingComponent, WorkSchedulePlanComponent],
  entryComponents: [
    PuchrecordingComponent,
    WorkSchedulePlanComponent
  ],
  providers: [
    CheckworkattendanceService,
    WorkSchedulePlanComponent
  ]
})
export class PersonnelmattersModule { }
