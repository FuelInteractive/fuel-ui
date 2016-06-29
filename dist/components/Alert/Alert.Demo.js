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
var Alert_1 = require('./Alert');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var AlertDemo = (function () {
    function AlertDemo() {
        this.showAlert = false;
        this.closeDelay = 0;
        this.alertType = "success";
        this.alertBody = "<strong>Some alert</strong> success message or something";
        this.attributes = [
            new demoUtilities_1.Attribute('displayed', 'boolean', 'false', 'Two-way binding to display the alert'),
            new demoUtilities_1.Attribute('closeButton', 'boolean', 'true', "Option to display the 'X' in the right hand corner to close the alert"),
            new demoUtilities_1.Attribute('closeDelay', 'number', '0', 'Number in milliseconds until the alert automatically closes. When set to 0, the alert will stay open until manually closed'),
            new demoUtilities_1.Attribute('type', 'string', 'success', 'The type of alert to display. Default types include success, info, warning, and danger. <a href="http://v4-alpha.getbootstrap.com/components/alerts/#link-color" target="_blank">More info here...</a>'),
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
    }
    AlertDemo.prototype.showSuccess = function () {
        this.closeDelay = 0;
        this.alertType = "success";
        this.alertBody = "<strong>Some alert</strong> success message or something";
        this.showAlert = true;
    };
    AlertDemo.prototype.showError = function () {
        this.closeDelay = 0;
        this.alertType = "danger";
        this.alertBody = "<strong>Something went wrong</strong> error message or something";
        this.showAlert = true;
    };
    AlertDemo.prototype.showDelay = function () {
        this.closeDelay = 5000;
        this.alertType = "info";
        this.alertBody = "<strong>Nice!</strong> This will close in 5 seconds...";
        this.showAlert = true;
    };
    AlertDemo.prototype.test = function () {
        console.log("changed");
    };
    AlertDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Alert</h2>\n            <p class=\"card-text\">Alert is a custom component to display informational messages</p>\n        </div>\n    </div>\n</div>\n\n<alert\n    [(displayed)]=\"showAlert\"\n    [type]=\"alertType\"\n    [closeDelay]=\"closeDelay\">\n    <span [innerHtml]=\"alertBody\"></span>\n</alert>\n<button class=\"btn btn-success\" (click)=\"showSuccess()\">Show Alert Success</button>\n<button class=\"btn btn-danger\" (click)=\"showError()\">Show Alert Error</button>\n<button class=\"btn btn-info\" (click)=\"showDelay()\">Show Delayed Close Error</button>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Alert} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Alert is a custom element to programmatically display feedback messages typically for user actions</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;alert [(displayed)]=&quot;showAlert&quot; type=&quot;success&quot; [closeButton]=&quot;false&quot;&gt;\n    &lt;strong&gt;Success!&lt;/strong&gt; Your alert is showing!\n&lt;/alert&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class AlertExample {\n    showAlert: boolean = false;\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [Alert_1.ALERT_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], AlertDemo);
    return AlertDemo;
}());
exports.AlertDemo = AlertDemo;
exports.ALERT_DEMO_PROVIDERS = [
    AlertDemo
];

//# sourceMappingURL=Alert.Demo.js.map
