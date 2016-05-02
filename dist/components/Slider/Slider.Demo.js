"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var Slider_1 = require('./Slider');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var SliderDemo = (function () {
    function SliderDemo() {
        this.singleSliderValue = 40;
        this.doubleSliderValue = 20;
        this.secondDoubleSliderValue = 80;
        this.minValue = 0;
        this.maxValue = 100;
        this.attributes = [
            new demoUtilities_1.Attribute('background', 'string', '#E24932', 'Background color of the area of the slider that counts toward the value'),
            new demoUtilities_1.Attribute('behavior', 'string', 'tap', 'The way a user can interact with the slider. Can use "tap" or "fixed". "tap" allows for tapping and dragging. "fixed" disables the slider without greying it out.'),
            new demoUtilities_1.Attribute('decimals', 'number', '0', 'Number of decimals on the value(s) and pips'),
            new demoUtilities_1.Attribute('direction', 'string', 'ltr', 'The direction of the values on the slider, can be "ltr" for left to right or "rtl" for right to left'),
            new demoUtilities_1.Attribute('height', 'string', 'null or 200px', 'Height of the slider element. Is <b>REQUIRED</b> when orientation is set to "vertical". Defaults to "200px" when using vertical slider'),
            new demoUtilities_1.Attribute('margin', 'number', '10', 'The least amount of distance between the first and second values'),
            new demoUtilities_1.Attribute('maxValue', 'number', '100', 'The maximum value allowed on the entire slider'),
            new demoUtilities_1.Attribute('minValue', 'number', 'rangeStart', 'The minimum value allowed on the entire slider'),
            new demoUtilities_1.Attribute('orientation', 'string', 'horizontal', 'The orientation of the slider, can be "horizontal" or "vertical"'),
            new demoUtilities_1.Attribute('pipDensity', 'number', '5', 'The number to scale the amount of pips or lines on the legend. So every X amount will cause a pip to display on the legend.'),
            new demoUtilities_1.Attribute('pips', 'number', '5', 'The number of numbers on the legend, <i>including the min and max numbers</i>. They are spread out evenly, so in the case of 5 pips: 0% (min), 25%, 50%, 75%, and 100% (max) numbers are on the legend. 2 pips would mean only the min and the max are showing. The pipDensity determines the amount of lines on the legend.'),
            new demoUtilities_1.Attribute('secondValue', 'number', 'null', 'The value of the second number of the slider. When set to null the second handle will not display.'),
            new demoUtilities_1.Attribute('step', 'number', '1', 'Slider increment on dragging'),
            new demoUtilities_1.Attribute('value', 'number', '0', 'The value of the first number of the slider'),
            new demoUtilities_1.Attribute('width', 'string', 'null', 'Width of the slider element')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
    }
    SliderDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Slider</h2>\n            <p class=\"card-text\">This is the NoUiSlider (from <a href=\"http://refreshless.com/nouislider/\" target=\"_blank\">Refreshless.com</a>), wrapped in an Angular2 component</p>\n        </div>\n    </div>\n</div>\n<div class=\"row\" style=\"margin-left:9px;margin-top:45px;\">\n    <div class=\"col-md-6\">\n        <div class=\"row\">\n            <div class=\"col-md-6\" style=\"padding-bottom: 60px\">\n                <slider background=\"#E24932\" step=\"5\" pips=\"6\" pipDensity=\"5\"\n                    [minValue]=\"minValue\" [maxValue]=\"maxValue\" [(value)]=\"singleSliderValue\">\n                </slider>\n            </div>\n            <div class=\"col-md-6\">\n                <slider background=\"#E24932\" step=\"5\" pips=\"6\" pipDensity=\"5\"\n                    [minValue]=\"minValue\" [maxValue]=\"maxValue\" [(value)]=\"singleSliderValue\"\n                    orientation=\"vertical\" height=\"200px\">\n                </slider>\n            </div>\n        </div>\n        <div class=\"row\" style=\"margin-top:50px;\">\n            <form>\n                <div class=\"form-group row\">\n                    <label for=\"singleSliderValue\" class=\"col-sm-4 form-control-label\">Slider Value</label>\n                    <div class=\"col-sm-4\">\n                        <input class=\"form-control\" step=\"5\" [(ngModel)]=\"singleSliderValue\" [min]=\"minValue\" [max]=\"maxValue\" type=\"number\" name=\"singleSliderValue\">\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n    <div class=\"col-md-6\">\n        <div class=\"row\">\n            <div class=\"col-md-2\" style=\"padding-bottom: 50px\">\n                <slider background=\"#E24932\" step=\"5\" pips=\"6\" pipDensity=\"5\"\n                    [minValue]=\"minValue\" [maxValue]=\"maxValue\" [(value)]=\"doubleSliderValue\" [(secondValue)]=\"secondDoubleSliderValue\"\n                    orientation=\"vertical\" height=\"200px\">\n                </slider>\n            </div>\n            <div class=\"col-md-6\" style=\"margin-bottom:50px;\">\n                <slider background=\"#E24932\" step=\"5\" pips=\"6\" pipDensity=\"5\"\n                    [minValue]=\"minValue\" [maxValue]=\"maxValue\" [(value)]=\"doubleSliderValue\" [(secondValue)]=\"secondDoubleSliderValue\">\n                </slider>\n            </div>\n        </div>\n        <div class=\"row\">\n            <form>\n                <div class=\"form-group row\">\n                    <label for=\"doubleSliderValue\" class=\"col-sm-4 form-control-label\">Slider Value</label>\n                    <div class=\"col-sm-4\">\n                        <input class=\"form-control\" step=\"5\" [(ngModel)]=\"doubleSliderValue\" [min]=\"minValue\" [max]=\"secondDoubleSliderValue\" type=\"number\" name=\"doubleSliderValue\">\n                    </div>\n                </div>\n                <div class=\"form-group row\">\n                    <label for=\"secondDoubleSliderValue\" class=\"col-sm-4 form-control-label\">Second Slider Value</label>\n                    <div class=\"col-sm-4\">\n                        <input class=\"form-control\" step=\"5\" [(ngModel)]=\"secondDoubleSliderValue\" [min]=\"doubleSliderValue\" [max]=\"maxValue\" type=\"number\" name=\"secondDoubleSliderValue\">\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Slider} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n<h3>Getting Started</h3>\n<p>Slider is a custom element to programmatically create range sliders</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;!--horizontal--&gt;\n&lt;slider background=&quot;#E24932&quot; step=&quot;10&quot; pips=&quot;6&quot; pipDensity=&quot;5&quot;\n    [minValue]=&quot;minValue&quot; [maxValue]=&quot;maxValue&quot; [(value)]=&quot;sliderValue&quot;&gt;\n&lt;/slider&gt;\n\n&lt;!--vertical--&gt;\n&lt;slider background=&quot;#E24932&quot; step=&quot;10&quot; pips=&quot;6&quot; pipDensity=&quot;5&quot;\n    [minValue]=&quot;minValue&quot; [maxValue]=&quot;maxValue&quot; [(value)]=&quot;sliderValue&quot;\n    orientation=&quot;vertical&quot; height=&quot;200px&quot;&gt;\n&lt;/slider&gt;\n\n&lt;!--horizontal with 2 values--&gt;\n&lt;slider background=&quot;#E24932&quot; step=&quot;10&quot; pips=&quot;6&quot; pipDensity=&quot;5&quot;\n    [minValue]=&quot;minValue&quot; [maxValue]=&quot;maxValue&quot; [(value)]=&quot;sliderValue&quot; [(secondValue)]=&quot;secondSliderValue&quot;&gt;\n&lt;/slider&gt;\n\n&lt;!--vertical with 2 values--&gt;\n&lt;slider background=&quot;#E24932&quot; step=&quot;10&quot; pips=&quot;6&quot; pipDensity=&quot;5&quot;\n    [minValue]=&quot;minValue&quot; [maxValue]=&quot;maxValue&quot; [(value)]=&quot;sliderValue&quot; [(secondValue)]=&quot;secondSliderValue&quot;\n    orientation=&quot;vertical&quot; height=&quot;200px&quot;&gt;\n&lt;/slider&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class SliderExample{\n    sliderValue: number = 20;\n    secondSliderValue: number = 80;\n    minValue: number = 0;\n    maxValue: number = 100;\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n</div>\n",
            directives: [Slider_1.SLIDER_COMPONENT_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], SliderDemo);
    return SliderDemo;
}());
exports.SliderDemo = SliderDemo;
exports.SLIDER_DEMO_PROVIDERS = [
    SliderDemo
];

//# sourceMappingURL=Slider.Demo.js.map
