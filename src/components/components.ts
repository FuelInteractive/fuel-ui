import {ALERT_PROVIDERS, Alert} from "./Alert/Alert";
import {CAROUSEL_PROVIDERS, Carousel, CarouselItem} from "./Carousel/Carousel";
import {DATE_PICKER_PROVIDERS, DatePickerCalendar, DatePicker, DateRangePicker} from "./DatePicker/DatePickerProviders";
import {MODAL_PROVIDERS, Modal} from "./Modal/Modal";
import {PAGINATION_PROVIDERS, Pagination} from "./Pagination/Pagination";
import {INFINITE_SCROLLER_PROVIDERS, InfiniteScroller, ScrollItem} from "./InfiniteScroller/InfiniteScroller";
import {DROPDOWN_COMPONENT_PROVIDERS, Dropdown} from "./Dropdown/Dropdown";
import {TAB_PROVIDERS, Tab} from "./Tab/Tab";
import {TabSet} from "./Tab/TabSet";
import {TAG_PROVIDERS, Tag} from "./Tag/Tag";
import {TagSet} from "./Tag/TagSet";
import {TABLESORTABLE_PROVIDERS, TableSortable} from "./TableSortable/TableSortable";
import {TableSortableColumn} from "./TableSortable/TableSortableColumn";
import {TableSortableSorting} from "./TableSortable/TableSortableSorting";
import {SLIDER_COMPONENT_PROVIDERS, Slider} from "./Slider/Slider";

export var FUELUI_COMPONENT_PROVIDERS = [
	ALERT_PROVIDERS,
	CAROUSEL_PROVIDERS,
	DATE_PICKER_PROVIDERS,
	MODAL_PROVIDERS,
	PAGINATION_PROVIDERS,
	INFINITE_SCROLLER_PROVIDERS,
    DROPDOWN_COMPONENT_PROVIDERS,
    TABLESORTABLE_PROVIDERS,
    SLIDER_COMPONENT_PROVIDERS,
	TAB_PROVIDERS,
	TAG_PROVIDERS
];

export * from "./Alert/Alert";
export * from "./Carousel/Carousel";
export * from "./DatePicker/DatePickerProviders";
export * from "./Modal/Modal";
export * from "./Pagination/Pagination";
export * from "./InfiniteScroller/InfiniteScroller";
export * from "./Dropdown/Dropdown";
export * from "./Tab/Tab";
export * from "./Tab/TabSet";
export * from "./TableSortable/TableSortable";
export * from "./TableSortable/TableSortableColumn";
export * from "./TableSortable/TableSortableSorting";
export * from "./Tag/Tag";
export * from "./Tag/TagSet";
export * from "./Slider/Slider";