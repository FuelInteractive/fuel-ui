import {Component, AfterViewInit} from '@angular/core';
import {SLIDER_COMPONENT_PROVIDERS} from './Slider';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

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
            <div class="col-md-6" style="padding-bottom: 60px">
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
            <div class="col-md-2" style="padding-bottom: 50px">
                <slider background="#E24932" step="5" pips="6" pipDensity="5"
                    [minValue]="minValue" [maxValue]="maxValue" [(value)]="doubleSliderValue" [(secondValue)]="secondDoubleSliderValue"
                    orientation="vertical" height="200px">
                </slider>
            </div>
            <div class="col-md-6" style="margin-bottom:50px;">
                <slider background="#E24932" step="5" pips="6" pipDensity="5"
                    [minValue]="minValue" [maxValue]="maxValue" [(value)]="doubleSliderValue" [(secondValue)]="secondDoubleSliderValue">
                </slider>
            </div>
        </div>
        <div class="row">
            <form>
                <div class="form-group row">
                    <label for="doubleSliderValue" class="col-sm-4 form-control-label">Slider Value</label>
                    <div class="col-sm-4">
                        <input class="form-control" step="5" [(ngModel)]="doubleSliderValue" [min]="minValue" [max]="secondDoubleSliderValue" type="number" name="doubleSliderValue">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="secondDoubleSliderValue" class="col-sm-4 form-control-label">Second Slider Value</label>
                    <div class="col-sm-4">
                        <input class="form-control" step="5" [(ngModel)]="secondDoubleSliderValue" [min]="doubleSliderValue" [max]="maxValue" type="number" name="secondDoubleSliderValue">
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
<tabset>
<tab heading="HTML">
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
</tab>
<tab heading="TypeScript">
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
</tab>
</tabset>

<h3>Attributes</h3>
<table-sortable
    [columns]="attributesColumns"
    [data]="attributes"
    [sort]="attributesSort">
    Loading table...
</table-sortable>

</div>
`,
    directives: [SLIDER_COMPONENT_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})

export class SliderDemo{
    singleSliderValue: number = 40;
    doubleSliderValue: number = 20;
    secondDoubleSliderValue: number = 80;
    minValue: number = 0;
    maxValue: number = 100;
    
    attributes:Attribute[] = [
        new Attribute('background', 'string', '#E24932', 'Background color of the area of the slider that counts toward the value'),
        new Attribute('behavior', 'string', 'tap', 'The way a user can interact with the slider. Can use "tap" or "fixed". "tap" allows for tapping and dragging. "fixed" disables the slider without greying it out.'),
        new Attribute('decimals', 'number', '0', 'Number of decimals on the value(s) and pips'),
        new Attribute('direction', 'string', 'ltr', 'The direction of the values on the slider, can be "ltr" for left to right or "rtl" for right to left'),
        new Attribute('height', 'string', 'null or 200px', 'Height of the slider element. Is <b>REQUIRED</b> when orientation is set to "vertical". Defaults to "200px" when using vertical slider'),
        new Attribute('margin', 'number', '10', 'The least amount of distance between the first and second values'),
        new Attribute('maxValue', 'number', '100', 'The maximum value allowed on the entire slider'),
        new Attribute('minValue', 'number', 'rangeStart', 'The minimum value allowed on the entire slider'),
        new Attribute('orientation', 'string', 'horizontal', 'The orientation of the slider, can be "horizontal" or "vertical"'),
        new Attribute('pipDensity', 'number', '5', 'The number to scale the amount of pips or lines on the legend. So every X amount will cause a pip to display on the legend.'),
        new Attribute('pips', 'number', '5', 'The number of numbers on the legend, <i>including the min and max numbers</i>. They are spread out evenly, so in the case of 5 pips: 0% (min), 25%, 50%, 75%, and 100% (max) numbers are on the legend. 2 pips would mean only the min and the max are showing. The pipDensity determines the amount of lines on the legend.'),
        new Attribute('secondValue', 'number', 'null', 'The value of the second number of the slider. When set to null the second handle will not display.'),
        new Attribute('step', 'number', '1', 'Slider increment on dragging'),
        new Attribute('value', 'number', '0', 'The value of the first number of the slider'),
        new Attribute('width', 'string', 'null', 'Width of the slider element'),
        new Attribute('debounceTime', 'number', '150', 'The amount of debounce time in milliseconds for the values to emit while sliding. Setting a shorter debounce time may result in decreased performance of the sliding mechanism. Values emit instantly on tap, and when a user lets go of the slider.')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}

export var SLIDER_DEMO_PROVIDERS = [
    SliderDemo
];