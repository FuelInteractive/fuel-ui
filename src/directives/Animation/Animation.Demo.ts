import {Component} from '@angular/core';
import {Animation} from './Animation';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  templateUrl: "directives/Animation/Animation.Demo.html",
        directives: [Animation, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class AnimationDemo {
    codeExample1 = `&lt;div class=&quot;some-animation-class&quot;
    animation=&quot;test-animation-a&quot;
    [play]=&quot;play&quot;
    (animationstart)=&quot;logStart($event)&quot;
    (animationend)=&quot;logEnd($event)&quot;&gt;&lt;/div&gt;
&lt;button class=&quot;btn btn-primary&quot; (click)=&quot;start()&quot;&gt;Play&lt;/button&gt;`;

    codeExample2 = `export class AnimationExample {
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
}`;

    play:boolean = false;
    animationLog:any[] = [];
    
    start(): void{
        this.play = true;
    }
    
    logStart($event: any): void {
        $event.time = new Date().getTime();
        this.animationLog.push($event);
    }

    logEnd($event: any): void {
        this.play = false;
        $event.time = new Date().getTime();
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