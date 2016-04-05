import { PipeTransform } from 'angular2/core';
export declare class OrderByPipe implements PipeTransform {
    value: string[];
    static _orderByComparator(a: any, b: any): number;
    transform(input: any, [config]: [string]): any;
}
export declare var ORDERBY_PROVIDERS: typeof OrderByPipe[];
