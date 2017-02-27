var express = require('express');
var app = express();
//  Static content lives under current directory name + public
app.use(express.static(__dirname + '/public'));
//  Setup server at port 3000
app.listen(3000);
