export class DateRange {
	public start: Date;
	public end: Date;
	
	constructor(start: Date, end: Date) {
		this.start = start;
		this.end = end;
	}
	
	containsDate(date: Date): boolean {
		return date >= this.start && date <= this.end;
	}
	
	numberOfNights(): number {
		return Math.ceil(Math.abs(this.start.getTime() - this.end.getTime()) / (1000 * 3600 * 24)); 
	}
	
	dateArray(): Date[] {
		if(this.end < this.start)
			return [];
			
		var dateArr: Date[] = [];
		var currDate = new Date(this.start.toDateString());
		while(currDate <= this.end) {
			dateArr.push(currDate);
			currDate = new Date(currDate.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return dateArr;
	}
	
	weekArray(): Date[][] {
		if(this.end < this.start)
			return [];
			
		var weekArr: Date[][] = [];
		var currDate = new Date(this.start.toDateString());
		while(currDate <= this.end) {
			let dateArr: Date[] = [];
			let dowNumber = currDate.getDay();
			do {
				dateArr.push(currDate);
				++dowNumber;
				currDate = new Date(currDate.toDateString());
				currDate.setDate(currDate.getDate()+1);
			} while(currDate <= this.end && dowNumber < 7);
			weekArr.push(dateArr);
		}
		
		return weekArr;
	}
}