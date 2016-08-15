import {Component} from '@angular/core';

export class Person {
    public firstName: string;
    public lastName: string;
    public info: PersonInfo;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.info = new PersonInfo(age);
    }
}

export class PersonInfo {
    constructor(public age: number){}
}

@Component({
  template: "pipes/orderBy/orderBy.demo.html"
})
export class OrderByDemo {
    typescriptCodeExample = `export class Person {
    public firstName: string;
    public lastName: string;
    public info: PersonInfo;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.info = new PersonInfo(age);
    }
}

export class PersonInfo {
    constructor(public age: number){}
}

export class OrderByExample {
    people: Person[] = [
        new Person('Linus', 'Torvalds', 46),
        new Person('Larry', 'Ellison', 71),
        new Person('Mark', 'Zuckerberg', 31),
        new Person('Sergey', 'Brin', 42),
        new Person('Vint', 'Cerf', 72),
        new Person('Richard', 'Stallman', 62),
        new Person('John', 'Papa', 42)
    ];
}`;

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
    peopleOrderBy1Property: string = "info.age";
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
			this.newPerson.info.age <= 0) return;

		this.people.push(this.newPerson);
    	this.newPerson = new Person('', '', 18);
	}
}