import {Component} from 'angular2/core';
import {MODAL_PROVIDERS} from './Modal';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Modal</h2>
            <p class="card-text">Modal is a custom component to display a popup</p>
        </div>
    </div>
</div>

<button class="btn btn-primary" (click)="modal.showModal()">Toggle Modal</button>
<modal #modal
    modalTitle="Modal Title"
    closeButton="true"
    closeOnUnfocus="true">
    <div class="modal-body">
        <ul>
            <li>Testing 1</li>
            <li>Testing 2</li>
            <li>Testing 3</li>
        </ul>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="modal.closeModal()">
            <i class="fa fa-chevron-left"></i> Go Back
        </button>
    </div>
</modal>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {Modal} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Modal is a custom element to create a popup</p>

<h3>Usage</h3>
<pre>
<code class="language-markup" code-highlight>
&lt;button class=&quot;btn btn-primary&quot; (click)=&quot;modal.showModal()&quot;&gt;Toggle Modal&lt;/button&gt;
&lt;modal #modal
    modalTitle=&quot;Modal Title&quot;
    closeButton=&quot;true&quot;
    closeOnUnfocus=&quot;true&quot;&gt;
    &lt;div class=&quot;modal-body&quot;&gt;
        &lt;ul&gt;
            &lt;li&gt;Any&lt;/li&gt;
            &lt;li&gt;Html&lt;/li&gt;
            &lt;li&gt;Here&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    &lt;div class=&quot;modal-footer&quot;&gt;
        &lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; (click)=&quot;modal.closeModal()&quot;&gt;
            &lt;i class=&quot;fa fa-chevron-left&quot;&gt;&lt;/i&gt; Go Back
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/modal&gt;
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
            <td>closeOnUnfocus</td>
            <td>boolean</td>
            <td>true</td>
            <td>Closes the opened modal when the user clicks off of it</td>
        </tr>
        <tr>
            <td>closeButton</td>
            <td>boolean</td>
            <td>true</td>
            <td>Option to display an 'X' close button in the corner of the modal</td>
        </tr>
        <tr>
            <td>modalTitle</td>
            <td>string</td>
            <td>null</td>
            <td>Text to display in modal header</td>
        </tr>
    </tbody>
</table>

</div>`,
        directives: [MODAL_PROVIDERS, CodeHighlighter]
})
export class ModalDemo {
    closeText: string = "Cancel";
}

export var MODAL_DEMO_PROVIDERS = [
    ModalDemo
];