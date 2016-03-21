import {Component} from 'angular2/core';
import {CodeHighlighter} from './CodeHighlighter';
@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">CodeHighlighter</h2>
            <p class="card-text">CodeHighlighter is a custom directive to highlight code blocks using PrismJS</p>
        </div>
    </div>
</div>

<pre>
<code class="language-css" code-highlight>
#titanic {
    float: none;
}
</code>
</pre>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {CodeHighlighter} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>CodeHighlighter is applied to a code element with [code-highlight] directive. The <code>&lt;code&gt;</code> should have a style class having "language-" prefix to specify the language to highlight. See <a href="http://prismjs.com/#languages-list" target="_blank">Prismjs docs</a> for the list of available languages. An example block with css code would be as follows.</p>

<h3>Usage</h3>
<pre>
<code class="language-markup" code-highlight>
<pre>\n
    &lt;code class="language-css" code-highlight&gt;
        #titanic { 
            float: none;
        }
    &lt;/code&gt;
</pre>
</code>
</pre>
</div>`,
        directives: [CodeHighlighter]
})
export class CodeHighlighterDemo {
    
}

export var CODEHIGHLIGHTER_DEMO_PROVIDERS = [
    CodeHighlighterDemo
];