import {Component} from '@angular/core';
import {Tag} from './Tag';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "Tag.Demo.html"
})
export class TagDemo {
    codeExample1 = `&lt;tagset&gt;
    &lt;tag *ngFor=&quot;#theTag of tags&quot;
        [color]=&quot;theTag.color&quot;
        [pill]=&quot;theTag.pill&quot;
        [removable]=&quot;theTag.removable&quot;
        [title]=&quot;theTag.title&quot;
        [value]=&quot;theTag.value&quot;
        (remove)=&quot;removeLog($event)&quot;&gt;
    &lt;/tag&gt;
&lt;/tagset&gt;`;

    codeExample2 = `export class TagExample {
    tags:any[] = [
        {title: 'Default'},
        {title: 'Primary', color: 'primary', pill: true, removable: true, value: 'Some great value'},
        {title: 'Info', color: 'info', pill: true, removable: true, value: false},
        {title: 'Success', color: 'success', pill: true, removable: true, value: 1234567890},
        {title: 'Danger', color: 'danger', pill: false, removable: true, value: {some: 'great', value: true}},
        {title: 'Warning', color: 'warning', pill: false, removable: true, value: true}
    ];
    
    removeLog(tag: Tag):void {
        console.log('Removed:', tag.title, '-', tag.value);
    }
}`;

    valueError: boolean = false;
    tempTag:any = {
        title: 'Example Title', 
        color: 'default', 
        disabled: false,
        pill: true, 
        removable: true, 
        value: 'Some value here'
    };
    
    tags:any[] = [
        {title: 'Default'},
        {title: 'Primary', color: 'primary', pill: true, removable: true, value: 'Some great value'},
        {title: 'Info', color: 'info', pill: true, removable: true, value: false},
        {title: 'Success', color: 'success', pill: true, removable: true, value: 1234567890},
        {title: 'Danger', color: 'danger', pill: false, removable: true, value: {some: 'great', value: true}},
        {title: 'Warning', color: 'warning', pill: false, removable: true, value: true}
    ];
    
    clearTags(): void {
        this.tags = [];
    }
    
    addTag(){
        this.valueError  = false;
        
        this.tags.forEach((obj: any, i: number) => {
            if(this.tempTag.value === obj.value){
                this.valueError  = true;
            }
        });
        
        if(this.valueError ) return;
        
        this.tags.push(JSON.parse(JSON.stringify(this.tempTag))); //make simple copy of tempTag to add
    }
    
    removeLog(tag: Tag):void {
        console.log('Removed:', tag.title, '-', tag.value);
        
        try {
            this.tags.forEach((obj: any, i: number) => {
                if(tag.value === obj.value){
                    throw this.tags.splice(i, 1);
                }
            });
        }
        catch(e){
            //just breaking out of forEach since it can't use break
        }
    }
    
    tagAttributes:Attribute[] = [
        new Attribute('color', 'string', 'default', 'Bootstrap color of the Tag. <a href="http://v4-alpha.getbootstrap.com/components/label/#contextual-variations" target="_blank">Click here for more info...</a>'),
        new Attribute('pill', 'boolean', 'false', 'Show the Tag as a pill'),
        new Attribute('title', 'string', 'null', 'Html of Tag\'s title'),
        new Attribute('value', 'any', 'null', 'Value of the Tag'),
        new Attribute('removable', 'boolean', 'false', 'Makes the tag able to be removed from the TagSet and adds an X icon to the title that removes the tag on click')
    ];
    tagAttributesColumns:TableSortableColumn[] = AttributeColumns;
    tagAttributesSort:TableSortableSorting = AttributesDefaultSort;
    tagEvents:Event[] = [
        new Event('remove', '$event = tag: Tag', 'Returns the Tag object when removed')
    ];
    tagEventsColumns:TableSortableColumn[] = EventColumns;
    tagEventsSort:TableSortableSorting = EventsDefaultSort;
}