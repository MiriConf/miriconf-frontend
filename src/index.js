const express = require("express");
const morg = require("morgan");
const path = require("path");
var app = express();

app.use(morg('test'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, '/public/login.html'));
});
app.get('/team', function(req, res) {
   res.sendFile(path.join(__dirname, '/public/teams.html'));
});
app.get('/apps', function(req, res) {
   res.sendFile(path.join(__dirname, '/public/applications.html'));
});

app.listen(8080);
console.log("web server started on port 8080");