var app = require('./helpers/app');

var should = require('should'),
    supertest = require('supertest'),
    expect    = require("chai").expect;

describe('count', function(){
//1 //Testing if page is accessible and works and does not throw error
    it('should return data webpage', function(done) {
        supertest(app)
            .get('/data?id=1&name=Marek')
            .expect(200)
            .end(function (err, res){
                res.status.should.equal(200);
                done();
            });

    });
 //2 //Testing if page is accessible and works and does not throw error
    it('should return data webpage with count', function(done) {
        supertest(app)
            .get('/data?id=1&name=Marek&count=1')
            .expect(200)
            .end(function (err, res){
                res.status.should.equal(200);
                done();
            });

    });
 //3 //Testing if detects non existing webpage and should throw error
    it('should NOT return data webpage with count', function(done) {
        supertest(app)
            .get('/nonexistingpage')
            .expect(404)
            .end(function (err, res){
                res.status.should.equal(404);
                done();
            });
    });

//4 //THIS WILL ALWAYS PASS IF THE ABOVE TESTS ARE RUN FIRST. IF THEY DO NOT RUN
    //AND DB Redis count is 0 then the test will fail.
    it('should NOT be zero', function(done) {
         var count = dbReturnCount();
         console.log(count);
         expect(0).to.deep.not.equal(count);
         done();
    });
 //5
    it('should not pass', function (done){
        throw "don't pass";
        done();
    });
});

function dbReturnCount() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'Redis'
    });
    connection.connect();
    connection.query("SELECT count FROM Redis", function (err, rows, fields) {
        if (err) throw err;
        console.log('TEST COUNT: ', rows[0].count);
        return rows[0].count;
        done();
    });
};


