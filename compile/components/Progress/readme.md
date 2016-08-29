### Progress Selector
`progress` - `<progress></progress>`

### Progress Settings

  * `[value]` _- number_ -
    A binding to the progress value
  * `[min]` _- number - (Default: `0`)(Optional)_ -
    The lowest value that can be given to the progress
  * `[max]` _- number - (Default: `1`)(Optional)_ -
    The highest value that can be given to the progress
    
#### Browser Support
This is simply an example of using the HTML5 Progress tag in Angular 2. This tag is supported in IE10+, but if you need to support older browsers, please take a look into adding [this polyfill](https://github.com/LeaVerou/HTML5-Progress-polyfill) to your project

### Progress Example
```javascript
progressValue: number = 1;
```

```html
<progress class="progress progress-striped progress-animated" [value]="progressValue" [min]="0" [max]="100">{{progressValue}}%</progress>
```