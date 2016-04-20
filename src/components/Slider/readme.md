### Slider Selector
`Slider` - `<slider></slider>`

### Description
This is the NoUiSlider (from Refreshless.com), wrapped in an Angular2 component

### Slider Settings

  * `[background]` _- string - (Default: `'#E24932'`)_ -
    Background color of the area of the slider that counts toward the value
  * `[behavior]` _- string_ - (Default: `'tap'`)_ -
    The way a user can interact with the slider. Can use "tap" or "fixed". "tap" allows for tapping and dragging. "fixed" disables the slider without greying it out.
  * `[decimals]` _- number - (Default: `0`)_ -
    Number of decimals on the value(s) and pips
  * `[direction]` _- string - (Default: `'ltr'`)_ -
    The direction of the values on the slider when the orientation is "horizontal", can be "ltr" for left to right or "rtl" for right to left
  * `[height]` _- string - (Default: `null` or `'200px'`)_ -
    Height of the slider element. Is _REQUIRED_ when orientation is set to "vertical". Defaults to "200px" when using vertical slider
  * `[margin]` _- number - (Default: `10`)_ -
    The least amount of distance between the first and second values
  * `[maxValue]` _- number - (Default: `100`)_ -
    The maximum value allowed on the entire slider
  * `[minValue]` _- number - (Default: `rangeStart`)_ -
    The minimum value allowed on the entire slider
  * `[orientation]` _- string - (Default: `'horizontal'`)_ -
    The orientation of the slider, can be "horizontal" or "vertical"
  * `[pips]` _- number - (Default: `5`)_ -
    The number of numbers on the legend, `including the min and max numbers`. They are spread out evenly, so in the case of 5 pips: 0% (min), 25%, 50%, 75%, and 100% (max) numbers are on the legend. 2 pips would mean only the min and the max are showing.
  * `[(secondValue)]` _- number - (Default: `null`)_ -
    The value of the second number of the slider. When set to null the second handle will not display.
  * `[step]` _- number - (Default: `10`)_ -
    Slider increment on dragging
  * `[(value)]` _- number - (Default: `0`)_ -
    The value of the first number of the slider
  * `[width]` _- string - (Default: `null`)_ -
    Width of the slider element

### TableSortable Example
```javascript
sliderValue: number = 50;
secondSliderValue: number = 250;
minValue: number = 0;
maxValue: number = 400;
```

```html
<!--horizontal-->
<slider background="#E24932" minValue="0" maxValue="400" step="10"
    [minValue]="minValue" [maxValue]="maxValue" [(value)]="sliderValue">
</slider>

<!--vertical-->
<slider background="#E24932" minValue="0" maxValue="400" step="10"
    [minValue]="minValue" [maxValue]="maxValue" [(value)]="sliderValue"
    orientation="vertical" height="200px">
</slider>

<!--horizontal with 2 values-->
<slider background="#E24932" minValue="0" maxValue="400" step="10"
    [minValue]="minValue" [maxValue]="maxValue" [(value)]="sliderValue" [(secondValue)]="secondSliderValue">
</slider>

<!--vertical with 2 values-->
<slider background="#E24932" minValue="0" maxValue="400" step="10"
    [minValue]="minValue" [maxValue]="maxValue" [(value)]="sliderValue" [(secondValue)]="secondSliderValue"
    orientation="vertical" height="200px">
</slider>
```