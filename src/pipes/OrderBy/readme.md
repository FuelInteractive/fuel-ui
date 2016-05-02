This pipe orders any given array based numerically or alphabetically. Supports multi-dimensional arrays and ascending/descending sorting per property.

### Order By Pipe
`orderBy` - `{{someArray | orderBy : orderingConfig}}`

### Order By Parameters
  * `orderingConfig` _- string or Array<string> - (Default: `+`)(Optional)_ -
    A string of `'+'` or `'-'` for the direction of the sort. Or an array of property names with prepended with `'-'` property needs to be sorted descending.

### Order By Example
```javascript
numberArray: Array<number> = [23,76,123,1,53];
fruitArray: Array<string> = ['orange', 'banana', 'apple', 'pineapple'];
todos: Array<Todo> = [
    new Todo('complete','Eat'),
    new Todo('incomplete', 'Sleep'),
    new Todo('complete', 'Code')
];

class Todo{
	name: string;
	status: string;

	constructor(name: string, status: string){
		this.name = name;
		this.status = status;
	}
}
```

```html
Basic Array of single type
<span *ngFor="let n of numberArray | orderBy">{{n}}<span>
<span *ngFor="let fruit of fruitArray | orderBy : '-'">{{fruit}}<span>

Multidimensional Array Sort on single column
<span *ngFor="let todo of todos | orderBy : 'status'">{{todo.name}} - {{todo.status}}<span>
<span *ngFor="let todo of todos | orderBy : '-status'">{{todo.name}} - {{todo.status}}<span>

Multidimensional Array Sort on multiple columns
<span *ngFor="let todo of todos | orderBy : ['status', '-title']">{{todo.name}} - {{todo.status}}<span>
```