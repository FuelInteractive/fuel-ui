/*
 * Example use
 *		Basic Array of single type: *ngFor="#todo of todoService.todos | orderBy : '-'"
 *		Multidimensional Array Sort on single column: *ngFor="#todo of todoService.todos | orderBy : ['-status']"
 *		Multidimensional Array Sort on multiple columns: *ngFor="#todo of todoService.todos | orderBy : ['status', '-title']"
 */

import {CONST} from 'angular2/src/facade/lang';
import {Injectable, PipeTransform, Pipe} from 'angular2/core';

@CONST()
@Pipe({name: 'orderBy', pure: false})
@Injectable()
export class OrderBy implements PipeTransform {

    static _orderByComparator(origA:any, origB:any, property:string, desc:boolean):number{
 
        if((isNaN(parseFloat(origA[property])) || !isFinite(origA[property]))
            || (isNaN(parseFloat(origB[property])) || !isFinite(origB[property]))){
            //Isn't a number so lowercase the string to properly compare
            if(desc){
                if(origA[property].toLowerCase() > origB[property].toLowerCase()) return -1;
                if(origA[property].toLowerCase() < origB[property].toLowerCase()) return 1;
            }
            else{
                if(origA[property].toLowerCase() < origB[property].toLowerCase()) return -1;
                if(origA[property].toLowerCase() > origB[property].toLowerCase()) return 1;
            }
        }
        else{
            //Parse strings as numbers to compare properly
            if(desc){
                if(parseFloat(origA[property]) > parseFloat(origB[property])) return -1;
                if(parseFloat(origA[property]) < parseFloat(origB[property])) return 1;
            }
            else{
                if(parseFloat(origA[property]) < parseFloat(origB[property])) return -1;
                if(parseFloat(origA[property]) > parseFloat(origB[property])) return 1;
            }
        }

        return 0; //equal each other
    }

    transform(value:any, [config = '+']): any{
        
        if(!Array.isArray(value)) return value;

        if(!Array.isArray(config) || (Array.isArray(config) && config.length == 1)){
            var propertyToCheck:string = !Array.isArray(config) ? config : config[0];

            //Basic array
            if(!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+'){
                return propertyToCheck.substr(0,1) == '-' ? value.sort().reverse() : value.sort();
            }
            else {
                var desc = propertyToCheck.substr(0, 1) == '-';
                var property:string = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return value.sort(function(origA:any,origB:any){
                    return OrderBy._orderByComparator(origA, origB, property, desc);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return value.sort(function(origA:any,origB:any){
                for(var i:number = 0; i < config.length; i++){
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];

                    var comparison = OrderBy._orderByComparator(origA, origB, property, desc);

                    //Don't return 0 yet in case of needing to sort by next property
                    if(comparison != 0) return comparison;
                }

                return 0; //equal each other
            });
        }
    }
}

export var ORDERBY_PROVIDERS = [
    OrderBy
];