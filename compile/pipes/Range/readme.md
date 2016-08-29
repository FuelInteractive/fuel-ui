This pipe creates an array of numbers based on a given min and max. It will overwrite whatever value is connected to the pipe.

### Range Pipe
`range` - `{{someVar | range : min : max : step}}`

### Range Parameters
  * `min` _- number_ -
    Beginning number of array
  * `max` _- number_ -
    Ending number of array
  * `step` _- number_ - (Default: `1`)(Optional)_ -
    The amount of step between each number within the array

### Range Example
```javascript
emptyArray: Array<number> = [];
```

```html
<select>
    <option *ngFor="let n of emptyArray | range : 1 : 10 : 2" [value]="n"></option>
</select>
```