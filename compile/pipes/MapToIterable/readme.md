This pipe is used to to make a custom object iterable over its keys

### MapToIterable Pipe
`format` - `{{data | mapToIterable}}`

### MapToIterable Example
```javascript
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
```

```html
<ul *ngFor="let object of data">
    <li *ngFor="let keyValuePair of object | mapToIterable">
        {{keyValuePair.key}}: {{keyValuePair.val}}
    </li>
</ul>
```