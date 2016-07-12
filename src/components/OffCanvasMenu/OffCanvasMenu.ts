import {Component, Directive, Input, Output, QueryList, ContentChildren} from "@angular/core";
import {HostListener, EventEmitter} from "@angular/core";
import {OnInit, OnDestroy, AfterContentInit} from "@angular/core";
import {trigger, state, style, transition, animate, keyframes} from '@angular/core';
import {CORE_DIRECTIVES} from "@angular/common";

@Directive({
    selector: "[offCanvasMenuClose], .off-canvas-menu-close"
})
export class OffCanvasMenuClose {
    @Output()
    close = new EventEmitter();

    @HostListener("click", ["$event"])
    onClick(e): void {
        this.close.next(null);
    }
}

@Component({
    selector: "off-canvas-menu",
    templateUrl: "components/OffCanvasMenu/OffCanvasMenu.html",
    styleUrls: ["components/OffCanvasMenu/OffCanvasMenu.css"],
    directives: [CORE_DIRECTIVES, OffCanvasMenuClose],
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

    @ContentChildren(OffCanvasMenuClose)
    closeButtons: QueryList<OffCanvasMenuClose>;

    isOpen = false;

    overlayState: "in" = null;
    openState: "open" = null;

    constructor() {

    }

    ngOnInit(): void {
        if(this.origin == "left" || this.origin == "right")
            this.height = "100%";
        else if(this.origin == "top" || this.origin == "bottom")
            this.width = "100%";
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
        } else {
            this.overlayState = null;
            this.openState = null;
        }
    }
}

export let OFF_CANVAS_MENU_PROVIDERS = [
    OffCanvasMenu,
    OffCanvasMenuClose
]