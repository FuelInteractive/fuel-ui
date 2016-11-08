/*
 * Example use
 *		Basic Array of single type: *ngFor="let n of someBlankArray | 0 : 9"
 */

import {NgModule, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'range',
    pure: false
})
export class RangePipe implements PipeTransform {
    transform(value: any, min: number = 0, max: number = 4, step: number = 1){

        let newValue: any[] = [];

        for (let i = step > 0 ? min : max;
            step > 0 ? i <= max : i >= min;
            i += step) {
            newValue.push(i);
        }

        return newValue;
    }
}

@NgModule({
    declarations: [RangePipe],
    exports: [RangePipe]
})
export class FuiRangePipeModule { }