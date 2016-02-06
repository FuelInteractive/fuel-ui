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
 
 import { outerHeight } from "../../utilities/ElementUtils";

@Directive({
    selector: "[scroll-item],.scroll-item"
})
export class ScrollItem {
    element: Element;
    
    get height(): number {
        return outerHeight(this.element);
    }
    
    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }
}

@Component({
	selector: "infinite-scroller"
})
@View({
	template: `
		<div class="scroll-container" 
			(scroll)="doscroll($event)"
			[style.height.px]="height"
			[class.hide-scrollbar]="hideScrollbar">
			<ng-content></ng-content>
		</div>
	`,
	styles: [`
		.scroll-container {
			overflow-y: scroll;
			overflow-x: hidden;
		}
		
		.scroll-container.hide-scrollbar::-webkit-scrollbar {
			display: none;
		}
		
		.scroll-content {
			overflow: auto;
		}
	`],
	directives: []
})
export class InfiniteScroller 
    implements AfterContentInit, AfterViewInit 
{        
	@Input()
	distance: number = 100;
	@Input()
	height: string = 'auto';
	@Input()
	hideScrollbar: boolean = false;
	
	@Output()
	next: EventEmitter<any> = new EventEmitter();
	
	@Output()
	prev: EventEmitter<any> = new EventEmitter();
	
	lastScroll: number = 0;
	isScrolling: boolean = false;
	
    @ContentChildren(ScrollItem) 
    itemQuery: QueryList<ScrollItem>;
    firstItem: ScrollItem;
	container: Element
	scrollTarget: Element;
    
	constructor(element: ElementRef) {
		this.container = element.nativeElement;
	}
	
	ngAfterContentInit(): void {
        this.firstItem = this.itemQuery.first;
        this.itemQuery.changes.subscribe(() => {
            this.handleItemChanges();
        });
	}
    
    ngAfterViewInit(): void {
        this.container.firstElementChild.scrollTop += 1;
    }
    
	handleItemChanges() {        
        if(this.firstItem == null)
            this.firstItem = this.itemQuery.first;
            
        if(this.firstItem !== this.itemQuery.first) {
            this.container.firstElementChild.scrollTop += this.itemQuery.first.height;
            this.firstItem = this.itemQuery.first;
        }
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
		}
		
		this.isScrolling = false;
	}
}

export var INFINITESCROLLER_PROVIDERS = [
    InfiniteScroller, ScrollItem
]