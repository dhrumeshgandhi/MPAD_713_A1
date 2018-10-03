var express = require('express');

var fs = require('fs');

var bodyParser = require('body-parser');

const server_port = 8081;

const STUDENT_DATA_PATH = __dirname + "/data/student.json";

var app = express();
app.use(bodyParser.json());

var host, port;

app.post('/test', function(req, res){
    res.send('Server is listening on ' + port);
    var newStudents = req.body;
    newStudents.forEach(student => {
           console.log(student.name);
    }); 
});

app.get('/getStudents', function(req, res){
    fs.readFile( STUDENT_DATA_PATH, function (err, data) {
        console.log( data );
        res.end( data );
    });
});

app.post('/addStudent', function(req, res){
    var count = 0;
    var newStudents = req.body;
    fs.readFile(STUDENT_DATA_PATH, function (err, data) {
        var json = JSON.parse(data);
        newStudents.forEach(nStudent => {
            json.forEach(student => {
                if(nStudent.student_id == student.student_id){
                    res.send("Student can't added !\n"+nStudent+"\nStudent already exists:\n"+student.stringify)
                    return
                }
                json.push(nStudent); 
                count++;
            });
            console.log(count+" : "+JSON.stringify(nStudent));
        });
         
        fs.writeFile(STUDENT_DATA_PATH, JSON.stringify(json), function(err){
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });

        res.send(count+" students added sucessfully");
    })
});



var server = app.listen(server_port, function () {
    host = server.address().address
    port = server.address().port
    
    console.log("Server listening at http://%s:%s", host, port)
 });
