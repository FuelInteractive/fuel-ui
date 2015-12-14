import {Component, View} from "angular2/core";
import {bootstrap} from "angular2/bootstrap";

@Component({
	selector: 'test'
})
@View({
	template: '<h1>Tested!</h1>'
})
export class TestComponent {
	
}

bootstrap(TestComponent);