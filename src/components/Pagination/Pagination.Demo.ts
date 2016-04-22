import {Component} from 'angular2/core';
import {PAGINATION_PROVIDERS} from './Pagination';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Pagination</h2>
            <p class="card-text">Pagination is a custom component to display a pagination number list</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <div class="col-md-8">
        <form>
            <div class="form-group row">
                <label for="totalPages" class="col-sm-2 form-control-label">Total Pages</label>
                <div class="col-sm-2">
                    <input class="form-control" [(ngModel)]="totalPages" min="1" type="number" name="totalPages">
                </div>
            </div>
            <div class="form-group row">
                <label for="pagesAtOnce" class="col-sm-2 form-control-label">Pages At Once</label>
                <div class="col-sm-2">
                    <input class="form-control" [(ngModel)]="pagesAtOnce" min="1" [max]="totalPages" type="number" name="pagesAtOnce">
                </div>
            </div>
            <div class="form-group row">
                <label for="currentPage" class="col-sm-2 form-control-label">Current Page</label>
                <div class="col-sm-2">
                    <input class="form-control" [(ngModel)]="currentPage" min="1" [max]="totalPages" type="number" name="currentPage">
                </div>
            </div>
        </form>
        <pagination
            [(currentPage)]="currentPage"
            [totalPages]="totalPages"
            [pagesAtOnce]="pagesAtOnce"
            (currentPageChange)="pageChange($event)">
        </pagination>
    </div>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {Pagination} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Pagination is a custom element to show an interactive list of page numbers to use for paging</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;pagination
    [(currentPage)]=&quot;currentPage&quot;
    totalPages=&quot;10&quot;
    pagesAtOnce=&quot;1&quot;
    (currentPageChange)=&quot;pageChange($event)&quot;&gt;
&lt;/pagination&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class PaginationExample {
    currentPage: number = 1;
    
    pageChange(page: number): void {
        console.log('New Page: ' + page);
    }
}
</code>
</pre>
</tab>
</tabset>

<h3>Attributes</h3>
<table-sortable
    [columns]="attributesColumns"
    [data]="attributes"
    [sort]="attributesSort">
    Loading table...
</table-sortable>

<h3>Events</h3>
<table-sortable
    [columns]="eventsColumns"
    [data]="events"
    [sort]="eventsSort">
    Loading table...
</table-sortable>

</div>`,
        directives: [PAGINATION_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class PaginationDemo {
    totalPages: number = 10;
    pagesAtOnce: number = 5;
    currentPage: number = 1;
    
    pageChange(page: number): void {
        this.currentPage = page;
    }
    
    attributes:Attribute[] = [
        new Attribute('currentPage', 'number', '1', 'Currently active page'),
        new Attribute('pagesAtOnce', 'number', '5', 'The max number of pages to be displayed at once'),
        new Attribute('totalPages', 'number', '10', 'Total number of pages')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    events:Event[] = [
        new Event('currentPageChange', '$event = newCurrentPage: number', 'New active page number')
    ];
    eventsColumns:TableSortableColumn[] = EventColumns;
    eventsSort:TableSortableSorting = EventsDefaultSort;
}

export var PAGINATION_DEMO_PROVIDERS = [
    PaginationDemo
];