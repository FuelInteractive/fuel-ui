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
	AfterContentInit,
    AfterViewInit
 } from "angular2/core";

@Directive({
	selector: '.infinite-scroll-item'
})
export class InfiniteScrollItem {
	public element: Element;
	constructor(element: ElementRef) {
		this.element = element.nativeElement;
	}
}

@Component({
	selector: 'infinite-scroller'
})
@View({
	template: `
		<div class="scroll-container" 
			(scroll)="doscroll($event)"
			[style.height.px]="height">
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
	`],
	directives: []
})
export class InfiniteScroller implements AfterContentInit, AfterViewInit {
	@Input()
	distance: number;
	
	@Input()
	height: number;
	
	@Output()
	next: EventEmitter<any> = new EventEmitter();
	
	@Output()
	prev: EventEmitter<any> = new EventEmitter();
	
	lastScroll: number = 0;
	isScrolling: boolean = false;
	
	container: Element
	
	constructor(element: ElementRef) {
		this.container = element.nativeElement;
	}
	
	ngAfterContentInit(): void {
		this.container.firstElementChild.scrollTop = 1;
	}
	
	ngAfterViewInit(): void {
		
	}
	
	doscroll(event: Event) {
		this.isScrolling = true;
		
		var target = <Element>(typeof event.srcElement === 'undefined' ? event.target : event.srcElement);
		var targetRect = target.getBoundingClientRect();
		var bottomPosition = target.scrollHeight - (target.scrollTop + targetRect.height);
		
		var scrollDown = target.scrollTop > this.lastScroll;
		var saveLastScroll = this.lastScroll;
		this.lastScroll = target.scrollTop;
		
		if(scrollDown && target.scrollHeight - (target.scrollTop + targetRect.height) <= this.distance*2) {
			this.next.emit(null);
			if(target.scrollHeight - target.scrollTop === target.clientHeight) {
				target.scrollTop -= 10;
			}
		} 
		else if(!scrollDown && target.scrollTop <= this.distance*2) {
			this.prev.emit(null);
			target.scrollTop = saveLastScroll > 0 ? saveLastScroll : 1;
		}
		
		this.isScrolling = false;
	}
}