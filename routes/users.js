var mongo    = require('mongodb');
var mongoose = require('mongoose');

//var User       = require('../db/models/user').User;
//var Permission = require('../db/models/permission').Permission;
//var Role       = require('../db/models/role').Role;

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('atddb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'atddb' database");
        db.collection('users', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});


exports.findAll = function(req, res){
//    res.end('Hello, username');
    db.collection('users', function(err, collection){

//        collection.find().toJSON(function(err, items){
//            res.send(items);
//        });
        if (collection !== undefined) {

            collection.find().toArray(function(err, items) {
                res.send(items);
            });
            //res.end('hello');
        }
    });

//    var users = db.users.find({});
//    res.json(users);

//    User.find({}, function (err, users) {
//        if (err) throw err;
//        res.json(users);
//    });
};