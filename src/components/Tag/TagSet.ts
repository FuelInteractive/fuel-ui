import {Component, OnInit, OnDestroy, Input, Output} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Tag} from './Tag';

@Component({
  selector: 'tagset',
  directives: [NgClass],
  template: `
    <span *ngFor="#tag of tags" class="label fuel-ui-label" [ngClass]="tag.classMap">
        <span [innerHtml]="tag.title"></span>
        <span class="fuel-ui-clickable" [class.disabled]="tag.disabled" *ngIf="tag.removable" (click)="$event.preventDefault(); removeTag(tag);">
            <i class="fa fa-remove"></i>
        </span>
    </span>
  `
})
export class TagSet implements OnDestroy {

  @Input() public tags:Array<Tag> = [];
  private isDestroyed:boolean;

  public ngOnDestroy():void {
    this.isDestroyed = true;
  }

  public addTag(tag:Tag):void {
    this.tags.push(tag);
  }

  public removeTag(tag:Tag):void {
    let index = this.tags.indexOf(tag);
    if (index === -1 || this.isDestroyed || tag.disabled) {
      return;
    }

    tag.remove.next(tag);
    this.tags.splice(index, 1);
  }
}