var mongoose = require('../db/mongoose');

var User = require('../db/models/user').User;
//var Permission = require('../db/models/permission').Permission;
//var Role       = require('../db/models/role').Role;

exports.findAll = function(req, res){
    User.find({}, function(err, users) {
        if (err) throw err;
        res.json(users);
    });
};

exports.findById = function(req, res){
    User.findById(req.params.id, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
};