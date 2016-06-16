"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shared_1 = require('./shared');
var collection_1 = require('./utils/collection');
var tree_1 = require('./utils/tree');
function createEmptyUrlTree() {
    return new UrlTree(new tree_1.TreeNode(new UrlSegment('', {}, shared_1.PRIMARY_OUTLET), []), {}, null);
}
exports.createEmptyUrlTree = createEmptyUrlTree;
var UrlTree = (function (_super) {
    __extends(UrlTree, _super);
    function UrlTree(root, queryParams, fragment) {
        _super.call(this, root);
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    return UrlTree;
}(tree_1.Tree));
exports.UrlTree = UrlTree;
var UrlSegment = (function () {
    function UrlSegment(path, parameters, outlet) {
        this.path = path;
        this.parameters = parameters;
        this.outlet = outlet;
    }
    UrlSegment.prototype.toString = function () {
        var params = [];
        for (var prop in this.parameters) {
            if (this.parameters.hasOwnProperty(prop)) {
                params.push(prop + "=" + this.parameters[prop]);
            }
        }
        var paramsString = params.length > 0 ? "(" + params.join(',') + ")" : '';
        var outlet = this.outlet === shared_1.PRIMARY_OUTLET ? '' : this.outlet + ":";
        return "" + outlet + this.path + paramsString;
    };
    return UrlSegment;
}());
exports.UrlSegment = UrlSegment;
function equalUrlSegments(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i].path !== b[i].path)
            return false;
        if (!collection_1.shallowEqual(a[i].parameters, b[i].parameters))
            return false;
    }
    return true;
}
exports.equalUrlSegments = equalUrlSegments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3RyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXJsX3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdUJBQTZCLFVBQVUsQ0FBQyxDQUFBO0FBQ3hDLDJCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hELHFCQUE2QixjQUFjLENBQUMsQ0FBQTtBQUU1QztJQUNFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FDZCxJQUFJLGVBQVEsQ0FBYSxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLHVCQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEYsQ0FBQztBQUhlLDBCQUFrQixxQkFHakMsQ0FBQTtBQUtEO0lBQTZCLDJCQUFnQjtJQUkzQyxpQkFDSSxJQUEwQixFQUFTLFdBQW9DLEVBQ2hFLFFBQXFCO1FBQzlCLGtCQUFNLElBQUksQ0FBQyxDQUFDO1FBRnlCLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUNoRSxhQUFRLEdBQVIsUUFBUSxDQUFhO0lBRWhDLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQVRELENBQTZCLFdBQUksR0FTaEM7QUFUWSxlQUFPLFVBU25CLENBQUE7QUFFRDtJQUlFLG9CQUNXLElBQVksRUFBUyxVQUFtQyxFQUFTLE1BQWM7UUFBL0UsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFFOUYsNkJBQVEsR0FBUjtRQUNFLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUksSUFBSSxTQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFHLENBQUMsQ0FBQztZQUNsRCxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBRyxHQUFHLEVBQUUsQ0FBQztRQUN0RSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLHVCQUFjLEdBQUcsRUFBRSxHQUFNLElBQUksQ0FBQyxNQUFNLE1BQUcsQ0FBQztRQUN2RSxNQUFNLENBQUMsS0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFjLENBQUM7SUFDaEQsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSxrQkFBVSxhQWtCdEIsQ0FBQTtBQUVELDBCQUFpQyxDQUFlLEVBQUUsQ0FBZTtJQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ3hDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyx5QkFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNwRSxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUM7QUFQZSx3QkFBZ0IsbUJBTy9CLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BSSU1BUllfT1VUTEVUfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge3NoYWxsb3dFcXVhbH0gZnJvbSAnLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7VHJlZSwgVHJlZU5vZGV9IGZyb20gJy4vdXRpbHMvdHJlZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbXB0eVVybFRyZWUoKSB7XG4gIHJldHVybiBuZXcgVXJsVHJlZShcbiAgICAgIG5ldyBUcmVlTm9kZTxVcmxTZWdtZW50PihuZXcgVXJsU2VnbWVudCgnJywge30sIFBSSU1BUllfT1VUTEVUKSwgW10pLCB7fSwgbnVsbCk7XG59XG5cbi8qKlxuICogQSBVUkwgaW4gdGhlIHRyZWUgZm9ybS5cbiAqL1xuZXhwb3J0IGNsYXNzIFVybFRyZWUgZXh0ZW5kcyBUcmVlPFVybFNlZ21lbnQ+IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICByb290OiBUcmVlTm9kZTxVcmxTZWdtZW50PiwgcHVibGljIHF1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICAgIHB1YmxpYyBmcmFnbWVudDogc3RyaW5nfG51bGwpIHtcbiAgICBzdXBlcihyb290KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVXJsU2VnbWVudCB7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHBhdGg6IHN0cmluZywgcHVibGljIHBhcmFtZXRlcnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LCBwdWJsaWMgb3V0bGV0OiBzdHJpbmcpIHt9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzLnBhcmFtZXRlcnMpIHtcbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgcGFyYW1zLnB1c2goYCR7cHJvcH09JHt0aGlzLnBhcmFtZXRlcnNbcHJvcF19YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtc1N0cmluZyA9IHBhcmFtcy5sZW5ndGggPiAwID8gYCgke3BhcmFtcy5qb2luKCcsJyl9KWAgOiAnJztcbiAgICBjb25zdCBvdXRsZXQgPSB0aGlzLm91dGxldCA9PT0gUFJJTUFSWV9PVVRMRVQgPyAnJyA6IGAke3RoaXMub3V0bGV0fTpgO1xuICAgIHJldHVybiBgJHtvdXRsZXR9JHt0aGlzLnBhdGh9JHtwYXJhbXNTdHJpbmd9YDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxVcmxTZWdtZW50cyhhOiBVcmxTZWdtZW50W10sIGI6IFVybFNlZ21lbnRbXSk6IGJvb2xlYW4ge1xuICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgIGlmIChhW2ldLnBhdGggIT09IGJbaV0ucGF0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghc2hhbGxvd0VxdWFsKGFbaV0ucGFyYW1ldGVycywgYltpXS5wYXJhbWV0ZXJzKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuIl19