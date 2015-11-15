var DateRange = (function () {
    function DateRange(start, end) {
        this.start = start;
        this.end = end;
    }
    DateRange.prototype.containsDate = function (date) {
        return date >= this.start && date <= this.end;
    };
    DateRange.prototype.numberOfNights = function () {
        return Math.ceil(Math.abs(this.start.getTime() - this.end.getTime()) / (1000 * 3600 * 24));
    };
    DateRange.prototype.dateArray = function () {
        if (this.end < this.start)
            return [];
        var dateArr = [];
        var currDate = new Date(this.start.toDateString());
        while (currDate <= this.end) {
            dateArr.push(currDate);
            currDate = new Date(currDate.getTime() + 24 * 60 * 60 * 1000);
        }
        return dateArr;
    };
    DateRange.prototype.weekArray = function () {
        if (this.end < this.start)
            return [];
        var weekArr = [];
        var currDate = new Date(this.start.toDateString());
        while (currDate <= this.end) {
            var dateArr = [];
            var dowNumber = currDate.getDay();
            do {
                dateArr.push(currDate);
                ++dowNumber;
                currDate = new Date(currDate.toDateString());
                currDate.setDate(currDate.getDate() + 1);
            } while (currDate <= this.end && dowNumber < 7);
            weekArr.push(dateArr);
        }
        return weekArr;
    };
    return DateRange;
})();
exports.DateRange = DateRange;

//# sourceMappingURL=DateUtils.js.map
