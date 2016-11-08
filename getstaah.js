var express = require('express');
var request = require('request');
var moment = require('moment');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('./config');


var kirimkan = "";

app.use("/", express.static(__dirname));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", function() {
    console.log('ada koneksi');
});

function main() {
    setInterval(getstaah, config.staah.interval);
}


function getstaah() {
    var mysql = require('mysql');
    var myJSONObject = {
        "bookingrequest": {
            "username": config.staah.username,
            "password": config.staah.password,
            "hotel_id": config.staah.hotel_id
        }
    };

    var dt = new Date();

    console.log(dt);

    request({
        url: "https://emerald.staah.net/common-cgi/Booking.pl",
        method: "POST",
        json: true, // <--Very important!!!
        body: myJSONObject
    }, function(error, response, body) {
        console.log(body);
        io.emit("incoming", body);
        var jsonbody = JSON.stringify(body);
        insertData(jsonbody);
        unprocessed();
    });
}




function insertData(apa) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: config.hotel.hostname,
        user: config.hotel.user,
        password: config.hotel.pass,
        database: config.hotel.database
    });

    var trdt = moment().format('YYYY-MM-DD');

    var cmd = 'insert into staah_bookings (trdt,jsonstr) ' +
        ' values (' + mysql.escape(trdt) + ',' + mysql.escape(apa) + ')';

    connection.query(cmd, function(err, result, fields) { // dan meng-eksekusi
        if (err) {
            console.log('ada error');
            return err;
        }
        connection.end();
    });

}

function unprocessed() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: config.hotel.hostname,
        user: config.hotel.user,
        password: config.hotel.pass,
        database: config.hotel.database
    });

    var cmd = "select count(*) as cnt from staah_bookings " +
        " where processed=0 and jsonstr like '%reservations%'";

    connection.query(cmd, function(err, result, fields) { // dan meng-eksekusi
        if (err) {
            console.log('ada error');
            return err;
        }
        io.emit("gagal", result[0].cnt);
        console.log(result[0].cnt);
        connection.end();
    });
}

main();
http.listen(config.web.port, function() {
    console.log('server is running on port ' + config.web.port);
});