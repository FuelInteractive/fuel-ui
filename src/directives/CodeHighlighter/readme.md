CodeHighlighter uses [PrismJS](http://prismjs.com/) is applied to a code element with [code-highlight] directive. The `<code>` should have a style class having "language-" prefix to specify the language to highlight. See [PrismJS](http://prismjs.com/#languages-list) docs for the list of available languages. An example block with css code would be as follows.

### Tooltip Selector
`[code-highlight]` - `<some-element code-highlight></some-element>`

### Tooltip Example
```html
<pre>
    <code class="language-css" code-highlight>
        #titanic { 
            float: none;
        }
    </code>
</pre>
```