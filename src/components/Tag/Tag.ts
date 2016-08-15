import {NgModule, Directive, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from "@angular/core";
import {TagSet} from './TagSet';

@Directive({
    selector: 'tag, [tag]'
})
export class Tag implements OnInit, OnDestroy {
    @Input() public title:string;
    @Input() public value:any;
    @Input() public removable:boolean = false;

    @Input()
    public get pill():boolean { return this._pill;};
    public set pill(value:boolean) {
        this._pill = value;
        this.setClassMap();
    }
    protected _pill:boolean;

    @Input()
    public get color():string {return this._color;};
    public set color(value:string) {
        this._color = value;
        this.setClassMap();
    }
    protected _color:string;

    @Input()
    public get disabled():boolean {return this._disabled;};
    public set disabled(value:boolean) {
        this._disabled = value;
        this.setClassMap();
    }
    protected _disabled:boolean;

    @Output() public remove:EventEmitter<Tag> = new EventEmitter<Tag>(false);

    private classMap:any = {};
    public tagset:TagSet;

    public constructor(tagset:TagSet) {
        this.tagset = tagset;
        this.tagset.addTag(this);
    }

    public ngOnInit():void {
        this.color = this.color !== 'undefined' ? this.color : 'default';
    }

    public ngOnDestroy():void {
        this.remove.next(this);
        this.tagset.removeTag(this);
    }

    private setClassMap():void {
        this.classMap = {
            'disabled': this.disabled,
            'label-pill': this.pill,
            ['label-' + ((this.color && this.color.toLowerCase()) || 'default')]: true
        };
    }
}

const tagDirectives = [
    Tag,
    TagSet
];

@NgModule({
    imports: [CommonModule],
    declarations: tagDirectives,
    exports: tagDirectives
})
export class FuiTagModule { }