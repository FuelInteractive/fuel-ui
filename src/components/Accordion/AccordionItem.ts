import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, Host, Inject, forwardRef} from '@angular/core';
import {Collapse} from '../../animations/Collapse/Collapse';

@Component({
    selector: 'accordion-item, [accordion-item]',
    templateUrl: 'components/Accordion/AccordionItem.html',
    animations: [Collapse(350)]
})
export class AccordionItem implements OnInit {
    @Input() heading:string;
    @Input() disabled:boolean = false;

    @Output() openChange = new EventEmitter();
    @Input()
    open: boolean;

    constructor() {
    }

    public ngOnInit():any {
    }

    public toggleOpen(event:MouseEvent):any {
        event.preventDefault();
        if (!this.disabled) {
            this.open = !this.open;
            this.openChange.next(this.open);
        }
    }
}