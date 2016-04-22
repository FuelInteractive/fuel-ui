import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from "angular2/common";
import {TAB_PROVIDERS, Tab} from './Tab';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Tabs</h2>
            <p class="card-text">TabSet is a custom component to display a tabbed interface</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <div (click)="$event.preventDefault()">
    <p>Select a tab by setting active binding to true:</p>
    <p>
        <button type="button" class="btn btn-primary btn-sm" [disabled]="tabs[1].active" (click)="tabs[1].active = true">Select 2nd tab</button>
        <button type="button" class="btn btn-primary btn-sm" [disabled]="tabs[2].active" (click)="tabs[2].active = true">Select 3rd tab</button>
    </p>
    <p>
        <button type="button" class="btn btn-primary btn-sm" (click)="tabs[2].disabled = ! tabs[2].disabled">Enable/Disable 3rd tab</button>
        <button type="button" class="btn btn-primary btn-sm" (click)="addTab()">Add a removable tab</button>
    </p>
    <hr />
    <tabset>
        <tab *ngFor="#theTab of tabs"
            [heading]="theTab.title"
            [(active)]="theTab.active"
            [disabled]="theTab.disabled"
            [removable]="theTab.removable"
            (deselect)="deselectLog($event)"
            (select)="selectLog($event)"
            (remove)="removeLog($event)">
        {{theTab?.content}}
        </tab>
    </tabset>

    <hr />

    <tabset [vertical]="true" type="pills">
        <tab heading="Vertical 1">Vertical content 1</tab>
        <tab heading="Vertical 2">Vertical content 2</tab>
    </tabset>
    </div>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {TAB_PROVIDERS} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>TabSet is a custom element to show an interactive tabbed interface. Used in conjuction with the custom Tab element, TabSet can be displayed in a number of ways</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;tabset&gt;
    &lt;tab *ngFor=&quot;#theTab of tabs&quot;
        [heading]=&quot;theTab.title&quot;
        [(active)]=&quot;theTab.active&quot;
        [disabled]=&quot;theTab.disabled&quot;
        [removable]=&quot;theTab.removable&quot;
        (deselect)=&quot;deselectLog($event)&quot;
        (select)=&quot;selectLog($event)&quot;
        (remove)=&quot;removeLog($event)&quot;&gt;
    {<pre>{</pre>theTab?.content}}
    &lt;/tab&gt;
&lt;/tabset&gt;

&lt;tabset [vertical]=&quot;true&quot; type=&quot;pills&quot;&gt;
    &lt;tab heading=&quot;Vertical 1&quot;&gt;Vertical content 1&lt;/tab&gt;
    &lt;tab heading=&quot;Vertical 2&quot;&gt;Vertical content 2&lt;/tab&gt;
&lt;/tabset&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class TabExample {
    tabs:any[] = [
        {title: 'Title 1', content: 'Content 1', active: true},
        {title: 'Title 2', content: 'Content 2'},
        {title: 'Title 3', content: 'Content 3'},
        {title: 'Title 4', content: 'Content 4', removable: true}
    ];
    
    deselectLog(tab: Tab):void {
        console.log('Deselected:', tab.heading);
    }
    
    selectLog(tab: Tab):void {
        console.log('Selected:', tab.heading);
    }
    
    removeLog(tab: Tab):void {
        console.log('Removed:', tab.heading);
    }
}
</code>
</pre>
</tab>
</tabset>

<h3>TabSet Attributes</h3>
<table-sortable
    [columns]="tabSetAttributesColumns"
    [data]="tabSetAttributes"
    [sort]="tabSetAttributesSort">
    Loading table...
</table-sortable>

<h3>Tab Attributes</h3>
<table-sortable
    [columns]="tabAttributesColumns"
    [data]="tabAttributes"
    [sort]="tabAttributesSort">
    Loading table...
</table-sortable>

<h3>Tab Events</h3>
<table-sortable
    [columns]="tabEventsColumns"
    [data]="tabEvents"
    [sort]="tabEventsSort">
    Loading table...
</table-sortable>

</div>`,
        directives: [CORE_DIRECTIVES, TAB_PROVIDERS, CodeHighlighter, TableSortable]
})
export class TabDemo {
    tabs:any[] = [
        {title: 'Title 1', content: 'Content 1', active: true},
        {title: 'Title 2', content: 'Content 2'},
        {title: 'Title 3', content: 'Content 3'},
        {title: 'Title 4', content: 'Content 4', removable: true}
    ];
    
    addTab(){
        this.tabs.push({title: 'Removable Tab', content: "I'm removable", removable: true})
    }
    
    setActiveTab(index:number):void {
        this.tabs[index].active = true;
    };
    
    deselectLog(tab: Tab):void {
        console.log('Deselected:', tab.heading);
    }
    
    selectLog(tab: Tab):void {
        console.log('Selected:', tab.heading);
    }
    
    removeLog(tab: Tab):void {
        console.log('Removed:', tab.heading);
    }
    
    tabSetAttributes:Attribute[] = [
        new Attribute('vertical', 'boolean', 'false', 'Displays the tabs vertically'),
        new Attribute('type', 'string', 'tabs', 'The tab type to be displayed. Can also be "pills" to display tab headers as bubbles, commonly used when displaying tabs vertically'),
    ];
    tabSetAttributesColumns:TableSortableColumn[] = AttributeColumns;
    tabSetAttributesSort:TableSortableSorting = AttributesDefaultSort;
    
    tabAttributes:Attribute[] = [
        new Attribute('heading', 'string', 'null', 'Html of Tab\'s heading'),
        new Attribute('active', 'boolean', 'false', 'Is currently selected and displayed'),
        new Attribute('disabled', 'boolean', 'false', 'Makes the tab greyed out and unselectable'),
        new Attribute('removable', 'boolean', 'false', 'Makes the tab able to be removed from the TabSet and adds an X icon to the heading that removes the tab on click')
    ];
    tabAttributesColumns:TableSortableColumn[] = AttributeColumns;
    tabAttributesSort:TableSortableSorting = AttributesDefaultSort;
    tabEvents:Event[] = [
        new Event('deselect', '$event = tab: Tab', 'Returns the Tab object when deselected'),
        new Event('remove', '$event = tab: Tab', 'Returns the Tab object when removed'),
        new Event('select', '$event = tab: Tab', 'Returns the Tab object when selected')
    ];
    tabEventsColumns:TableSortableColumn[] = EventColumns;
    tabEventsSort:TableSortableSorting = EventsDefaultSort;
}

export var TAB_DEMO_PROVIDERS = [
    TabDemo
];