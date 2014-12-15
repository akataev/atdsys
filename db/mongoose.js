var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/atddb", {
    "server": {
        "socketOptions": {
            "keepAlive": 1
        }
    }
}, function(err){
    if (err) throw err;
    console.log("Connected to 'atddb' database");
});

module.exports = mongoose;