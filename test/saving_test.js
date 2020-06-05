// for mocha testing -> don't need to require it
// const mocha = require('mocha');
const assert = require('assert');
// mongodb data model
const MathCourse = require('../models/mathcourse');

// description of tests
describe('Saving records', function(){
    // create all of our tests
    // each test is made up of an "it" block
    // function takes a function done() as an arg, that can be used to indicate the end of the test
    it('saves a record to the database', function(done){
        // assertion evaluated and either passes or fails
        // only providing 2 of the 3 fields defined in the schema
        let course = new MathCourse({
            courseName: "Introduction to Theoretical Mathematics",
            university: "Pitt"
        })
        // saving document to database (asynchronous)
        // implements the ability to use the promise chain for us
        // first argument for then() is the successCallback (second optional is the failure failureCallback)
        course.save().then(function(){
            // when you save a document, the "isNew" property is originally set to true, then changes to false when the saving is complete and it exists in the db
            assert(!course.isNew);
            // let mocha know the test is done
            done();
        // need to catch any errors: https://stackoverflow.com/questions/39716569/nodejs-unhandledpromiserejectionwarning
        }).catch((error) => {
            console.log(error);
        });
    });

    // next test
});
