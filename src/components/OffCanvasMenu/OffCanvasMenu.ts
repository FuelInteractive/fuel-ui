import {NgModule, Component, Directive, Input, Output, QueryList, ContentChildren} from "@angular/core";
import {HostListener, EventEmitter} from "@angular/core";
import {OnInit, OnDestroy, AfterContentInit} from "@angular/core";
import {trigger, state, style, transition, animate, keyframes} from '@angular/core';
import {CommonModule} from "@angular/common";

@Directive({
    selector: "[offCanvasMenuClose], .off-canvas-menu-close"
})
export class OffCanvasMenuClose {
    @Output()
    close = new EventEmitter();

    @HostListener("click", ["$event"])
    onClick(e: any): void {
        this.close.next(null);
    }
}

@Component({
    selector: "off-canvas-menu",
    templateUrl: "components/OffCanvasMenu/OffCanvasMenu.html",
    styleUrls: ["components/OffCanvasMenu/OffCanvasMenu.css"],
    directives: [OffCanvasMenuClose],
    animations: [
        trigger("open", [
            state("open", style({transform: "translate(0,0)"})),
            transition("void => open", [animate("200ms ease")]),
            transition("open => void", [animate("200ms ease")])
        ]),
        trigger("fade", [
            state("in", style({opacity: ".75"})),
            transition("void => in", [animate("200ms ease")]),
            transition("in => void", [animate("200ms ease")])
        ])
    ]
})
export class OffCanvasMenu implements OnInit, OnDestroy, AfterContentInit {
    @Input()
    origin: "left" | "top" | "right" | "bottom" = "left";

    @Input()
    width = "25%";

    @Input()
    height = "25%";

	@Output() 
    close:EventEmitter<any> = new EventEmitter<any>();
	@Output() 
    open:EventEmitter<any> = new EventEmitter<any>();

    computedWidth = this.width;
    computedHeight = this.height;

    @ContentChildren(OffCanvasMenuClose)
    closeButtons: QueryList<OffCanvasMenuClose>;

    isOpen = false;

    overlayState: "in" = null;
    openState: "open" = null;

    constructor() {

    }

    ngOnInit(): void {
        
    }

    ngAfterContentInit(): void {
        this.closeButtons.map(b => b.close.subscribe(() => this.toggleMenu()));        
    }

    ngOnDestroy(): void {

    }

    toggleMenu(): void {
        this.isOpen = !this.isOpen;

        if(this.isOpen) {
            this.overlayState = "in";
            this.openState = "open";
            this.open.next(null);
        } else {
            this.overlayState = null;
            this.openState = null;
            this.close.next(null);
        }

        if(this.origin == "left" || this.origin == "right") {
            this.computedHeight = "100%";
            this.computedWidth = this.width;
        }
        else if(this.origin == "top" || this.origin == "bottom") {
            this.computedWidth = "100%";
            this.computedHeight = this.height;
        }
    }
}

const offCanvasMenuDirectives = [
    OffCanvasMenu,
    OffCanvasMenuClose
]

@NgModule({
    imports: [CommonModule],
    declarations: offCanvasMenuDirectives,
    exports: offCanvasMenuDirectives
})
export class FuiOffCanvasMenuModule { }

