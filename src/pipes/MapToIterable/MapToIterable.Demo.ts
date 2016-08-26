import {Component} from '@angular/core';

@Component({
  templateUrl: "pipes/MapToIterable/MapToIterable.Demo.html"
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