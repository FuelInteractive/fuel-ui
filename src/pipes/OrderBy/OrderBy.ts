/*
 * Example use
 *		Basic Array of single type: *ngFor="#todo of todoService.todos | orderBy : 'desc'"
 *		Multidimensional Array Sort on single column: *ngFor="#todo of todoService.todos | orderBy : 'asc' : 'status'"
 *		Multidimensional Array Sort on multiple columns: *ngFor="#todo of todoService.todos | orderBy : 'asc' : ['status', 'title']"
 */

import {Pipe} from "angular2/core";

@Pipe({
    name: 'orderBy',
    pure: false
})
export class OrderBy{
    transform(value:any, config:any = ['asc', null]){

        if(!Array.isArray(value)) return value;

        var newValue:any[] = [];

        var sort = config[0];
        var property = config[1];

        if(property == null || property == ''){
            //Basic array
            newValue = sort == 'asc' ? value.sort() : value.sort().reverse();
        }
        else if(!Array.isArray(property)){
            //Single property to sort by, only look for that
            newValue = value.sort(function(a:any,b:any){
                if (a[property] === b[property]) {
                    return 0;
                }
                else {
                    //Lowercase strings and parse numbers
                    if((isNaN(parseFloat(a[property])) || isFinite(a[property]))
                        || (isNaN(parseFloat(b[property])) || isFinite(b[property]))){
                        a[property] = a[property].toLowerCase();
                        b[property] = b[property].toLowerCase();
                    }
                    else{
                        a[property] = parseFloat(a[property]);
                        b[property] = parseFloat(b[property]);
                    }

                    if(sort == 'asc'){
                        return (a[property] < b[property]) ? -1 : 1;
                    }
                    else{
                        return (a[property] > b[property]) ? -1 : 1;
                    }
                }
            });
        }
        else{
            //Loop over property array in order and sort
            newValue = value.sort(function(a:any,b:any){
                for(var i:number = 0; i < property.length; i++){
                    //Lowercase strings and parse numbers
                    if((isNaN(parseFloat(a[property[i]])) || isFinite(a[property[i]]))
                        || (isNaN(parseFloat(b[property[i]])) || isFinite(b[property[i]]))){
                        a[property[i]] = a[property[i]].toLowerCase();
                        b[property[i]] = b[property[i]].toLowerCase();
                    }
                    else{
                        a[property[i]] = parseFloat(a[property[i]]);
                        b[property[i]] = parseFloat(b[property[i]]);
                    }

                    if(sort == 'asc'){
                        if(a[property[i]] < b[property[i]]) return -1;
                        if(a[property[i]] > b[property[i]]) return 1;
                    }
                    else{
                        if(a[property[i]] > b[property[i]]) return -1;
                        if(a[property[i]] < b[property[i]]) return 1;
                    }
                }

                return 0; //equal each other
            });
        }
        return newValue;
    }
}

export var ORDERBY_PROVIDERS = [
    OrderBy
];