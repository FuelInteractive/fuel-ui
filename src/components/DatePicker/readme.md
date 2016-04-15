### DatePicker Selector
`DatePicker` - `<date-picker></date-picker>`

### DatePicker Settings
  * `label` _- string_ -
    String to be used in field placeholder text
  * `minDate` _- string / Date_ -
    Minimum allowable calendar date
  * `maxDate` _- string / Date_ -
    Maximum allowable calendar date
  * `[dateFilter]` _- function(date): boolean_ -
    Optional method for determining calendar date eligability
  * `[(value)]` _- Date_ -
    Date selected from datePicker


### DatePicker Example
```html
<date-picker
    label="Pick a date"
    minDate="11/1/2015"
    maxDate="11/12/2016" 
    [dateFilter]="dateFilter"
    (value)="datePickerValue">
</date-picker>
```



### DateRangePicker Selector
`DateRangePicker` - `<date-range-picker></date-range-picker>`

### DateRangePicker Settings
  * `startLabel` _- string_ -
    String to be used in start date field placeholder text
  * `endLabel` _- string_ -
    String to be used in end date field placeholder text
  * `minDate` _- string / Date_ -
    Minimum allowable calendar date
  * `maxDate` _- string / Date_ -
    Maximum allowable calendar date
  * `[dateFilter]` _- function(date): boolean_ -
    Optional method for determining calendar date eligability
  * `[(value)]` _- DateRange_ -
    Object containing start and end Date properties
  * `[(startDate)]` _- Date_ -
    Selected start Date
  * `[(endDate)]` _- Date_ -
    Selected end Date


### DateRangePicker Example
```html
<date-range-picker
    minDate="11/1/2015"
    maxDate="11/12/2016" 
    [dateFilter]="dateFilter"
    startLabel="Arrival"
    endLabel="Departure"
    [(value)]="dateRangePickerValue">
</date-range-picker>
```
