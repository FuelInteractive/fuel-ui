This pipe is used to format any string into a type by an identifying string. This is good for when you know the format of the output, but don't necessarily know the input type

### Range Pipe
`format` - `{{someVar | format : 'number : 2'}}`

### Range Parameters
  * `type` _- string_ - (Default: `text`)_ -
    The type of data you want the input to be output as
    
### DataTypes supported
  * Text
  * Decimal/Number (Supports ': decimalPlaces')
  * Percentage (Supports ': decimalPlaces')
  * Date/DateTime (Supports ': dateFormatting' IE: 'MMM d, y h:mm:ss a')

### Range Example
```javascript
someNumberVar: string = '435.23528';
someTimestamp: number = 1442187616000;
```

```html
{{someNumberVar | format : 'number : 2'}} Outputs: 435.24
{{someTimestamp | format : 'dateTime'}} Outputs: Sep 13, 2015, 7:40:16 PM
```