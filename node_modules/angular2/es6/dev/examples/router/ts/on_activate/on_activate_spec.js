import { verifyNoBrowserErrors } from 'angular2/src/testing/e2e_util';
function waitForElement(selector) {
    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    browser.wait(EC.presenceOf($(selector)), 20000);
}
describe('on activate example app', function () {
    afterEach(verifyNoBrowserErrors);
    var URL = 'angular2/examples/router/ts/on_activate/';
    it('should update the text when navigating between routes', function () {
        browser.get(URL);
        waitForElement('my-cmp');
        expect(element(by.css('my-cmp')).getText())
            .toContain('routerOnActivate: Finished navigating from "null" to ""');
        element(by.css('#param-link')).click();
        waitForElement('my-cmp');
        expect(element(by.css('my-cmp')).getText())
            .toContain('routerOnActivate: Finished navigating from "" to "1"');
        browser.navigate().back();
        waitForElement('my-cmp');
        expect(element(by.css('my-cmp')).getText())
            .toContain('routerOnActivate: Finished navigating from "1" to ""');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25fYWN0aXZhdGVfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL2V4YW1wbGVzL3JvdXRlci90cy9vbl9hY3RpdmF0ZS9vbl9hY3RpdmF0ZV9zcGVjLnRzIl0sIm5hbWVzIjpbIndhaXRGb3JFbGVtZW50Il0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sK0JBQStCO0FBRW5FLHdCQUF3QixRQUFnQjtJQUN0Q0EsSUFBSUEsRUFBRUEsR0FBU0EsVUFBV0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtJQUM5Q0EsZ0VBQWdFQTtJQUNoRUEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7QUFDbERBLENBQUNBO0FBRUQsUUFBUSxDQUFDLHlCQUF5QixFQUFFO0lBQ2xDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRWpDLElBQUksR0FBRyxHQUFHLDBDQUEwQyxDQUFDO0lBRXJELEVBQUUsQ0FBQyx1REFBdUQsRUFBRTtRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6QixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN0QyxTQUFTLENBQUMseURBQXlELENBQUMsQ0FBQztRQUUxRSxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6QixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN0QyxTQUFTLENBQUMsc0RBQXNELENBQUMsQ0FBQztRQUV2RSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3RDLFNBQVMsQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0lBQ3pFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ZlcmlmeU5vQnJvd3NlckVycm9yc30gZnJvbSAnYW5ndWxhcjIvc3JjL3Rlc3RpbmcvZTJlX3V0aWwnO1xuXG5mdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3Rvcjogc3RyaW5nKSB7XG4gIHZhciBFQyA9ICg8YW55PnByb3RyYWN0b3IpLkV4cGVjdGVkQ29uZGl0aW9ucztcbiAgLy8gV2FpdHMgZm9yIHRoZSBlbGVtZW50IHdpdGggaWQgJ2FiYycgdG8gYmUgcHJlc2VudCBvbiB0aGUgZG9tLlxuICBicm93c2VyLndhaXQoRUMucHJlc2VuY2VPZigkKHNlbGVjdG9yKSksIDIwMDAwKTtcbn1cblxuZGVzY3JpYmUoJ29uIGFjdGl2YXRlIGV4YW1wbGUgYXBwJywgZnVuY3Rpb24oKSB7XG4gIGFmdGVyRWFjaCh2ZXJpZnlOb0Jyb3dzZXJFcnJvcnMpO1xuXG4gIHZhciBVUkwgPSAnYW5ndWxhcjIvZXhhbXBsZXMvcm91dGVyL3RzL29uX2FjdGl2YXRlLyc7XG5cbiAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIHRleHQgd2hlbiBuYXZpZ2F0aW5nIGJldHdlZW4gcm91dGVzJywgZnVuY3Rpb24oKSB7XG4gICAgYnJvd3Nlci5nZXQoVVJMKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnbXktY21wJyk7XG5cbiAgICBleHBlY3QoZWxlbWVudChieS5jc3MoJ215LWNtcCcpKS5nZXRUZXh0KCkpXG4gICAgICAgIC50b0NvbnRhaW4oJ3JvdXRlck9uQWN0aXZhdGU6IEZpbmlzaGVkIG5hdmlnYXRpbmcgZnJvbSBcIm51bGxcIiB0byBcIlwiJyk7XG5cbiAgICBlbGVtZW50KGJ5LmNzcygnI3BhcmFtLWxpbmsnKSkuY2xpY2soKTtcbiAgICB3YWl0Rm9yRWxlbWVudCgnbXktY21wJyk7XG5cbiAgICBleHBlY3QoZWxlbWVudChieS5jc3MoJ215LWNtcCcpKS5nZXRUZXh0KCkpXG4gICAgICAgIC50b0NvbnRhaW4oJ3JvdXRlck9uQWN0aXZhdGU6IEZpbmlzaGVkIG5hdmlnYXRpbmcgZnJvbSBcIlwiIHRvIFwiMVwiJyk7XG5cbiAgICBicm93c2VyLm5hdmlnYXRlKCkuYmFjaygpO1xuICAgIHdhaXRGb3JFbGVtZW50KCdteS1jbXAnKTtcblxuICAgIGV4cGVjdChlbGVtZW50KGJ5LmNzcygnbXktY21wJykpLmdldFRleHQoKSlcbiAgICAgICAgLnRvQ29udGFpbigncm91dGVyT25BY3RpdmF0ZTogRmluaXNoZWQgbmF2aWdhdGluZyBmcm9tIFwiMVwiIHRvIFwiXCInKTtcbiAgfSk7XG59KTtcbiJdfQ==