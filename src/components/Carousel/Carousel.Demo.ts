import {Component} from '@angular/core';
import {CAROUSEL_PROVIDERS} from './Carousel';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Carousel</h2>
            <p class="card-text">Carousel is a custom component to display content in a rotating manner</p>
        </div>
    </div>
</div>

<div class="row">
<!--<carousel>
        <div class="carousel-item" style="background-color: SteelBlue; height: 200px;">
            <h3 style="margin: auto auto;">Some title</h3>
        </div>
        <div class="carousel-item" style="background-color: Crimson; height: 300px;">
            <h3 style="margin: auto auto;">another title</h3>
        </div>
        <div class="carousel-item" style="background-color: MediumAquaMarine; height: 250px;">
            <h3 style="margin: auto auto;">gratuitous title</h3>
        </div>
        <div class="carousel-item" style="background-color: MediumSlateBlue; height: 250px;">
            <h3 style="margin: auto auto;">yet another title title</h3>
        </div>
        <div class="carousel-item" style="background-color: Khaki; height: 250px;">
            <h3 style="margin: auto auto;">really another title?</h3>
        </div>
    </carousel>
</div>-->

<div class="row">
    <carousel interval="10000" class="col-md-6">
        <img *ngFor="let image of carouselImages" src="{{image}}" class="carousel-item" />
    </carousel>
    
    <carousel interval="10000" class="col-md-6">
        <div *ngFor="let image of carouselImages" class="carousel-item">
            <img src="{{image}}" />
            <div class="carousel-caption">
                <h3>Some Title</h3>
                <p>Path: {{image}}</p>
            </div>
        </div>
    </carousel>
</div>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {CAROUSEL_PROVIDERS} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Carousel is a custom element to display a slideshow of cycling elements</p>
<p>Swipe left and swipe right events are supported if hammerjs has been included.</p>

<h3>Usage</h3>
<tabset>
<tab heading="Images Only">
<pre>
<code class="language-markup" code-highlight>
&lt;carousel&gt;
    &lt;img src=&quot;image1.jpg&quot; class=&quot;carousel-item&quot; /&gt;
    &lt;img src=&quot;image2.jpg&quot; class=&quot;carousel-item&quot; /&gt;
    &lt;img src=&quot;image3.jpg&quot; class=&quot;carousel-item&quot; /&gt;
&lt;/carousel&gt;
</code>
</pre>
</tab>
<tab heading="Images With Captions">
<pre>
<code class="language-markup" code-highlight>
&lt;carousel&gt;
    &lt;div class=&quot;carousel-item&quot;&gt;
        &lt;img src=&quot;image1.jpg&quot; /&gt;
        &lt;div class=&quot;carousel-caption&quot;&gt;
            &lt;h3&gt;Some Title 1&lt;/h3&gt;
            &lt;p&gt;Some caption 1&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;carousel-item&quot;&gt;
        &lt;img src=&quot;image2.jpg&quot; /&gt;
        &lt;div class=&quot;carousel-caption&quot;&gt;
            &lt;h3&gt;Some Title 2&lt;/h3&gt;
            &lt;p&gt;Some caption 2&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/carousel&gt;
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
</div>`,
        directives: [CAROUSEL_PROVIDERS, CodeHighlighter, TAB_PROVIDERS, TableSortable]
})
export class CarouselDemo {
    carouselImages: string[] = [
        "images/carouselImages/beach.png",
        "images/carouselImages/river.jpg",
        "images/carouselImages/windmill.jpg"
    ];
    
    attributes:any[] = [
        new Attribute('interval', 'number', '0', 'Time in ms before auto-advancing slide. If set to 0 slides will not auto-advance')
    ];
    
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}

export var CAROUSEL_DEMO_PROVIDERS = [
    CarouselDemo
];