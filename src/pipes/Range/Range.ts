/*
 * Example use
 *		Basic Array of single type: *ngFor="let n of someBlankArray | 0 : 9"
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'range',
    pure: false
})
export class RangePipe implements PipeTransform {
    transform(value:any, min: number = 0, max: number = 4, step: number = 1){
        
        var newValue:any[] = [];

        for (var i = min; i <= max; i += step)
            newValue.push(i);

        return newValue;
    }
}

export var RANGE_PROVIDERS = [
    RangePipe
];