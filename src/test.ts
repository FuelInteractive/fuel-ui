import {Component, View, bootstrap} from "angular2/angular2";

@Component({
	selector: 'test'
})
@View({
	template: '<h1>Tested!</h1>'
})
export class TestComponent {
	
}

bootstrap(TestComponent);