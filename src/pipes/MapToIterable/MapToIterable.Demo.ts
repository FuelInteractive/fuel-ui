import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from "angular2/common";
import {MAPTOITERABLE_PROVIDERS} from './MapToIterable';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">MapToIterable</h2>
            <p class="card-text">MapToIterable is a custom pipe to make a custom object iterable over its keys</p>
        </div>
    </div>
</div>

<section class="row m-a">
<ul *ngFor="#object of data">
    <li *ngFor="#keyValuePair of object | mapToIterable">
        {{keyValuePair.key}}: {{keyValuePair.val}}
    </li>
</ul>
</section>

<h3>Reasoning</h3>
<div>
    <p>According to Miško Hevery (<a href="" target="_blank">reference</a>):</p>

    <blockquote class="blockquote">
        <p>Maps have no orders in keys and hence they iteration is unpredictable. This was supported in ng1, but we think it was a mistake and will not be supported in NG2</p>

        <p>The plan is to have a mapToIterable pipe</p>

        <code>*ngFor"#item of map | mapToIterable"</code>
    </blockquote>
</div>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {MapToIterablePipe} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>MapToIterable pipe is used to make custom objects that have no orders iterable by their keys
</p>

<h3>Usage</h3>
<pre>
<code class="language-javascript" code-highlight>
export class MapToIterableExample {
    data: any[] = [
        {
            Any: "foo",
            Keys: "foo",
            At: "foo",
            All: "foo"
        },
        {
            Any: "bar",
            Keys: "bar",
            At: "bar",
            All: "bar"
        }
    ]
}
</code>
</pre>

<pre>
<code class="language-html" code-highlight>
&lt;ul *ngFor=&quot;#object of data&quot;&gt;
    &lt;li *ngFor=&quot;#keyValuePair of object | mapToIterable&quot;&gt;
        {<pre>{</pre>keyValuePair.key}}: {<pre>{</pre>keyValuePair.val}}
    &lt;/li&gt;
&lt;/ul&gt;
</code>
</pre>

<h3>Parameters</h3>
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
            <td>type</td>
            <td>string</td>
            <td>text</td>
            <td>The type of data you want the input to be output as</td>
        </tr>
    </tbody>
</table>

</div>`,
    directives: [CORE_DIRECTIVES, CodeHighlighter],
    pipes: [MAPTOITERABLE_PROVIDERS]
})
export class MapToIterableDemo {
    data: any[] = [
        {
            Any: "foo",
            Keys: "foo",
            At: "foo",
            All: "foo"
        },
        {
            Any: "bar",
            Keys: "bar",
            At: "bar",
            All: "bar"
        }
    ]
}

export var MAPTOITERABLE_DEMO_PROVIDERS = [
    MapToIterableDemo
];