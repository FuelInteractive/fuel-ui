This pipe creates an array of numbers based on a given min and max. It will overwrite whatever value is connected to the pipe.

### Range Pipe
`range` - `{{someVar | range : min : max}}`

### Range Parameters
  * `min` _- number_ -
    Beginning number of array
  * `max` _- number_ -
    Ending number of array

### Range Example
```javascript
emptyArray: Array<number> = [];
```

```html
<select>
    <option *ngFor="#n of emptyArray | range : 1 : 10" [value]="n"></option>
</select>
```