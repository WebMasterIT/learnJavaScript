var express = require('express');
const fs = require("fs");

var app = express();
app.set('port', 5500);

app.get('/', function(request, response){
    
    const filePath = request.url.substr(1);
    fs.access(filePath, fs.constants.R_OK, err => {
        // если произошла ошибка - отправляем статусный код 404
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
            fs.createReadStream("cards.js").pipe(response);
        }
      });
}).listen(5500, function(){
    console.log("Server started at " + app.get('port'));
});

