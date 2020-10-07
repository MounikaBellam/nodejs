var express = require('express');
var ejs = require('ejs');
var https = require('https');
var axios = require('axios');

//initialize the express app
var app = express();
// set view engine
app.set('view engine', 'ejs');
// set the folder where all views are present!
app.set('views', __dirname + '/templates');
console.log(__dirname + '/templates');

app.get('/', function(req, res){
    res.render('home');
})

app.get('/contact/:name', function(req, res){
    console.log(req.params.name);
    res.render('profile', {name: req.params.name});
})

// serve static pages from public folder!
app.use(express.static('public'));

//use https rest client to connect with external middlewares
app.get('/https/users/', function(req, res){
    console.log("Get data from remote rest API!!!!");
    https.get('https://jsonplaceholder.typicode.com/users/', function(response){
        let data = '';
        response.on('data', function(dataPacket){
            data+=dataPacket;
        })
        response.on('end', function(){
            console.log(JSON.parse(data));
            res.json(JSON.parse(data));            
        })
    })    
})

app.get('/https/users/:id', function(req, res){
    console.log("Get data from remote rest API!!!!");
    https.get('https://jsonplaceholder.typicode.com/users/' + req.params.id, function(response){
        let data = '';
        response.on('data', function(dataPacket){
            data+=dataPacket;
        })
        response.on('end', function(){
            console.log(JSON.parse(data));
            let obj = JSON.parse(data);
            console.log(obj.name);
            console.log(obj.email);
            console.log(obj.address.geo.lat)
            console.log(obj.address.geo.lng)
            res.json(JSON.parse(data));            
        })
    })    
})

//not recommended
app.get('/https/donotdo/users/:id', function(req, res){
    console.log("Get data from remote rest API!!!!");
    https.get('https://jsonplaceholder.typicode.com/users/', function(response){
        let data = '';
        response.on('data', function(dataPacket){
            data+=dataPacket;
        })
        response.on('end', function(){
            console.log(JSON.parse(data));
            let allobj = JSON.parse(data);
            res.json(allobj[req.params.id-1]);            
        })
    })    
})

app.get('/https/template/users/:id', function(req, res){
    console.log("Get data from remote rest API!!!!");
    https.get('https://jsonplaceholder.typicode.com/users/' + req.params.id, function(response){
        let data = '';
        response.on('data', function(dataPacket){
            data+=dataPacket;
        })
        response.on('end', function(){
            console.log(JSON.parse(data));
            let object = JSON.parse(data);
            console.log(object.name);
            console.log(object.email);
            console.log(object.address.geo.lat);
            console.log(object.address.geo.lng);
            res.render('user', {name: object.name,
                username:object.username,
                email: object.email,
                latitude: object.address.geo.lat,
                longitude: object.address.geo.lng});            
        })
    })    
})

//use axios rest client to communicate with external middlewares
app.get('/axios/users', function(req, res){
    console.log("Get data from remote rest api!!!!");
    axios.get('https://jsonplaceholder.typicode.copjhclearm/users')
    .then(function(response){
        console.log(response.data);
        res.json(response.data);
    })
    .catch(function(err){
        console.log(err);
        res.json({message: "err"});
    })
})

app.listen(3000);