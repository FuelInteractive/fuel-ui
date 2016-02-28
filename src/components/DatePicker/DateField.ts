import {Component, View, ElementRef, Input, Output, EventEmitter} from "angular2/core";

@Component({
    selector: "date-field"
})
@View({
    template: `
        <div class="input-group" (click)="triggerCalendar($event)">
            <input type="text" class="form-control"
                [(ngModel)]="selectedDate" 
                #dateField
                />
            <span class="input-group-addon" [class.input-group-addon-focus]="dateField.focus">
                <i class="fa fa-calendar"></i>
            </span>
        </div>`,
    styles: [`
        .input-group-addon {
            background-color: #fff;
            border-left: none;
        }`]
})
export class DateField {
    element: HTMLElement;
    
    @Input()
    value: string;
    @Output()
    valueChange = new EventEmitter();
    
    showCalendar = new EventEmitter();
    
    get selectedDate(): string {
        return this.value;
    }
    set selectedDate(value: string) {
        this.valueChange.next(this.value);
    }
    
    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }
    
    triggerCalendar(event: MouseEvent): void {
        this.showCalendar.next(event);
    }
}