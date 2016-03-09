import {Component, View, Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
    selector: "collapse"
})
@View({
    templateUrl: 'components/Collapse/Collapse.html'
})

export class Collapse {
    @Input() collapseId: string;
    @Input() collapseButtonText: string;
    showCollapse: boolean = false;
    
    public toggleCollapse() : void{
        this.showCollapse = !this.showCollapse;
    }
    
}

export var COLLAPSE_PROVIDERS = [
    Collapse
];