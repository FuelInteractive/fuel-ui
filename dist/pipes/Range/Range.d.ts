import { PipeTransform } from "angular2/core";
export declare class RangePipe implements PipeTransform {
    transform(value: any, min?: number, max?: number, step?: number): any[];
}
export declare var RANGE_PROVIDERS: typeof RangePipe[];
