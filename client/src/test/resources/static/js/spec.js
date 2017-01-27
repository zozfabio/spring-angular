describe("home controller", function() {

    beforeEach(module('auth'));

    beforeEach(module('home'));

    var $httpBackend, $controller;

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $controller = $injector.get('$controller');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("says Hello Test when controller loads", function() {
        $httpBackend.expectGET('/resource').respond(200, {
            'id': 0,
            'content': 'Hello Test'
        });

        var controller = $controller('home');

        $httpBackend.flush();

        expect(controller.greeting.content).toEqual('Hello Test');
    });

});