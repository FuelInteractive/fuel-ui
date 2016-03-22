/*
 * Example use
 *		Basic Array of single type: *ngFor="#n of someBlankArray | 0 : 9"
 */

import {Pipe, PipeTransform} from "angular2/core";

@Pipe({
    name: 'range',
    pure: false
})
export class Range implements PipeTransform {
    transform(value:any, config:any = [0, 4, 1]){

        var newValue:any[] = [];

        var min = parseInt(config[0]);
        var max = parseInt(config[1]);
        var step = parseInt(config[2]);

        for (var i = min; i <= max; i += step)
            newValue.push(i);

        return newValue;
    }
}

export var RANGE_PROVIDERS = [
    Range
];