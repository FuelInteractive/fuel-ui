import {Component} from "angular2/core";
import {bootstrap} from "angular2/bootstrap";

@Component({
	selector: 'test',
	template: '<h1>Tested!</h1>'
})
export class TestComponent {
	
}

bootstrap(TestComponent);