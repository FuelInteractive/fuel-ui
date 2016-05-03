import {Component, OnInit, OnChanges, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef} from "angular2/core";
import {Input, Output, EventEmitter, ElementRef, ViewChild, QueryList} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {DatePickerCalendar} from "./DatePickerCalendar";
import {INFINITE_SCROLLER_PROVIDERS, InfiniteScroller} from "../InfiniteScroller/InfiniteScroller";
import {MobileDetection} from "../../utilities/DetectionUtils";
import {DateRange} from "../../utilities/DateUtils";

@Component({
    selector: "date-picker",
    styleUrls: ["components/DatePicker/DatePicker.css"],
    templateUrl: "components/DatePicker/DatePicker.html",
    directives: [DatePickerCalendar, INFINITE_SCROLLER_PROVIDERS, CORE_DIRECTIVES, FORM_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePicker implements OnInit {
    @Input() label: string;
    
    _minDate: Date = new Date(1900,0,1);
	_maxDate: Date = new Date(2200,0,1);

    @Input()
    set minDate(value: Date|string) {
		this._minDate = this.handleDateInput(value);
	}
	get minDate(): Date|string { return this._minDate; };
	
    @Input()
    set maxDate(value: Date|string) {
		this._maxDate = this.handleDateInput(value);
	}
	get maxDate(): Date|string { return this._maxDate; }
    
    @Input() dateFilter: (d: Date) => boolean;
    
    @Output() valueChange = new EventEmitter();
	@Input()
	set value(value: any) {
		this._selectedDate = this.handleDateInput(value);
	}
 
    @ViewChild(InfiniteScroller)
    calendarScroller: InfiniteScroller;
 
	protected _selectedDate: Date;
	get selectedDate(): Date { return this._selectedDate; };
	set selectedDate(value: Date) {
		this._selectedDate = value;
		this._inputDate = value.toLocaleDateString();
		this.valueChange.next(this.selectedDate);
		this.hideCalendar();
	}

	private _inputDate: string = "";
	
	get inputDate(): string {return this._inputDate};
	set inputDate(value: string) {
		this._inputDate = value;
		this._selectedDate = new Date(value);
	}
    
    calendarDisplayed: boolean = false;
    calendarX: number = 1;
	calendarY: number = 1;
    calendarHeight: string = MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";
    
    calendarMonths: Date[] = [];
    
    _preGenMonths = 2;
 
    changeDetector: ChangeDetectorRef;
    
    constructor(changeDetector: ChangeDetectorRef) {
        this.changeDetector = changeDetector;
    }
    
    ngOnInit(): void {
        var currentDate = this.selectedDate != null ? this.selectedDate : new Date();
        
        this.calendarMonths = [
            new Date(currentDate.getFullYear(), currentDate.getMonth()-1),
            new Date(currentDate.getFullYear(), currentDate.getMonth())
        ]
        
        for(let i = 0; i < this._preGenMonths; i++) {
            let earliestDate = this.calendarMonths[0];
            let latestDate = this.calendarMonths[this.calendarMonths.length-1];
            if(this.canPrevMonth)
                this.calendarMonths.unshift(new Date(earliestDate.getFullYear(), earliestDate.getMonth()-1));
            if(this.canNextMonth)
                this.calendarMonths.push(new Date(latestDate.getFullYear(), latestDate.getMonth()+1));
        }
        
        setTimeout(() => {
            if(this.calendarScroller == null)
                return;
                
            let scrollToMonth = this.calendarMonths.findIndex((m: Date) => {
                return m.getFullYear() == currentDate.getFullYear()
                    && m.getMonth() == currentDate.getMonth()
            });
            
            this.calendarScroller.container.scrollTop = 
                this.calendarScroller.itemQuery.toArray()[scrollToMonth].element.offsetTop - 20;
            
            this.calendarScroller.scrollToIndex(scrollToMonth);
        }, 1);
    }
    
    handleDateInput(value: any): Date {
		if(value instanceof Date && !isNaN(value.valueOf()))
			return value;
		else
			return new Date(<string>value);
	}
    
    toggleCalendar(event: MouseEvent): void {
        if(!this.calendarDisplayed)
            this.showCalendar(event);
        else
            this.hideCalendar();
    }
    
    showCalendar(event: any): void {
		if(event != null) {
			var clickedRect = event.target ? event.target.parentElement.getBoundingClientRect() : event.srcElement.parentElement.getBoundingClientRect();
			this.calendarX = clickedRect.left;
			if(screen.height - clickedRect.bottom <= 500) {
				this.calendarY = (clickedRect.top);
			} else {
				this.calendarY = 0;
			}
		}			
		
		this.ngOnInit();
        
        this.calendarDisplayed = true;
        this.changeDetector.markForCheck();
	}
    
    hideCalendar(): void {
        this.calendarDisplayed = false;
        this.changeDetector.markForCheck();
	}
    
    get canPrevMonth(): boolean {
        var currentDate = this.calendarMonths[0];
		var prevDate = 
			new Date(currentDate.getFullYear(), currentDate.getMonth()-1);
		var compareDate = 
			new Date(this._minDate.getFullYear(), this._minDate.getMonth());
		return prevDate >= compareDate;
	}
    
    get canNextMonth(): boolean {
        var currentDate = this.calendarMonths[this.calendarMonths.length-1];
		var nextDate = 
			new Date(currentDate.getFullYear(), currentDate.getMonth()+1); 
		var compareDate = 
			new Date(this._maxDate.getFullYear(), this._maxDate.getMonth());
		return nextDate <= compareDate;
	}
    
    disablePrev(): boolean {
        return this.calendarScroller ? this.calendarScroller.isTop() : false;
    }
    
    disableNext(): boolean {
        return this.calendarScroller ? this.calendarScroller.isBottom() : false;
    }
    
    scrollPrevMonth(): void {
        if(this.calendarScroller.topIndex == 0)
            this.addPrevMonth();
        
        setTimeout(() => {
            this.calendarScroller.scrollToIndex(this.calendarScroller.topIndex - 1);
        }, 10);
    }
    
    scrollNextMonth(): void {
        setTimeout(() => {
            this.calendarScroller.scrollToIndex(this.calendarScroller.topIndex + 1);
        }, 10);
    }
    
    addNextMonth(): void {
        if(!this.canNextMonth)
            return;
        
        var lastMonth = this.calendarMonths[this.calendarMonths.length-1];
        var nextMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth()+1);
        this.calendarMonths.push(nextMonth);
        this.changeDetector.markForCheck();
    }
    
    addPrevMonth(): void {
        if(!this.canPrevMonth)
            return;
        
        var firstMonth = this.calendarMonths[0];
        var prevMonth = new Date(firstMonth.getFullYear(), firstMonth.getMonth()-1);
        this.calendarMonths.unshift(prevMonth);
        this.changeDetector.markForCheck();
    }
}

