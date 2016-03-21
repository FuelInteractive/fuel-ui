"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require("angular2/common");
var OrderBy_1 = require('./OrderBy');
var Person = (function () {
    function Person(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    return Person;
}());
exports.Person = Person;
var OrderByDemo = (function () {
    function OrderByDemo() {
        this.newPerson = new Person('', '', 18);
        this.people = [
            new Person('Linus', 'Torvalds', 46),
            new Person('Larry', 'Ellison', 71),
            new Person('Mark', 'Zuckerberg', 31),
            new Person('Sergey', 'Brin', 42),
            new Person('Vint', 'Cerf', 72),
            new Person('Richard', 'Stallman', 62),
            new Person('John', 'Papa', 42)
        ];
        this.peopleOrderBy1Desc = "-";
        this.peopleOrderBy1Property = "age";
        this.peopleOrderBy2Desc = "";
        this.peopleOrderBy2Property = "firstName";
        this.peopleOrderByConfig = [
            (this.peopleOrderBy1Desc + this.peopleOrderBy1Property),
            (this.peopleOrderBy2Desc + this.peopleOrderBy2Property)
        ];
        this.newFruit = "";
        this.fruit = ["orange", "apple", "pear", "grape", "banana"];
        this.fruitOrderByConfig = "+";
    }
    OrderByDemo.prototype.addToArrays = function () {
        this.fruit.push("new fruit");
        this.people.push(new Person('New', 'Person', 47));
    };
    OrderByDemo.prototype.setFruitConfig = function (newConfig) {
        this.fruitOrderByConfig = newConfig;
    };
    OrderByDemo.prototype.addFruit = function () {
        if (this.newFruit.length <= 0)
            return;
        this.fruit.push(this.newFruit);
        this.newFruit = '';
    };
    OrderByDemo.prototype.setPeopleConfig = function (type, index, newConfig) {
        if (type == "desc") {
            if (index == 1) {
                this.peopleOrderBy1Desc = newConfig;
            }
            else {
                this.peopleOrderBy2Desc = newConfig;
            }
        }
        else {
            if (index == 1) {
                this.peopleOrderBy1Property = newConfig;
            }
            else {
                this.peopleOrderBy2Property = newConfig;
            }
        }
        this.peopleOrderByConfig = [
            (this.peopleOrderBy1Desc + this.peopleOrderBy1Property),
            (this.peopleOrderBy2Desc + this.peopleOrderBy2Property)
        ];
    };
    OrderByDemo.prototype.addPerson = function () {
        if (this.newPerson.firstName.length <= 0 ||
            this.newPerson.lastName.length <= 0 ||
            this.newPerson.age <= 0)
            return;
        this.people.push(this.newPerson);
        this.newPerson = new Person('', '', 18);
    };
    OrderByDemo = __decorate([
        core_1.Component({
            template: "\n        <h2>OrderBy</h2>\n\t\t<section class=\"row m-a\">\n\t\t\t<h3>One-Dimensional Arrays</h3>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<h4>Unordered</h4>\n\t\t\t\t<code>*ngFor=\"#f of fruit\"</code><br/>\n\t\t\t\t<ul>\n\t\t\t\t\t<li *ngFor=\"#f of fruit\">{{f}}</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-8\">\n\t\t\t\t<h4>Ordered</h4>\n\t\t\t\t<code>*ngFor=\"#f of fruit | orderBy : '{{fruitOrderByConfig}}'\"</code><br/>\n\t\t\t\tOR<br/>\n\t\t\t\t<code>*ngFor=\"#f of fruit | orderBy : ['{{fruitOrderByConfig}}']\"</code><br/>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li *ngFor=\"#f of fruit | orderBy : fruitOrderByConfig\">{{f}}</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"row form-group\">\n\t\t\t\t\t\t\t<label for=\"fruitOrderByConfig\" class=\"col-sm-4\">Order By</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t<select class=\"form-control\" (change)=\"setFruitConfig($event.target.value)\">\n\t\t\t\t\t\t\t        <option value=\"+\" [selected]=\"fruitOrderByConfig == '+'\">Ascending</option>\n\t\t\t\t\t\t\t        <option value=\"-\" [selected]=\"fruitOrderByConfig == '-'\">Descending</option>\n\t\t\t\t\t\t\t    </select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<h4>Add Fruit</h4>\n\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" [(ngModel)]=\"newFruit\" name=\"newFruit\">\n\t\t\t\t\t\t\t\t<div class=\"input-group-btn\">\n\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"addFruit()\">Add</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>\n\t\t<section class=\"row m-a\">\n\t\t\t<h3>Multi-Dimensional Arrays</h3>\n\t\t\t<div class=\"col-md-4\">\n\t\t\t\t<h4>Unordered</h4>\n\t\t\t\t<code>*ngFor=\"#person of people\"</code><br/>\n\t\t\t\t<ul>\n\t\t\t\t\t<li *ngFor=\"#person of people\">{{person.firstName}} {{person.lastName}}, {{person.age}}</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class=\"col-md-8\">\n\t\t\t\t<h4>Ordered</h4>\n\t\t\t\t<code>*ngFor=\"#person of people | orderBy : ['{{peopleOrderByConfig[0]}}', '{{peopleOrderByConfig[1]}}']\"</code><br/>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li *ngFor=\"#person of people | orderBy : peopleOrderByConfig\">{{person.firstName}} {{person.lastName}}, {{person.age}}</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"row form-group\">\n\t\t\t\t\t\t\t<label for=\"fruitOrderByConfig\" class=\"col-sm-4\">Order By</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t<select class=\"form-control\" (change)=\"setPeopleConfig('property', 1, $event.target.value)\">\n\t\t\t\t\t\t\t        <option value=\"firstName\" [selected]=\"peopleOrderBy1Property == 'firstName'\">First Name</option>\n\t\t\t\t\t\t\t        <option value=\"lastName\" [selected]=\"peopleOrderBy1Property == 'lastName'\">Last Name</option>\n\t\t\t\t\t\t\t        <option value=\"age\" [selected]=\"peopleOrderBy1Property == 'age'\">Age</option>\n\t\t\t\t\t\t\t    </select>\n\t\t\t\t\t\t\t\t<select class=\"form-control\" (change)=\"setPeopleConfig('desc', 1, $event.target.value)\">\n\t\t\t\t\t\t\t        <option value=\"\" [selected]=\"peopleOrderBy1Desc == ''\">Ascending</option>\n\t\t\t\t\t\t\t        <option value=\"-\" [selected]=\"peopleOrderBy1Desc == '-'\">Descending</option>\n\t\t\t\t\t\t\t    </select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row form-group\">\n\t\t\t\t\t\t\t<label for=\"fruitOrderByConfig\" class=\"col-sm-4\">Then By</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t<select class=\"form-control\" (change)=\"setPeopleConfig('property', 2, $event.target.value)\">\n\t\t\t\t\t\t\t        <option value=\"firstName\" [selected]=\"peopleOrderBy2Property == 'firstName'\">First Name</option>\n\t\t\t\t\t\t\t        <option value=\"lastName\" [selected]=\"peopleOrderBy2Property == 'lastName'\">Last Name</option>\n\t\t\t\t\t\t\t        <option value=\"age\" [selected]=\"peopleOrderBy2Property == 'age'\">Age</option>\n\t\t\t\t\t\t\t    </select>\n\t\t\t\t\t\t\t\t<select class=\"form-control\" (change)=\"setPeopleConfig('desc', 2, $event.target.value)\">\n\t\t\t\t\t\t\t        <option value=\"\" [selected]=\"peopleOrderBy2Desc == ''\">Ascending</option>\n\t\t\t\t\t\t\t        <option value=\"-\" [selected]=\"peopleOrderBy2Desc == '-'\">Descending</option>\n\t\t\t\t\t\t\t    </select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<h4>Add Person</h4>\n\t\t\t\t\t\t\t<div class=\"row form-group\">\n\t\t\t\t\t\t\t\t<label for=\"firstName\" class=\"col-sm-4\">First Name</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" [(ngModel)]=\"newPerson.firstName\" name=\"firstName\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"row form-group\">\n\t\t\t\t\t\t\t\t<label for=\"lastName\" class=\"col-sm-4\">Last Name</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" [(ngModel)]=\"newPerson.lastName\" name=\"lastName\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"row form-group\">\n\t\t\t\t\t\t\t\t<label for=\"lastName\" class=\"col-sm-4\">Age</label>\n\t\t\t\t\t\t\t\t<input type=\"number\" min=\"18\" max=\"120\" class=\"form-control\" [(ngModel)]=\"newPerson.age\" name=\"age\">\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"addPerson()\">Add</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>",
            directives: [common_1.CORE_DIRECTIVES],
            pipes: [OrderBy_1.ORDERBY_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], OrderByDemo);
    return OrderByDemo;
}());
exports.OrderByDemo = OrderByDemo;
exports.ORDERBY_DEMO_PROVIDERS = [
    OrderByDemo
];

//# sourceMappingURL=OrderBy.Demo.js.map
