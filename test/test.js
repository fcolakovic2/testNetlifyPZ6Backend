var expect  = require('chai').expect;
var request = require('request');


describe('Status and content', function() {
    describe ('Main page', function() {
        it('status', function(done){
            request('http://localhost:3030/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

       it('content', function(done) {
            request('http://localhost:3030/' , function(error, response, body) {
                expect(body).to.not.equal('Hello World');
                done();
            });
        }); 
    });

    describe ('About page', function() {
        it('status', function(done){
            request('http://localhost:3030/about', function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

    });
});