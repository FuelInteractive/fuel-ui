import * as moment from "moment";

export class DateUtils {
    static localeFormat = "";

    public static isValidDate(value: any): boolean {
        return Object.prototype.toString.call(value) === "[object Date]"
            && !isNaN((<Date>value).valueOf()) && (<Date>value).getTime() != 0;
    }
    
    public static handleDateInput(value: any): Date {
        if (DateUtils.isValidDate(value))
            return value;
        
        if(value instanceof moment)
            return (<moment.Moment>value).toDate();

        if(typeof value !== "string") 
            return null;

        // remove utf8 / encoding for ie (General Punctuation unicode)
        value = encodeURIComponent(value);
        value = value.replace(/%E2%80%8E/g, "");
        value = decodeURIComponent(value);

        if(!DateUtils.isDateFormat(value)) {
            return null;
        }

        return <Date>DateUtils.parseDate(value);
    }

    public static isDateFormat(value: string): boolean {
        return DateUtils.isLocaleDateFormat(value) || DateUtils.isIsoDateFormat(value);
    }

    public static isLocaleDateFormat(value: string): boolean {
        var ex = /^(\d{1,4})\/(\d{1,4})\/(\d{1,4})$/;
        return ex.exec(value) ? true : false;
    }

    public static isIsoDateFormat(value: string): boolean {
        var dateExpressions: RegExp[] = [];
        dateExpressions.push(/^(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})$/);
        dateExpressions.push(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})?$/);
        dateExpressions.push(/^\/Date\((d|-|.*)\)[\/|\\]$/);
        dateExpressions.push(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/);

        for(let exp of dateExpressions)
            if(exp.exec(value))
                return true;

        return false;
    }

    public static parseDate(value: string): Date {
        if(typeof value !== "string")
            return null
         
        if(value.length > 30)
            return null;
        
        let date: moment.Moment = null;
        if(DateUtils.isLocaleDateFormat(value)) {
            date = moment(value, DateUtils.getLocaleFormat());
        }
            
        if(DateUtils.isIsoDateFormat(value)) {
            date = moment(value);
        }

        if(date && date.isValid()) {
            return date.toDate();
        }

        return null;
    }

    static formatDateForServer(date: Date): string {
        try {
            return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
        } catch(err) {
            return "invalid date";
        }    
    }

    static getMonthName(month: number) {
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month - 1];
    }

    static addDaysToDate(date: Date, numberOfDays: number): Date {
        date.setDate(date.getDate() + numberOfDays);
        return date;
    }

    static getArrayOfDates(startDate: Date, endDate: Date): Date[] {
        let dates: Date[] = [];
        let diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(24*60*60*1000)));

        for(let i = 1; i <= diffDays; i++){
            dates.push(this.addDaysToDate(new Date(startDate.toString()), i));
        }

        return dates;
    }

    static getNumberOfNights(startDate: Date, endDate: Date): number {
        return Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(24*60*60*1000)));
    }

    public static getLocaleFormat(): string {
        if(DateUtils.localeFormat.length == 0)
            DateUtils.localeFormat = DateUtils.generateLocaleFormat();
        return DateUtils.localeFormat;
    }

    public static generateLocaleFormat(): string {
        var lds = new Date(2016, 9, 25).toLocaleDateString();
        var yPosi = lds.search("2016");
        var dPosi = lds.search("25");
        var mPosi = lds.search("10");

        //Sometimes the month is displayed by the month name so guess where it is
        if (mPosi == -1)
        {
            mPosi = lds.search("9");
            if (mPosi == -1)
            {
                //if the year and day are not first then maybe month is first
                if (yPosi != 0 && dPosi != 0)
                {
                    mPosi = 0;
                }
                //if year and day are not last then maybe month is last
                else if ((yPosi+4 <  lds.length) && (dPosi+2 < lds.length)){
                    mPosi = Infinity;
                }
                //otherwist is in the middle
                else if (yPosi < dPosi){
                    mPosi = ((dPosi - yPosi)/2) + yPosi;
                } else if (dPosi < yPosi){
                    mPosi = ((yPosi - dPosi)/2) + dPosi;
                }
            }
        }

        var formatString = "";
        var order = [yPosi, dPosi, mPosi];
        order.sort(function(a,b){return a-b});

        for(let i = 0; i < order.length; i++)
        {
            if(order[i] == yPosi)
            {
                formatString += "YYYY/";
            }else if(order[i] == dPosi){
                formatString += "DD/";
            }else if(order[i] == mPosi){
                formatString += "MM/";
            }
        }

        return formatString.substring(0, formatString.length-1);
    }
}