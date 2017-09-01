import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForObjectPipe } from './ng-for-object.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgForObjectPipe],
  exports: [NgForObjectPipe]
})
export class PipeModule {
 }
