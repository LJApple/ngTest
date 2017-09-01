import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from 'rxjs';
import {BadCodeTypeService} from "../../bad-code-type.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-bad-type',
    templateUrl: './bad-type.component.html',
    styleUrls: ['./bad-type.component.scss']
})
export class BadTypeComponent implements OnInit {

    @Input() formModel: FormGroup;

    @Output()
    checkeds: EventEmitter<any> = new EventEmitter();

    public checkOptionsOne: any;
    public checkGroup: any = [];
    public chechedArr: any = [];
    public emitDate: any = {
        state: 1,
        chechedArr: []
    };

    constructor(private badCodeTypeService: BadCodeTypeService) {
    }

    ngOnInit() {
        const self = this;
        Observable.fromPromise(this.badCodeTypeService.getCheckGroup()).subscribe(data => {
            console.log(data);
            this.checkOptionsOne = data.data;
            _.forEach(data.data, function (item) {
                self.checkGroup.push({
                    label: item.name,
                    value: item.id
                })
            });
            self.formModel.patchValue({
                'bad_code': self.checkGroup
            })
        });
    }

    statusChanges() {
        const state = this.formModel.get('status').value;
        if (state) {
            this.emitDate.state = 0;
        } else {
            this.emitDate.state = 1;
        }
        this.checkeds.emit(this.emitDate);
    }

    onChecked() {
        const self = this;
        const formCheckGroup = this.formModel.get('bad_code').value;
        _.forEach(formCheckGroup, function (item) {
            if (item.checked) {
                self.chechedArr.push(item.value);
            }
        })
        this.chechedArr = _.uniq(this.chechedArr);
        this.emitDate.chechedArr = this.chechedArr;
        this.checkeds.emit(this.emitDate);
    }
}
