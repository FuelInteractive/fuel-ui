### TagSet Selector
`tagset` - `<tagset></tagset>`

### Tags Example
```javascript
tags:any[] = [
    {title: 'Default'},
    {title: 'Primary', color: 'primary', pill: true, removable: true, value: 'Some great value'},
    {title: 'Info', color: 'info', pill: true, removable: true, value: false},
    {title: 'Success', color: 'success', pill: true, removable: true, value: 1234567890},
    {title: 'Danger', color: 'danger', pill: false, removable: true, value: {some: 'great', value: true}},
    {title: 'Warning', color: 'warning', pill: false, removable: true, value: true}
];

removeLog(tag: Tag):void {
    console.log('Removed:', tag.title, '-', tag.value);
}
```

```html
<tagset>
    <tag *ngFor="#theTag of tags"
        [color]="theTag.color"
        [pill]="theTag.pill"
        [removable]="theTag.removable"
        [title]="theTag.title"
        [value]="theTag.value"
        (remove)="removeLog($event)">
    </tag>
</tagset>
```