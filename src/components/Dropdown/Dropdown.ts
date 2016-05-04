import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

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