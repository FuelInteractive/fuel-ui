import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {InstallationComponent} from "./installation.component";

import {CollapseDemo} from "../animations/animations.demo";
import {AccordionDemo, AlertDemo, CarouselDemo, DatePickerDemo, DateRangePickerDemo,
    DropdownDemo, InfiniteScrollerDemo, ModalDemo, OffCanvasMenuDemo, PaginationDemo,
    ProgressDemo, SliderDemo, TabDemo, TableSortableDemo, TagDemo, 
    TextExpanderDemo, TimePickerDemo} from "../components/components.demo";
import {CodeHighlighterDemo, TooltipDemo} from "../directives/directives.demo";
import {FormatDemo, MapToIterableDemo, OrderByDemo, RangeDemo} from "../pipes/pipes.demo";

const routes: Routes = [
    { path: '', component: HomeComponent },
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
    { path: 'directive/codehighlighter', component: CodeHighlighterDemo },
    { path: 'directive/tooltip', component: TooltipDemo },
    { path: 'pipe/format', component: FormatDemo },
    { path: 'pipe/maptoiterable', component: MapToIterableDemo },
    { path: 'pipe/orderby', component: OrderByDemo },
    { path: 'pipe/range', component: RangeDemo}
];

export const demoRouting = RouterModule.forRoot(routes);