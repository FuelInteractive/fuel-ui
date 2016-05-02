import {Component} from 'angular2/core';
import {Animation} from './Animation';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Animation Helper</h2>
            <p class="card-text">Animation Helper is a directive that adds events to the element to bind to</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <div class="test-box"
        animation="test-animation-a"
        [play]="play"
        (animationstart)="logStart($event)"
        (animationend)="logEnd($event)"></div>
    <button class="btn btn-primary" (click)="start()">Play</button>
    <div>Playing: {{play}}</div><br/>
    <div>
        <h3>Animation Log</h3>
        <div *ngFor="let event of animationLog">
            ({{event.timeStamp | date : 'mediumTime'}}) {{event.animationName}}: {{event.type}}
        </div>
    </div>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {Animation} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Animation helper is a directive that adds events to bind to on elements that are animated. It gives information about the animation that is happening and an ability to start and stop the animation. Can be used to combine animations synchronously.</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;div class=&quot;some-animation-class&quot;
    animation=&quot;test-animation-a&quot;
    [play]=&quot;play&quot;
    (animationstart)=&quot;logStart($event)&quot;
    (animationend)=&quot;logEnd($event)&quot;&gt;&lt;/div&gt;
&lt;button class=&quot;btn btn-primary&quot; (click)=&quot;start()&quot;&gt;Play&lt;/button&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class AnimationExample {
    play:boolean = false;
    animationLog:any[] = [];
    
    start(): void{
        this.play = true;
    }
    
    logStart($event: any): void {
        this.animationLog.push($event);
    }

    logEnd($event: any): void {
        this.play = false;
        this.animationLog.push($event);
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
        directives: [Animation, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class AnimationDemo {
    play:boolean = false;
    animationLog:any[] = [];
    
    start(): void{
        this.play = true;
    }
    
    logStart($event: any): void {
        this.animationLog.push($event);
    }

    logEnd($event: any): void {
        this.play = false;
        this.animationLog.push($event);
    }
    
    attributes:Attribute[] = [
        new Attribute('play', 'boolean', 'false', 'Start the animation')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    events:Event[] = [
        new Event('animationstart', 'Animation Object', 'Information about the animation when it starts'),
        new Event('animationend', 'Animation Object', 'Information about the animation when it ends')
    ];
    eventsColumns:TableSortableColumn[] = EventColumns;
    eventsSort:TableSortableSorting = EventsDefaultSort;
}

export var ANIMATION_DEMO_PROVIDERS = [
    AnimationDemo
];