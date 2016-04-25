### Collapse Selector
`[collapse]` - `<any [collapse]="collapsed" duration="500"></any>`

### collapse Settings

  * `collapse` _- boolean -
    Boolean whether the content is shown or hidden
  * `duration` _- number -
    Number of milliseconds for how long the open/close animation takes
 
### Collapse Example
```javascript
collapsed: boolean = false;
duration: number = 500;
```

```html
<div [collapse]="collapsed" [duration]="duration">
    <h2>All of your content</h2>
    <ul>
        <li>That you wish</li>
        <li>to be able</li>
        <li>to collapse</li>
    </ul>
    <p>At any time!</p>
</div>
```