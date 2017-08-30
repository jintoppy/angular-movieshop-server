var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var router = require('./routes');
var app = express();

app.use(bodyParser.json());
app.use('/', router);

app.listen(3002, function(){
    console.log('started on 3002');
});