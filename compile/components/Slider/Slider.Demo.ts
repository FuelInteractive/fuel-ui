import {Component, AfterViewInit} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
    templateUrl: "Slider.Demo.html"
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