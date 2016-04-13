import {Component, AfterViewInit} from 'angular2/core';
import {SLIDER_COMPONENT_PROVIDERS} from './Slider';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Slider</h2>
            <p class="card-text">This is the NoUiSlider (from Refreshless.com), wrapped in an Angular2 component</p>
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
            &lt;slider elementId=&quot;test&quot; rangeStart=0 rangeEnd=400
                step=10 selectedValueStart=&quot;&quot; selectedValueEnd=&quot;&quot;
                minElementDisplayId=&quot;slider-value-min&quot; 
                maxElementDisplayId=&quot;slider-value-max&quot;&gt;
            &lt;/slider&gt;
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
                <td>elementId</td>
                <td>string</td>
                <td>null</td>
                <td>A DOM element (div) that will be turned into a slider</td>
            </tr>
            <tr>
                <td>rangeStart</td>
                <td>number</td>
                <td>0</td>
                <td>Slider minimal value</td>
            </tr>
            <tr>
                <td>rangeEnd</td>
                <td>number</td>
                <td>200</td>
                <td>Slider maximal value</td>
            </tr>
            <tr>
                <td>step</td>
                <td>number</td>
                <td>10</td>
                <td>Slider increment</td>
            </tr>
            <tr>
                <td>selectedValueStart</td>
                <td>number</td>
                <td>rangeStart</td>
                <td>Set the slider starting min value.Must be >= than rangeStart and <= than rangeEnd.</td>
            </tr>
            <tr>
                <td>selectedValueEnd</td>
                <td>number</td>
                <td>rangeEnd</td>
                <td>Set the slider starting max value.Must be >= than rangeStart and <= than rangeEnd and > than selectedValueStart.</td>
            </tr>
            <tr>
                <td>minElementDisplayId</td>
                <td>string</td>
                <td>null</td>
                <td>Id of an element, in which to display the selected minimal value.</td>
            </tr>
            <tr>
                <td>maxElementDisplayId</td>
                <td>string</td>
                <td>null</td>
                <td>Id of an element, in which to display the selected maximal value.</td>
            </tr>
        </tbody>
    </table>
</div>
`,
    directives: [SLIDER_COMPONENT_PROVIDERS, CodeHighlighter]
})

export class SliderDemo{
}

export var SLIDER_DEMO_PROVIDERS = [
    SliderDemo
];