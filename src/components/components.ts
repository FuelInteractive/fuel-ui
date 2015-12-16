import {ALERT_PROVIDERS, Alert} from "./Alert/Alert";
import {CAROUSEL_PROVIDERS, Carousel, CarouselItem} from "./Carousel/Carousel";
import {DatePicker} from "./DatePicker/DatePicker";
import {MODAL_PROVIDERS, Modal} from "./Modal/Modal";
import {PAGINATION_PROVIDERS, Pagination} from "./Pagination/Pagination";
import {InfiniteScroller} from "./InfiniteScroller/InfiniteScroller";

export var FUELUI_COMPONENT_PROVIDERS = [
	ALERT_PROVIDERS,
	CAROUSEL_PROVIDERS,
	DatePicker,
	MODAL_PROVIDERS,
	PAGINATION_PROVIDERS,
	InfiniteScroller
];

export * from "./Alert/Alert";
export * from "./Carousel/Carousel";
export * from "./DatePicker/DatePicker";
export * from "./Modal/Modal";
export * from "./Pagination/Pagination";
export * from "./InfiniteScroller/InfiniteScroller";