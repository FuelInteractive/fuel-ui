/*
 * Example use
 *		Basic Array of single type: *ng-for="#n of someBlankArray | 0 : 9"
 */

import {Pipe} from "angular2/angular2";

@Pipe({
    name: 'range',
    pure: false
})
export class Range{
    transform(value:any, config:any = [0, 4]){

        var newValue:any[] = [];

        var min = parseInt(config[0]);
        var max = parseInt(config[1]);

        for (var i = min; i <= max; i++)
            newValue.push(i);

        return newValue;
    }
}

export var RANGE_PROVIDERS = [
    Range
];