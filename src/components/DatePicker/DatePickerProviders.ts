export {DatePickerCalendar}  from "./DatePickerCalendar";
export {DatePicker} from "./DatePicker";
export {DateRangePicker} from "./DateRangePicker";

import {DatePickerCalendar}  from "./DatePickerCalendar";
import {DatePicker} from "./DatePicker";
import {DateRangePicker, StartDateField, EndDateField} from "./DateRangePicker";

export var DATE_PICKER_PROVIDERS = [
	DatePickerCalendar,
	DatePicker,
    DateRangePicker,
	StartDateField,
	EndDateField
];

