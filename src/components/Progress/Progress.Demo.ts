import {Component} from 'angular2/core';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Progress</h2>
            <p class="card-text">Progress is a custom component to display an overall progress based on percentage</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <form>
        <div class="form-group row">
            <label for="progress" class="col-sm-2 form-control-label">Progress %</label>
            <div class="col-sm-2">
                <input class="form-control" [(ngModel)]="progress" min="0" max="100" type="number" name="progress">
            </div>
        </div>
    </form>
    <progress class="progress progress-striped progress-animated" [value]="progress" max="100">{{progress}}%</progress>
</section>

<div class="source">
<h3>Getting Started</h3>
<p>Progress is an HTML5 Bootstrap element that displays a graphical progress bar</p>

<h3>Usage</h3>
<pre>
<code class="language-markup" code-highlight>
&lt;progress 
    class=&quot;progress progress-striped progress-animated&quot;
    [value]=&quot;progress&quot; 
    max=&quot;100&quot;&gt;
        {<pre>{</pre>progress}}%
&lt;/progress&gt;
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
            <td>value</td>
            <td>number</td>
            <td>0</td>
            <td>Percentage of progress bar that is filled</td>
        </tr>
        <tr>
            <td>max</td>
            <td>number</td>
            <td>1</td>
            <td>The number to fill the progress bar completely</td>
        </tr>
    </tbody>
</table>

</div>`,
directives: [CodeHighlighter]
})
export class ProgressDemo {
    progress: number = 25;
}

export var PROGRESS_DEMO_PROVIDERS = [
    ProgressDemo
];