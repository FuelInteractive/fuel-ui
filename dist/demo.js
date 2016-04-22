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
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var browser_1 = require("angular2/platform/browser");
var router_1 = require('angular2/router');
var fuel_ui_1 = require("./fuel-ui");
var fuel_ui_demo_1 = require('./fuel-ui-demo');
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
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Installation</h2>\n            <p class=\"card-text\">Fork our Quickstart! <a href=\"https://github.com/coryshaw1/ng2-play/\" target=\"_blank\">https://github.com/coryshaw1/ng2-play/</a></p>\n        </div>\n    </div>\n</div>\n\n<p>If you would like to add Fuel-UI to your Angular2 project through npm manually, do the following:</p>\n\n<p><code>npm install fuel-ui font-awesome --save</code></p>\n\n<p>Add this line to your dependencies in your <code>package.json</code></p>\n            \n<pre>\n<code class=\"language-javascript\" code-highlight>\n \"dependencies\": {\n    ...\n    \"bootstrap\": \"git://github.com/twbs/bootstrap.git#v4.0.0-alpha.2\"\n}\n</code>\n</pre>\n            \n<p>And finally, add the proper script tags to your <code>index.html</code></p>\n            \n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;head&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/font-awesome/css/font-awesome.min.css&quot; /&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/bootstrap/dist/css/bootstrap.min.css&quot; /&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/fuel-ui/bundles/fuel-ui.css&quot; /&gt;\n&lt;/head&gt;\n\n...\n\n&lt;!-- All your SystemJS, Angular2, Rx, etc. scripts first! --&gt;\n&lt;script src=&quot;node_modules/fuel-ui/bundles/fuel-ui.js&quot;&gt;&lt;/script&gt;\n</code>\n</pre>",
            directives: [fuel_ui_1.CodeHighlighter]
        }), 
        __metadata('design:paramtypes', [])
    ], InstallationComponent);
    return InstallationComponent;
}());
exports.InstallationComponent = InstallationComponent;
var DemoComponent = (function () {
    function DemoComponent() {
    }
    DemoComponent = __decorate([
        router_1.RouteConfig([
            { path: '/', name: 'DemoHome', component: DemoHome, useAsDefault: true },
            { path: '/installation', name: 'InstallationComponent', component: InstallationComponent },
            { path: '/component/alert', name: 'AlertDemo', component: fuel_ui_demo_1.AlertDemo },
            { path: '/component/carousel', name: 'CarouselDemo', component: fuel_ui_demo_1.CarouselDemo },
            { path: '/component/collapse', name: 'CollapseDemo', component: fuel_ui_demo_1.CollapseDemo },
            { path: '/component/datepicker', name: 'DatePickerDemo', component: fuel_ui_demo_1.DatePickerDemo },
            { path: '/component/daterangepicker', name: 'DateRangePickerDemo', component: fuel_ui_demo_1.DateRangePickerDemo },
            { path: '/component/dropdown', name: 'DropdownDemo', component: fuel_ui_demo_1.DropdownDemo },
            { path: '/component/infinitescroller', name: 'InfiniteScrollerDemo', component: fuel_ui_demo_1.InfiniteScrollerDemo },
            { path: '/component/modal', name: 'ModalDemo', component: fuel_ui_demo_1.ModalDemo },
            { path: '/component/pagination', name: 'PaginationDemo', component: fuel_ui_demo_1.PaginationDemo },
            { path: '/component/progress', name: 'ProgressDemo', component: fuel_ui_demo_1.ProgressDemo },
            { path: '/component/slider', name: 'SliderDemo', component: fuel_ui_demo_1.SliderDemo },
            { path: '/component/tab', name: 'TabDemo', component: fuel_ui_demo_1.TabDemo },
            { path: '/component/tablesortable', name: 'TableSortableDemo', component: fuel_ui_demo_1.TableSortableDemo },
            { path: '/directive/animation', name: 'AnimationDemo', component: fuel_ui_demo_1.AnimationDemo },
            { path: '/directive/codehighlighter', name: 'CodeHighlighterDemo', component: fuel_ui_demo_1.CodeHighlighterDemo },
            { path: '/directive/tooltip', name: 'TooltipDemo', component: fuel_ui_demo_1.TooltipDemo },
            { path: '/pipe/format', name: 'FormatDemo', component: fuel_ui_demo_1.FormatDemo },
            { path: '/pipe/maptoiterable', name: 'MapToIterableDemo', component: fuel_ui_demo_1.MapToIterableDemo },
            { path: '/pipe/orderby', name: 'OrderByDemo', component: fuel_ui_demo_1.OrderByDemo },
            { path: '/pipe/range', name: 'RangeDemo', component: fuel_ui_demo_1.RangeDemo }
        ]),
        core_1.Component({
            selector: "fuel-ui",
            template: "\n    <div id=\"wrapper\">\n        <div id=\"sidebar-wrapper\">\n            <ul class=\"sidebar-nav\">\n                <li class=\"sidebar-brand\">\n                    <a [routerLink]=\"['DemoHome']\">\n                        <img src=\"https://pbs.twimg.com/profile_images/572406600309018624/r2ma7PE3.png\" height=\"40\"/> \n                        <span>Fuel-UI</span>\n                    </a>\n                </li>\n                <li><a [routerLink]=\"['InstallationComponent']\">Installation</a></li>\n                <li class=\"sidebar-title\">Components</li>\n                <li><a [routerLink]=\"['AlertDemo']\">Alert</a></li>\n                <li><a [routerLink]=\"['CarouselDemo']\">Carousel</a></li>\n                <li><a [routerLink]=\"['CollapseDemo']\">Collapse</a></li>\n                <li><a [routerLink]=\"['DatePickerDemo']\">DatePicker</a></li>\n                <li><a [routerLink]=\"['DateRangePickerDemo']\">DateRangePicker</a></li>\n                <li><a [routerLink]=\"['DropdownDemo']\">Dropdown</a></li>\n                <li><a [routerLink]=\"['InfiniteScrollerDemo']\">InfiniteScroller</a></li>\n                <li><a [routerLink]=\"['ModalDemo']\">Modal</a></li>\n                <li><a [routerLink]=\"['PaginationDemo']\">Pagination</a></li>\n                <li><a [routerLink]=\"['ProgressDemo']\">Progress</a></li>\n                <li><a [routerLink]=\"['SliderDemo']\">Slider</a></li>\n                <li><a [routerLink]=\"['TabDemo']\">Tabs</a></li>\n                <li><a [routerLink]=\"['TableSortableDemo']\">TableSortable</a></li>\n                <li class=\"sidebar-title\">Directives</li>\n                <li><a [routerLink]=\"['AnimationDemo']\">Animation</a></li>\n                <li><a [routerLink]=\"['CodeHighlighterDemo']\">Code Highlighter</a></li>\n                <li><a [routerLink]=\"['TooltipDemo']\">Tooltip</a></li>\n                <li class=\"sidebar-title\">Pipes</li>\n                <li><a [routerLink]=\"['FormatDemo']\">Format</a></li>\n                <li><a [routerLink]=\"['MapToIterableDemo']\">MapToIterable</a></li>\n                <li><a [routerLink]=\"['OrderByDemo']\">OrderBy</a></li>\n                <li><a [routerLink]=\"['RangeDemo']\">Range</a></li>\n            </ul>\n        </div>\n        <!-- /#sidebar-wrapper -->\n\n        <!-- Page Content -->\n        <div id=\"page-content-wrapper\">\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <router-outlet></router-outlet>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- /#page-content-wrapper -->\n\n    </div>",
            directives: [common_1.CORE_DIRECTIVES, fuel_ui_1.FUELUI_COMPONENT_PROVIDERS, fuel_ui_1.FUELUI_DIRECTIVE_PROVIDERS, common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None,
            pipes: [fuel_ui_1.FUELUI_PIPE_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], DemoComponent);
    return DemoComponent;
}());
exports.DemoComponent = DemoComponent;
core_1.enableProdMode();
browser_1.bootstrap(DemoComponent, [
    router_1.ROUTER_PROVIDERS,
    common_1.FORM_PROVIDERS,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    fuel_ui_1.FUELUI_COMPONENT_PROVIDERS
]);

//# sourceMappingURL=demo.js.map
