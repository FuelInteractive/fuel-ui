var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/bootstrap';
import { Observable } from 'rxjs/Rx';
// #docregion AsyncPipe
export let AsyncPipeExample = class {
    constructor() {
        this.greeting = null;
        this.arrived = false;
        this.resolve = null;
        this.reset();
    }
    reset() {
        this.arrived = false;
        this.greeting = new Promise((resolve, reject) => { this.resolve = resolve; });
    }
    clicked() {
        if (this.arrived) {
            this.reset();
        }
        else {
            this.resolve("hi there!");
            this.arrived = true;
        }
    }
};
AsyncPipeExample = __decorate([
    Component({
        selector: 'async-example',
        template: `<div>
    <p>Wait for it... {{ greeting | async }}</p>
    <button (click)="clicked()">{{ arrived ? 'Reset' : 'Resolve' }}</button>
  </div>`
    }), 
    __metadata('design:paramtypes', [])
], AsyncPipeExample);
// #enddocregion
// #docregion AsyncPipeObservable
let Task = class {
    constructor() {
        this.time = new Observable((observer) => {
            setInterval(_ => observer.next(new Date().getTime()), 500);
        });
    }
};
Task = __decorate([
    Component({ selector: "task-cmp", template: "Time: {{ time | async }}" }), 
    __metadata('design:paramtypes', [])
], Task);
// #enddocregion
export let AppCmp = class {
};
AppCmp = __decorate([
    Component({
        selector: 'example-app',
        directives: [AsyncPipeExample],
        template: `
    <h1>AsyncPipe Example</h1>
    <async-example></async-example>
  `
    }), 
    __metadata('design:paramtypes', [])
], AppCmp);
export function main() {
    bootstrap(AppCmp);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfcGlwZV9leGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvZXhhbXBsZXMvY29yZS9waXBlcy90cy9hc3luY19waXBlL2FzeW5jX3BpcGVfZXhhbXBsZS50cyJdLCJuYW1lcyI6WyJBc3luY1BpcGVFeGFtcGxlIiwiQXN5bmNQaXBlRXhhbXBsZS5jb25zdHJ1Y3RvciIsIkFzeW5jUGlwZUV4YW1wbGUucmVzZXQiLCJBc3luY1BpcGVFeGFtcGxlLmNsaWNrZWQiLCJUYXNrIiwiVGFzay5jb25zdHJ1Y3RvciIsIkFwcENtcCIsIm1haW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztPQUFPLEVBQUMsU0FBUyxFQUFVLE1BQU0sZUFBZTtPQUN6QyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9CQUFvQjtPQUNyQyxFQUFDLFVBQVUsRUFBYSxNQUFNLFNBQVM7QUFFOUMsdUJBQXVCO0FBQ3ZCO0lBYUVBO1FBTEFDLGFBQVFBLEdBQW9CQSxJQUFJQSxDQUFDQTtRQUNqQ0EsWUFBT0EsR0FBWUEsS0FBS0EsQ0FBQ0E7UUFFakJBLFlBQU9BLEdBQWFBLElBQUlBLENBQUNBO1FBRWpCQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtJQUFDQSxDQUFDQTtJQUUvQkQsS0FBS0E7UUFDSEUsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDckJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLE9BQU9BLENBQVNBLENBQUNBLE9BQU9BLEVBQUVBLE1BQU1BLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ3hGQSxDQUFDQTtJQUVERixPQUFPQTtRQUNMRyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNqQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7UUFDZkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBO1FBQ3RCQSxDQUFDQTtJQUNIQSxDQUFDQTtBQUNISCxDQUFDQTtBQTVCRDtJQUFDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVEsRUFBRTs7O1NBR0g7S0FDUixDQUFDOztxQkFzQkQ7QUFDRCxnQkFBZ0I7QUFFaEIsaUNBQWlDO0FBQ2pDO0lBQUFJO1FBRUVDLFNBQUlBLEdBQUdBLElBQUlBLFVBQVVBLENBQVNBLENBQUNBLFFBQTRCQTtZQUN6REEsV0FBV0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDN0RBLENBQUNBLENBQUNBLENBQUNBO0lBQ0xBLENBQUNBO0FBQURELENBQUNBO0FBTEQ7SUFBQyxTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBQyxDQUFDOztTQUt2RTtBQUNELGdCQUFnQjtBQUVoQjtBQVNBRSxDQUFDQTtBQVREO0lBQUMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsVUFBVSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7UUFDOUIsUUFBUSxFQUFFOzs7R0FHVDtLQUNGLENBQUM7O1dBRUQ7QUFFRDtJQUNFQyxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtBQUNwQkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgcHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvYm9vdHN0cmFwJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaWJlcn0gZnJvbSAncnhqcy9SeCc7XG5cbi8vICNkb2NyZWdpb24gQXN5bmNQaXBlXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhc3luYy1leGFtcGxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICAgIDxwPldhaXQgZm9yIGl0Li4uIHt7IGdyZWV0aW5nIHwgYXN5bmMgfX08L3A+XG4gICAgPGJ1dHRvbiAoY2xpY2spPVwiY2xpY2tlZCgpXCI+e3sgYXJyaXZlZCA/ICdSZXNldCcgOiAnUmVzb2x2ZScgfX08L2J1dHRvbj5cbiAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBBc3luY1BpcGVFeGFtcGxlIHtcbiAgZ3JlZXRpbmc6IFByb21pc2U8c3RyaW5nPiA9IG51bGw7XG4gIGFycml2ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIHJlc29sdmU6IEZ1bmN0aW9uID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHsgdGhpcy5yZXNldCgpOyB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5hcnJpdmVkID0gZmFsc2U7XG4gICAgdGhpcy5ncmVldGluZyA9IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4geyB0aGlzLnJlc29sdmUgPSByZXNvbHZlOyB9KTtcbiAgfVxuXG4gIGNsaWNrZWQoKSB7XG4gICAgaWYgKHRoaXMuYXJyaXZlZCkge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlc29sdmUoXCJoaSB0aGVyZSFcIik7XG4gICAgICB0aGlzLmFycml2ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIEFzeW5jUGlwZU9ic2VydmFibGVcbkBDb21wb25lbnQoe3NlbGVjdG9yOiBcInRhc2stY21wXCIsIHRlbXBsYXRlOiBcIlRpbWU6IHt7IHRpbWUgfCBhc3luYyB9fVwifSlcbmNsYXNzIFRhc2sge1xuICB0aW1lID0gbmV3IE9ic2VydmFibGU8bnVtYmVyPigob2JzZXJ2ZXI6IFN1YnNjcmliZXI8bnVtYmVyPikgPT4ge1xuICAgIHNldEludGVydmFsKF8gPT4gb2JzZXJ2ZXIubmV4dChuZXcgRGF0ZSgpLmdldFRpbWUoKSksIDUwMCk7XG4gIH0pO1xufVxuLy8gI2VuZGRvY3JlZ2lvblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleGFtcGxlLWFwcCcsXG4gIGRpcmVjdGl2ZXM6IFtBc3luY1BpcGVFeGFtcGxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+QXN5bmNQaXBlIEV4YW1wbGU8L2gxPlxuICAgIDxhc3luYy1leGFtcGxlPjwvYXN5bmMtZXhhbXBsZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDbXAge1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgYm9vdHN0cmFwKEFwcENtcCk7XG59XG4iXX0=