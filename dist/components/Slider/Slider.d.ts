/// <reference path="../../../typings/nouislider/nouislider.d.ts" />
import { AfterViewInit, ElementRef, EventEmitter, OnChanges } from "angular2/core";
import "./NoUiSlider";
export declare class Slider implements AfterViewInit, OnChanges {
    element: ElementRef;
    background: string;
    height: string;
    width: string;
    orientation: string;
    direction: string;
    behavior: string;
    pips: number;
    pipDensity: number;
    step: number;
    decimals: number;
    minValue: number;
    maxValue: number;
    margin: number;
    value: number;
    secondValue: number;
    valueChange: EventEmitter<any>;
    secondValueChange: EventEmitter<any>;
    sliderElement: any;
    slider: any;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: any): void;
}
export declare var SLIDER_COMPONENT_PROVIDERS: typeof Slider[];
