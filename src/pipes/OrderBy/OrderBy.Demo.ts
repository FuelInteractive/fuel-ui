import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from "angular2/common";
import {ORDERBY_PROVIDERS} from './OrderBy';

export class Person {
  constructor(public firstName: string, public lastName: string, public age: number) {}
}

@Component({
  template: `
        <h2>OrderBy</h2>
		<section class="row m-a">
			<h3>One-Dimensional Arrays</h3>
			<div class="col-md-4">
				<h4>Unordered</h4>
				<code>*ngFor="#f of fruit"</code><br/>
				<ul>
					<li *ngFor="#f of fruit">{{f}}</li>
				</ul>
			</div>
			<div class="col-md-8">
				<h4>Ordered</h4>
				<code>*ngFor="#f of fruit | orderBy : '{{fruitOrderByConfig}}'"</code><br/>
				OR<br/>
				<code>*ngFor="#f of fruit | orderBy : ['{{fruitOrderByConfig}}']"</code><br/>
				<div class="row">
					<div class="col-md-6">
						<ul>
							<li *ngFor="#f of fruit | orderBy : fruitOrderByConfig">{{f}}</li>
						</ul>
					</div>
					<div class="col-md-6">
						<div class="row form-group">
							<label for="fruitOrderByConfig" class="col-sm-4">Order By</label>
							<div class="col-sm-8">
								<select class="form-control" (change)="setFruitConfig($event.target.value)">
							        <option value="+" [selected]="fruitOrderByConfig == '+'">Ascending</option>
							        <option value="-" [selected]="fruitOrderByConfig == '-'">Descending</option>
							    </select>
							</div>
						</div>
						<div class="row">
							<h4>Add Fruit</h4>
							<div class="input-group">
								<input type="text" class="form-control" [(ngModel)]="newFruit" name="newFruit">
								<div class="input-group-btn">
									<button type="button" class="btn btn-primary" (click)="addFruit()">Add</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="row m-a">
			<h3>Multi-Dimensional Arrays</h3>
			<div class="col-md-4">
				<h4>Unordered</h4>
				<code>*ngFor="#person of people"</code><br/>
				<ul>
					<li *ngFor="#person of people">{{person.firstName}} {{person.lastName}}, {{person.age}}</li>
				</ul>
			</div>
			<div class="col-md-8">
				<h4>Ordered</h4>
				<code>*ngFor="#person of people | orderBy : ['{{peopleOrderByConfig[0]}}', '{{peopleOrderByConfig[1]}}']"</code><br/>
				<div class="row">
					<div class="col-md-6">
						<ul>
							<li *ngFor="#person of people | orderBy : peopleOrderByConfig">{{person.firstName}} {{person.lastName}}, {{person.age}}</li>
						</ul>
					</div>
					<div class="col-md-6">
						<div class="row form-group">
							<label for="fruitOrderByConfig" class="col-sm-4">Order By</label>
							<div class="col-sm-8">
								<select class="form-control" (change)="setPeopleConfig('property', 1, $event.target.value)">
							        <option value="firstName" [selected]="peopleOrderBy1Property == 'firstName'">First Name</option>
							        <option value="lastName" [selected]="peopleOrderBy1Property == 'lastName'">Last Name</option>
							        <option value="age" [selected]="peopleOrderBy1Property == 'age'">Age</option>
							    </select>
								<select class="form-control" (change)="setPeopleConfig('desc', 1, $event.target.value)">
							        <option value="" [selected]="peopleOrderBy1Desc == ''">Ascending</option>
							        <option value="-" [selected]="peopleOrderBy1Desc == '-'">Descending</option>
							    </select>
							</div>
						</div>
						<div class="row form-group">
							<label for="fruitOrderByConfig" class="col-sm-4">Then By</label>
							<div class="col-sm-8">
								<select class="form-control" (change)="setPeopleConfig('property', 2, $event.target.value)">
							        <option value="firstName" [selected]="peopleOrderBy2Property == 'firstName'">First Name</option>
							        <option value="lastName" [selected]="peopleOrderBy2Property == 'lastName'">Last Name</option>
							        <option value="age" [selected]="peopleOrderBy2Property == 'age'">Age</option>
							    </select>
								<select class="form-control" (change)="setPeopleConfig('desc', 2, $event.target.value)">
							        <option value="" [selected]="peopleOrderBy2Desc == ''">Ascending</option>
							        <option value="-" [selected]="peopleOrderBy2Desc == '-'">Descending</option>
							    </select>
							</div>
						</div>
						<div class="row">
							<h4>Add Person</h4>
							<div class="row form-group">
								<label for="firstName" class="col-sm-4">First Name</label>
								<input type="text" class="form-control" [(ngModel)]="newPerson.firstName" name="firstName">
							</div>
							<div class="row form-group">
								<label for="lastName" class="col-sm-4">Last Name</label>
								<input type="text" class="form-control" [(ngModel)]="newPerson.lastName" name="lastName">
							</div>
							<div class="row form-group">
								<label for="lastName" class="col-sm-4">Age</label>
								<input type="number" min="18" max="120" class="form-control" [(ngModel)]="newPerson.age" name="age">
							</div>

							<button type="button" class="btn btn-primary" (click)="addPerson()">Add</button>
						</div>
					</div>
				</div>
			</div>
		</section>`,
        directives: [CORE_DIRECTIVES],
        pipes: [ORDERBY_PROVIDERS]
})
export class OrderByDemo {
    newPerson = new Person('', '', 18);
    people: Person[] = [
		new Person('Linus', 'Torvalds', 46),
		new Person('Larry', 'Ellison', 71),
		new Person('Mark', 'Zuckerberg', 31),
		new Person('Sergey', 'Brin', 42),
		new Person('Vint', 'Cerf', 72),
        new Person('Richard', 'Stallman', 62),
        new Person('John', 'Papa', 42)
    ];
    peopleOrderBy1Desc: string = "-";
    peopleOrderBy1Property: string = "age";
    peopleOrderBy2Desc: string = "";
    peopleOrderBy2Property: string = "firstName";
    peopleOrderByConfig = [
	    (this.peopleOrderBy1Desc+this.peopleOrderBy1Property), 
	    (this.peopleOrderBy2Desc+this.peopleOrderBy2Property)
    ];
    newFruit: string = "";
    fruit: string[] = ["orange", "apple", "pear", "grape", "banana"];
    fruitOrderByConfig: string = "+";
    
    addToArrays(): void{
		this.fruit.push("new fruit");
		this.people.push(new Person('New', 'Person', 47));
	}

	setFruitConfig(newConfig: string){
		this.fruitOrderByConfig = newConfig;
	}

	addFruit(){
		if(this.newFruit.length <= 0) return;

		this.fruit.push(this.newFruit);
		this.newFruit = '';
	}

	setPeopleConfig(type: string, index: number, newConfig: string){
		if(type == "desc"){
			if(index == 1){
				this.peopleOrderBy1Desc = newConfig;
			}
			else{
				this.peopleOrderBy2Desc = newConfig;
			}
		}
		else{
			if(index == 1){
				this.peopleOrderBy1Property = newConfig;
			}
			else{
				this.peopleOrderBy2Property = newConfig;
			}
		}

		this.peopleOrderByConfig = [
		    (this.peopleOrderBy1Desc+this.peopleOrderBy1Property), 
		    (this.peopleOrderBy2Desc+this.peopleOrderBy2Property)
	    ];
	}

	addPerson(){
		if(this.newPerson.firstName.length <= 0 || 
			this.newPerson.lastName.length <= 0 ||
			this.newPerson.age <= 0) return;

		this.people.push(this.newPerson);
    	this.newPerson = new Person('', '', 18);
	}
}

export var ORDERBY_DEMO_PROVIDERS = [
    OrderByDemo
];