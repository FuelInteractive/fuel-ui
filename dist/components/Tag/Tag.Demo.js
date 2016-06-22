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
var common_1 = require('@angular/common');
var Tag_1 = require('./Tag');
var Tab_1 = require('../../components/Tab/Tab');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var TagDemo = (function () {
    function TagDemo() {
        this.valueError = false;
        this.tempTag = {
            title: 'Example Title',
            color: 'default',
            disabled: false,
            pill: true,
            removable: true,
            value: 'Some value here'
        };
        this.tags = [
            { title: 'Default' },
            { title: 'Primary', color: 'primary', pill: true, removable: true, value: 'Some great value' },
            { title: 'Info', color: 'info', pill: true, removable: true, value: false },
            { title: 'Success', color: 'success', pill: true, removable: true, value: 1234567890 },
            { title: 'Danger', color: 'danger', pill: false, removable: true, value: { some: 'great', value: true } },
            { title: 'Warning', color: 'warning', pill: false, removable: true, value: true }
        ];
        this.tagAttributes = [
            new demoUtilities_1.Attribute('color', 'string', 'default', 'Bootstrap color of the Tag. <a href="http://v4-alpha.getbootstrap.com/components/label/#contextual-variations" target="_blank">Click here for more info...</a>'),
            new demoUtilities_1.Attribute('pill', 'boolean', 'false', 'Show the Tag as a pill'),
            new demoUtilities_1.Attribute('title', 'string', 'null', 'Html of Tag\'s title'),
            new demoUtilities_1.Attribute('value', 'any', 'null', 'Value of the Tag'),
            new demoUtilities_1.Attribute('removable', 'boolean', 'false', 'Makes the tag able to be removed from the TagSet and adds an X icon to the title that removes the tag on click')
        ];
        this.tagAttributesColumns = demoUtilities_1.AttributeColumns;
        this.tagAttributesSort = demoUtilities_1.AttributesDefaultSort;
        this.tagEvents = [
            new demoUtilities_1.Event('remove', '$event = tag: Tag', 'Returns the Tag object when removed')
        ];
        this.tagEventsColumns = demoUtilities_1.EventColumns;
        this.tagEventsSort = demoUtilities_1.EventsDefaultSort;
    }
    TagDemo.prototype.clearTags = function () {
        this.tags = [];
    };
    TagDemo.prototype.addTag = function () {
        var _this = this;
        this.valueError = false;
        this.tags.forEach(function (obj, i) {
            if (_this.tempTag.value === obj.value) {
                _this.valueError = true;
            }
        });
        if (this.valueError)
            return;
        this.tags.push(JSON.parse(JSON.stringify(this.tempTag))); //make simple copy of tempTag to add
    };
    TagDemo.prototype.removeLog = function (tag) {
        var _this = this;
        console.log('Removed:', tag.title, '-', tag.value);
        try {
            this.tags.forEach(function (obj, i) {
                if (tag.value === obj.value) {
                    throw _this.tags.splice(i, 1);
                }
            });
        }
        catch (e) {
        }
    };
    TagDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Tags</h2>\n            <p class=\"card-text\">TagSet is a custom component to display a list of Tags</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <form>\n        <div class=\"form-group row\">\n            <label for=\"tempTag.color\" class=\"col-sm-2 col-md-1 form-control-label\">Color</label>\n            <div class=\"col-sm-2\">\n                <select class=\"form-control\" [(ngModel)]=\"tempTag.color\" name=\"tempTag.color\">\n                    <option [selected]=\"tempTag.color == 'danger'\" value=\"danger\">Danger</option>\n                    <option [selected]=\"tempTag.color == 'default'\" value=\"default\">Default</option>\n                    <option [selected]=\"tempTag.color == 'info'\" value=\"info\">Info</option>\n                    <option [selected]=\"tempTag.color == 'primary'\" value=\"primary\">Primary</option>\n                    <option [selected]=\"tempTag.color == 'success'\" value=\"success\">Success</option>\n                    <option [selected]=\"tempTag.color == 'warning'\" value=\"warning\">Warning</option>\n                </select>\n            </div>\n            <label for=\"tempTag.pill\" class=\"form-control-label\">\n                <input #pillcb type=\"checkbox\" (change)=\"tempTag.pill = pillcb.checked\" [checked]=\"tempTag.pill\" /> Pill\n            </label>\n            <label for=\"tempTag.removable\" class=\"form-control-label\">\n                <input #removablecb type=\"checkbox\" (change)=\"tempTag.removable = removablecb.checked\" [checked]=\"tempTag.removable\" /> Removable\n            </label>\n            <label for=\"tempTag.disabled\" class=\"form-control-label\">\n                <input #disabledcb type=\"checkbox\" (change)=\"tempTag.disabled = disabledcb.checked\" [checked]=\"tempTag.disabled\" /> Disabled\n            </label>\n        </div>\n        <div class=\"form-group row\">\n            <label for=\"tempTag.title\" class=\"col-sm-2 col-md-1 form-control-label\">Title</label>\n            <div class=\"col-sm-2\">\n                <input class=\"form-control\" [(ngModel)]=\"tempTag.title\" type=\"text\" name=\"tempTag.title\">\n            </div>\n            <label for=\"tempTag.value\" class=\"col-sm-2 col-md-1 form-control-label\">Value</label>\n            <div class=\"col-sm-4\">\n                <input class=\"form-control\" [(ngModel)]=\"tempTag.value\" type=\"text\" name=\"tempTag.value\" ngControl=\"value\">\n                <div [hidden]=\"!valueError\" class=\"alert alert-danger\">\n                    Value is already used for another tag\n                </div>\n            </div>\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"addTag()\">Add tag</button>\n        </div>\n    </form>\n    <p>\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" [disabled]=\"tags.length <= 1\" (click)=\"tags[1].disabled = !tags[1].disabled\">Enable/Disable second tag</button>\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" [disabled]=\"tags.length == 0\" (click)=\"clearTags()\">Clear tags</button>\n    </p>\n    <div (click)=\"$event.preventDefault()\">\n        <h3>\n            <tagset>\n                <tag *ngFor=\"let theTag of tags\"\n                    [color]=\"theTag.color\"\n                    [pill]=\"theTag.pill\"\n                    [disabled]=\"theTag.disabled\"\n                    [removable]=\"theTag.removable\"\n                    [title]=\"theTag.title\"\n                    [value]=\"theTag.value\"\n                    (remove)=\"removeLog($event)\">\n                </tag>\n            </tagset>\n        </h3>\n        \n        <h4>Tags</h4>\n        <div *ngFor=\"let theTag of tags\">\n            {{theTag | json}}\n        </div>\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {TAG_PROVIDERS} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>TagSet is a custom element to show an interactive tag interface. Used in conjuction with the custom Tag element. Tags can be displayed in a number ways</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;tagset&gt;\n    &lt;tag *ngFor=&quot;#theTag of tags&quot;\n        [color]=&quot;theTag.color&quot;\n        [pill]=&quot;theTag.pill&quot;\n        [removable]=&quot;theTag.removable&quot;\n        [title]=&quot;theTag.title&quot;\n        [value]=&quot;theTag.value&quot;\n        (remove)=&quot;removeLog($event)&quot;&gt;\n    &lt;/tag&gt;\n&lt;/tagset&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class TagExample {\n    tags:any[] = [\n        {title: 'Default'},\n        {title: 'Primary', color: 'primary', pill: true, removable: true, value: 'Some great value'},\n        {title: 'Info', color: 'info', pill: true, removable: true, value: false},\n        {title: 'Success', color: 'success', pill: true, removable: true, value: 1234567890},\n        {title: 'Danger', color: 'danger', pill: false, removable: true, value: {some: 'great', value: true}},\n        {title: 'Warning', color: 'warning', pill: false, removable: true, value: true}\n    ];\n    \n    removeLog(tag: Tag):void {\n        console.log('Removed:', tag.title, '-', tag.value);\n    }\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Tag Attributes</h3>\n<table-sortable\n    [columns]=\"tagAttributesColumns\"\n    [data]=\"tagAttributes\"\n    [sort]=\"tagAttributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>Tag Events</h3>\n<table-sortable\n    [columns]=\"tagEventsColumns\"\n    [data]=\"tagEvents\"\n    [sort]=\"tagEventsSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [common_1.CORE_DIRECTIVES, Tag_1.TAG_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], TagDemo);
    return TagDemo;
}());
exports.TagDemo = TagDemo;
exports.TAG_DEMO_PROVIDERS = [
    TagDemo
];

//# sourceMappingURL=Tag.Demo.js.map
