import {NgModule, Component, Input, AfterViewInit, ElementRef, Output, EventEmitter, OnChanges, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as noUiSlider from "nouislider";

@Component({
    selector: "slider",
    templateUrl: 'slider.html',
    styleUrls: ["../../../node_modules/nouislider/distribute/nouislider.min.css"],
    encapsulation: ViewEncapsulation.None
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
    @Input() debounceTime: number = 150;
    @Input() handleHeight: string = "";
    @Output() valueChange = new EventEmitter<any>();
    @Output() secondValueChange = new EventEmitter<any>();
    private _sliderElement: any;
    private _slider: any;
    
    timeout: any = null;

    constructor(private _element: ElementRef) {}
    
    update(val: any[]): any{
        this.value = parseInt(val[0]);
        this.secondValue = val.length > 1 ? parseInt(val[1]) : null;
        this.valueChange.next(this.value);
        this.secondValueChange.next(this.secondValue);
        
        this.timeout = null;
    };
    
    ngAfterViewInit(){
        this._sliderElement = this._element.nativeElement.children[0];

        if(this.orientation == 'vertical')
            this._sliderElement.style.height = this.height.length > 0 
                ? this.height
                : "200px";
            
        if(this.orientation == 'horizontal'){
            this._sliderElement.style.width = this.width.length > 0 
                ? this.width
                : null; //full width

            if(this.height.length > 0)
                this._sliderElement.style.height = this.height;
        }

        setTimeout(() => {
            if(this.handleHeight.length > 0){
                var handles = this._sliderElement.childNodes[0].getElementsByClassName("noUi-handle");
                for(var i=0; i<handles.length; i++){
                    handles[i].style.height = this.handleHeight;
                }
            }
        }, 500);

        this._slider = noUiSlider.create(this._sliderElement, {
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
       
        if(!(<HTMLInputElement>this._element.nativeElement).disabled){
            var noUI:HTMLCollection = this._element.nativeElement.getElementsByClassName('noUi-connect');
            
            //convert HTMLCollection to array to loop
            [].slice.call(noUI).forEach((el:HTMLElement) => {
                el.style.background = this.background;
            });
        }
        
        this._sliderElement.noUiSlider.on('slide', (val: number[]) => {
            if(this.timeout)
                clearTimeout(this.timeout);
                
            this.timeout = setTimeout(() => {
                this.update(val);
            }, this.debounceTime);
        });
        
        this._sliderElement.noUiSlider.on('end', (val: number[]) => {
            if(this.timeout)
                clearTimeout(this.timeout);
                
            this.update(val);
        });
    }
    
    ngOnChanges(changes:any):void{
        if(this._sliderElement && typeof changes.value !== 'undefined')
            this._sliderElement.noUiSlider.set([changes.value.currentValue, this.secondValue]);
            
        if(this._sliderElement && typeof changes.secondValue !== 'undefined')
            this._sliderElement.noUiSlider.set([this.value, changes.secondValue.currentValue]);
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [Slider],
    exports: [Slider]
})
export class FuiSliderModule { }