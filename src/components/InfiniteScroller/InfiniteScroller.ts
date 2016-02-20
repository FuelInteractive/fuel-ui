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
 
 import { ElementUtils } from "../../utilities/ElementUtils";

@Directive({
    selector: "[scroll-item],.scroll-item"
})
export class ScrollItem {
    element: HTMLElement;
    
    get height(): number {
        return ElementUtils.outerHeight(this.element);
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
	
    @Output()
    topIndexChange: EventEmitter<any> = new EventEmitter();
    
    @Output()
    bottomIndexChange: EventEmitter<any> = new EventEmitter();
    
	lastScroll: number = 0;
	
    @ContentChildren(ScrollItem) 
    itemQuery: QueryList<ScrollItem>;
    firstItem: ScrollItem;
	container: Element
	scrollTarget: Element;
    
	constructor(element: ElementRef) {
		this.container = element.nativeElement.firstElementChild;
	}
	
	ngAfterContentInit(): void {
        this.firstItem = this.itemQuery.first;
        this.itemQuery.changes.subscribe(() => {
            this.handleItemChanges();
        });
	}
    
    ngAfterViewInit(): void {
        this.container.scrollTop += 1;
    }
    
	handleItemChanges() {
        if(this.firstItem == null)
            this.firstItem = this.itemQuery.first;
            
        if(this.firstItem !== this.itemQuery.first) {
            this.container.scrollTop += this.itemQuery.first.height;
            this.firstItem = this.itemQuery.first;
        }
    }
    
    getVisableIndicies(): void {
        var itemArray = this.itemQuery.toArray();
        var visableIndicies = itemArray
            .filter(i => this.checkVisableItem(i))
            .map(i => itemArray.indexOf(i));
        
        if(visableIndicies.length > 1) {
            console.log(visableIndicies[0]);
            this.topIndexChange.next(visableIndicies[0]);
            this.bottomIndexChange.next(visableIndicies[visableIndicies.length-1]);
        }
        else if(visableIndicies.length > 0) {
            console.log(visableIndicies[0]);
            this.topIndexChange.next(visableIndicies[0]);
        }        
    }
    
    checkVisableItem(item: ScrollItem): boolean {        
        var itemHeight = 0;
        for(let index in item.element.children)
            itemHeight += item.element.children[index].clientHeight;
            
        var itemTop = item.element.offsetTop;  
        var itemBottom = itemTop + item.element.children[0].clientHeight;
        var viewTop = this.container.scrollTop;
        var viewBottom = viewTop + this.container.clientHeight;
            
        if(itemTop >= viewTop && itemTop <= viewBottom) 
            return true;
        
        if(itemBottom >= viewTop && itemBottom <= viewBottom)
            return true;
        if(rect.top > this.container.clientHeight)
            
        if(itemTop <= viewTop && itemBottom >= viewBottom)
            return true;
            
        return false;
    }
	
	doscroll(event: Event) {		
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
		
        this.getVisableIndicies();
        
        if(target.scrollTop < 1)
            target.scrollTop = 1;
	}
    
    scrollToIndex(index: number) {
        var itemArray = this.itemQuery.toArray();
        
        var targetIndex = 0;
        if(index > 0 && index < itemArray.length)
            targetIndex = index;
        else if(index >= itemArray.length)
            targetIndex = itemArray.length - 1;
        
        var target = this.itemQuery.toArray()[targetIndex];
        var targetPosition = target.element.getBoundingClientRect().top;
        
        this.container.scrollTop = targetPosition;
    }
}

export var INFINITE_SCROLLER_PROVIDERS = [
    InfiniteScroller, ScrollItem
]