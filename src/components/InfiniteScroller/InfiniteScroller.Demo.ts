import {Component} from 'angular2/core';
import {INFINITE_SCROLLER_PROVIDERS} from './InfiniteScroller';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Infinite Scroller</h2>
            <p class="card-text">Infinite Scroller is a custom component to infinitely scroll</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <div class="col-md-6" style="border: 1px solid #333; background-color: #EEE">
        <infinite-scroller 
            (next)="infinteScrollNext()" 
            (prev)="infiniteScrollPrev()" 
            height="300px"
            distance="120"
            hideScrollbar="true">
            <div *ngFor="#item of infiniteScrollItems" 
                class="card p-a scroll-item" style="background-color: #FFF">
                <div class="card-block">
                    <h4 class="card-title">Some Item</h4>
                    <p class="card-text">{{item}}</p>
                </div>
            </div>
        </infinite-scroller>
    </div>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {INFINITE_SCROLLER_PROVIDERS} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>The Infinite Scroller component allows for asynchronous ability to show items as a user scrolls. Use the <code>next</code> and <code>prev</code> events to know when to start adding items to show or removing items for performance reasons.</p>

<h3>Usage</h3>
<pre>
<code class="language-markup" code-highlight>
&lt;infinite-scroller 
    (next)=&quot;infinteScrollNext()&quot; 
    (prev)=&quot;infiniteScrollPrev()&quot; 
    height=&quot;300px&quot;
    distance=&quot;120&quot;
    hideScrollbar=&quot;true&quot;&gt;
    &lt;div *ngFor=&quot;#item of infiniteScrollItems&quot; 
        class=&quot;card p-a scroll-item&quot;&gt;
        &lt;div class=&quot;card-block&quot;&gt;
            &lt;h4 class=&quot;card-title&quot;&gt;Some Item&lt;/h4&gt;
            &lt;p class=&quot;card-text&quot;&gt;&#123; &#123;item&#125; &#125;&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/infinite-scroller&gt;
</code>
</pre>

<pre>
<code class="language-javascript" code-highlight>
export class InfiniteScrollerDemo {
    infiniteScrollItems: string[] = [];
    infiniteScrollMin: number = 0;
    infiniteScrollMax: number = 1;

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.infinteScrollNext(false);
        }
    }

    infiniteScrollPrev(): void {
        var newItem = "";
        for (let i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMin + " ";
        }

        this.infiniteScrollMin--;
        this.infiniteScrollItems.unshift(newItem);
    }

    infinteScrollNext(clean: boolean = true): void {
        var newItem = "";
        for (let i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMax + " ";
        }

        this.infiniteScrollMax++;
        this.infiniteScrollItems.push(newItem);
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
            <td>height</td>
            <td>string</td>
            <td>auto</td>
            <td>Height of element. Examples: 300px, 10%, auto, etc.</td>
        </tr>
        <tr>
            <td>distance</td>
            <td>number</td>
            <td>100</td>
            <td>How far up and down the user can scroll for more scroll items</td>
        </tr>
        <tr>
            <td>hideScrollbar</td>
            <td>boolean</td>
            <td>false</td>
            <td>Hide the scrollbar of the InfiniteScroller</td>
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
            <td>next</td>
            <td>null</td>
            <td>When a scroll item is passed when scrolling down</td>
        </tr>
        <tr>
            <td>prev</td>
            <td>null</td>
            <td>When a scroll item is passed when scrolling up</td>
        </tr>
    </tbody>
</table>

</div>`,
        directives: [INFINITE_SCROLLER_PROVIDERS, CodeHighlighter]
})
export class InfiniteScrollerDemo {
    infiniteScrollItems: string[] = [];
    infiniteScrollMin: number = 0;
    infiniteScrollMax: number = 1;

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.infinteScrollNext(false);
        }
    }

    infiniteScrollPrev(): void {
        var newItem = "";
        for (let i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMin + " ";
        }

        this.infiniteScrollMin--;
        this.infiniteScrollItems.unshift(newItem);
    }

    infinteScrollNext(clean: boolean = true): void {
        var newItem = "";
        for (let i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMax + " ";
        }

        this.infiniteScrollMax++;
        this.infiniteScrollItems.push(newItem);
    }
}

export var INFINITESCROLLER_DEMO_PROVIDERS = [
    InfiniteScrollerDemo
];