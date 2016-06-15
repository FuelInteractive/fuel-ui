import {Component} from '@angular/core';
import {TEXTEXPANDER_PROVIDERS} from './TextExpander';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">TextExpander</h2>
            <p class="card-text">TextExpander is a custom component to display a text expander number list</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <div class="col-md-8">
        <form>
            <div class="form-group row">
                <label for="text" class="col-sm-2 form-control-label">Text</label>
                <div class="col-sm-12">
                    <input class="form-control" [(ngModel)]="text" type="text" name="text">
                </div>
            </div>
            <div class="form-group row">
                <label for="characters" class="col-sm-2 form-control-label">Characters</label>
                <div class="col-sm-2">
                    <input class="form-control" [(ngModel)]="characters" min="1" type="number" name="characters">
                </div>
            </div>
            <div class="form-group row">
                <label for="words" class="col-sm-2 form-control-label">Words</label>
                <div class="col-sm-2">
                    <input class="form-control" [(ngModel)]="words" min="0" type="number" name="words">
                </div>
	            <small class="text-muted">Expander defaults to number of characters when set to 0.</small>
            </div>
            <div class="form-group row">
                <label for="expandText" class="col-sm-2 form-control-label">Expand Text</label>
                <div class="col-sm-6">
                    <input class="form-control" [(ngModel)]="expandText" type="text" name="expandText">
                </div>
            </div>
            <div class="form-group row">
                <label for="expandText" class="col-sm-2 form-control-label">Shrink Text</label>
                <div class="col-sm-6">
                    <input class="form-control" [(ngModel)]="shrinkText" type="text" name="shrinkText">
                </div>
            </div>
            <div class="row">
                <div class="checkbox col-md-3">
                    <label for="expanded" class="form-control-label">
                        <input [(ngModel)]="expanded" type="checkbox" /> 
                        Expanded
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="checkbox col-md-3">
                    <label for="ellipsis" class="form-control-label">
                        <input [(ngModel)]="ellipsis" type="checkbox" /> 
                        Ellipsis
                    </label>
                </div>
            </div>
        </form>
        <text-expander
            [(expanded)]="expanded"
            [ellipsis]="ellipsis"
            [text]="text"
            [characters]="characters"
            [words]="words"
            [expandText]="expandText"
            [shrinkText]="shrinkText">
        </text-expander>
    </div>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {TextExpander} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>TextExpander is a custom element to show an interactive list of page numbers to use for paging</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;text-expander
    [(expanded)]=&quot;expanded&quot;
    [ellipsis]=&quot;ellipsis&quot;
    [text]=&quot;text&quot;
    [words]=&quot;words&quot;
    [characters]=&quot;characters&quot;
    [expandText]=&quot;expandText&quot;
    [shrinkText]=&quot;shrinkText&quot;&gt;
&lt;/text-expander&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class TextExpanderExample {
    expanded: boolean = false;
    ellipsis: boolean = true;
    text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed " + 
                    "massa sed odio gravida iaculis. Sed elementum dapibus neque, sit.";
    characters: number = 50;
    words: number = 0;
    expandText: string = "Show more";
    shrinkText: string = "Show less";
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
        directives: [TEXTEXPANDER_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
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

export var TEXTEXPANDER_DEMO_PROVIDERS = [
    TextExpanderDemo
];