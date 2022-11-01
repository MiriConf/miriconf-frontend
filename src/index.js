const express = require("express");
const morg = require("morgan");
const path = require("path");
var app = express();
const port = 8080;

app.use(morg('test'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'pages')));

app.get('/', function(req, res) {
   res.sendFile('teams.html',{ root: 'pages'});
});

app.listen(port);
console.log('web server started on port '+ port);
