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
var common_1 = require("angular2/common");
var Tab_1 = require('../../components/Tab/Tab');
var AccordionItem_1 = require('../../components/Accordion/AccordionItem');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var AccordionDemo = (function () {
    function AccordionDemo() {
        this.oneAtATime = true;
        this.duration = 250;
        this.firstOpen = true;
        this.firstDisabled = false;
        this.lastOpen = false;
        this.contentItems = ['Item 1', 'Item 2', 'Item 3'];
        this.accordionItems = [
            {
                heading: 'Custom Object Header - 1',
                content: 'Custom Object Body - 1'
            },
            {
                heading: 'Custom Object Header - 2',
                content: 'Custom Object Body - 2'
            }
        ];
        this.accordionAttributes = [
            new demoUtilities_1.Attribute('closeOthers', 'boolean', 'true', 'Only be able to have one accordion item opened at once'),
            new demoUtilities_1.Attribute('duration', 'number', '250', 'Duration of the collapse animations')
        ];
        this.accordionAttributesColumns = demoUtilities_1.AttributeColumns;
        this.accordionAttributesSort = demoUtilities_1.AttributesDefaultSort;
        this.accordionItemAttributes = [
            new demoUtilities_1.Attribute('disabled', 'boolean', 'false', 'Disable accordion item from opening on click and display as greyed out'),
            new demoUtilities_1.Attribute('open', 'boolean', 'false', 'The status of the accordion item showing content'),
            new demoUtilities_1.Attribute('heading', 'string', 'null', 'The clickable heading of the content of your accordion item')
        ];
        this.accordionItemAttributesColumns = demoUtilities_1.AttributeColumns;
        this.accordionItemAttributesSort = demoUtilities_1.AttributesDefaultSort;
    }
    AccordionDemo.prototype.addContentItem = function () {
        this.contentItems.push('New Item ' + (this.contentItems.length + 1));
    };
    AccordionDemo.prototype.addAccordionItem = function () {
        this.accordionItems.push({
            heading: 'Custom Object Header - ' + (this.accordionItems.length + 1),
            content: 'Custom Object Body - ' + (this.accordionItems.length + 1)
        });
    };
    AccordionDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Accordion</h2>\n            <p class=\"card-text\">Accordion is a custom component to display a list of collapsable items</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <div>\n        <p>\n            <button type=\"button\" class=\"btn btn-primary btn-sm\"\n                    (click)=\"lastOpen = !lastOpen\">Last Items: {{lastOpen ? 'Opened' : 'Closed'}}\n            </button>\n            <button type=\"button\" class=\"btn btn-primary btn-sm\"\n                    (click)=\"firstDisabled = ! firstDisabled\">First panels: {{firstDisabled ? 'Disabled' : 'Enabled'}}\n            </button>\n            <button type=\"button\" class=\"btn btn-primary btn-sm\"\n                    (click)=\"addAccordionItem()\">Add Accordion Item\n            </button>\n        </p>\n        \n        <div class=\"row\">\n            <label for=\"duration\" class=\"col-sm-2 form-control-label\">Animation Duration</label>\n            <div class=\"col-sm-2\">\n                <input class=\"form-control\" [(ngModel)]=\"duration\" step=\"10\" type=\"number\" name=\"duration\">\n            </div>\n            <div class=\"checkbox col-md-3\">\n                <label for=\"oneAtATime\" class=\"form-control-label\">\n                    <input [(ngModel)]=\"oneAtATime\" type=\"checkbox\" /> \n                    Open only one at a time\n                </label>\n            </div>\n        </div>\n        \n        <div class=\"row\">\n            <div class=\"col-md-6\">\n                <h3>Without Styles</h3>\n                <accordion [closeOthers]=\"oneAtATime\" [duration]=\"duration\">\n                    <accordion-item heading=\"Static Header 1\"\n                                    [(open)]=\"firstOpen\"\n                                    [disabled]=\"firstDisabled\">\n                        This content is showing on start\n                    </accordion-item>\n                    <accordion-item *ngFor=\"let accordionItem of accordionItems\" [heading]=\"accordionItem.heading\">\n                        {{ accordionItem?.content }}\n                    </accordion-item>\n                    <accordion-item heading=\"Accordion Item Body Expands\">\n                        <p>The body of the accordion group expands as the content grows</p>\n                        <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"addContentItem()\">Add Item</button>\n                        <div *ngFor=\"let contentItem of contentItems\">{{contentItem}}</div>\n                    </accordion-item>\n                    <accordion-item #item [(open)]=\"lastOpen\">\n                        <accordion-heading>\n                            <a (click)=\"$event.preventDefault\" class=\"fuel-ui-clickable\">Markup Here!</a>\n                            <i class=\"pull-right fa\"\n                                [ngClass]=\"{'fa-chevron-down': item?.open, 'fa-chevron-right': !item || !item.open}\"></i>\n                        </accordion-heading>\n                        What amazing content!\n                    </accordion-item>\n                </accordion>\n            </div>\n            <div class=\"col-md-6\">\n                <h3>With Styles</h3>\n                <accordion [closeOthers]=\"oneAtATime\" [duration]=\"duration\">\n                    <div accordion-item class=\"fuel-ui-accordion\"\n                                    [(open)]=\"firstOpen\"\n                                    [disabled]=\"firstDisabled\">\n                        <div accordion-heading class=\"fuel-ui-accordion-heading fuel-ui-clickable\" \n                                    [ngClass]=\"{'text-muted': firstDisabled}\">\n                            Static Header 1\n                        </div>\n                        <div class=\"fuel-ui-accordion-body\">\n                            This content is showing on start\n                        </div>\n                    </div>\n                    <div accordion-item class=\"fuel-ui-accordion\" *ngFor=\"let accordionItem of accordionItems\">\n                        <div accordion-heading class=\"fuel-ui-accordion-heading fuel-ui-clickable\">\n                            {{accordionItem.heading}}\n                        </div>\n                        <div class=\"fuel-ui-accordion-body\">\n                            {{ accordionItem?.content }}\n                        </div>\n                    </div>\n                    <div accordion-item class=\"fuel-ui-accordion\">\n                        <div accordion-heading class=\"fuel-ui-accordion-heading fuel-ui-clickable\">\n                            Accordion Item Body Expands\n                        </div>\n                        <div class=\"fuel-ui-accordion-body\">\n                            <p>The body of the accordion group expands as the content grows</p>\n                            <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"addContentItem()\">Add Item</button>\n                            <div *ngFor=\"let contentItem of contentItems\">{{contentItem}}</div>\n                        </div>\n                    </div>\n                    <div accordion-item class=\"fuel-ui-accordion\" #itemStyled [(open)]=\"lastOpen\">\n                        <div accordion-heading class=\"fuel-ui-accordion-heading fuel-ui-clickable\">\n                            <a (click)=\"$event.preventDefault\">Markup Here!</a>\n                            <i class=\"pull-right fa\"\n                                [ngClass]=\"{'fa-chevron-down': itemStyled?.open, 'fa-chevron-right': !itemStyled || !itemStyled.open}\"></i>\n                        </div>\n                        <div class=\"fuel-ui-accordion-body\">\n                            What amazing content!\n                        </div>\n                    </div>\n                </accordion>\n                <p>The class styles from the example Accordion above are added with Fuel-UI's CSS bundle, so feel free to use the HTML below!</p>\n            </div>\n        </div>\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {ACCORDION_PROVIDERS} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Accordion is a custom element to show a list of collapsable items. The Accordion component makes use of the Collapse directive to make a highly customizable interface.</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML - No Styles\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;accordion [closeOthers]=&quot;oneAtATime&quot; [duration]=&quot;duration&quot;&gt;\n    &lt;accordion-item heading=&quot;Static Header 1&quot;\n                    [(open)]=&quot;firstOpen&quot;\n                    [disabled]=&quot;firstDisabled&quot;&gt;\n        This content is showing on start\n    &lt;/accordion-item&gt;\n    &lt;accordion-item #item [(open)]=&quot;lastOpen&quot;&gt;\n        &lt;accordion-heading&gt;\n            &lt;a (click)=&quot;$event.preventDefault&quot; class=&quot;fuel-ui-clickable&quot;&gt;Markup Here!&lt;/a&gt;\n            &lt;i class=&quot;pull-right fa&quot;\n                [ngClass]=&quot;{'fa-chevron-down': item?.open, 'fa-chevron-right': !item || !item.open}&quot;&gt;&lt;/i&gt;\n        &lt;/accordion-heading&gt;\n        What amazing content!\n    &lt;/accordion-item&gt;\n&lt;/accordion&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"HTML - With Styles\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;accordion [closeOthers]=&quot;oneAtATime&quot; [duration]=&quot;duration&quot;&gt;\n    &lt;div accordion-item class=&quot;fuel-ui-accordion&quot;\n                    [(open)]=&quot;firstOpen&quot;\n                    [disabled]=&quot;firstDisabled&quot;&gt;\n        &lt;div accordion-heading class=&quot;fuel-ui-accordion-heading fuel-ui-clickable&quot; \n                    [ngClass]=&quot;{'text-muted': firstDisabled}&quot;&gt;\n            Static Header 1\n        &lt;/div&gt;\n        &lt;div class=&quot;fuel-ui-accordion-body&quot;&gt;\n            This content is showing on start\n        &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div accordion-item class=&quot;fuel-ui-accordion&quot; #itemStyled [(open)]=&quot;lastOpen&quot;&gt;\n        &lt;div accordion-heading class=&quot;fuel-ui-accordion-heading fuel-ui-clickable&quot;&gt;\n            &lt;a (click)=&quot;$event.preventDefault&quot;&gt;Markup Here!&lt;/a&gt;\n            &lt;i class=&quot;pull-right fa&quot;\n                [ngClass]=&quot;{'fa-chevron-down': itemStyled?.open, 'fa-chevron-right': !itemStyled || !itemStyled.open}&quot;&gt;&lt;/i&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;fuel-ui-accordion-body&quot;&gt;\n            What amazing content!\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/accordion&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"Sass\">\n<pre>\n<code class=\"language-css\" code-highlight>\n/* \n * This is added in Fuel-UI's CSS bundle already!\n * Feel free to use this as base for your own styles!\n */\n\n.fuel-ui-accordion {\n    background-color: #fff;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n    \n    .fuel-ui-accordion-heading {\n        background-color: #f5f5f5;\n        border-bottom: 1px solid #ddd;\n        border-top-left-radius: 3px;\n        border-top-right-radius: 3px;\n        color: #333;\n        padding: 10px 15px;\n        \n        &.text-muted {\n            color: #818a91 !important;\n        }\n    }\n    \n    .fuel-ui-accordion-body {\n        padding: 15px;\n    }\n}\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class AccordionExample {\n    oneAtATime:boolean = true;\n    duration:number = 250;\n    firstOpen:boolean = true;\n    firstDisabled:boolean = false;\n    lastOpen:boolean = false;\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Accordion Attributes</h3>\n<table-sortable\n    [columns]=\"accordionAttributesColumns\"\n    [data]=\"accordionAttributes\"\n    [sort]=\"accordionAttributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>Accordion Item Attributes</h3>\n<table-sortable\n    [columns]=\"accordionItemAttributesColumns\"\n    [data]=\"accordionItemAttributes\"\n    [sort]=\"accordionItemAttributesSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [common_1.CORE_DIRECTIVES, AccordionItem_1.ACCORDION_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], AccordionDemo);
    return AccordionDemo;
}());
exports.AccordionDemo = AccordionDemo;
exports.ACCORDION_DEMO_PROVIDERS = [
    AccordionDemo
];

//# sourceMappingURL=Accordion.Demo.js.map
