import {Component, ViewEncapsulation, provide, ChangeDetectionStrategy, enableProdMode} from "@angular/core";
import {FORM_DIRECTIVES, FORM_PROVIDERS, CORE_DIRECTIVES, LocationStrategy, HashLocationStrategy } from "@angular/common";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {Routes, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router";
import {FUELUI_COMPONENT_PROVIDERS, FUELUI_DIRECTIVE_PROVIDERS, FUELUI_PIPE_PROVIDERS, CodeHighlighter} from "./fuel-ui";
import {AccordionDemo, AlertDemo, CarouselDemo, CollapseDemo, DatePickerDemo, DateRangePickerDemo, DropdownDemo, 
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

@Routes([
    { path: '/', component: DemoHome},
    { path: '/installation', component: InstallationComponent},
    { path: '/component/accordion', component: AccordionDemo },
    { path: '/component/alert', component: AlertDemo },
    { path: '/component/carousel', component: CarouselDemo },
    { path: '/component/datepicker', component: DatePickerDemo },
    { path: '/component/daterangepicker', component: DateRangePickerDemo },
    { path: '/component/dropdown', component: DropdownDemo },
    { path: '/component/infinitescroller', component: InfiniteScrollerDemo },
    { path: '/component/modal', component: ModalDemo },
    { path: '/component/pagination', component: PaginationDemo },
    { path: '/component/progress', component: ProgressDemo },
    { path: '/component/slider', component: SliderDemo },
    { path: '/component/tab', component: TabDemo },
    { path: '/component/tablesortable', component: TableSortableDemo },
    { path: '/component/tag', component: TagDemo },
    { path: '/component/timepicker', component: TimePickerDemo },
    { path: '/directive/animation', component: AnimationDemo },
    { path: '/directive/codehighlighter', component: CodeHighlighterDemo },
    { path: '/directive/collapse', component: CollapseDemo },
    { path: '/directive/tooltip', component: TooltipDemo },
    { path: '/pipe/format', component: FormatDemo },
    { path: '/pipe/maptoiterable', component: MapToIterableDemo },
    { path: '/pipe/orderby', component: OrderByDemo },
    { path: '/pipe/range', component: RangeDemo}
])
@Component({
	selector: "fuel-ui",
    template: `
    <div id="wrapper" [class.toggled]="toggled">
        <span *ngIf="toggled" class="fuel-ui-clickable fuel-ui-toggle" (click)="$event.preventDefault(); toggled = !toggled">
            <i class="fa fa-chevron-right"></i>
        </span>
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a (click)="clickNavLink()" [routerLink]="['/']">
                        <img src="https://pbs.twimg.com/profile_images/572406600309018624/r2ma7PE3.png" height="40"/> 
                        <span>Fuel-UI</span>
                    </a>
                    <i class="fa fa-bars fuel-ui-clickable pull-right" (click)="$event.preventDefault(); toggled = !toggled"></i>
                </li>
                <li><a (click)="clickNavLink()" [routerLink]="['/installation']">Installation</a></li>
                <accordion [closeOthers]="false" duration="500">
                    <accordion-item #componentNav [open]="false">
                        <li accordion-heading class="fuel-ui-clickable sidebar-title">
                            Components
                            <i class="pull-right fa"
                                [ngClass]="{'fa-minus': componentNav?.open, 'fa-plus': !componentNav || !componentNav.open}"></i>
                        </li>
                        
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'accordion']">Accordion</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'alert']">Alert</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'carousel']">Carousel</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'datepicker']">DatePicker</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'daterangepicker']">DateRangePicker</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'dropdown']">Dropdown</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'infinitescroller']">InfiniteScroller</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'modal']">Modal</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'pagination']">Pagination</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'progress']">Progress</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'slider']">Slider</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'tab']">Tabs</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'tablesortable']">TableSortable</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'tag']">Tags</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/component', 'timepicker']">TimePicker</a></li>
                    </accordion-item>
                    <accordion-item #directiveNav [open]="false">
                        <li accordion-heading class="fuel-ui-clickable sidebar-title">
                            Directives
                            <i class="pull-right fa"
                                [ngClass]="{'fa-minus': directiveNav?.open, 'fa-plus': !directiveNav || !directiveNav.open}"></i>
                        </li>
                        
                        <li><a (click)="clickNavLink()" [routerLink]="['/directive', 'animation']">Animation</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/directive', 'codehighlighter']">Code Highlighter</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/directive', 'collapse']">Collapse</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/directive', 'tooltip']">Tooltip</a></li>
                    </accordion-item>
                    <accordion-item #pipeNav [open]="false">
                        <li accordion-heading class="fuel-ui-clickable sidebar-title">
                            Pipes
                            <i class="pull-right fa"
                                [ngClass]="{'fa-minus': pipeNav?.open, 'fa-plus': !pipeNav || !pipeNav.open}"></i>
                        </li>
                        
                        <li><a (click)="clickNavLink()" [routerLink]="['/pipe', 'format']">Format</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/pipe', 'maptoiterable']">MapToIterable</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/pipe', 'orderby']">OrderBy</a></li>
                        <li><a (click)="clickNavLink()" [routerLink]="['/pipe', 'range']">Range</a></li>
                    </accordion-item>
                </accordion>
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
    toggled: boolean = false;
    
    clickNavLink(sidebar: any):void {
        if(this.toggled && document.querySelector("#sidebar-wrapper") && document.querySelector("#sidebar-wrapper").scrollTop) 
            document.querySelector("#sidebar-wrapper").scrollTop = 0;
            
        this.toggled = this.toggled ? !this.toggled : this.toggled;
    }
}

// enableProdMode();

bootstrap(DemoComponent, [
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    FUELUI_COMPONENT_PROVIDERS
]);
