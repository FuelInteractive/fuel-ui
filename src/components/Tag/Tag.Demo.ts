import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from "angular2/common";
import {TAG_PROVIDERS, Tag} from './Tag';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Tags</h2>
            <p class="card-text">TagSet is a custom component to display a list of Tags</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <form>
        <div class="form-group row">
            <label for="tempTag.color" class="col-sm-2 col-md-1 form-control-label">Color</label>
            <div class="col-sm-2">
                <select class="form-control" [(ngModel)]="tempTag.color">
                    <option [selected]="tempTag.color == 'danger'" value="danger">Danger</option>
                    <option [selected]="tempTag.color == 'default'" value="default">Default</option>
                    <option [selected]="tempTag.color == 'info'" value="info">Info</option>
                    <option [selected]="tempTag.color == 'primary'" value="primary">Primary</option>
                    <option [selected]="tempTag.color == 'success'" value="success">Success</option>
                    <option [selected]="tempTag.color == 'warning'" value="warning">Warning</option>
                </select>
            </div>
            <label for="tempTag.pill" class="form-control-label">
                <input #pillcb type="checkbox" (change)="tempTag.pill = pillcb.checked" [checked]="tempTag.pill" /> Pill
            </label>
            <label for="tempTag.removable" class="form-control-label">
                <input #removablecb type="checkbox" (change)="tempTag.removable = removablecb.checked" [checked]="tempTag.removable" /> Removable
            </label>
            <label for="tempTag.disabled" class="form-control-label">
                <input #disabledcb type="checkbox" (change)="tempTag.disabled = disabledcb.checked" [checked]="tempTag.disabled" /> Disabled
            </label>
        </div>
        <div class="form-group row">
            <label for="tempTag.title" class="col-sm-2 col-md-1 form-control-label">Title</label>
            <div class="col-sm-2">
                <input class="form-control" [(ngModel)]="tempTag.title" type="text" name="tempTag.title">
            </div>
            <label for="tempTag.value" class="col-sm-2 col-md-1 form-control-label">Value</label>
            <div class="col-sm-4">
                <input class="form-control" [(ngModel)]="tempTag.value" type="text" name="tempTag.value" ngControl="value">
                <div [hidden]="!valueError" class="alert alert-danger">
                    Value is already used for another tag
                </div>
            </div>
        <button type="submit" class="btn btn-primary" (click)="addTag()">Add tag</button>
        </div>
    </form>
    <p>
        <button type="button" class="btn btn-primary btn-sm" [disabled]="tags.length <= 1" (click)="tags[1].disabled = !tags[1].disabled">Enable/Disable second tag</button>
        <button type="button" class="btn btn-primary btn-sm" [disabled]="tags.length == 0" (click)="clearTags()">Clear tags</button>
    </p>
    <div (click)="$event.preventDefault()">
        <h3>
            <tagset>
                <tag *ngFor="let theTag of tags"
                    [color]="theTag.color"
                    [pill]="theTag.pill"
                    [disabled]="theTag.disabled"
                    [removable]="theTag.removable"
                    [title]="theTag.title"
                    [value]="theTag.value"
                    (remove)="removeLog($event)">
                </tag>
            </tagset>
        </h3>
        
        <h4>Tags</h4>
        <div *ngFor="let theTag of tags">
            {{theTag | json}}
        </div>
    </div>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {TAG_PROVIDERS} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>TagSet is a custom element to show an interactive tag interface. Used in conjuction with the custom Tag element. Tags can be displayed in a number ways</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;tagset&gt;
    &lt;tag *ngFor=&quot;#theTag of tags&quot;
        [color]=&quot;theTag.color&quot;
        [pill]=&quot;theTag.pill&quot;
        [removable]=&quot;theTag.removable&quot;
        [title]=&quot;theTag.title&quot;
        [value]=&quot;theTag.value&quot;
        (remove)=&quot;removeLog($event)&quot;&gt;
    &lt;/tag&gt;
&lt;/tagset&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class TagExample {
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
}
</code>
</pre>
</tab>
</tabset>

<h3>Tag Attributes</h3>
<table-sortable
    [columns]="tagAttributesColumns"
    [data]="tagAttributes"
    [sort]="tagAttributesSort">
    Loading table...
</table-sortable>

<h3>Tag Events</h3>
<table-sortable
    [columns]="tagEventsColumns"
    [data]="tagEvents"
    [sort]="tagEventsSort">
    Loading table...
</table-sortable>

</div>`,
        directives: [CORE_DIRECTIVES, TAG_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class TagDemo {
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

export var TAG_DEMO_PROVIDERS = [
    TagDemo
];