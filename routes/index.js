var express = require('express');
var router = express.Router();
var vd = require('../otherdata.json');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'password',
        database:'Redis'
    });
    connection.connect();
    connection.query("SELECT count FROM Redis", function(err, rows, fields) {
        if (err) throw err;
        console.log('Count: ', rows[0].count);
        res.render('index', {
            title: 'iBillBoard',
            name: 'Marek Scevlik',
            otherdata: vd,
            countindb: rows[0].count
        });
    });
    connection.on('close', function(err) {
        if (err) {
            // Oops! Unexpected closing of connection, lets reconnect back.
            connection = mysql.createConnection(connection.config);
        } else {
            console.log('Connection closed normally.');
        }
    });
});
/* GET data page. */
router.get('/data', function(req, res, next) {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'password',
      database:'Redis'
  });
  connection.connect();
  if(req.query.count != null)
  {
    var myData = {
        id: req.query.id,
        name: req.query.name,
        count: req.query.count
    }
    connection.query("UPDATE Redis SET count = count+1 WHERE id = 1", function(err, result){
        if (err) throw err;
        console.log('Result: ', result);
    });
    connection.on('close', function(err) {
        if (err) {
            // Oops! Unexpected closing of connection, lets reconnect back.
            connection = mysql.createConnection(connection.config);
        } else {
            console.log('Connection closed normally.');
        }
    });
  }
  else
  {
    var myData = {
      id:req.query.id,
      name:req.query.name
    }
  }
  var outputFilename = './datajson.json';
  fs.appendFile(outputFilename,  JSON.stringify(myData, null) + '\n' , function (err) {});
  console.log("THIS:" + req.query.id);
  connection.query("SELECT count FROM Redis", function(err, rows, fields) {
        if (err) throw err;
        console.log('Count: ', rows[0].count);
        res.render('index', {
            title: 'iBillBoard',
            name: 'Marek Scevlik',
            otherdata: vd,
            countindb: rows[0].count
        });
    });
});

module.exports = router;

