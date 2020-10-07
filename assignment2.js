var express = require('express');
var ejs = require('ejs');
var axios = require('axios');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');

console.log(__dirname + '/templates');


app.get('/axios/users', function(req, res){
    console.log("Get data from remote rest api!!!!");
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(function(response){
        console.log(response.data);
        let userdetails = response.data;
        res.render('userdetails', {users:userdetails});
    })
    .catch(function(error){
        console.log(error);
        res.json({message: "error"});
    })
})

app.get('/https/users/:id', function(req, res){
    console.log("Get data from remote rest API!!!!");
    axios.get('https://jsonplaceholder.typicode.com/users/' + req.params.id)
        .then(function(response){
            console.log(response.data);
        let userdetails = response.data;
        res.send(userdetails);
    })
    .catch(function(error){
        console.log(error);
        res.json({message: "error"});
    })
})

app.listen(3000);