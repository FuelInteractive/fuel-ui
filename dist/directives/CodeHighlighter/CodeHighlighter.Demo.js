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
var CodeHighlighter_1 = require('./CodeHighlighter');
var Tab_1 = require('../../components/Tab/Tab');
var CodeHighlighterDemo = (function () {
    function CodeHighlighterDemo() {
    }
    CodeHighlighterDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">CodeHighlighter</h2>\n            <p class=\"card-text\">CodeHighlighter is a custom directive to highlight code blocks using PrismJS</p>\n        </div>\n    </div>\n</div>\n\n<pre>\n<code class=\"language-css\" code-highlight>\n#titanic {\n    float: none;\n}\n</code>\n</pre>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {CodeHighlighter} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>CodeHighlighter is applied to a code element with [code-highlight] directive. The <code>&lt;code&gt;</code> should have a style class having \"language-\" prefix to specify the language to highlight. See <a href=\"http://prismjs.com/#languages-list\" target=\"_blank\">Prismjs docs</a> for the list of available languages. An example block with css code would be as follows.</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;code class=\"language-css\" code-highlight&gt;\n    #titanic { \n        float: none;\n    }\n&lt;/code&gt;\n</code>\n</pre>\n</tab>\n</tabset>\n</div>",
            directives: [CodeHighlighter_1.CodeHighlighter, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], CodeHighlighterDemo);
    return CodeHighlighterDemo;
}());
exports.CodeHighlighterDemo = CodeHighlighterDemo;
exports.CODEHIGHLIGHTER_DEMO_PROVIDERS = [
    CodeHighlighterDemo
];

//# sourceMappingURL=CodeHighlighter.Demo.js.map
