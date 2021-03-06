var express = require('express');
var path    = require('path');

var user   = require('./routes/users');


var app = express();

app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public')));

//app.get('/wines', wine.findAll);
//app.get('/wines/:id', wine.findById);
//app.post('/wines', wine.addWine);
//app.put('/wines/:id', wine.updateWine);
//app.delete('/wines/:id', wine.deleteWine);

app.get('/users', user.findAll);
app.get('/users/:id', user.findById);

app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});