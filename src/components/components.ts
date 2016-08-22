import {NgModule} from "@angular/core";

import {FuiAccordionModule} from "./accordion/accordion";
import {FuiAlertModule} from "./alert/alert";
import {FuiCarouselModule} from "./carousel/carousel";
import {FuiDatePickerModule} from "./datePicker/datePicker.module";
import {FuiModalModule} from "./modal/modal";
import {FuiPaginationModule} from "./pagination/pagination";
import {FuiInfiniteScrollerModule} from "./infiniteScroller/infiniteScroller";
import {FuiDropdownModule} from "./dropdown/dropdown";
import {FuiTabModule} from "./tab/tab";
import {FuiTagModule} from "./tag/tag";
import {FuiTableSortableModule, TableSortable} from "./tableSortable/tableSortable";
import {FuiSliderModule} from "./slider/slider";
import {FuiTimePickerModule} from "./timePicker/timePicker";
import {FuiTextExpanderModule} from "./textExpander/textExpander";
import {FuiOffCanvasMenuModule} from "./offCanvasMenu/offCanvasMenu";

export * from "./Accordion/Accordion";
export * from "./Accordion/AccordionItem";
export * from "./Alert/Alert";
export * from "./Carousel/Carousel";
export * from "./Modal/Modal";
export * from "./Pagination/Pagination";
export * from "./InfiniteScroller/InfiniteScroller";
export * from "./datePicker/datePicker.module";
export * from "./Dropdown/Dropdown";
export * from "./Tab/Tab";
export * from "./Tab/TabSet";
export * from "./TableSortable/TableSortable";
export * from "./TableSortable/TableSortableColumn";
export * from "./TableSortable/TableSortableSorting";
export * from "./Tag/Tag";
export * from "./Tag/TagSet";
export * from "./Slider/Slider";
export * from "./TimePicker/TimePicker";
export * from "./TextExpander/TextExpander";
export * from "./OffCanvasMenu/OffCanvasMenu";

const componentModules = [
	FuiAccordionModule,
	FuiAlertModule,
	FuiCarouselModule,
	FuiDatePickerModule,
	FuiDropdownModule,
	FuiInfiniteScrollerModule,
	FuiModalModule,
	FuiOffCanvasMenuModule,
	FuiPaginationModule,
    FuiTabModule,
    FuiTagModule,
	FuiTableSortableModule,
	FuiSliderModule,
	FuiTimePickerModule,
	FuiTextExpanderModule, 
];

@NgModule({
	imports: [
		...componentModules
	],
	exports: componentModules
})
export class FuiComponentsModule { }