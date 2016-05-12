import {Component, Directive, Input, Output, HostBinding, HostListener, OnInit, EventEmitter} from "@angular/core";
import {DatePicker} from "./DatePicker";

@Directive({
    selector: "[dateField], .date-field"
})
export class DatePickerField implements OnInit {
    private _date = new Date();
    
    @HostBinding("value")
    _value = "";
    
    @Input()
    set value(value: string) {
        this._value = value;
        this._date = DatePicker.handleDateInput(value);
        this.valueChange.next(value);
        this.dateChange.next(this._date);
    }
    get value(): string {return this._value;}
    
    @Output() valueChange = new EventEmitter<string>();
    
    @Input()
    set date(date: Date) {
        this._date = date;
        this._value = date.toLocaleDateString();
        this.dateChange.next(date);
        this.valueChange.next(this._value);
    }
    get date(): Date {return this._date;}
    @Output() dateChange = new EventEmitter<Date>();
    
    @HostListener("input", ["$event.target.value"])
    inputChange(value: any): void {
        this.value = value;
    }
    
    @HostListener("focus", ["$event"])
    focused(event: Event): void {
        this.select.next(event);
    }
    
    @Output() select = new EventEmitter<MouseEvent>();
    @HostListener("click", ["$event"])
    selected(event: MouseEvent): void {
        this.select.next(event);
    }
    
    ngOnInit(): void {
        this.date = DatePicker.handleDateInput(this.value);
    }
}

@Component({
    selector: ".date-picker-input-group",
    template: ` 
    <div class="input-group fuel-ui-datepicker-input-group">
        <ng-content></ng-content>
        <span class="input-group-addon" (click)="select($event)"> 
            <i class="fa fa-calendar"></i>
        </span>
    </div>`
})
export class DatePickerFieldStyler {
    selectEvent = new EventEmitter<Event>();
    
    select(event: Event): void {
        this.selectEvent.next(event);
    }
}