### TimePicker Selector
`timepicker` - `<timepicker></timepicker>`

### TimePicker Example
```javascript
date: Date = new Date();
minDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
maxDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59);
hourStep: number = 1;
minuteStep: number = 1;
readonly: boolean = false;
disabled: boolean = false;
showSeconds: boolean = true;
showSpinners: boolean = true;
showMeridian: boolean = true;
```

```html
<timepicker 
    [(value)]="date" 
    [min]="minDate" 
    [max]="maxDate" 
    [hourStep]="hourStep"
    [minuteStep]="minuteStep" 
    [disabled]="disabled" 
    [readonlyInput]="readonly" 
    [showSeconds]="showSeconds" 
    [showSpinners]="showSpinners" 
    [showMeridian]="showMeridian">
</timepicker>
```