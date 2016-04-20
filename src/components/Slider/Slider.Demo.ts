import {Component, AfterViewInit} from 'angular2/core';
import {SLIDER_COMPONENT_PROVIDERS} from './Slider';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Slider</h2>
            <p class="card-text">This is the NoUiSlider (from <a href="http://refreshless.com/nouislider/" target="_blank">Refreshless.com</a>), wrapped in an Angular2 component</p>
        </div>
    </div>
</div>
<div class="row" style="margin-left:9px;margin-top:45px;">
    <div class="col-md-6">
        <div class="row">
            <div class="col-md-6">
                <slider background="#E24932" step="5" pips="6" pipDensity="5"
                    [minValue]="minValue" [maxValue]="maxValue" [(value)]="singleSliderValue">
                </slider>
            </div>
            <div class="col-md-6">
                <slider background="#E24932" step="5" pips="6" pipDensity="5"
                    [minValue]="minValue" [maxValue]="maxValue" [(value)]="singleSliderValue"
                    orientation="vertical" height="200px">
                </slider>
            </div>
        </div>
        <div class="row" style="margin-top:50px;">
            <form>
                <div class="form-group row">
                    <label for="singleSliderValue" class="col-sm-4 form-control-label">Slider Value</label>
                    <div class="col-sm-4">
                        <input class="form-control" step="5" [(ngModel)]="singleSliderValue" [min]="minValue" [max]="maxValue" type="number" name="singleSliderValue">
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="col-md-6">
        <div class="row">
            <div class="col-md-2">
                <slider background="#E24932" step="5" pips="6" pipDensity="5"
                    [minValue]="minValue" [maxValue]="maxValue" [(value)]="doubleSliderValue" [(secondValue)]="secondDoubleSliderValue"
                    orientation="vertical" height="200px">
                </slider>
            </div>
            <div class="col-md-6">
                <slider background="#E24932" step="5" pips="6" pipDensity="5"
                    [minValue]="minValue" [maxValue]="maxValue" [(value)]="doubleSliderValue" [(secondValue)]="secondDoubleSliderValue">
                </slider>
            </div>
        </div>
        <div class="row" style="margin-top:50px;">
            <form>
                <div class="form-group row">
                    <label for="doubleSliderValue" class="col-sm-4 form-control-label">Slider Value</label>
                    <div class="col-sm-4">
                        <input class="form-control" step="5" [(ngModel)]="doubleSliderValue" [min]="minValue" [max]="maxValue" type="number" name="doubleSliderValue">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="secondDoubleSliderValue" class="col-sm-4 form-control-label">Second Slider Value</label>
                    <div class="col-sm-4">
                        <input class="form-control" step="5" [(ngModel)]="secondDoubleSliderValue" [min]="minValue" [max]="maxValue" type="number" name="secondDoubleSliderValue">
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {Slider} from 'fuel-ui/fuel-ui';
</code>
</pre>
<h3>Getting Started</h3>
<p>Slider is a custom element to programmatically create range sliders</p>

<h3>Usage</h3>
<pre>
<code class="language-markup" code-highlight>
&lt;!--horizontal--&gt;
&lt;slider background=&quot;#E24932&quot; step=&quot;10&quot; pips=&quot;6&quot; pipDensity=&quot;5&quot;
    [minValue]=&quot;minValue&quot; [maxValue]=&quot;maxValue&quot; [(value)]=&quot;sliderValue&quot;&gt;
&lt;/slider&gt;

&lt;!--vertical--&gt;
&lt;slider background=&quot;#E24932&quot; step=&quot;10&quot; pips=&quot;6&quot; pipDensity=&quot;5&quot;
    [minValue]=&quot;minValue&quot; [maxValue]=&quot;maxValue&quot; [(value)]=&quot;sliderValue&quot;
    orientation=&quot;vertical&quot; height=&quot;200px&quot;&gt;
&lt;/slider&gt;

&lt;!--horizontal with 2 values--&gt;
&lt;slider background=&quot;#E24932&quot; step=&quot;10&quot; pips=&quot;6&quot; pipDensity=&quot;5&quot;
    [minValue]=&quot;minValue&quot; [maxValue]=&quot;maxValue&quot; [(value)]=&quot;sliderValue&quot; [(secondValue)]=&quot;secondSliderValue&quot;&gt;
&lt;/slider&gt;

&lt;!--vertical with 2 values--&gt;
&lt;slider background=&quot;#E24932&quot; step=&quot;10&quot; pips=&quot;6&quot; pipDensity=&quot;5&quot;
    [minValue]=&quot;minValue&quot; [maxValue]=&quot;maxValue&quot; [(value)]=&quot;sliderValue&quot; [(secondValue)]=&quot;secondSliderValue&quot;
    orientation=&quot;vertical&quot; height=&quot;200px&quot;&gt;
&lt;/slider&gt;
</code>
</pre>
<pre>
<code class="language-javascript" code-highlight>
export class SliderExample{
    sliderValue: number = 20;
    secondSliderValue: number = 80;
    minValue: number = 0;
    maxValue: number = 100;
}
</code>
</pre>
    <h3>Attributes</h3>
    <table class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>background</td>
                <td>string</td>
                <td>"#E24932"</td>
                <td>Background color of the area of the slider that counts toward the value</td>
            </tr>
            <tr>
                <td>behavior</td>
                <td>string</td>
                <td>"tap"</td>
                <td>The way a user can interact with the slider. Can use "tap" or "fixed". "tap" allows for tapping and dragging. "fixed" disables the slider without greying it out.</td>
            </tr>
            <tr>
                <td>decimals</td>
                <td>number</td>
                <td>0</td>
                <td>Number of decimals on the value(s) and pips</td>
            </tr>
            <tr>
                <td>direction</td>
                <td>string</td>
                <td>"ltr"</td>
                <td>The direction of the values on the slider, can be "ltr" for left to right or "rtl" for right to left</td>
            </tr>
            <tr>
                <td>height</td>
                <td>string</td>
                <td>null or "200px"</td>
                <td>Height of the slider element. Is <b>REQUIRED</b> when orientation is set to "vertical". Defaults to "200px" when using vertical slider</td>
            </tr>
            <tr>
                <td>margin</td>
                <td>number</td>
                <td>10</td>
                <td>The least amount of distance between the first and second values</td>
            </tr>
            <tr>
                <td>maxValue</td>
                <td>number</td>
                <td>100</td>
                <td>The maximum value allowed on the entire slider</td>
            </tr>
            <tr>
                <td>minValue</td>
                <td>number</td>
                <td>rangeStart</td>
                <td>The minimum value allowed on the entire slider</td>
            </tr>
            <tr>
                <td>orientation</td>
                <td>string</td>
                <td>"horizontal"</td>
                <td>The orientation of the slider, can be "horizontal" or "vertical"</td>
            </tr>
            <tr>
                <td>pipDensity</td>
                <td>number</td>
                <td>5</td>
                <td>The number to scale the amount of pips or lines on the legend. So every X amount will cause a pip to display on the legend.</td>
            </tr>
            <tr>
                <td>pips</td>
                <td>number</td>
                <td>5</td>
                <td>The number of numbers on the legend, <i>including the min and max numbers</i>. They are spread out evenly, so in the case of 5 pips: 0% (min), 25%, 50%, 75%, and 100% (max) numbers are on the legend. 2 pips would mean only the min and the max are showing. The pipDensity determines the amount of lines on the legend.</td>
            </tr>
            <tr>
                <td>secondValue</td>
                <td>number</td>
                <td>null</td>
                <td>The value of the second number of the slider. When set to null the second handle will not display.</td>
            </tr>
            <tr>
                <td>step</td>
                <td>number</td>
                <td>10</td>
                <td>Slider increment on dragging</td>
            </tr>
            <tr>
                <td>value</td>
                <td>number</td>
                <td>0</td>
                <td>The value of the first number of the slider</td>
            </tr>
            <tr>
                <td>width</td>
                <td>string</td>
                <td>null</td>
                <td>Width of the slider element</td>
            </tr>
        </tbody>
    </table>
</div>
`,
    directives: [SLIDER_COMPONENT_PROVIDERS, CodeHighlighter]
})

export class SliderDemo{
    singleSliderValue: number = 40;
    doubleSliderValue: number = 20;
    secondDoubleSliderValue: number = 80;
    minValue: number = 0;
    maxValue: number = 100;
}

export var SLIDER_DEMO_PROVIDERS = [
    SliderDemo
];