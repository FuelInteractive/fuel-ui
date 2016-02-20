import {View, Component, ViewEncapsulation, provide} from "angular2/core";
import {FORM_DIRECTIVES, FORM_PROVIDERS, CORE_DIRECTIVES } from "angular2/common";
import {bootstrap} from "angular2/platform/browser";
import {LocationStrategy, HashLocationStrategy, ROUTER_PROVIDERS} from "angular2/router";
import {FUELUI_COMPONENT_PROVIDERS} from "./fuel-ui";
import {FUELUI_DIRECTIVE_PROVIDERS} from "./fuel-ui";
import {FUELUI_PIPE_PROVIDERS} from "./fuel-ui";

export class Person {
  constructor(public firstName: string, public lastName: string, public age: number) {}
} 

@Component({
    selector: "fuel-ui"
})
@View({
    template: `
	<main class="container">
		<h2>Infinite Scroller</h2>
		<div class="row m-a">
			<div class="col-md-6" style="border: 1px solid #333; background-color: #EEE">
				<infinite-scroller 
					(next)="infinteScrollNext()" 
					(prev)="infiniteScrollPrev()" 
					height="300"
					distance="120"
					hideScrollbar="true">
					<div *ngFor="#item of infiniteScrollItems" 
                        class="card p-a scroll-item" style="background-color: #FFF">
						<div class="card-block">
							<h4 class="card-title">Some Item</h4>
							<p class="card-text">{{item}}</p>
						</div>
					</div>
				</infinite-scroller>
			</div>
		</div>
		<h2>Animation Helper</h2>
		<div class="row m-a">
			<div class="test-box"
				animation="test-animation-a test-animation-b"
				play="true"
				(onAnimationEnd)="logEnd()"></div>
		</div>
		<h2>DatePicker</h2>
		<section class="row m-a">
			<div class="col-md-3">
				<date-picker 
					min-date="11/1/2015"
					max-date="11/1/2016" months="2">
				</date-picker>
			</div>
		</section>
        <section class="row m-a">
			<div class="col-md-3">
				<date-picker-mobile 
					min-date="11/1/2015"
					max-date="11/1/2016" months="2">
				</date-picker-mobile>
			</div>
		</section>
		<h2>Carousel</h2>
		<section class="row m-a">
			<carousel class="col-md-6">
				<img *ngFor="#image of carouselImages" src="{{image}}" class="carousel-item" />
			</carousel>
		</section>
		<h2>Alert</h2>
		<section class="row m-a">
			<alert
				[(displayed)]="showAlert"
				[type]="alertType">
				<span [innerHtml]="alertBody"></span>
			</alert>
			<button (click)="saveFunc(modal, false)">Toggle Alert Success</button>
			<button (click)="saveFunc(modal, true)">Toggle Alert Error</button>
		</section>
		<h2>Modal</h2>
		<section class="row m-a">
			<button (click)="modal.showModal()">Toggle Modal</button>
			<modal #modal
				class="animated"
				[modalTitle]="modalTitle"
				[closeButton]="closeButton"
				[closeOnUnfocus]="closeOnUnfocus"
				(animationStart)="logStart($event)"
				(animationEnd)="logEnd($event)">
				<div class="modal-body">
					<carousel>
						<img class="carousel-item"
							src="/images/carouselImages/beach.png" alt="Beach" />
						<img class="carousel-item"
							src="/images/carouselImages/river.jpg" alt="River" />
						<img class="carousel-item"
							src="/images/carouselImages/windmill.jpg" alt="Windmill" />
					</carousel>
					<ul>
						<li>Testing 1</li>
						<li>Testing 2</li>
						<li>Testing 3</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" (click)="modal.showModal(false)">
						<i class="fa fa-chevron-left"></i> Go Back
					</button>
					<button type="button" class="btn btn-danger" (click)="saveFunc(modal, true)">Error!</button>
					<button type="button" class="btn btn-success" (click)="saveFunc(modal, false)">Success!</button>
				</div>
			</modal>
		</section>
		<h2>Tooltip</h2>
		<section class="row m-a">
			<div tooltip="Tooltip text goes here.">Some text here.</div>
			<div tooltip="Example data binding: {{test}}!">Hover me with input value</div> <input [(ngModel)]="test" type="text" class="form-control">
		</section>
		<section class="row m-a">
			<h2>Pagination Example</h2>
			<form>
				<div class="form-group row">
					<label for="totalPages" class="col-sm-2 form-control-label">Total Pages</label>
					<div class="col-sm-2">
						<input class="form-control" [(ngModel)]="totalPages" min="1" type="number" name="totalPages">
					</div>
				</div>
				<div class="form-group row">
					<label for="pagesAtOnce" class="col-sm-2 form-control-label">Pages At Once</label>
					<div class="col-sm-2">
						<input class="form-control" [(ngModel)]="pagesAtOnce" min="1" [max]="totalPages" type="number" name="pagesAtOnce">
					</div>
				</div>
				<div class="form-group row">
					<label for="currentPage" class="col-sm-2 form-control-label">Current Page</label>
					<div class="col-sm-2">
						<input class="form-control" [(ngModel)]="currentPage" min="1" [max]="totalPages" type="number" name="currentPage">
					</div>
				</div>
			</form>
			<pagination
				[(currentPage)]="currentPage"
				[totalPages]="totalPages"
				[pagesAtOnce]="pagesAtOnce">
			</pagination>
		</section>
		<section class="row m-a">
			<h2>Progress Example</h2>
			<form>
				<div class="form-group row">
					<label for="progress" class="col-sm-2 form-control-label">Progress %</label>
					<div class="col-sm-2">
						<input class="form-control" [(ngModel)]="progress" min="0" max="100" type="number" name="progress">
					</div>
				</div>
			</form>
			<progress class="progress progress-striped progress-animated" [value]="progress" max="100">{{progress}}%</progress>
		</section>
		<h2>OrderBy Examples</h2>
		<section class="row m-a">
			<h3>One-Dimensional Arrays</h3>
			<div class="col-md-4">
				<h4>Unordered</h4>
				<code>*ngFor="#f of fruit"</code><br/>
				<ul>
					<li *ngFor="#f of fruit">{{f}}</li>
				</ul>
			</div>
			<div class="col-md-4">
				<h4>Asc</h4>
				<code>*ngFor="#f of fruit | orderBy"</code><br/>
				OR<br/>
				<code>*ngFor="#f of fruit | orderBy : '+'"</code><br/>
				OR<br/>
				<code>*ngFor="#f of fruit | orderBy : ['+']"</code><br/>
				<ul>
					<li *ngFor="#f of fruitToSort | orderBy">{{f}}</li>
				</ul>
			</div>
			<div class="col-md-4">
				<h4>Desc</h4>
				<code>*ngFor="#f of fruit | orderBy : '-'"</code><br/>
				OR<br/>
				<code>*ngFor="#f of fruit | orderBy : ['-']"</code><br/>
				<ul>
					<li *ngFor="#f of fruitToSort | orderBy : '-'">{{f}}</li>
				</ul>
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
			<div class="col-md-4">
				<h4>By Last Name Asc</h4>
				<code>*ngFor="#person of people | orderBy : ['lastName']"</code><br/>
				<ul>
					<li *ngFor="#person of peopleToSort | orderBy : ['lastName']">{{person.firstName}} {{person.lastName}}, {{person.age}}</li>
				</ul>
			</div>
			<div class="col-md-4">
				<h4>By Age Desc Then First Name Asc</h4>
				<code>*ngFor="#person of people | orderBy : ['-age', 'firstName']"</code><br/>
				<ul>
					<li *ngFor="#person of peopleToSort | orderBy : ['-age', 'firstName']">{{person.firstName}} {{person.lastName}}, {{person.age}}</li>
				</ul>
			</div>
		</section>
	</main>`,
    directives: [CORE_DIRECTIVES, FUELUI_COMPONENT_PROVIDERS, FUELUI_DIRECTIVE_PROVIDERS, FORM_DIRECTIVES],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["directives/Tooltip/Tooltip.css"],
    pipes: [FUELUI_PIPE_PROVIDERS]
})
export class DemoComponent {
    carouselImages: string[] = [
        "/images/carouselImages/beach.png",
        "/images/carouselImages/river.jpg",
        "/images/carouselImages/windmill.jpg"
    ];

    modalTitle: string = "TEST EST TESTSETSETTESET";
    closeText: string = "Cancel";
    closeButton: boolean = true;
    closeOnUnfocus: boolean = true;
    showAlert: boolean = false;
    alertType: string = "success";
    alertBody: string = "<strong>Some alert</strong> success message or something";
    progress: number = 25;
    totalPages: number = 10;
    pagesAtOnce: number = 5;
    currentPage: number = 1;
    selectedDate: Date = new Date();
    minDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    maxGuests: number = 5;
    maxChildren: number = 3;
    maxNumRooms: number = 15;
    numGuests: number = 2;
    numChildren: number = 1;
    numRooms: number = 1;
    checkInDate: Date = new Date();
    checkOutDate: Date = new Date();
    infiniteScrollItems: string[] = [];
    infiniteScrollMin: number = 0;
    infiniteScrollMax: number = 1;
    people: Person[] = [
			    		new Person('Linus', 'Torvalds', 46),
						new Person('Larry', 'Ellison', 71),
    					new Person('Mark', 'Zuckerberg', 31),
						new Person('Sergey', 'Brin', 42),
			    		new Person('Vint', 'Cerf', 72),
			            new Person('Richard', 'Stallman', 62),
			            new Person('John', 'Papa', 42)
		            ];
    peopleToSort: Person[] = [...this.people];
    fruit: string[] = ["orange", "apple", "pear", "grape", "banana"];
    fruitToSort: string[] = [...this.fruit];

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.infinteScrollNext(false);
        }
    }

    pageChange(page: number): void {
        this.currentPage = page;
    }

    infiniteScrollPrev(): void {
        var newItem = "";
        for (let i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMin + " ";
        }

        this.infiniteScrollMin--;
        this.infiniteScrollItems.unshift(newItem);
    }

    infinteScrollNext(clean: boolean = true): void {
        var newItem = "";
        for (let i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMax + " ";
        }

        this.infiniteScrollMax++;
        this.infiniteScrollItems.push(newItem);
    }

    saveFunc(modal: any, error: boolean): void {
        // do validations

        if (!error) {
            this.alertType = "success";
            this.alertBody = "<strong>Some alert</strong> success message or something";
            this.showAlert = true;
        } else {
            this.alertType = "danger";
            this.alertBody = "<strong>Something went wrong</strong> error message or something";
            this.showAlert = true;
        }

        modal.showModal(false);
    }

    logStart($event: any): void {
        console.log("AT THE START!", $event);
    }

    logEnd($event: any): void {
        console.log("AT THE END!", $event);
    }
}

bootstrap(DemoComponent, [
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    FUELUI_COMPONENT_PROVIDERS
]);
