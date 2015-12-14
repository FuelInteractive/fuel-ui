import { 
	Directive,
	Component, 
	View, 
	ElementRef, 
	Input, 
	Output, 
	EventEmitter,
	ContentChildren,
	ViewChildren,
	QueryList,
	AfterContentInit
 } from "angular2/core";

@Component({
	selector: 'infinite-scroller'
})
@View({
	template: `
		<div class="scroll-container" (scroll)="doscroll($event)">
			<ng-content></ng-content>
		</div>
	`,
	styles: [`
		.scroll-container {
			overflow-y: scroll;
			overflow-x: hidden;
			height: 300px;
		}
		
		.scroll-container::-webkit-scrollbar {
			display: none;
		}
		
		.scroll-content {
			overflow: auto;
		}
	`]
})
export class InfiniteScroller implements AfterContentInit {
	@Input()
	distance: number;
	
	@Output()
	next = new EventEmitter();
	
	@Output()
	prev: EventEmitter<any> = new EventEmitter();
	
	@ContentChildren(InfiniteScrollItem)
	contentQuery: QueryList<InfiniteScrollItem>;
	
	container: Element
	
	constructor(element: ElementRef) {
		this.container = element.nativeElement;
	}
	
	ngAfterContentInit(): void {
		this.contentQuery.changes
			.subscribe(() => this.contentQuery.map(i => console.log(this)));
	}
	
	registerItems(): void {

	}
	
	doscroll(event: Event) {
		
		var target = <Element>(typeof event.srcElement === 'undefined' ? event.target : event.srcElement);
		
		var height = target.getBoundingClientRect().height;
		
		if(height - target.scrollTop > 100)
			return;
		
		console.log(this.contentQuery);
		//console.log(this.itemQuery);
		//console.log(this.itemQuery.first.element.getBoundingClientRect().top);
		this.next.emit(null);
	}
	
	isVisable(item: InfiniteScrollItem): boolean {
		var containerRect = this.container.getBoundingClientRect();
		var itemRect = item.element.getBoundingClientRect();
		
		return itemRect.top < containerRect.height;
	}
}

@Directive({
	selector: '[infinite-scroll-item]'
})
export class InfiniteScrollItem {
	public element: Element;
	constructor(element: ElementRef) {
		this.element = element.nativeElement;
		//console.log(this);
	}
}

export var InfiniteScrollerProviders = [
	InfiniteScroller,
	InfiniteScrollItem
]