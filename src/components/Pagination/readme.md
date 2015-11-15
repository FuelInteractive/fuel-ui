### Pagination Selector
`pagination` - `<pagination></pagination>`

### Pagination Settings

  * `[(current-page)]` _- number_ -
    A two way binding of the currently selected page
  * `[total-pages]` _- number - (Default: `10`)(Optional)_ -
    The total amount of pages listed
  * `[pages-at-once]` _- number - (Default: `5`)(Optional)_ -
    The total number of pages displayed at a time

### Pagination Example
```javascript
currentPage: number = 1;
totalPages: number = 100;
pagesAtOnce: number = 9;
```

```html
<pagination
    [(current-page)]="currentPage"
    [total-pages]="totalPages"
    [pages-at-once]="pagesAtOnce">
</pagination>
```