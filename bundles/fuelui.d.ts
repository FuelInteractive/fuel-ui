import { ElementRef, EventEmitter } from 'angular2/angular2';
export declare class Alert {
    private _el;
    displayed: boolean;
    closeButton: boolean;
    type: string;
    alertDisplayedChange: EventEmitter;
    constructor(el: ElementRef);
    getElement(): HTMLElement;
    close(): void;
}
export declare var ALERT_PROVIDERS: typeof Alert[];

import { QueryList } from 'angular2/angular2';
export declare class CarouselItem {
    isActive: boolean;
    left: boolean;
    right: boolean;
    next: boolean;
    prev: boolean;
    exiting: boolean;
    constructor();
    resetStatus(): void;
    resetAnimation(): void;
    animationStart(): void;
    animationEnd(): void;
    moveLeft(): void;
    moveRight(): void;
    checkIfAnimating(): boolean;
}
export declare class Carousel {
    images: CarouselItem[];
    imageQuery: QueryList<CarouselItem>;
    constructor();
    afterContentInit(): void;
    registerImages(): void;
    setAllInactive(): void;
    switchTo(image: CarouselItem): void;
    nextImage(): void;
    prevImage(): void;
    checkIfAnimating(): boolean;
    getActiveIndex(): number;
    getActiveImage(): CarouselItem;
}
export declare var CAROUSEL_PROVIDERS: (typeof Carousel | typeof CarouselItem)[];

import { EventEmitter, OnInit } from 'angular2/angular2';
export declare class DatePickerCalendar implements OnInit {
    weeks: string[][];
    currentMonth: Date;
    selectedDate: Date;
    selectedDateChange: EventEmitter;
    minDate: Date;
    maxDate: Date;
    constructor();
    onInit(): void;
    checkSelectable(date: string): boolean;
    checkSelectedDate(date: string): boolean;
    selectDate(date: string): void;
    buildWeeks(date: Date): void;
}

import { EventEmitter, ElementRef } from 'angular2/angular2';
export declare class Animation {
    onAnimationStart: EventEmitter;
    onAnimationEnd: EventEmitter;
    animationClasses: string;
    play: boolean;
    id: string;
    group: string;
    _animationQueue: string[];
    _callbacks: (() => void)[];
    element: Element;
    constructor(element: ElementRef);
    onChange(): void;
    onInit(): void;
    addAnimation(animationClasses: string): Animation;
    setup(): Animation;
    startAnimation(callback?: () => void): Animation;
    cleanAnimation(): Animation;
    animationStarted(event: Event): void;
    animationEnded(event: Event): void;
}

import { ElementRef, QueryList } from 'angular2/angular2';
import { Animation } from '../../Directives/Animation/Animation';
export declare class DatePickerBase {
    _minDate: Date;
    _maxDate: Date;
    minDate: Date | string;
    maxDate: Date | string;
    months: number;
    calendarMonths: Date[];
    calendarDisplayed: boolean;
    calendarX: number;
    calendarY: number;
    direction: string;
    isAnimating: boolean;
    currentDate: Date;
    modal: HTMLElement;
    calendarQuery: QueryList<Animation>;
    constructor(modal: ElementRef);
    onInit(): void;
    afterViewInit(): void;
    handleDateInput(value: string | Date): Date;
    showCalendar(event: MouseEvent): void;
    hideCalendar(): void;
    canPrevMonth(): boolean;
    prevMonth(): void;
    canNextMonth(): boolean;
    nextMonth(): void;
    updateCalendars(calendars: QueryList<Animation>): void;
}

import { EventEmitter, ElementRef, QueryList } from 'angular2/angular2';
import { DatePickerBase } from './DatePickerBase';
import { Animation } from '../../Directives/Animation/Animation';
export declare class DatePicker extends DatePickerBase {
    valueChange: EventEmitter;
    value: string | Date;
    private _selectedDate;
    selectedDate: Date;
    private _inputDate;
    inputDate: string;
    calendarQuery: QueryList<Animation>;
    constructor(modal: ElementRef);
    onInit(): void;
    onChanges(changes: any): void;
}

import { EventEmitter } from 'angular2/angular2';
export declare class AnimationListener {
    animationStart: EventEmitter;
    animationEnd: EventEmitter;
    constructor();
    animationStarted($event: Event): void;
    animationEnded($event: Event): void;
}
export declare var ANIMATION_LISTENER_PROVIDERS: typeof AnimationListener[];

export declare class Range {
    transform(value: any, config?: any): any[];
}
export declare var RANGE_PROVIDERS: typeof Range[];

import { ElementRef } from 'angular2/angular2';
export declare class Modal {
    private _el;
    displayed: boolean;
    closeOnUnfocus: boolean;
    closeButton: boolean;
    modalTitle: string;
    constructor(el: ElementRef);
    clickElement(e: any): void;
    getElement(): HTMLElement;
    showModal(isDisplayed: boolean): boolean;
}
export declare var MODAL_PROVIDERS: typeof Modal[];

import { ElementRef, EventEmitter, OnChanges } from 'angular2/angular2';
export declare class Pagination implements OnChanges {
    private _el;
    currentPage: number;
    pagesAtOnce: number;
    totalPages: number;
    currentPageChange: EventEmitter;
    pagesBlank: Array<number>;
    startingIndex: number;
    endingIndex: number;
    constructor(el: ElementRef);
    onChanges(changes: any): void;
    getElement(): HTMLElement;
    setPage(newPage: number): void;
}
export declare var PAGINATION_PROVIDERS: typeof Pagination[];

import { Alert } from "./Alert/Alert";
import { Carousel, CarouselItem } from "./Carousel/Carousel";
import { DatePicker } from "./DatePicker/DatePicker";
import { Modal } from "./Modal/Modal";
import { Pagination } from "./Pagination/Pagination";
export declare var FUELUI_COMPONENT_PROVIDERS: (typeof Alert[] | (typeof Carousel | typeof CarouselItem)[] | typeof DatePicker | typeof Modal[] | typeof Pagination[])[];
export * from "./Alert/Alert";
export * from "./Carousel/Carousel";
export * from "./DatePicker/DatePicker";
export * from "./Modal/Modal";
export * from "./Pagination/Pagination";

import { ElementRef } from 'angular2/angular2';
export declare class Tooltip {
    text: string;
    private _el;
    constructor(el: ElementRef);
    getElement(): HTMLElement;
    show(): void;
    hide(): void;
}
export declare var TOOLTIP_PROVIDERS: typeof Tooltip[];

import { AnimationListener } from "./Animation/AnimationListener";
import { Animation } from './Animation/Animation';
import { Tooltip } from "./Tooltip/Tooltip";
export declare var FUELUI_DIRECTIVE_PROVIDERS: (typeof Tooltip[] | typeof Animation | typeof AnimationListener)[];
export * from "./Animation/AnimationListener";
export * from './Animation/Animation';
export * from "./Tooltip/Tooltip";

export declare class OrderBy {
    transform(value: any, config?: any): any;
}
export declare var ORDERBY_PROVIDERS: typeof OrderBy[];

import { OrderBy } from "./OrderBy/OrderBy";
export declare var FUELUI_PIPE_PROVIDERS: typeof OrderBy[][];
export * from "./OrderBy/OrderBy";
export * from "./Range/Range";

export declare class DemoComponent {
    modalTitle: string;
    closeText: string;
    closeButton: boolean;
    closeOnUnfocus: boolean;
    showAlert: boolean;
    alertType: string;
    alertBody: string;
    progress: number;
    totalPages: number;
    pagesAtOnce: number;
    currentPage: number;
    selectedDate: Date;
    minDate: Date;
    maxDate: Date;
    maxGuests: number;
    maxChildren: number;
    maxNumRooms: number;
    numGuests: number;
    numChildren: number;
    numRooms: number;
    checkInDate: Date;
    checkOutDate: Date;
    pageChange(page: number): void;
    saveFunc(modal: any, error: boolean): void;
    logStart($event: any): void;
    logEnd($event: any): void;
}


export declare class DateRange {
    start: Date;
    end: Date;
    constructor(start: Date, end: Date);
    containsDate(date: Date): boolean;
    numberOfNights(): number;
    dateArray(): Date[];
    weekArray(): Date[][];
}

export * from './DateUtils';

export * from "./components/components";
export * from "./directives/directives";
export * from "./pipes/pipes";
export * from './utilities/utilities';

import { ElementRef, EventEmitter } from 'angular2/angular2';
import { QueryList } from 'angular2/angular2';
import { DatePickerCalendar } from './DatePickerCalendar';
export declare class DatePickerOld {
    valueChange: EventEmitter;
    value: Date | string;
    private _selectedDate;
    selectedDate: Date;
    private _inputDate;
    inputDate: string;
    _minDate: Date;
    _maxDate: Date;
    minDate: Date | string;
    maxDate: Date | string;
    months: number;
    monthList: Date[];
    calendarQuery: QueryList<DatePickerCalendar>;
    calendars: DatePickerCalendar[];
    currentDate: Date;
    calendarDisplayed: boolean;
    modal: HTMLElement;
    constructor(modal: ElementRef);
    onInit(): void;
    afterViewInit(): void;
    onChanges(changes: any): void;
    showCalendar(): void;
    hideCalendar(): void;
    canPrevMonth(): boolean;
    prevMonth(): void;
    canNextMonth(): boolean;
    nextMonth(): void;
}

export { DatePickerCalendar } from './DatePickerCalendar';
export { DatePicker } from './DatePicker';
import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePicker } from './DatePicker';
export declare var DATE_PICKER_PROVIDERS: (typeof DatePickerCalendar | typeof DatePicker)[];

import { EventEmitter } from 'angular2/angular2';
export declare class DateRangePicker {
    startDateChange: EventEmitter;
}
