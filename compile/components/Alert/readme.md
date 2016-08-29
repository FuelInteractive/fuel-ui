### Alert Selector
`alert` - `<alert></alert>`

### Alert Settings

  * `[(displayed)]` _- boolean_ -
    A two way binding that causes the `alert` to be displayed
  * `[closeButton]` _- boolean - (Default: `true`)(Optional)_ -
    Takes a boolean that causes the close button to be displayed in the top right corner
  * `[type]` _- string - (Default: `success`)(Optional)_ -
    Defines the type of the alert. Go to Bootstrap 4's [alert page](http://v4-alpha.getbootstrap.com/components/#alerts) to see the type of alerts available.

### Alert inner content
  * What is displayed in the body of the alert box
    * *Note:* To use dynamic html from a class property, use `[innerHtml]` within a `span` of the inner content

### Alert Example
```javascript
showAlert: boolean = true;
alertType: string = 'success';
```

```html
<alert [(displayed)]="showAlert" [type]="alertType">
	<strong>Success</strong> success message
</alert>
```

### Alert Example with Dynamic Content
```javascript
showAlert: boolean = true;
alertType: string = 'danger';
alertBody: string = '<strong>Error</strong> error message';
```

```html
<alert [(displayed)]="showAlert" [type]="alertType">
	<span [innerHtml]="alertBody"></span>
</alert>
```