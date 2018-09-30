var express = require('express');

var app = express();

var host, port;

app.get('/test',function(req, res){
    res.send('Server is listening on ' + port);
});

var server = app.listen(8081, function () {
    host = server.address().address
    port = server.address().port
    
    console.log("Server listening at http://%s:%s", host, port)
 });

