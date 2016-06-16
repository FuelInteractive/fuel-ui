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
var core_1 = require("@angular/core");
var CodeHighlighter_1 = require("./directives/CodeHighlighter/CodeHighlighter");
var AccordionItem_1 = require('./components/Accordion/AccordionItem');
var DemoHome = (function () {
    function DemoHome() {
    }
    DemoHome = __decorate([
        core_1.Component({
            template: "\n    <div class=\"jumbotron jumbotron-fluid\">\n        <div class=\"container\">\n            <h2 class=\"display-3\">Fuel-UI</h2>\n            <p class=\"lead\">Fuel-UI is a collection of native <a href=\"http://angular.io\" target=\"_blank\">Angular 2</a> components, directives, and pipes for <a href=\"http://v4-alpha.getbootstrap.com/\" target=\"_blank\">Bootstrap 4</a>.</p>\n            \n            <a href=\"https://github.com/FuelInteractive/fuel-ui/releases\" target=\"_blank\" class=\"btn btn-fuel\">Download <i class=\"fa fa-download\"></i></a> \n            <a href=\"https://github.com/FuelInteractive/fuel-ui\" target=\"_blank\" class=\"btn btn-fuel\">View on GitHub <i class=\"fa fa-external-link\"></i></a> \n            <a href=\"https://www.npmjs.com/package/fuel-ui\" target=\"_blank\" class=\"btn btn-fuel\">View npm Package <i class=\"fa fa-external-link\"></i></a>\n        </div>\n    </div>\n    \n    <p>Fuel-UI is developed by <a href=\"http://fueltravel.com\" target=\"_blank\">Fuel Travel</a>, a company with years of expertise in the travel marketing industry. For project news and updates, follow us on <a href=\"http://twitter.com/fueltravel\" target=\"_blank\">twitter</a>.</p>"
        }), 
        __metadata('design:paramtypes', [])
    ], DemoHome);
    return DemoHome;
}());
exports.DemoHome = DemoHome;
var InstallationComponent = (function () {
    function InstallationComponent() {
    }
    InstallationComponent = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Installation</h2>\n            <p class=\"card-text\">\n                Fork our Quickstart! <a href=\"https://github.com/coryshaw1/ng2-play/\" target=\"_blank\">https://github.com/coryshaw1/ng2-play/</a><br/>\n                Fork our angular-cli Quickstart! <a href=\"https://github.com/FuelInteractive/fuel-ui-cli-quickstart/\" target=\"_blank\">https://github.com/FuelInteractive/fuel-ui-cli-quickstart/</a>\n            </p>\n        </div>\n    </div>\n</div>\n\n<accordion>\n    <div accordion-item class=\"fuel-ui-accordion\" #manually [open]=\"true\">\n        <div accordion-heading class=\"fuel-ui-accordion-heading fuel-ui-clickable\">\n            Manually\n            <i class=\"pull-right fa\"\n                [ngClass]=\"{'fa-chevron-down': manually?.open, 'fa-chevron-right': !manually || !manually.open}\"></i>\n        </div>\n        <div class=\"fuel-ui-accordion-body\">\n            <p>If you would like to add Fuel-UI to your Angular2 project through npm manually, do the following:</p>\n               \n<pre>\n<code class=\"language-bash\" code-highlight>\nnpm install fuel-ui font-awesome bootstrap@^4.0.0-alpha.2 --save\n</code>\n</pre>\n\n            <p>Then simply add the proper script tags to your <code>index.html</code></p>\n                        \n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;head&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/font-awesome/css/font-awesome.min.css&quot; /&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/bootstrap/dist/css/bootstrap.min.css&quot; /&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/fuel-ui/bundles/fuel-ui.min.css&quot; /&gt;\n&lt;/head&gt;\n\n...\n\n&lt;!-- All your SystemJS, Angular2, Rx, etc. scripts first! --&gt;\n&lt;script src=&quot;node_modules/fuel-ui/bundles/fuel-ui.min.js&quot;&gt;&lt;/script&gt;\n</code>\n</pre>\n        </div>\n    </div>\n    <div accordion-item class=\"fuel-ui-accordion\" #manuallyCli>\n        <div accordion-heading class=\"fuel-ui-accordion-heading fuel-ui-clickable\">\n            Manually with <a href=\"https://github.com/angular/angular-cli\">angular-cli</a>\n            <i class=\"pull-right fa\"\n                [ngClass]=\"{'fa-chevron-down': manuallyCli?.open, 'fa-chevron-right': !manuallyCli || !manuallyCli.open}\"></i>\n        </div>\n        <div class=\"fuel-ui-accordion-body\">\n<pre>\n<code class=\"language-bash\" code-highlight>\nng new example-project\ncd example-project\nnpm install fuel-ui font-awesome bootstrap@^4.0.0-alpha.2 --save\n</code>\n</pre>\n\n            <p>Go to your <code>angular-cli-build.js</code> file, and add the following to your <code>vendorNpmFiles</code> array:</p>\n\n<pre>\n<code class=\"language-markup\" code-highlight>\n'bootstrap/**/bootstrap.min.css',\n'font-awesome/**/font-awesome.min.css',\n'font-awesome/fonts/*',\n'fuel-ui/bundles/*'\n</code>\n</pre>\n\n            <p>Now build the project to copy over the necessary files to your vendor directory</p>\n\n<pre>\n<code class=\"language-markup\" code-highlight>\nng build\n</code>\n</pre>\n\n            <p>Then simply add the proper script tags to your <code>index.html</code></p>\n\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;head&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;vendor/font-awesome/css/font-awesome.min.css&quot; /&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;vendor/bootstrap/dist/css/bootstrap.min.css&quot; /&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;vendor/fuel-ui/bundles/fuel-ui.min.css&quot; /&gt;\n&lt;/head&gt;\n\n...\n\n&lt;!-- All your SystemJS, Angular2, Rx, etc. scripts first! --&gt;\n&lt;script src=&quot;vendor/fuel-ui/bundles/fuel-ui.min.js&quot;&gt;&lt;/script&gt;\n</code>\n</pre>\n        </div>\n    </div>\n</accordion>",
            directives: [CodeHighlighter_1.CodeHighlighter, AccordionItem_1.ACCORDION_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], InstallationComponent);
    return InstallationComponent;
}());
exports.InstallationComponent = InstallationComponent;

//# sourceMappingURL=demo.only.js.map
