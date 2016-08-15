import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {TAB_PROVIDERS} from '../../components/tab/tab';
import {ACCORDION_PROVIDERS} from '../../components/accordion/accordionItem';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/tableSortable/tableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "components/accordion/accordian.demo.html",
        directives: [CORE_DIRECTIVES, ACCORDION_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class AccordionDemo {
    
    oneAtATime:boolean = true;
    duration:number = 250;
    firstOpen:boolean = true;
    firstDisabled:boolean = false;
    lastOpen:boolean = false;

    contentItems:Array<string> = ['Item 1', 'Item 2', 'Item 3'];

    accordionItems:Array<any> = [
        {
            heading: 'Custom Object Header - 1',
            content: 'Custom Object Body - 1'
        },
        {
            heading: 'Custom Object Header - 2',
            content: 'Custom Object Body - 2'
        }
    ];

    addContentItem():void {
        this.contentItems.push('New Item ' + (this.contentItems.length+1));
    }
    
    addAccordionItem():void {
        this.accordionItems.push({
            heading: 'Custom Object Header - ' + (this.accordionItems.length+1),
            content: 'Custom Object Body - ' + (this.accordionItems.length+1)
        })
    }
    
    accordionAttributes:Attribute[] = [
        new Attribute('closeOthers', 'boolean', 'true', 'Only be able to have one accordion item opened at once'),
        new Attribute('duration', 'number', '250', 'Duration of the collapse animations')
    ];
    accordionAttributesColumns:TableSortableColumn[] = AttributeColumns;
    accordionAttributesSort:TableSortableSorting = AttributesDefaultSort;
    
    accordionItemAttributes:Attribute[] = [
        new Attribute('disabled', 'boolean', 'false', 'Disable accordion item from opening on click and display as greyed out'),
        new Attribute('open', 'boolean', 'false', 'The status of the accordion item showing content'),
        new Attribute('heading', 'string', 'null', 'The clickable heading of the content of your accordion item')
    ];
    accordionItemAttributesColumns:TableSortableColumn[] = AttributeColumns;
    accordionItemAttributesSort:TableSortableSorting = AttributesDefaultSort;
}