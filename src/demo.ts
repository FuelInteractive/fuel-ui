import {Component, ViewEncapsulation, provide, ChangeDetectionStrategy, enableProdMode} from "angular2/core";
import {FORM_DIRECTIVES, FORM_PROVIDERS, CORE_DIRECTIVES } from "angular2/common";
import {bootstrap} from "angular2/platform/browser";
import {LocationStrategy, HashLocationStrategy} from "angular2/platform/common";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {FUELUI_COMPONENT_PROVIDERS, FUELUI_DIRECTIVE_PROVIDERS, FUELUI_PIPE_PROVIDERS, CodeHighlighter} from "./fuel-ui";
import {AlertDemo, CarouselDemo, CollapseDemo, DatePickerDemo, DateRangePickerDemo, DropdownDemo, 
    InfiniteScrollerDemo, ModalDemo, PaginationDemo, ProgressDemo, TableSortableDemo, AnimationDemo, CodeHighlighterDemo,
    TooltipDemo, FormatDemo, MapToIterableDemo, OrderByDemo, RangeDemo, SliderDemo, TabDemo, TagDemo, TimePickerDemo} from './fuel-ui-demo';

@Component({
    template: `
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h2 class="display-3">Fuel-UI</h2>
            <p class="lead">Fuel-UI is a collection of native <a href="http://angular.io" target="_blank">Angular 2</a> components, directives, and pipes for <a href="http://v4-alpha.getbootstrap.com/" target="_blank">Bootstrap 4</a>.</p>
            
            <a href="https://github.com/FuelInteractive/fuel-ui/releases" target="_blank" class="btn btn-fuel">Download <i class="fa fa-download"></i></a> 
            <a href="https://github.com/FuelInteractive/fuel-ui" target="_blank" class="btn btn-fuel">View on GitHub <i class="fa fa-external-link"></i></a> 
            <a href="https://www.npmjs.com/package/fuel-ui" target="_blank" class="btn btn-fuel">View npm Package <i class="fa fa-external-link"></i></a>
        </div>
    </div>
    
    <p>Fuel-UI is developed by <a href="http://fueltravel.com" target="_blank">Fuel Travel</a>, a company with years of expertise in the travel marketing industry. For project news and updates, follow us on <a href="http://twitter.com/fueltravel" target="_blank">twitter</a>.</p>`
})
export class DemoHome {
    
}

@Component({
    template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Installation</h2>
            <p class="card-text">Fork our Quickstart! <a href="https://github.com/coryshaw1/ng2-play/" target="_blank">https://github.com/coryshaw1/ng2-play/</a></p>
        </div>
    </div>
</div>

<p>If you would like to add Fuel-UI to your Angular2 project through npm manually, do the following:</p>

<p><code>npm install fuel-ui font-awesome bootstrap@^4.0.0-alpha.2 --save</code></p>
            
<p>Then simply add the proper script tags to your <code>index.html</code></p>
            
<pre>
<code class="language-markup" code-highlight>
&lt;head&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/font-awesome/css/font-awesome.min.css&quot; /&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/bootstrap/dist/css/bootstrap.min.css&quot; /&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/fuel-ui/bundles/fuel-ui.min.css&quot; /&gt;
&lt;/head&gt;

...

&lt;!-- All your SystemJS, Angular2, Rx, etc. scripts first! --&gt;
&lt;script src=&quot;node_modules/fuel-ui/bundles/fuel-ui.min.js&quot;&gt;&lt;/script&gt;
</code>
</pre>`,
directives: [CodeHighlighter]
})
export class InstallationComponent {
    
}

@RouteConfig([
  {path:'/', name: 'DemoHome', component: DemoHome, useAsDefault: true},
  {path:'/installation', name: 'InstallationComponent', component: InstallationComponent},
  {path:'/component/alert', name: 'AlertDemo', component: AlertDemo},
  {path:'/component/carousel', name: 'CarouselDemo', component: CarouselDemo},
  {path:'/component/datepicker', name: 'DatePickerDemo', component: DatePickerDemo},
  {path:'/component/daterangepicker', name: 'DateRangePickerDemo', component: DateRangePickerDemo},
  {path:'/component/dropdown', name: 'DropdownDemo', component: DropdownDemo},
  {path:'/component/infinitescroller', name: 'InfiniteScrollerDemo', component: InfiniteScrollerDemo},
  {path:'/component/modal', name: 'ModalDemo', component: ModalDemo},
  {path:'/component/pagination', name: 'PaginationDemo', component: PaginationDemo},
  {path:'/component/progress', name: 'ProgressDemo', component: ProgressDemo},
  {path:'/component/slider', name: 'SliderDemo', component: SliderDemo},
  {path:'/component/tab', name: 'TabDemo', component: TabDemo},
  {path:'/component/tablesortable', name: 'TableSortableDemo', component: TableSortableDemo},
  {path:'/component/tag', name: 'TagDemo', component: TagDemo},
  {path:'/component/timepicker', name: 'TimePickerDemo', component: TimePickerDemo},
  {path:'/directive/animation', name: 'AnimationDemo', component: AnimationDemo},
  {path:'/directive/codehighlighter', name: 'CodeHighlighterDemo', component: CodeHighlighterDemo},
  {path:'/directive/collapse', name: 'CollapseDemo', component: CollapseDemo},
  {path:'/directive/tooltip', name: 'TooltipDemo', component: TooltipDemo},
  {path:'/pipe/format', name: 'FormatDemo', component: FormatDemo},
  {path:'/pipe/maptoiterable', name: 'MapToIterableDemo', component: MapToIterableDemo},
  {path:'/pipe/orderby', name: 'OrderByDemo', component: OrderByDemo},
  {path:'/pipe/range', name: 'RangeDemo', component: RangeDemo}
])
@Component({
	selector: "fuel-ui",
    template: `
    <div id="wrapper">
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a [routerLink]="['DemoHome']">
                        <img src="https://pbs.twimg.com/profile_images/572406600309018624/r2ma7PE3.png" height="40"/> 
                        <span>Fuel-UI</span>
                    </a>
                </li>
                <li><a [routerLink]="['InstallationComponent']">Installation</a></li>
                <li class="sidebar-title">Components</li>
                <li><a [routerLink]="['AlertDemo']">Alert</a></li>
                <li><a [routerLink]="['CarouselDemo']">Carousel</a></li>
                <li><a [routerLink]="['DatePickerDemo']">DatePicker</a></li>
                <li><a [routerLink]="['DateRangePickerDemo']">DateRangePicker</a></li>
                <li><a [routerLink]="['DropdownDemo']">Dropdown</a></li>
                <li><a [routerLink]="['InfiniteScrollerDemo']">InfiniteScroller</a></li>
                <li><a [routerLink]="['ModalDemo']">Modal</a></li>
                <li><a [routerLink]="['PaginationDemo']">Pagination</a></li>
                <li><a [routerLink]="['ProgressDemo']">Progress</a></li>
                <li><a [routerLink]="['SliderDemo']">Slider</a></li>
                <li><a [routerLink]="['TabDemo']">Tabs</a></li>
                <li><a [routerLink]="['TableSortableDemo']">TableSortable</a></li>
                <li><a [routerLink]="['TagDemo']">Tags</a></li>
                <li><a [routerLink]="['TimePickerDemo']">TimePicker</a></li>
                <li class="sidebar-title">Directives</li>
                <li><a [routerLink]="['AnimationDemo']">Animation</a></li>
                <li><a [routerLink]="['CodeHighlighterDemo']">Code Highlighter</a></li>
                <li><a [routerLink]="['CollapseDemo']">Collapse</a></li>
                <li><a [routerLink]="['TooltipDemo']">Tooltip</a></li>
                <li class="sidebar-title">Pipes</li>
                <li><a [routerLink]="['FormatDemo']">Format</a></li>
                <li><a [routerLink]="['MapToIterableDemo']">MapToIterable</a></li>
                <li><a [routerLink]="['OrderByDemo']">OrderBy</a></li>
                <li><a [routerLink]="['RangeDemo']">Range</a></li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <router-outlet></router-outlet>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->

    </div>`,
    directives: [CORE_DIRECTIVES, FUELUI_COMPONENT_PROVIDERS, FUELUI_DIRECTIVE_PROVIDERS, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    encapsulation: ViewEncapsulation.None,
    pipes: [FUELUI_PIPE_PROVIDERS]
})
export class DemoComponent {
    
}

// enableProdMode();

bootstrap(DemoComponent, [
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    FUELUI_COMPONENT_PROVIDERS
]);
