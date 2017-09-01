import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';


import { AccountBookComponent } from './account-book/account-book.component';
import { AccountBookService } from './account-book/account-book.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
    ],
    declarations: [AccountBookComponent],
    providers: [AccountBookService]
})
export class FmsModule { }
