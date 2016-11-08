import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "TextExpander.Demo.html"
})
export class TextExpanderDemo {
    expanded: boolean = false;
    ellipsis: boolean = true;
    text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed massa sed odio gravida iaculis. Sed elementum dapibus neque, sit.";
    characters: number = 50;
    words: number = 0;
    expandText: string = "Show more";
    shrinkText: string = "Show less";
    
    attributes:Attribute[] = [
        new Attribute('expanded', 'boolean', 'false', 'The current state of whether or not the complete text is displayed'),
        new Attribute('ellipsis', 'boolean', 'true', 'Add "..." at the end of the text when not expanded'),
        new Attribute('text', 'string', 'null', 'The text that can be expanded/shrunk'),
        new Attribute('characters', 'number', '50', 'The number of characters displayed when text is shrunk'),
        new Attribute('words', 'number', '0', 'The number of words displayed when text is shrunk. If set to 0, characters are defaulted to'),
        new Attribute('expandText', 'string', 'show more', 'Clickable text used to expand text'),
        new Attribute('shrinkText', 'string', 'show less', 'Clickable text used to shrink text')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    events:Event[] = [
        new Event('expandedChange', '$event = expanded: boolean', 'New state of whether the text is expanded or not')
    ];
    eventsColumns:TableSortableColumn[] = EventColumns;
    eventsSort:TableSortableSorting = EventsDefaultSort;
}