// connecting to a dockerized version of MongoDB running in a container with port
// help from: https://stackoverflow.com/questions/33336773/connecting-to-mongo-docker-container-from-host

const mongoose = require('mongoose');
// overwrtie the default mongoose library with the  ES6 Promise library (from the global object)
mongoose.Promise = global.Promise;

// connect to db before tests run, with done() parameter to indicate completion
before(function(done){
    // works because we've mapped the container port to the host port, exposing it
    // connecting to the testaroo db, which, if it doesn't exist, mongodb will create it
    // additional options object to handle future deprecation warnings and auth
    // help from: https://stackoverflow.com/questions/45576367/mongoose-connection-authentication-failed
    mongoose.connect('mongodb://localhost:27017/testaroo', {useNewUrlParser: true, useUnifiedTopology: true, user: 'admin', pass: 'admin_pass', authSource: 'admin'});

    // listening for when connection is successfully made
    // .once() is an event listener like .on() in jquery, but only listens for event once i.e. first time it occurs
    // chain error handling on the end, with function firing whenever there is an error
    mongoose.connection.once('open', function(){
        console.log('Connection has been made...');
        done();
    }).on('error', function(error){
        console.log(`Connection error: ${error}`);
    });
});

// drop the mathcourses collection before each test
beforeEach(function(done){
    // asynchronous drop requires callback for after drop is complete
    mongoose.connection.collections.mathcourses.drop(function(){
        done();
    });
});
