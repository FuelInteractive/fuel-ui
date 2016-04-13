import {Component, Input, AfterViewInit} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
    selector: "slider",
    templateUrl: 'components/Slider/Slider.html'
})

export class Slider implements AfterViewInit {
    @Input() elementId: string;
    @Input() rangeStart: number;
    @Input() rangeEnd: number;
    @Input() step: number;
    @Input() selectedValueStart: number;
    @Input() selectedValueEnd: number;
    @Input() minElementDisplayId: string;
    @Input() maxElementDisplayId: string;
    
    sliderElement: any;
    
    constructor(){
        console.log(this);
    }
        
    ngAfterViewInit(){
        var slider = document.getElementById(this.elementId);
       
        if(!(!isNaN(this.selectedValueStart) && isFinite(this.selectedValueStart) 
            && this.selectedValueStart.toString() != "")){
            this.selectedValueStart = this.rangeStart;
        }
        if(!(!isNaN(this.selectedValueEnd) && isFinite(this.selectedValueEnd)
            && this.selectedValueEnd.toString() != "")){
            this.selectedValueEnd = this.rangeEnd;
        }
        noUiSlider.create(slider, {
            start: [ parseInt(this.rangeStart.toString()), parseInt(this.rangeEnd.toString()) ], // Handle start position
            step: parseInt(this.step.toString()), // Slider increment
            margin: 10, // Handles must be more than '10' apart
            connect: true, // Display a colored bar between the handles
            direction: 'ltr', // left to right
            orientation: 'horizontal', // Orient the slider horizontally
            behaviour: 'none', // Move handle on tap, bar is draggable
            range: { // Slider can select min to max
                'min': parseInt(this.selectedValueStart.toString()),
                'max': parseInt(this.selectedValueEnd.toString())
            },
            pips: { // Show a scale with the slider
                mode: 'steps',
                density: 2
            }
        });
        this.sliderElement = document.getElementById(this.elementId);
        //his.sliderElement.noUiSlider.on('end', this.showSelectedValues());
        setTimeout(this.showSelectedValues(), 1);
    }
    
    public showSelectedValues = () => {
        var idsArray = [this.minElementDisplayId, this.maxElementDisplayId];
console.log('1');
        for(var i=0; i< idsArray.length; i++){
            if(document.getElementById(idsArray[i]) != null){
                var element = (<HTMLInputElement>document.getElementById(idsArray[i]));
                element.value=this.sliderElement.noUiSlider.get()[i];
            }
        }
    }
}

export var SLIDER_COMPONENT_PROVIDERS = [
    Slider
];
