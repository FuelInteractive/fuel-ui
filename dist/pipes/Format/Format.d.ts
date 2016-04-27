import { PipeTransform } from 'angular2/core';
import { DatePipe, DecimalPipe } from 'angular2/common';
export declare class FormatPipe implements PipeTransform {
    datePipe: DatePipe;
    decimalPipe: DecimalPipe;
    constructor();
    transform(input: string, args: any): any;
}
export declare var FORMAT_PROVIDERS: typeof FormatPipe[];
