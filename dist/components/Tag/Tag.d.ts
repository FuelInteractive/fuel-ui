import { OnInit, OnDestroy, EventEmitter } from 'angular2/core';
import { TagSet } from './TagSet';
export declare class Tag implements OnInit, OnDestroy {
    title: string;
    value: any;
    removable: boolean;
    pill: boolean;
    protected _pill: boolean;
    color: string;
    protected _color: string;
    disabled: boolean;
    protected _disabled: boolean;
    remove: EventEmitter<Tag>;
    private classMap;
    tagset: TagSet;
    constructor(tagset: TagSet);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private setClassMap();
}
export declare var TAG_PROVIDERS: (typeof Tag | typeof TagSet)[];
