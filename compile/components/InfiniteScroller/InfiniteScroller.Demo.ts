import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "InfiniteScroller.Demo.html"
})
export class InfiniteScrollerDemo {
    infiniteScrollItems: string[] = [];
    infiniteScrollMin: number = 0;
    infiniteScrollMax: number = 1;

    markupExample = `&lt;infinite-scroller 
    (next)=&quot;infinteScrollNext()&quot; 
    (prev)=&quot;infiniteScrollPrev()&quot; 
    height=&quot;300px&quot;
    distance=&quot;120&quot;
    hideScrollbar=&quot;true&quot;&gt;
    &lt;div *ngFor=&quot;#item of infiniteScrollItems&quot; 
        class=&quot;card p-a scroll-item&quot;&gt;
        &lt;div class=&quot;card-block&quot;&gt;
            &lt;h4 class=&quot;card-title&quot;&gt;Some Item&lt;/h4&gt;
            &lt;p class=&quot;card-text&quot;&gt;{{item}}&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/infinite-scroller&gt;`;

    codeExample = `export class InfiniteScrollerDemo {
    infiniteScrollItems: string[] = [];
    infiniteScrollMin: number = 0;
    infiniteScrollMax: number = 1;

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.infinteScrollNext(false);
        }
    }

    infiniteScrollPrev(): void {
        var newItem = "";
        for (let i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMin + " ";
        }

        this.infiniteScrollMin--;
        this.infiniteScrollItems.unshift(newItem);
    }

    infinteScrollNext(clean: boolean = true): void {
        var newItem = "";
        for (let i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMax + " ";
        }

        this.infiniteScrollMax++;
        this.infiniteScrollItems.push(newItem);
    }
}`;

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.infinteScrollNext(false);
        }
    }

    infiniteScrollPrev(): void {
        var newItem = "";
        for (let i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMin + " ";
        }

        this.infiniteScrollMin--;
        this.infiniteScrollItems.unshift(newItem);
    }

    infinteScrollNext(clean: boolean = true): void {
        var newItem = "";
        for (let i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMax + " ";
        }

        this.infiniteScrollMax++;
        this.infiniteScrollItems.push(newItem);
    }
    
    attributes:Attribute[] = [
        new Attribute('height', 'string', 'auto', "Height of element. Examples: '300px', '10%', 'auto', etc."),
        new Attribute('distance', 'number', '100', 'How far up and down the user can scroll for more scroll items'),
        new Attribute('hideScrollbar', 'boolean', 'false', 'Hide the scrollbar of the InfiniteScroller')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    events:Event[] = [
        new Event('next', 'null', 'When a scroll item is passed when scrolling down'),
        new Event('prev', 'null', 'When a scroll item is passed when scrolling up'),
    ];
    eventsColumns:TableSortableColumn[] = EventColumns;
    eventsSort:TableSortableSorting = EventsDefaultSort;
}