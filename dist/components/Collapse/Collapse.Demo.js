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
var Collapse_1 = require('./Collapse');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var CollapseDemo = (function () {
    function CollapseDemo() {
    }
    CollapseDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Collapse</h2>\n            <p class=\"card-text\">Collapse is a custom component to display and hide content on click</p>\n        </div>\n    </div>\n</div>\n\n<collapse buttonText=\"Collapse Button\">\n    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry \n    richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard \n    dolor brunch. Food truck quinoa nesciunt laborum eiusmod. \n    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin \n    coffee nulla assumenda shoreditch et.\n</collapse>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Collapse} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Collapse allows you to toggle content on the page by click</p>\n\n<h3>Usage</h3>\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;collapse buttonText=&quot;Collapse Button&quot;&gt;\n    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry \n    richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard \n    dolor brunch. Food truck quinoa nesciunt laborum eiusmod. \n    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin \n    coffee nulla assumenda shoreditch et.\n&lt;/collapse&gt;\n</code>\n</pre>\n\n<h3>Attributes</h3>\n<table class=\"table table-bordered table-striped\">\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Default</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>buttonText</td>\n            <td>string</td>\n            <td>null</td>\n            <td>Text to display on button that shows/hides content</td>\n        </tr>\n    </tbody>\n</table>\n\n</div>",
            directives: [Collapse_1.COLLAPSE_PROVIDERS, CodeHighlighter_1.CodeHighlighter]
        }), 
        __metadata('design:paramtypes', [])
    ], CollapseDemo);
    return CollapseDemo;
}());
exports.CollapseDemo = CollapseDemo;
exports.COLLAPSE_DEMO_PROVIDERS = [
    CollapseDemo
];

//# sourceMappingURL=Collapse.Demo.js.map
