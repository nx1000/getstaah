var request = require('request');

function getstaah() {

    var dt = new Date();

    console.log(dt);
    myJSONObject = {"test":"test"};
    request({
        url: "https://pmsupdate.staah.net/common-cgi/Services.pl",
        method: "POST",
        json: true, // <--Very important!!!
        body: myJSONObject
    }, function(error, response, body) {

        if (error) {
            console.log(error.code);
            io.emit("adaerrorhttp", error.code);
        }

        console.log(body);     
        var jsonbody = JSON.stringify(body);


        // tulis ke file
        

        
        
    });
}

getstaah();