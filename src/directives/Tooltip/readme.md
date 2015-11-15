This directive shows text on hover, and supports string interpolation.

### Tooltip Selector
`[tooltip]` - `<some-element tooltip="Some great text to display on hover"></some-element>`

### Tooltip Example
```javascript
text: string = "But don't forget about me!";
```

```html
<some-element tooltip="Some great text. {{text}}"></some-element>
```