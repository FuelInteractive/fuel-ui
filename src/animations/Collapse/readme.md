### Collapse Selector
`@collapse` - `<any @collapse="collapsed"></any>`

### Collapse Import
```javascript
import {Collapse} from 'fuel-ui/fuel-ui';

@Component({
    animations: [Collapse(300)]
})
```

### Collapse Parameter

  * `duration` _- number -
    Number of milliseconds for how long the open/close animation takes
 
### Collapse Example
```javascript
collapsed: boolean = false;
```

```html
<div @collapse="collapsed ? 'true' : 'false'">
    <h2>All of your content</h2>
    <ul>
        <li>That you wish</li>
        <li>to be able</li>
        <li>to collapse</li>
    </ul>
    <p>At any time!</p>
</div>
```