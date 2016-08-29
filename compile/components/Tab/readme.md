### TabSet Selector
`tabset` - `<tabset></tabset>`

### Tabs Example
```javascript
tabs:any[] = [
    {title: 'Dynamic Title 1', content: 'Dynamic content 1', active: true},
    {title: 'Dynamic Title 2', content: 'Dynamic content 2'},
    {title: 'Dynamic Title 3', content: 'Dynamic content 3'},
    {title: 'Dynamic Title 4', content: 'Dynamic content 4', removable: true}
];
```

```html
<tabset>
    <tab *ngFor="let theTab of tabs"
        [heading]="theTab.title"
        [active]="theTab.active"
        [disabled]="theTab.disabled"
        [removable]="theTab.removable"
        (select)="theTab.active = true"
        (deselect)="theTab.active = false">
    {{theTab?.content}}
    </tab>
</tabset>

<tabset [vertical]="true" type="pills">
    <tab heading="Vertical 1">Vertical content 1</tab>
    <tab heading="Vertical 2">Vertical content 2</tab>
</tabset>
```