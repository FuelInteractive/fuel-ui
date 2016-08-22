import {Component, OnInit, OnDestroy, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {Tag} from './Tag';

@Component({
    selector: 'tagset',
    directives: [NgClass],
    templateUrl: 'components/tag/tagSet.html'
})
export class TagSet implements OnDestroy {

    @Input() public tags:Array<Tag> = [];
    private destroyed:boolean;

    public ngOnDestroy():void {
        this.destroyed = true;
    }

    public addTag(tag:Tag):void {
        this.tags.push(tag);
    }

    public removeTag(tag:Tag):void {
        let index = this.tags.indexOf(tag);
        if (index === -1 || this.destroyed || tag.disabled) {
            return;
        }

        tag.remove.next(tag);
        this.tags.splice(index, 1);
    }
}