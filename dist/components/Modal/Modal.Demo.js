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
var Modal_1 = require('./Modal');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var ModalDemo = (function () {
    function ModalDemo() {
        this.closeText = "Cancel";
        this.attributes = [
            new demoUtilities_1.Attribute('closeOnUnfocus', 'boolean', 'true', 'Closes the opened modal when the user clicks off of it'),
            new demoUtilities_1.Attribute('closeButton', 'boolean', 'true', "Option to display an 'X' close button in the corner of the modal"),
            new demoUtilities_1.Attribute('modalTitle', 'string', 'null', 'Text to display in modal header')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
    }
    ModalDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Modal</h2>\n            <p class=\"card-text\">Modal is a custom component to display a popup</p>\n        </div>\n    </div>\n</div>\n\n<button class=\"btn btn-primary\" (click)=\"modal.showModal()\">Toggle Modal</button>\n<modal #modal\n    modalTitle=\"Modal Title\"\n    [closeButton]=\"true\"\n    [closeOnUnfocus]=\"true\">\n    <div class=\"modal-body\">\n        <ul>\n            <li>Testing 1</li>\n            <li>Testing 2</li>\n            <li>Testing 3</li>\n        </ul>\n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"modal.closeModal()\">\n            <i class=\"fa fa-chevron-left\"></i> Go Back\n        </button>\n    </div>\n</modal>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Modal} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Modal is a custom element to create a popup</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;button class=&quot;btn btn-primary&quot; (click)=&quot;modal.showModal()&quot;&gt;Toggle Modal&lt;/button&gt;\n&lt;modal #modal\n    modalTitle=&quot;Modal Title&quot;\n    [closeButton]=&quot;true&quot;\n    [closeOnUnfocus]=&quot;true&quot;&gt;\n    &lt;div class=&quot;modal-body&quot;&gt;\n        &lt;ul&gt;\n            &lt;li&gt;Any&lt;/li&gt;\n            &lt;li&gt;Html&lt;/li&gt;\n            &lt;li&gt;Here&lt;/li&gt;\n        &lt;/ul&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;modal-footer&quot;&gt;\n        &lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; (click)=&quot;modal.closeModal()&quot;&gt;\n            &lt;i class=&quot;fa fa-chevron-left&quot;&gt;&lt;/i&gt; Go Back\n        &lt;/button&gt;\n    &lt;/div&gt;\n&lt;/modal&gt;\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [Modal_1.MODAL_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], ModalDemo);
    return ModalDemo;
}());
exports.ModalDemo = ModalDemo;
exports.MODAL_DEMO_PROVIDERS = [
    ModalDemo
];

//# sourceMappingURL=Modal.Demo.js.map
