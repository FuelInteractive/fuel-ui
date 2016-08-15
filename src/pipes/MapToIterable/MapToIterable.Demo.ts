import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MAPTOITERABLE_PROVIDERS} from './MapToIterable';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  templateUrl: "pipes/MapToIterable/MapToIterable.demo.html",
    directives: [CORE_DIRECTIVES, CodeHighlighter, TAB_PROVIDERS],
    pipes: [MAPTOITERABLE_PROVIDERS]
})
export class MapToIterableDemo {
    htmlCodeExample = `&lt;ul *ngFor=&quot;#object of data&quot;&gt;
    &lt;li *ngFor=&quot;#keyValuePair of object | mapToIterable&quot;&gt;
        {{keyValuePair.key}}: {{keyValuePair.val}}
    &lt;/li&gt;
&lt;/ul&gt;`;

    typescriptCodeExample = `export class MapToIterableExample {
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
}`;

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