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
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
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
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">OrderBy</h2>\n            <p class=\"card-text\">OrderBy is a custom pipe to order arrays of any arbitrary type.</p>\n            <p class=\"card-text\">\n                <a href=\"http://www.fueltravel.com/blog/migrating-from-angular-1-to-2-part-1-pipes/\" target=\"_blank\">\n                    For a write up on the making of this pipe, feel free to check this out!\n                </a>\n            </p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <h3>One-Dimensional Arrays</h3>\n    <div class=\"col-md-4\">\n        <h4>Add Fruit</h4>\n         <div class=\"form-group input-group\">\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"newFruit\" name=\"newFruit\">\n            <div class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"addFruit()\" [disabled]=\"!newFruit\">Add</button>\n            </div>\n        </div>\n    </div>\n</section>\n<section class=\"row m-a\">\n    <div class=\"col-md-4\">\n        <h4>Unordered</h4>\n        <code>*ngFor=\"#f of fruit\"</code><br/>\n        <ul>\n            <li *ngFor=\"#f of fruit\">{{f}}</li>\n        </ul>\n    </div>\n    <div class=\"col-md-8\">\n        <h4>Ordered</h4>\n        <code>*ngFor=\"#f of fruit | orderBy : '{{fruitOrderByConfig}}'\"</code><br/>\n        <code>*ngFor=\"#f of fruit | orderBy : ['{{fruitOrderByConfig}}']\"</code><br/>\n        <div class=\"row\">\n            <div class=\"col-md-4\">\n                <ul>\n                    <li *ngFor=\"#f of fruit | orderBy : fruitOrderByConfig\">{{f}}</li>\n                </ul>\n            </div>\n            <div class=\"col-md-6\" style=\"padding-top: 25px\">\n                <div class=\"row form-group\">\n                    <label for=\"fruitOrderByConfig\" class=\"col-sm-4\">Order By</label>\n                    <div class=\"col-sm-8\">\n                        <select class=\"form-control\" (change)=\"setFruitConfig($event.target.value)\">\n                            <option value=\"+\" [selected]=\"fruitOrderByConfig == '+'\">Ascending</option>\n                            <option value=\"-\" [selected]=\"fruitOrderByConfig == '-'\">Descending</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n<section class=\"row m-a\">\n    <h3>Multi-Dimensional Arrays</h3>\n    <div class=\"col-md-8\">\n        <h4>Add Person</h4>\n        <div class=\"row\">\n            <div class=\"col-md-3 form-group\">\n                <label for=\"firstName\">First Name</label>\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"newPerson.firstName\" name=\"firstName\">\n            </div>\n            <div class=\"col-md-3 form-group\">\n                <label for=\"lastName\">Last Name</label>\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"newPerson.lastName\" name=\"lastName\">\n            </div>\n            <div class=\"col-md-3 form-group\">\n                <label for=\"age\">Age</label>\n                <input type=\"number\" min=\"18\" max=\"120\" class=\"form-control\" [(ngModel)]=\"newPerson.age\" name=\"age\">\n            </div>\n            <div class=\"col-md-3 form-group\">\n                <label for=\"add\">&nbsp;</label>\n                <button type=\"button\" class=\"btn btn-primary form-control\" (click)=\"addPerson()\" [class.disabled]=\"!newPerson.firstName || !newPerson.lastName || !newPerson.age\">Add</button>\n            </div>\n        </div>\n    </div>\n</section>\n<section class=\"row m-a\">\n    <div class=\"col-md-4\">\n        <h4>Unordered</h4>\n        <code>*ngFor=\"#person of people\"</code><br/>\n        <ul>\n            <li *ngFor=\"#person of people\">{{person.firstName}} {{person.lastName}}, {{person.age}}</li>\n        </ul>\n    </div>\n    <div class=\"col-md-8\">\n        <h4>Ordered</h4>\n        <code>*ngFor=\"#person of people | orderBy : ['{{peopleOrderByConfig[0]}}', '{{peopleOrderByConfig[1]}}']\"</code><br/>\n        <div class=\"row\">\n            <div class=\"col-md-4\">\n                <ul>\n                    <li *ngFor=\"#person of people | orderBy : peopleOrderByConfig\">{{person.firstName}} {{person.lastName}}, {{person.age}}</li>\n                </ul>\n            </div>\n            <div class=\"col-md-6\" style=\"padding-top: 25px\">\n                <div class=\"row form-group\">\n                    <label for=\"fruitOrderByConfig\" class=\"col-sm-4\">Order By</label>\n                    <div class=\"col-sm-8\">\n                        <select class=\"form-control\" (change)=\"setPeopleConfig('property', 1, $event.target.value)\">\n                            <option value=\"firstName\" [selected]=\"peopleOrderBy1Property == 'firstName'\">First Name</option>\n                            <option value=\"lastName\" [selected]=\"peopleOrderBy1Property == 'lastName'\">Last Name</option>\n                            <option value=\"age\" [selected]=\"peopleOrderBy1Property == 'age'\">Age</option>\n                        </select>\n                        <select class=\"form-control\" (change)=\"setPeopleConfig('desc', 1, $event.target.value)\">\n                            <option value=\"\" [selected]=\"peopleOrderBy1Desc == ''\">Ascending</option>\n                            <option value=\"-\" [selected]=\"peopleOrderBy1Desc == '-'\">Descending</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"row form-group\">\n                    <label for=\"fruitOrderByConfig\" class=\"col-sm-4\">Then By</label>\n                    <div class=\"col-sm-8\">\n                        <select class=\"form-control\" (change)=\"setPeopleConfig('property', 2, $event.target.value)\">\n                            <option value=\"firstName\" [selected]=\"peopleOrderBy2Property == 'firstName'\">First Name</option>\n                            <option value=\"lastName\" [selected]=\"peopleOrderBy2Property == 'lastName'\">Last Name</option>\n                            <option value=\"age\" [selected]=\"peopleOrderBy2Property == 'age'\">Age</option>\n                        </select>\n                        <select class=\"form-control\" (change)=\"setPeopleConfig('desc', 2, $event.target.value)\">\n                            <option value=\"\" [selected]=\"peopleOrderBy2Desc == ''\">Ascending</option>\n                            <option value=\"-\" [selected]=\"peopleOrderBy2Desc == '-'\">Descending</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {OrderByPipe} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>OrderBy is pipe that allows for sorting ascending or descending on any array types across multiple columns. \nSimply pass an array of strings with the name of the key within the object. \nPut a '-' in front of the name if you wish to sort descending on it. \nOrderBy pipe also allows for data to be pushed dynamically and sorted.</p>\n\n<h3>Usage</h3>\n<h4>One Dimensional Arrays</h4>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class OrderByExample {\n    fruit: string[] = [\"orange\", \"apple\", \"pear\", \"grape\", \"banana\"];\n}\n</code>\n</pre>\n\n<pre>\n<code class=\"language-javascript\" code-highlight>\n*ngFor=\"#f of fruit | orderBy : '+'\"\n</code>\n</pre>\n\n<pre>\n<code class=\"language-javascript\" code-highlight>\n*ngFor=\"#f of fruit | orderBy : ['+']\"\n</code>\n</pre>\n\n<h4>Multi-Dimensional Arrays</h4>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class Person {\n  constructor(public firstName: string, public lastName: string, public age: number) {}\n}\n\nexport class OrderByExample {\n    people: Person[] = [\n        new Person('Linus', 'Torvalds', 46),\n        new Person('Larry', 'Ellison', 71),\n        new Person('Mark', 'Zuckerberg', 31),\n        new Person('Sergey', 'Brin', 42),\n        new Person('Vint', 'Cerf', 72),\n        new Person('Richard', 'Stallman', 62),\n        new Person('John', 'Papa', 42)\n    ];\n}\n</code>\n</pre>\n\n<pre>\n<code class=\"language-javascript\" code-highlight>\n*ngFor=\"#person of people | orderBy : ['-age', 'firstName']\"\n</code>\n</pre>\n\n</div>",
            directives: [common_1.CORE_DIRECTIVES, CodeHighlighter_1.CodeHighlighter],
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
