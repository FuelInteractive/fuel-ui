export declare class Person {
    firstName: string;
    lastName: string;
    age: number;
    constructor(firstName: string, lastName: string, age: number);
}
export declare class OrderByDemo {
    newPerson: Person;
    people: Person[];
    peopleOrderBy1Desc: string;
    peopleOrderBy1Property: string;
    peopleOrderBy2Desc: string;
    peopleOrderBy2Property: string;
    peopleOrderByConfig: string[];
    newFruit: string;
    fruit: string[];
    fruitOrderByConfig: string;
    addToArrays(): void;
    setFruitConfig(newConfig: string): void;
    addFruit(): void;
    setPeopleConfig(type: string, index: number, newConfig: string): void;
    addPerson(): void;
}
export declare var ORDERBY_DEMO_PROVIDERS: typeof OrderByDemo[];
