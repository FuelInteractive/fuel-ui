import {Component, AfterViewInit} from 'angular2/core';
import {SLIDER_COMPONENT_PROVIDERS} from './Slider';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Slider</h2>
            <p class="card-text"></p>
        </div>
    </div>
</div>
<div class="row" style="margin-left:9px;margin-top:45px;">
    <slider elementId="test" rangeStart=0 rangeEnd=400 step=10
        selectedValueStart='' selectedValueEnd='' 
        minElementDisplayId='slider-value-min' maxElementDisplayId='slider-value-max'
        >
    </slider>
</div>
<div class="row" style="margin-top:50px;">
    <div class="col-sm-2">
        <label>Min Value</label>
        <input type="text" class="form-control" id="slider-value-min" value="" />
    </div>
    <div class="col-sm-2">
        <label>Max Value</label>
        <input type="text" class="form-control" id="slider-value-max" value="" />
    </div>
</div>
`,
    directives: [SLIDER_COMPONENT_PROVIDERS, CodeHighlighter]
})

export class SliderDemo{
    sliderDomElement: any; 
    ngAfterViewInit(){
        this.sliderDomElement = document.getElementById("test");
        /*var sliderValues = this.sliderDomElement.noUiSlider.get();
        
        var minTextBox = (<HTMLInputElement>document.getElementById("slider-value-min"));
        var maxTextBox = (<HTMLInputElement>document.getElementById("slider-value-max"));
        
        minTextBox.value = sliderValues[0];
        maxTextBox.value = sliderValues[1]; */
        //this.sliderDomElement.noUiSlider.on('end', this.showSelectedValues());
    } 
    
    public showSelectedValues = () => {
        var idsArray = ["slider-value-min", "slider-value-max"];

        for(var i=0; i< idsArray.length; i++){
            if(document.getElementById(idsArray[i]) != null){
                var element = (<HTMLInputElement>document.getElementById(idsArray[i]));
                element.value=this.sliderDomElement.noUiSlider.get()[i];
            }
        }
    }
}

export var SLIDER_DEMO_PROVIDERS = [
    SliderDemo
];