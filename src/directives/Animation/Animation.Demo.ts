import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from "angular2/common";
import {Animation} from './Animation';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
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
        <div *ngFor="#event of animationLog">
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

<h3>Attributes</h3>
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>play</td>
            <td>boolean</td>
            <td>false</td>
            <td>Start the animation</td>
        </tr>
    </tbody>
</table>

<h3>Events</h3>
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Name</th>
            <th>Event Object</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>animationstart</td>
            <td>Animation Object</td>
            <td>Information about the animation when it starts</td>
        </tr>
        <tr>
            <td>animationend</td>
            <td>Animation Object</td>
            <td>Information about the animation when it ends</td>
        </tr>
    </tbody>
</table>

</div>`,
        directives: [Animation, CORE_DIRECTIVES, CodeHighlighter]
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
}

export var ANIMATION_DEMO_PROVIDERS = [
    AnimationDemo
];