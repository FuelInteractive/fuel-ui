import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from "angular2/common";
import {RANGE_PROVIDERS} from './Range';

@Component({
  template: `
        <code>*ngFor="#number of numbers | range : {{startNumber}} : {{endNumber}}"</code><br/>
        <li *ngFor="#number of numbers | range : startNumber : endNumber" class="page-item" [class.active]="currentPage == page">
            {{number}}
        </li>
        <div class="form-group row">
            <label for="startNumber" class="col-sm-2 form-control-label">Starting Number</label>
            <div class="col-sm-2">
                <input name="startNumber" [(ngModel)]="startNumber" type="number" [max]="endNumber" class="form-control"> 
            </div>
        </div>
        <div class="form-group row">
            <label for="endNumber" class="col-sm-2 form-control-label">Ending Number</label>
            <div class="col-sm-2">
                <input name="endNumber" [(ngModel)]="endNumber" type="number" [min]="startNumber" class="form-control"> 
            </div>
        </div>
        `,
    directives: [CORE_DIRECTIVES],
    pipes: [RANGE_PROVIDERS]
})
export class RangeDemo {
    numbers:number[] = [];
    startNumber:number = 0;
    endNumber:number = 5;
}

export var RANGE_DEMO_PROVIDERS = [
    RangeDemo
];