import { provideRouter, RouterConfig } from '@angular/router';
import {DemoHome, InstallationComponent} from './demo.only';
import {AccordionDemo, AlertDemo, CarouselDemo, CollapseDemo, DatePickerDemo, DateRangePickerDemo, DropdownDemo, 
    InfiniteScrollerDemo, ModalDemo, OffCanvasMenuDemo, PaginationDemo, ProgressDemo, TableSortableDemo, AnimationDemo, CodeHighlighterDemo,
    TooltipDemo, FormatDemo, MapToIterableDemo, OrderByDemo, RangeDemo, SliderDemo, TabDemo, TagDemo, TimePickerDemo, TextExpanderDemo} from './fuel-ui-demo';

const routes: RouterConfig = [
    { path: '', component: DemoHome },
    { path: 'installation', component: InstallationComponent},
    { path: 'animation/collapse', component: CollapseDemo },
    { path: 'component/accordion', component: AccordionDemo },
    { path: 'component/alert', component: AlertDemo },
    { path: 'component/carousel', component: CarouselDemo },
    { path: 'component/datepicker', component: DatePickerDemo },
    { path: 'component/daterangepicker', component: DateRangePickerDemo },
    { path: 'component/dropdown', component: DropdownDemo },
    { path: 'component/infinitescroller', component: InfiniteScrollerDemo },
    { path: 'component/modal', component: ModalDemo },
    { path: 'component/offCanvasMenu', component: OffCanvasMenuDemo },
    { path: 'component/pagination', component: PaginationDemo },
    { path: 'component/progress', component: ProgressDemo },
    { path: 'component/slider', component: SliderDemo },
    { path: 'component/tab', component: TabDemo },
    { path: 'component/tablesortable', component: TableSortableDemo },
    { path: 'component/tag', component: TagDemo },
    { path: 'component/textexpander', component: TextExpanderDemo },
    { path: 'component/timepicker', component: TimePickerDemo },
    { path: 'directive/animation', component: AnimationDemo },
    { path: 'directive/codehighlighter', component: CodeHighlighterDemo },
    { path: 'directive/tooltip', component: TooltipDemo },
    { path: 'pipe/format', component: FormatDemo },
    { path: 'pipe/maptoiterable', component: MapToIterableDemo },
    { path: 'pipe/orderby', component: OrderByDemo },
    { path: 'pipe/range', component: RangeDemo}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];