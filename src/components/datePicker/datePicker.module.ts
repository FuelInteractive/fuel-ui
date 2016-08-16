import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FuiInfiniteScrollerModule} from "../infiniteScroller/infiniteScroller";

export {DatePickerCalendar}  from "./datePickerCalendar";
export {DatePicker} from "./datePicker";
export {DatePickerField, DatePickerFieldStyler} from "./datePickerField";
export {DateRangePicker, StartDateField, EndDateField} from "./dateRangePicker";

import {DatePickerCalendar}  from "./datePickerCalendar";
import {DatePicker} from "./datePicker";
import {DatePickerField, DatePickerFieldStyler} from "./datePickerField";
import {DateRangePicker, StartDateField, EndDateField} from "./dateRangePicker";

const datePickerDirectives = [
    DatePicker,
    DatePickerCalendar,
    DatePickerField,
    DatePickerFieldStyler,
    DateRangePicker,
    StartDateField,
    EndDateField
]

@NgModule({
    imports: [CommonModule, FormsModule, FuiInfiniteScrollerModule],
    declarations: datePickerDirectives,
    exports: datePickerDirectives
})
export class FuiDatePickerModule { }