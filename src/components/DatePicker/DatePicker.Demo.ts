import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/tableSortable/tableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "components/datePicker/datePicker.demo.html"
})
export class DatePickerDemo { 
    datePickerValue = new Date(2016,7,6);
    datePickerFieldValue = "8/6/2016";
    dateFilter(d: Date): boolean {
        if([2].indexOf(d.getDay()) > -1)
            return false;
        
        return true;
    }
    
    attributes:any[] = [
        new Attribute('minDate', 'string|Date', 'new Date(1900,0,1)', 'Minimum selectable date'),
        new Attribute('maxDate', 'string|Date', 'new Date(2200,0,1)', 'Maximum selectable date'),
        new Attribute('dateFilter', 'function(date): boolean', 'null', 'Filter to disable dates. A return of <i>false</i> will disable the day'),
        new Attribute('value', 'Date', 'null', 'Two-way binding of the selected DateRange')
    ];
    
    dateFieldAttributes:any[] = [
        new Attribute('date', 'Date', 'null', 'Two-way binding of the selected date'),
        new Attribute('value', 'string|Date', 'null', 'Two-way binding of the selected date'),
        new Attribute('ngModel', 'string', 'null', 'Two-way binding of the result input string'),
    ];
    
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}