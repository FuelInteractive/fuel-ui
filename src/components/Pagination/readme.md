### Pagination Selector
`pagination` - `<pagination></pagination>`

### Pagination Settings

  * `[(currentPage)]` _- number_ -
    A two way binding of the currently selected page
  * `[totalPages]` _- number - (Default: `10`)(Optional)_ -
    The total amount of pages listed
  * `[pagesAtOnce]` _- number - (Default: `5`)(Optional)_ -
    The total number of pages displayed at a time

### Pagination Example
```javascript
currentPage: number = 1;
totalPages: number = 100;
pagesAtOnce: number = 9;
```

```html
<pagination
    [(currentPage)]="currentPage"
    [totalPages]="totalPages"
    [pagesAtOnce]="pagesAtOnce">
</pagination>
```