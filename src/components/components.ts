import {NgModule} from "@angular/core";

import {FuiAccordionModule} from "./Accordion/Accordion";
import {FuiAlertModule} from "./Alert/Alert";
import {FuiCarouselModule} from "./Carousel/Carousel";
import {FuiDatePickerModule} from "./DatePicker/DatePicker.Module";
import {FuiModalModule} from "./Modal/Modal";
import {FuiPaginationModule} from "./Pagination/Pagination";
import {FuiInfiniteScrollerModule} from "./InfiniteScroller/InfiniteScroller";
import {FuiDropdownModule} from "./Dropdown/Dropdown";
import {FuiTabModule} from "./Tab/Tab";
import {FuiTagModule} from "./Tag/Tag";
import {FuiTableSortableModule, TableSortable} from "./TableSortable/TableSortable";
import {FuiSliderModule} from "./Slider/Slider";
import {FuiTimePickerModule} from "./TimePicker/TimePicker";
import {FuiTextExpanderModule} from "./TextExpander/TextExpander";
import {FuiOffCanvasMenuModule} from "./OffCanvasMenu/OffCanvasMenu";

export * from "./Accordion/Accordion";
export * from "./Accordion/AccordionItem";
export * from "./Alert/Alert";
export * from "./Carousel/Carousel";
export * from "./Modal/Modal";
export * from "./Pagination/Pagination";
export * from "./InfiniteScroller/InfiniteScroller";
export * from "./DatePicker/DatePicker.Module";
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

// note bug in RC5 bundling requires modules/components be included in order of dependence
const componentModules = [
	FuiAccordionModule,
	FuiAlertModule,
	FuiCarouselModule,
	FuiInfiniteScrollerModule,
	FuiDatePickerModule,
	FuiDropdownModule,
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