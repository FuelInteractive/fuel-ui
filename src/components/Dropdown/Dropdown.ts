import {Component, Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
    selector: "dropdown",
    templateUrl: 'components/Dropdown/Dropdown.html'
})

export class Dropdown {
    @Input() label: string;
    dropdownOpen: boolean = false;
    
    public toggleDropdown() : void{
        this.dropdownOpen = !this.dropdownOpen;
    }
}

export var DROPDOWN_COMPONENT_PROVIDERS = [
    Dropdown
];