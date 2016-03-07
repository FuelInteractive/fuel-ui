'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var lang_1 = require('angular2/src/facade/lang');
/**
 * The `NgFor` directive instantiates a template once per item from an iterable. The context for
 * each instantiated template inherits from the outer context with the given loop variable set
 * to the current item from the iterable.
 *
 * # Local Variables
 *
 * `NgFor` provides several exported values that can be aliased to local variables:
 *
 * * `index` will be set to the current loop iteration for each template context.
 * * `last` will be set to a boolean value indicating whether the item is the last one in the
 *   iteration.
 * * `even` will be set to a boolean value indicating whether this item has an even index.
 * * `odd` will be set to a boolean value indicating whether this item has an odd index.
 *
 * # Change Propagation
 *
 * When the contents of the iterator changes, `NgFor` makes the corresponding changes to the DOM:
 *
 * * When an item is added, a new instance of the template is added to the DOM.
 * * When an item is removed, its template instance is removed from the DOM.
 * * When items are reordered, their respective templates are reordered in the DOM.
 * * Otherwise, the DOM element for that item will remain the same.
 *
 * Angular uses object identity to track insertions and deletions within the iterator and reproduce
 * those changes in the DOM. This has important implications for animations and any stateful
 * controls
 * (such as `<input>` elements which accept user input) that are present. Inserted rows can be
 * animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state such
 * as user input.
 *
 * It is possible for the identities of elements in the iterator to change while the data does not.
 * This can happen, for example, if the iterator produced from an RPC to the server, and that
 * RPC is re-run. Even if the data hasn't changed, the second response will produce objects with
 * different identities, and Angular will tear down the entire DOM and rebuild it (as if all old
 * elements were deleted and all new elements inserted). This is an expensive operation and should
 * be avoided if possible.
 *
 * # Syntax
 *
 * - `<li *ngFor="#item of items; #i = index">...</li>`
 * - `<li template="ngFor #item of items; #i = index">...</li>`
 * - `<template ngFor #item [ngForOf]="items" #i="index"><li>...</li></template>`
 *
 * ### Example
 *
 * See a [live demo](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview) for a more detailed
 * example.
 */
var NgFor = (function () {
    function NgFor(_viewContainer, _templateRef, _iterableDiffers, _cdr) {
        this._viewContainer = _viewContainer;
        this._templateRef = _templateRef;
        this._iterableDiffers = _iterableDiffers;
        this._cdr = _cdr;
    }
    Object.defineProperty(NgFor.prototype, "ngForOf", {
        set: function (value) {
            this._ngForOf = value;
            if (lang_1.isBlank(this._differ) && lang_1.isPresent(value)) {
                this._differ = this._iterableDiffers.find(value).create(this._cdr, this._ngForTrackBy);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgFor.prototype, "ngForTemplate", {
        set: function (value) {
            if (lang_1.isPresent(value)) {
                this._templateRef = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgFor.prototype, "ngForTrackBy", {
        set: function (value) { this._ngForTrackBy = value; },
        enumerable: true,
        configurable: true
    });
    NgFor.prototype.ngDoCheck = function () {
        if (lang_1.isPresent(this._differ)) {
            var changes = this._differ.diff(this._ngForOf);
            if (lang_1.isPresent(changes))
                this._applyChanges(changes);
        }
    };
    NgFor.prototype._applyChanges = function (changes) {
        var _this = this;
        // TODO(rado): check if change detection can produce a change record that is
        // easier to consume than current.
        var recordViewTuples = [];
        changes.forEachRemovedItem(function (removedRecord) {
            return recordViewTuples.push(new RecordViewTuple(removedRecord, null));
        });
        changes.forEachMovedItem(function (movedRecord) {
            return recordViewTuples.push(new RecordViewTuple(movedRecord, null));
        });
        var insertTuples = this._bulkRemove(recordViewTuples);
        changes.forEachAddedItem(function (addedRecord) {
            return insertTuples.push(new RecordViewTuple(addedRecord, null));
        });
        this._bulkInsert(insertTuples);
        for (var i = 0; i < insertTuples.length; i++) {
            this._perViewChange(insertTuples[i].view, insertTuples[i].record);
        }
        for (var i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
            var viewRef = this._viewContainer.get(i);
            viewRef.setLocal('last', i === ilen - 1);
        }
        changes.forEachIdentityChange(function (record) {
            var viewRef = _this._viewContainer.get(record.currentIndex);
            viewRef.setLocal('\$implicit', record.item);
        });
    };
    NgFor.prototype._perViewChange = function (view, record) {
        view.setLocal('\$implicit', record.item);
        view.setLocal('index', record.currentIndex);
        view.setLocal('even', (record.currentIndex % 2 == 0));
        view.setLocal('odd', (record.currentIndex % 2 == 1));
    };
    NgFor.prototype._bulkRemove = function (tuples) {
        tuples.sort(function (a, b) {
            return a.record.previousIndex - b.record.previousIndex;
        });
        var movedTuples = [];
        for (var i = tuples.length - 1; i >= 0; i--) {
            var tuple = tuples[i];
            // separate moved views from removed views.
            if (lang_1.isPresent(tuple.record.currentIndex)) {
                tuple.view = this._viewContainer.detach(tuple.record.previousIndex);
                movedTuples.push(tuple);
            }
            else {
                this._viewContainer.remove(tuple.record.previousIndex);
            }
        }
        return movedTuples;
    };
    NgFor.prototype._bulkInsert = function (tuples) {
        tuples.sort(function (a, b) { return a.record.currentIndex - b.record.currentIndex; });
        for (var i = 0; i < tuples.length; i++) {
            var tuple = tuples[i];
            if (lang_1.isPresent(tuple.view)) {
                this._viewContainer.insert(tuple.view, tuple.record.currentIndex);
            }
            else {
                tuple.view =
                    this._viewContainer.createEmbeddedView(this._templateRef, tuple.record.currentIndex);
            }
        }
        return tuples;
    };
    NgFor = __decorate([
        core_1.Directive({ selector: '[ngFor][ngForOf]', inputs: ['ngForTrackBy', 'ngForOf', 'ngForTemplate'] }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, core_1.IterableDiffers, core_1.ChangeDetectorRef])
    ], NgFor);
    return NgFor;
})();
exports.NgFor = NgFor;
var RecordViewTuple = (function () {
    function RecordViewTuple(record, view) {
        this.record = record;
        this.view = view;
    }
    return RecordViewTuple;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL25nX2Zvci50cyJdLCJuYW1lcyI6WyJOZ0ZvciIsIk5nRm9yLmNvbnN0cnVjdG9yIiwiTmdGb3IubmdGb3JPZiIsIk5nRm9yLm5nRm9yVGVtcGxhdGUiLCJOZ0Zvci5uZ0ZvclRyYWNrQnkiLCJOZ0Zvci5uZ0RvQ2hlY2siLCJOZ0Zvci5fYXBwbHlDaGFuZ2VzIiwiTmdGb3IuX3BlclZpZXdDaGFuZ2UiLCJOZ0Zvci5fYnVsa1JlbW92ZSIsIk5nRm9yLl9idWxrSW5zZXJ0IiwiUmVjb3JkVmlld1R1cGxlIiwiUmVjb3JkVmlld1R1cGxlLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxxQkFVTyxlQUFlLENBQUMsQ0FBQTtBQUN2QixxQkFBaUMsMEJBQTBCLENBQUMsQ0FBQTtBQU01RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0RHO0FBQ0g7SUFPRUEsZUFBb0JBLGNBQWdDQSxFQUFVQSxZQUF5QkEsRUFDbkVBLGdCQUFpQ0EsRUFBVUEsSUFBdUJBO1FBRGxFQyxtQkFBY0EsR0FBZEEsY0FBY0EsQ0FBa0JBO1FBQVVBLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFhQTtRQUNuRUEscUJBQWdCQSxHQUFoQkEsZ0JBQWdCQSxDQUFpQkE7UUFBVUEsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBbUJBO0lBQUdBLENBQUNBO0lBRTFGRCxzQkFBSUEsMEJBQU9BO2FBQVhBLFVBQVlBLEtBQVVBO1lBQ3BCRSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUN0QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsY0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsZ0JBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUM5Q0EsSUFB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SUEsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFDakVBLElBQUlBLE9BQU9BLEdBQW9CQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxREEsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsS0FBS0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLENBQUNBO1FBRURBLE9BQU9BLENBQUNBLHFCQUFxQkEsQ0FBQ0EsVUFBQ0EsTUFBTUE7WUFDbkNBLElBQUlBLE9BQU9BLEdBQW9CQSxLQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtZQUM1RUEsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsRUFBRUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDOUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ0xBLENBQUNBO0lBRU9OLDhCQUFjQSxHQUF0QkEsVUFBdUJBLElBQXFCQSxFQUFFQSxNQUE4QkE7UUFDMUVPLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFlBQVlBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3pDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxFQUFFQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQUM1Q0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsWUFBWUEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdERBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLE1BQU1BLENBQUNBLFlBQVlBLEdBQUdBLENBQUNBLElB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RUEsU0FBU0EsRUFBRUEsZUFBZUEsQ0FBQ0EsRUFBQ0EsQ0FBQ0E7O2NBcUcvRkE7SUFBREEsWUFBQ0E7QUFBREEsQ0FBQ0EsQUFyR0QsSUFxR0M7QUFwR1ksYUFBSyxRQW9HakIsQ0FBQTtBQUVEO0lBR0VVLHlCQUFZQSxNQUFXQSxFQUFFQSxJQUFxQkE7UUFDNUNDLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBO1FBQ3JCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUNuQkEsQ0FBQ0E7SUFDSEQsc0JBQUNBO0FBQURBLENBQUNBLEFBUEQsSUFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERvQ2hlY2ssXG4gIERpcmVjdGl2ZSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFRlbXBsYXRlUmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIFRyYWNrQnlGblxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtcbiAgRGVmYXVsdEl0ZXJhYmxlRGlmZmVyLFxuICBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkXG59IGZyb20gXCIuLi8uLi9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vZGlmZmVycy9kZWZhdWx0X2l0ZXJhYmxlX2RpZmZlclwiO1xuXG4vKipcbiAqIFRoZSBgTmdGb3JgIGRpcmVjdGl2ZSBpbnN0YW50aWF0ZXMgYSB0ZW1wbGF0ZSBvbmNlIHBlciBpdGVtIGZyb20gYW4gaXRlcmFibGUuIFRoZSBjb250ZXh0IGZvclxuICogZWFjaCBpbnN0YW50aWF0ZWQgdGVtcGxhdGUgaW5oZXJpdHMgZnJvbSB0aGUgb3V0ZXIgY29udGV4dCB3aXRoIHRoZSBnaXZlbiBsb29wIHZhcmlhYmxlIHNldFxuICogdG8gdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBpdGVyYWJsZS5cbiAqXG4gKiAjIExvY2FsIFZhcmlhYmxlc1xuICpcbiAqIGBOZ0ZvcmAgcHJvdmlkZXMgc2V2ZXJhbCBleHBvcnRlZCB2YWx1ZXMgdGhhdCBjYW4gYmUgYWxpYXNlZCB0byBsb2NhbCB2YXJpYWJsZXM6XG4gKlxuICogKiBgaW5kZXhgIHdpbGwgYmUgc2V0IHRvIHRoZSBjdXJyZW50IGxvb3AgaXRlcmF0aW9uIGZvciBlYWNoIHRlbXBsYXRlIGNvbnRleHQuXG4gKiAqIGBsYXN0YCB3aWxsIGJlIHNldCB0byBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBpdGVtIGlzIHRoZSBsYXN0IG9uZSBpbiB0aGVcbiAqICAgaXRlcmF0aW9uLlxuICogKiBgZXZlbmAgd2lsbCBiZSBzZXQgdG8gYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGlzIGl0ZW0gaGFzIGFuIGV2ZW4gaW5kZXguXG4gKiAqIGBvZGRgIHdpbGwgYmUgc2V0IHRvIGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhpcyBpdGVtIGhhcyBhbiBvZGQgaW5kZXguXG4gKlxuICogIyBDaGFuZ2UgUHJvcGFnYXRpb25cbiAqXG4gKiBXaGVuIHRoZSBjb250ZW50cyBvZiB0aGUgaXRlcmF0b3IgY2hhbmdlcywgYE5nRm9yYCBtYWtlcyB0aGUgY29ycmVzcG9uZGluZyBjaGFuZ2VzIHRvIHRoZSBET006XG4gKlxuICogKiBXaGVuIGFuIGl0ZW0gaXMgYWRkZWQsIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB0ZW1wbGF0ZSBpcyBhZGRlZCB0byB0aGUgRE9NLlxuICogKiBXaGVuIGFuIGl0ZW0gaXMgcmVtb3ZlZCwgaXRzIHRlbXBsYXRlIGluc3RhbmNlIGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NLlxuICogKiBXaGVuIGl0ZW1zIGFyZSByZW9yZGVyZWQsIHRoZWlyIHJlc3BlY3RpdmUgdGVtcGxhdGVzIGFyZSByZW9yZGVyZWQgaW4gdGhlIERPTS5cbiAqICogT3RoZXJ3aXNlLCB0aGUgRE9NIGVsZW1lbnQgZm9yIHRoYXQgaXRlbSB3aWxsIHJlbWFpbiB0aGUgc2FtZS5cbiAqXG4gKiBBbmd1bGFyIHVzZXMgb2JqZWN0IGlkZW50aXR5IHRvIHRyYWNrIGluc2VydGlvbnMgYW5kIGRlbGV0aW9ucyB3aXRoaW4gdGhlIGl0ZXJhdG9yIGFuZCByZXByb2R1Y2VcbiAqIHRob3NlIGNoYW5nZXMgaW4gdGhlIERPTS4gVGhpcyBoYXMgaW1wb3J0YW50IGltcGxpY2F0aW9ucyBmb3IgYW5pbWF0aW9ucyBhbmQgYW55IHN0YXRlZnVsXG4gKiBjb250cm9sc1xuICogKHN1Y2ggYXMgYDxpbnB1dD5gIGVsZW1lbnRzIHdoaWNoIGFjY2VwdCB1c2VyIGlucHV0KSB0aGF0IGFyZSBwcmVzZW50LiBJbnNlcnRlZCByb3dzIGNhbiBiZVxuICogYW5pbWF0ZWQgaW4sIGRlbGV0ZWQgcm93cyBjYW4gYmUgYW5pbWF0ZWQgb3V0LCBhbmQgdW5jaGFuZ2VkIHJvd3MgcmV0YWluIGFueSB1bnNhdmVkIHN0YXRlIHN1Y2hcbiAqIGFzIHVzZXIgaW5wdXQuXG4gKlxuICogSXQgaXMgcG9zc2libGUgZm9yIHRoZSBpZGVudGl0aWVzIG9mIGVsZW1lbnRzIGluIHRoZSBpdGVyYXRvciB0byBjaGFuZ2Ugd2hpbGUgdGhlIGRhdGEgZG9lcyBub3QuXG4gKiBUaGlzIGNhbiBoYXBwZW4sIGZvciBleGFtcGxlLCBpZiB0aGUgaXRlcmF0b3IgcHJvZHVjZWQgZnJvbSBhbiBSUEMgdG8gdGhlIHNlcnZlciwgYW5kIHRoYXRcbiAqIFJQQyBpcyByZS1ydW4uIEV2ZW4gaWYgdGhlIGRhdGEgaGFzbid0IGNoYW5nZWQsIHRoZSBzZWNvbmQgcmVzcG9uc2Ugd2lsbCBwcm9kdWNlIG9iamVjdHMgd2l0aFxuICogZGlmZmVyZW50IGlkZW50aXRpZXMsIGFuZCBBbmd1bGFyIHdpbGwgdGVhciBkb3duIHRoZSBlbnRpcmUgRE9NIGFuZCByZWJ1aWxkIGl0IChhcyBpZiBhbGwgb2xkXG4gKiBlbGVtZW50cyB3ZXJlIGRlbGV0ZWQgYW5kIGFsbCBuZXcgZWxlbWVudHMgaW5zZXJ0ZWQpLiBUaGlzIGlzIGFuIGV4cGVuc2l2ZSBvcGVyYXRpb24gYW5kIHNob3VsZFxuICogYmUgYXZvaWRlZCBpZiBwb3NzaWJsZS5cbiAqXG4gKiAjIFN5bnRheFxuICpcbiAqIC0gYDxsaSAqbmdGb3I9XCIjaXRlbSBvZiBpdGVtczsgI2kgPSBpbmRleFwiPi4uLjwvbGk+YFxuICogLSBgPGxpIHRlbXBsYXRlPVwibmdGb3IgI2l0ZW0gb2YgaXRlbXM7ICNpID0gaW5kZXhcIj4uLi48L2xpPmBcbiAqIC0gYDx0ZW1wbGF0ZSBuZ0ZvciAjaXRlbSBbbmdGb3JPZl09XCJpdGVtc1wiICNpPVwiaW5kZXhcIj48bGk+Li4uPC9saT48L3RlbXBsYXRlPmBcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIFNlZSBhIFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L0tWdVh4RHAwcWluR0R5bzMwN1FXP3A9cHJldmlldykgZm9yIGEgbW9yZSBkZXRhaWxlZFxuICogZXhhbXBsZS5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdGb3JdW25nRm9yT2ZdJywgaW5wdXRzOiBbJ25nRm9yVHJhY2tCeScsICduZ0Zvck9mJywgJ25nRm9yVGVtcGxhdGUnXX0pXG5leHBvcnQgY2xhc3MgTmdGb3IgaW1wbGVtZW50cyBEb0NoZWNrIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbmdGb3JPZjogYW55O1xuICBfbmdGb3JUcmFja0J5OiBUcmFja0J5Rm47XG4gIHByaXZhdGUgX2RpZmZlcjogSXRlcmFibGVEaWZmZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBfdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9pdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycywgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBzZXQgbmdGb3JPZih2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fbmdGb3JPZiA9IHZhbHVlO1xuICAgIGlmIChpc0JsYW5rKHRoaXMuX2RpZmZlcikgJiYgaXNQcmVzZW50KHZhbHVlKSkge1xuICAgICAgdGhpcy5fZGlmZmVyID0gdGhpcy5faXRlcmFibGVEaWZmZXJzLmZpbmQodmFsdWUpLmNyZWF0ZSh0aGlzLl9jZHIsIHRoaXMuX25nRm9yVHJhY2tCeSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IG5nRm9yVGVtcGxhdGUodmFsdWU6IFRlbXBsYXRlUmVmKSB7XG4gICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX3RlbXBsYXRlUmVmID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc2V0IG5nRm9yVHJhY2tCeSh2YWx1ZTogVHJhY2tCeUZuKSB7IHRoaXMuX25nRm9yVHJhY2tCeSA9IHZhbHVlOyB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fZGlmZmVyKSkge1xuICAgICAgdmFyIGNoYW5nZXMgPSB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl9uZ0Zvck9mKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoY2hhbmdlcykpIHRoaXMuX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUNoYW5nZXMoY2hhbmdlczogRGVmYXVsdEl0ZXJhYmxlRGlmZmVyKSB7XG4gICAgLy8gVE9ETyhyYWRvKTogY2hlY2sgaWYgY2hhbmdlIGRldGVjdGlvbiBjYW4gcHJvZHVjZSBhIGNoYW5nZSByZWNvcmQgdGhhdCBpc1xuICAgIC8vIGVhc2llciB0byBjb25zdW1lIHRoYW4gY3VycmVudC5cbiAgICB2YXIgcmVjb3JkVmlld1R1cGxlczogUmVjb3JkVmlld1R1cGxlW10gPSBbXTtcbiAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVtb3ZlZFJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkVmlld1R1cGxlcy5wdXNoKG5ldyBSZWNvcmRWaWV3VHVwbGUocmVtb3ZlZFJlY29yZCwgbnVsbCkpKTtcblxuICAgIGNoYW5nZXMuZm9yRWFjaE1vdmVkSXRlbSgobW92ZWRSZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRWaWV3VHVwbGVzLnB1c2gobmV3IFJlY29yZFZpZXdUdXBsZShtb3ZlZFJlY29yZCwgbnVsbCkpKTtcblxuICAgIHZhciBpbnNlcnRUdXBsZXMgPSB0aGlzLl9idWxrUmVtb3ZlKHJlY29yZFZpZXdUdXBsZXMpO1xuXG4gICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChhZGRlZFJlY29yZDogQ29sbGVjdGlvbkNoYW5nZVJlY29yZCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydFR1cGxlcy5wdXNoKG5ldyBSZWNvcmRWaWV3VHVwbGUoYWRkZWRSZWNvcmQsIG51bGwpKSk7XG5cbiAgICB0aGlzLl9idWxrSW5zZXJ0KGluc2VydFR1cGxlcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluc2VydFR1cGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fcGVyVmlld0NoYW5nZShpbnNlcnRUdXBsZXNbaV0udmlldywgaW5zZXJ0VHVwbGVzW2ldLnJlY29yZCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsZW4gPSB0aGlzLl92aWV3Q29udGFpbmVyLmxlbmd0aDsgaSA8IGlsZW47IGkrKykge1xuICAgICAgdmFyIHZpZXdSZWYgPSA8RW1iZWRkZWRWaWV3UmVmPnRoaXMuX3ZpZXdDb250YWluZXIuZ2V0KGkpO1xuICAgICAgdmlld1JlZi5zZXRMb2NhbCgnbGFzdCcsIGkgPT09IGlsZW4gLSAxKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VzLmZvckVhY2hJZGVudGl0eUNoYW5nZSgocmVjb3JkKSA9PiB7XG4gICAgICB2YXIgdmlld1JlZiA9IDxFbWJlZGRlZFZpZXdSZWY+dGhpcy5fdmlld0NvbnRhaW5lci5nZXQocmVjb3JkLmN1cnJlbnRJbmRleCk7XG4gICAgICB2aWV3UmVmLnNldExvY2FsKCdcXCRpbXBsaWNpdCcsIHJlY29yZC5pdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3BlclZpZXdDaGFuZ2UodmlldzogRW1iZWRkZWRWaWV3UmVmLCByZWNvcmQ6IENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQpIHtcbiAgICB2aWV3LnNldExvY2FsKCdcXCRpbXBsaWNpdCcsIHJlY29yZC5pdGVtKTtcbiAgICB2aWV3LnNldExvY2FsKCdpbmRleCcsIHJlY29yZC5jdXJyZW50SW5kZXgpO1xuICAgIHZpZXcuc2V0TG9jYWwoJ2V2ZW4nLCAocmVjb3JkLmN1cnJlbnRJbmRleCAlIDIgPT0gMCkpO1xuICAgIHZpZXcuc2V0TG9jYWwoJ29kZCcsIChyZWNvcmQuY3VycmVudEluZGV4ICUgMiA9PSAxKSk7XG4gIH1cblxuICBwcml2YXRlIF9idWxrUmVtb3ZlKHR1cGxlczogUmVjb3JkVmlld1R1cGxlW10pOiBSZWNvcmRWaWV3VHVwbGVbXSB7XG4gICAgdHVwbGVzLnNvcnQoKGE6IFJlY29yZFZpZXdUdXBsZSwgYjogUmVjb3JkVmlld1R1cGxlKSA9PlxuICAgICAgICAgICAgICAgICAgICBhLnJlY29yZC5wcmV2aW91c0luZGV4IC0gYi5yZWNvcmQucHJldmlvdXNJbmRleCk7XG4gICAgdmFyIG1vdmVkVHVwbGVzOiBSZWNvcmRWaWV3VHVwbGVbXSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSB0dXBsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciB0dXBsZSA9IHR1cGxlc1tpXTtcbiAgICAgIC8vIHNlcGFyYXRlIG1vdmVkIHZpZXdzIGZyb20gcmVtb3ZlZCB2aWV3cy5cbiAgICAgIGlmIChpc1ByZXNlbnQodHVwbGUucmVjb3JkLmN1cnJlbnRJbmRleCkpIHtcbiAgICAgICAgdHVwbGUudmlldyA9IHRoaXMuX3ZpZXdDb250YWluZXIuZGV0YWNoKHR1cGxlLnJlY29yZC5wcmV2aW91c0luZGV4KTtcbiAgICAgICAgbW92ZWRUdXBsZXMucHVzaCh0dXBsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLnJlbW92ZSh0dXBsZS5yZWNvcmQucHJldmlvdXNJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb3ZlZFR1cGxlcztcbiAgfVxuXG4gIHByaXZhdGUgX2J1bGtJbnNlcnQodHVwbGVzOiBSZWNvcmRWaWV3VHVwbGVbXSk6IFJlY29yZFZpZXdUdXBsZVtdIHtcbiAgICB0dXBsZXMuc29ydCgoYSwgYikgPT4gYS5yZWNvcmQuY3VycmVudEluZGV4IC0gYi5yZWNvcmQuY3VycmVudEluZGV4KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR1cGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHR1cGxlID0gdHVwbGVzW2ldO1xuICAgICAgaWYgKGlzUHJlc2VudCh0dXBsZS52aWV3KSkge1xuICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmluc2VydCh0dXBsZS52aWV3LCB0dXBsZS5yZWNvcmQuY3VycmVudEluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR1cGxlLnZpZXcgPVxuICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fdGVtcGxhdGVSZWYsIHR1cGxlLnJlY29yZC5jdXJyZW50SW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHVwbGVzO1xuICB9XG59XG5cbmNsYXNzIFJlY29yZFZpZXdUdXBsZSB7XG4gIHZpZXc6IEVtYmVkZGVkVmlld1JlZjtcbiAgcmVjb3JkOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHJlY29yZDogYW55LCB2aWV3OiBFbWJlZGRlZFZpZXdSZWYpIHtcbiAgICB0aGlzLnJlY29yZCA9IHJlY29yZDtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICB9XG59XG4iXX0=