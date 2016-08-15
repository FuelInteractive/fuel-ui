import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

export {DatePickerCalendar}  from "./datePickerCalendar";
export {DatePicker} from "./datePicker";
export {DatePickerField, DatePickerFieldStyler} from "./datePickerField";
export {DateRangePicker, StartDateField, EndDateField} from "./dateRangePicker";

import {DatePickerCalendar}  from "./datePickerCalendar";
import {DatePicker} from "./datePicker";
import {DatePickerField, DatePickerFieldStyler} from "./datePickerField";
import {DateRangePicker, StartDateField, EndDateField} from "./dateRangePicker";

@NgModule({
    imports: [CommonModule],
    exports: [
        DatePicker,
        DatePickerCalendar,
        DatePickerField,
        DatePickerFieldStyler,
        DateRangePicker,
        StartDateField,
        EndDateField
    ]
})
export class FuiDatePickerModule { }