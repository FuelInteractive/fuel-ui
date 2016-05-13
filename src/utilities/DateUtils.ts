export class DateUtils {
	public static isValidDate(value: any): boolean {		
		return Object.prototype.toString.call(value) === "[object Date]"
			&& !isNaN((<Date>value).valueOf()) && (<Date>value).getTime() != 0;
	}
	
	public static handleDateInput(value: any): Date {
        if (DateUtils.isValidDate(value))
            return value;
        
        return new Date(<string>value);
    }	
}