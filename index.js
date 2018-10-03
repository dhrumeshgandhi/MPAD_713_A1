//Name:         Shubh Patel
//Student Id:   300977575

var express = require('express');

var fs = require('fs');

var bodyParser = require('body-parser');

const server_port = 3000;

const STUDENT_DATA_PATH = __dirname + "/data/student.json";

var app = express();
app.use(bodyParser.json());

var host, port;

var totalGet = 0;
var totalPost = 0;

app.post('/test', function(req, res){
    res.send('Server is listening on ' + port);
    var newStudents = req.body;
    newStudents.forEach(student => {
           console.log(student.name);
    }); 
    totalPost++;

    console.log('Post received: test');
    console.log('Total post: ' + totalPost);
});

app.get('/getStudents', function(req, res){
    fs.readFile( STUDENT_DATA_PATH, function (err, data) {
        console.log( data );
        res.end( data );
    });
    totalGet++;
    
    console.log('Get received: getStudents');
    console.log('Total get: ' + totalGet);
});

app.post('/addStudent', function(req, res){
    var count = 0;
    var newStudents = req.body;
    var notInserted = 0;
    fs.readFile(STUDENT_DATA_PATH, function (err, data) {
        var json = JSON.parse(data);
        newStudents.forEach(nStudent => {
            if(isStudentExist(json, nStudent))
            {
                console.log('Student exists ' + nStudent.name);
                notInserted++;
                return;
            }
            json.push(nStudent); 
            count++;
            console.log(count+" : "+JSON.stringify(nStudent));
        });
         
        fs.writeFile(STUDENT_DATA_PATH, JSON.stringify(json), function(err){
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
        res.send(count+" students added sucessfully and " + notInserted + " already exists.");
    })
    totalPost++;
    
    console.log('Post received: addStudent');
    console.log('Total post: ' + totalPost);
});

app.get('/deleteStudent/all', function(req,res){
    var json = [];

    fs.writeFile(STUDENT_DATA_PATH, JSON.stringify(json), function(err){
        if (err) throw err;
        console.log('Students deleted!');
    });

    res.send('All students are removed.');

    totalGet++;
    console.log('Get received: deleteStudent/all');
    console.log('Total get: ' + totalGet);
});

app.get('/deleteStudent/:enrollmentId', function (req, res){
    var enrollment = req.params.enrollmentId;
    var count = 0;
    
    fs.readFile(STUDENT_DATA_PATH, function (err, data) {
        var json = JSON.parse(data);
        var nStudent = {
            enrollment: enrollment
        }
        if(!isStudentExist(json, nStudent))
        {
            console.log('Student not found: ' + nStudent.enrollment);
            res.send('Student not found: ' + nStudent.enrollment);
            return;
        }
        nStudent = getStudentById(json, enrollment);
        count++;
        
        deleteStudentById(json, enrollment);

        fs.writeFile(STUDENT_DATA_PATH, JSON.stringify(json), function(err){
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
        
        res.send(count+" students deleted sucessfully. Deleted Student: "+ JSON.stringify(nStudent));
    });
    totalGet++;
    console.log('Get received: deleteStudent');
    console.log('Total get: ' + totalGet);
});

var server = app.listen(server_port, function () {
    host = server.address().address
    port = server.address().port
    
    console.log("Server listening at http://%s:%s", host, port)
 });


function isStudentExist(json, student)
{
    var isStudentExist = false;
    json.forEach(jStudent =>{
        if(jStudent.enrollment == student.enrollment){
            isStudentExist = true;
        }
    });
    return isStudentExist;
}

function getStudentById(json, enrollment){
    var student = {};
    json.forEach(jStudent =>{
        if(jStudent.enrollment == enrollment){
            student = jStudent;
        }
    });
    return student;
}

function deleteStudentById(json, enrollment){    
    var i = 0;
    var jStudent = {};
    for(i = 0; i < json.length; i++){
        jStudent = json[i];
        if(jStudent.enrollment == enrollment)
        {
            json.splice(i, 1);
            return;
        }
    }
}