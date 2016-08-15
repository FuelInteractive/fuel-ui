import {Component, ChangeDetectionStrategy} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {Tab} from "./tab";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "components/tab/tab.demo.html"
})
export class TabDemo {
    codeExample1 = `&lt;tabset&gt;
    &lt;tab *ngFor=&quot;#theTab of tabs&quot;
        [heading]=&quot;theTab.heading&quot;
        [(active)]=&quot;theTab.active&quot;
        [disabled]=&quot;theTab.disabled&quot;
        [removable]=&quot;theTab.removable&quot;
        (deselect)=&quot;deselectLog($event)&quot;
        (select)=&quot;selectLog($event)&quot;
        (remove)=&quot;removeLog($event)&quot;&gt;
    {{theTab?.content}}
    &lt;/tab&gt;
&lt;/tabset&gt;

&lt;tabset [vertical]=&quot;true&quot; type=&quot;pills&quot;&gt;
    &lt;tab heading=&quot;Vertical 1&quot;&gt;Vertical content 1&lt;/tab&gt;
    &lt;tab heading=&quot;Vertical 2&quot;&gt;Vertical content 2&lt;/tab&gt;
&lt;/tabset&gt;`

    codeExample2 = `export class TabExample {
    tabs:any[] = [
        {heading: 'Title 1', content: 'Content 1', active: true},
        {heading: 'Title 2', content: 'Content 2'},
        {heading: 'Title 3', content: 'Content 3'},
        {heading: 'Title 4', content: 'Content 4', removable: true}
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
}`;

    tabs:any[] = [
        {heading: 'Title 1', content: 'Content 1', active: true},
        {heading: 'Title 2', content: 'Content 2'},
        {heading: 'Title 3', content: 'Content 3'},
        {heading: 'Title 4', content: 'Content 4', removable: true}
    ];
    
    addTab(){
        this.tabs.push({heading: 'Removable Tab', content: "I'm removable", removable: true})
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