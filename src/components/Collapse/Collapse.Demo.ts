import {Component} from 'angular2/core';
import {COLLAPSE_PROVIDERS} from './Collapse';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Collapse</h2>
            <p class="card-text">Collapse is a custom component to display and hide content on click</p>
        </div>
    </div>
</div>

<collapse buttonText="Collapse Button">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry 
    richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard 
    dolor brunch. Food truck quinoa nesciunt laborum eiusmod. 
    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin 
    coffee nulla assumenda shoreditch et.
</collapse>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {Collapse} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Collapse allows you to toggle content on the page by click</p>

<h3>Usage</h3>
<pre>
<code class="language-markup" code-highlight>
&lt;collapse buttonText=&quot;Collapse Button&quot;&gt;
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry 
    richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard 
    dolor brunch. Food truck quinoa nesciunt laborum eiusmod. 
    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin 
    coffee nulla assumenda shoreditch et.
&lt;/collapse&gt;
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
            <td>buttonText</td>
            <td>string</td>
            <td>null</td>
            <td>Text to display on button that shows/hides content</td>
        </tr>
    </tbody>
</table>

</div>`,
        directives: [COLLAPSE_PROVIDERS, CodeHighlighter]
})
export class CollapseDemo { 
}

export var COLLAPSE_DEMO_PROVIDERS = [
    CollapseDemo
];