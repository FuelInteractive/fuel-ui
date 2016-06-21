"use strict";
var router_1 = require('@angular/router');
var demo_only_1 = require('./demo.only');
var fuel_ui_demo_1 = require('./fuel-ui-demo');
var routes = [
    { path: '', component: demo_only_1.DemoHome },
    { path: 'installation', component: demo_only_1.InstallationComponent },
    { path: 'animation/collapse', component: fuel_ui_demo_1.CollapseDemo },
    { path: 'component/accordion', component: fuel_ui_demo_1.AccordionDemo },
    { path: 'component/alert', component: fuel_ui_demo_1.AlertDemo },
    { path: 'component/carousel', component: fuel_ui_demo_1.CarouselDemo },
    { path: 'component/datepicker', component: fuel_ui_demo_1.DatePickerDemo },
    { path: 'component/daterangepicker', component: fuel_ui_demo_1.DateRangePickerDemo },
    { path: 'component/dropdown', component: fuel_ui_demo_1.DropdownDemo },
    { path: 'component/infinitescroller', component: fuel_ui_demo_1.InfiniteScrollerDemo },
    { path: 'component/modal', component: fuel_ui_demo_1.ModalDemo },
    { path: 'component/pagination', component: fuel_ui_demo_1.PaginationDemo },
    { path: 'component/progress', component: fuel_ui_demo_1.ProgressDemo },
    { path: 'component/slider', component: fuel_ui_demo_1.SliderDemo },
    { path: 'component/tab', component: fuel_ui_demo_1.TabDemo },
    { path: 'component/tablesortable', component: fuel_ui_demo_1.TableSortableDemo },
    { path: 'component/tag', component: fuel_ui_demo_1.TagDemo },
    { path: 'component/textexpander', component: fuel_ui_demo_1.TextExpanderDemo },
    { path: 'component/timepicker', component: fuel_ui_demo_1.TimePickerDemo },
    { path: 'directive/animation', component: fuel_ui_demo_1.AnimationDemo },
    { path: 'directive/codehighlighter', component: fuel_ui_demo_1.CodeHighlighterDemo },
    { path: 'directive/tooltip', component: fuel_ui_demo_1.TooltipDemo },
    { path: 'pipe/format', component: fuel_ui_demo_1.FormatDemo },
    { path: 'pipe/maptoiterable', component: fuel_ui_demo_1.MapToIterableDemo },
    { path: 'pipe/orderby', component: fuel_ui_demo_1.OrderByDemo },
    { path: 'pipe/range', component: fuel_ui_demo_1.RangeDemo }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes)
];

//# sourceMappingURL=demo.routes.js.map
