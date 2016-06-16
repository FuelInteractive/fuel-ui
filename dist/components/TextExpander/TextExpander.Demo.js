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
var core_1 = require('@angular/core');
var TextExpander_1 = require('./TextExpander');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var TextExpanderDemo = (function () {
    function TextExpanderDemo() {
        this.expanded = false;
        this.ellipsis = true;
        this.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed massa sed odio gravida iaculis. Sed elementum dapibus neque, sit.";
        this.characters = 50;
        this.words = 0;
        this.expandText = "Show more";
        this.shrinkText = "Show less";
        this.attributes = [
            new demoUtilities_1.Attribute('expanded', 'boolean', 'false', 'The current state of whether or not the complete text is displayed'),
            new demoUtilities_1.Attribute('ellipsis', 'boolean', 'true', 'Add "..." at the end of the text when not expanded'),
            new demoUtilities_1.Attribute('text', 'string', 'null', 'The text that can be expanded/shrunk'),
            new demoUtilities_1.Attribute('characters', 'number', '50', 'The number of characters displayed when text is shrunk'),
            new demoUtilities_1.Attribute('words', 'number', '0', 'The number of words displayed when text is shrunk. If set to 0, characters are defaulted to'),
            new demoUtilities_1.Attribute('expandText', 'string', 'show more', 'Clickable text used to expand text'),
            new demoUtilities_1.Attribute('shrinkText', 'string', 'show less', 'Clickable text used to shrink text')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
        this.events = [
            new demoUtilities_1.Event('expandedChange', '$event = expanded: boolean', 'New state of whether the text is expanded or not')
        ];
        this.eventsColumns = demoUtilities_1.EventColumns;
        this.eventsSort = demoUtilities_1.EventsDefaultSort;
    }
    TextExpanderDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">TextExpander</h2>\n            <p class=\"card-text\">TextExpander is a custom component to display a text expander number list</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <div class=\"col-md-8\">\n        <form>\n            <div class=\"form-group row\">\n                <label for=\"text\" class=\"col-sm-2 form-control-label\">Text</label>\n                <div class=\"col-sm-12\">\n                    <input class=\"form-control\" [(ngModel)]=\"text\" type=\"text\" name=\"text\">\n                </div>\n            </div>\n            <div class=\"form-group row\">\n                <label for=\"characters\" class=\"col-sm-2 form-control-label\">Characters</label>\n                <div class=\"col-sm-2\">\n                    <input class=\"form-control\" [(ngModel)]=\"characters\" min=\"1\" type=\"number\" name=\"characters\">\n                </div>\n            </div>\n            <div class=\"form-group row\">\n                <label for=\"words\" class=\"col-sm-2 form-control-label\">Words</label>\n                <div class=\"col-sm-2\">\n                    <input class=\"form-control\" [(ngModel)]=\"words\" min=\"0\" type=\"number\" name=\"words\">\n                </div>\n\t            <small class=\"text-muted\">Expander defaults to number of characters when set to 0.</small>\n            </div>\n            <div class=\"form-group row\">\n                <label for=\"expandText\" class=\"col-sm-2 form-control-label\">Expand Text</label>\n                <div class=\"col-sm-6\">\n                    <input class=\"form-control\" [(ngModel)]=\"expandText\" type=\"text\" name=\"expandText\">\n                </div>\n            </div>\n            <div class=\"form-group row\">\n                <label for=\"expandText\" class=\"col-sm-2 form-control-label\">Shrink Text</label>\n                <div class=\"col-sm-6\">\n                    <input class=\"form-control\" [(ngModel)]=\"shrinkText\" type=\"text\" name=\"shrinkText\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"checkbox col-md-3\">\n                    <label for=\"expanded\" class=\"form-control-label\">\n                        <input [(ngModel)]=\"expanded\" type=\"checkbox\" /> \n                        Expanded\n                    </label>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"checkbox col-md-3\">\n                    <label for=\"ellipsis\" class=\"form-control-label\">\n                        <input [(ngModel)]=\"ellipsis\" type=\"checkbox\" /> \n                        Ellipsis\n                    </label>\n                </div>\n            </div>\n        </form>\n        <text-expander\n            [(expanded)]=\"expanded\"\n            [ellipsis]=\"ellipsis\"\n            [text]=\"text\"\n            [characters]=\"characters\"\n            [words]=\"words\"\n            [expandText]=\"expandText\"\n            [shrinkText]=\"shrinkText\">\n        </text-expander>\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {TextExpander} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>TextExpander is a custom element to show an interactive list of page numbers to use for paging</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;text-expander\n    [(expanded)]=&quot;expanded&quot;\n    [ellipsis]=&quot;ellipsis&quot;\n    [text]=&quot;text&quot;\n    [words]=&quot;words&quot;\n    [characters]=&quot;characters&quot;\n    [expandText]=&quot;expandText&quot;\n    [shrinkText]=&quot;shrinkText&quot;&gt;\n&lt;/text-expander&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class TextExpanderExample {\n    expanded: boolean = false;\n    ellipsis: boolean = true;\n    text: string = \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed \" + \n                    \"massa sed odio gravida iaculis. Sed elementum dapibus neque, sit.\";\n    characters: number = 50;\n    words: number = 0;\n    expandText: string = \"Show more\";\n    shrinkText: string = \"Show less\";\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>Events</h3>\n<table-sortable\n    [columns]=\"eventsColumns\"\n    [data]=\"events\"\n    [sort]=\"eventsSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [TextExpander_1.TEXTEXPANDER_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], TextExpanderDemo);
    return TextExpanderDemo;
}());
exports.TextExpanderDemo = TextExpanderDemo;
exports.TEXTEXPANDER_DEMO_PROVIDERS = [
    TextExpanderDemo
];

//# sourceMappingURL=TextExpander.Demo.js.map
