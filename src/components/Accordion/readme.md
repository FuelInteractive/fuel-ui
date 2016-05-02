### Accordion Selector
`accordion` - `<accordion></accordion>`

### Tags Example
```javascript
oneAtATime:boolean = true;
duration:number = 250;
firstOpen:boolean = true;
firstDisabled:boolean = false;
lastOpen:boolean = false;
```

```html
<accordion [closeOthers]="oneAtATime" [duration]="duration">
    <accordion-item heading="Static Header 1"
                    [(open)]="firstOpen"
                    [disabled]="firstDisabled">
        This content is showing on start
    </accordion-item>
    <accordion-item #item [(open)]="lastOpen">
        <accordion-heading>
            <a (click)="$event.preventDefault" class="fuel-ui-clickable">Markup Here!</a>
            <i class="pull-right fa"
                [ngClass]="{'fa-chevron-down': item?.open, 'fa-chevron-right': !item || !item.open}"></i>
        </accordion-heading>
        What amazing content!
    </accordion-item>
</accordion>
```