import { Pipe, PipeTransform } from '@angular/core';

/*
  用途：ngFor指令直接循环Object对象。
  用法：<div *ngFor="let key of objs | ngForObject">
*/
@Pipe({ name: 'ngForObject',  pure: false })
export class NgForObjectPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)
    }
}
