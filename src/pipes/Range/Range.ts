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

        var min = !isNaN(parseInt(config[0])) ? parseInt(config[0]) : 0;
        var max = !isNaN(parseInt(config[1])) ? parseInt(config[1]) : 4;
        var step = !isNaN(parseInt(config[2])) ? parseInt(config[2]) : 1;

        for (var i = min; i <= max; i += step)
            newValue.push(i);

        return newValue;
    }
}

export var RANGE_PROVIDERS = [
    Range
];