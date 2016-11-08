var fs = require('fs'),
    readline = require('readline');
var moment = require('moment');

var rd = readline.createInterface({
    input: fs.createReadStream('datasmdr.txt'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    // console.log(line);
    savetable(line);
});


function savetable(line) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'p3nd3kar',
        database: 'pbx'
    });

    var wkt = new Date();
    var wktf = moment(wkt).format('YYYY-MM-DD HH:MM:SS')

    var querystr = "insert into pbxraw (trdt,smdr) " +
        " values (" + mysql.escape(wktf) +
        "," + mysql.escape(line) + ")";

    console.log(querystr);

    connection.query(querystr, function(err, result, fields) {
        // callback(JSON.stringify(result));
        connection.end();
    });
}