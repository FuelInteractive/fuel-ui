/// <reference path="../../../typings/nouislider/nouislider.d.ts" />

import {Component, Input, AfterViewInit, ElementRef, Output, EventEmitter, OnChanges} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import "./NoUiSlider.js";
import {noUiSlider} from "nouislider";

@Component({
    selector: "slider",
    templateUrl: 'components/Slider/Slider.html'
})

export class Slider implements AfterViewInit, OnChanges {
    @Input() background: string = "#E24932";
    @Input() height: string = "";
    @Input() width: string = "";
    @Input() orientation: string = "horizontal";
    @Input() direction: string = "ltr";
    @Input() behavior: string = "tap";
    @Input() pips: number = 5;
    @Input() pipDensity: number = 5;
    @Input() step: number = 1;
    @Input() decimals: number = 0;
    @Input() minValue: number = 0;
    @Input() maxValue: number = 100;
    @Input() margin: number = 10;
    @Input() value: number = 0;
    @Input() secondValue: number = null;
    @Output() valueChange = new EventEmitter<any>();
    @Output() secondValueChange = new EventEmitter<any>();
    sliderElement: any;
    slider: any;
    
    constructor(public element: ElementRef) {}
    
    ngAfterViewInit(){
        this.sliderElement = this.element.nativeElement.children[0];
        
        if(this.orientation == 'vertical')
            this.sliderElement.style.height = this.height.length > 0 
                ? this.height
                : "200px";
            
        if(this.orientation == 'horizontal')
            this.sliderElement.style.width = this.width.length > 0 
                ? this.width
                : null; //full width
        
        this.slider = noUiSlider.create(this.sliderElement, {
            start: this.secondValue != null ? [this.value, this.secondValue] : this.value, // Handle start position
            step: parseInt(this.step.toString()), // Slider increment
            margin: this.margin, // Handles must be more than '10' apart
            connect: this.secondValue != null ? true : 'lower', // Display a colored bar between the handles
            direction: this.direction, // 'ltr': left to right, 'rtl': right to left
            orientation: this.orientation, // horizontal or vertical
            behaviour: this.behavior, // "tap" or "fixed"
            range: { // Slider can select min to max
                'min': parseInt(this.minValue.toString()),
                'max': parseInt(this.maxValue.toString())
            },
            pips: { // Show a scale with the slider
                mode: 'count',
                values: this.pips,
                density: this.pipDensity
            },
            format: {
                to: ( value:string ) => {
                    return parseFloat(value).toFixed(this.decimals)
                },
                from: ( value:string ) => {
                    return parseFloat(value).toFixed(this.decimals);
                }
            }
        });
        
        if(!(<HTMLInputElement>this.element.nativeElement).disabled){
            var noUI:HTMLCollection = this.element.nativeElement.getElementsByClassName('noUi-connect');
            
            //convert HTMLCollection to array to loop
            [].slice.call(noUI).forEach((el:HTMLElement) => {
                el.style.background = this.background;
            });
        }
        
        this.sliderElement.noUiSlider.on('slide', (val: number[]) => {
            this.value = val[0];
            this.secondValue = val.length > 1 ? val[1] : null;
            this.valueChange.next(val[0]);
            this.secondValueChange.next(this.secondValue);
        });
    }
    
    ngOnChanges(changes:any):void{
        if(this.sliderElement && typeof changes.value !== 'undefined')
            this.sliderElement.noUiSlider.set([changes.value.currentValue, this.secondValue]);
            
        if(this.sliderElement && typeof changes.secondValue !== 'undefined')
            this.sliderElement.noUiSlider.set([this.value, changes.secondValue.currentValue]);
    }
}

export var SLIDER_COMPONENT_PROVIDERS = [
    Slider
];
