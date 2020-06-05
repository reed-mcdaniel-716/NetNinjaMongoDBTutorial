const assert = require('assert');
// mongodb data model
const MathCourse = require('../models/mathcourse');

// description of tests
describe('Deleting records', function(){
    //-------------------------- Part 1: Pre-populate db before each test ---------------------------------------
    let course;
    beforeEach(function(done){
        // help from: https://www.geeksforgeeks.org/mongoose-insertmany-function/?ref=leftbar-rightbar
        MathCourse.insertMany([
            { courseName: "Introduction to Theoretical Mathematics", university: "Pitt"},
            { courseName: "Introduction to Theoretical 1-Variable Calculus", university: "Pitt", courseCode: 420},
            { university: "UB", courseCode: 501}
        ]).then(function(){
            // insert one more for id lookup
            course = new MathCourse({
                courseName: "Introduction to Probability Theory for Data Science",
                university: "UB",
                courseCode: 502
            })
            course.save().then(function(){
                done();
            }).catch((error) => {
                // failure to save single document
                console.log(error);
            });
        }).catch(function(error){
            // failure to insert in bulk
            console.log(error);
        });
    });

    //-------------------------- Part 2: Creating tests ---------------------------------------
    // each test is made up of an "it" block
    // function takes a function done() as an arg, that can be used to indicate the end of the test
    it('Finds and deletes any document in the mathcourses collection meeting criteria', function(done){
        // delete all records meeting criteria
        MathCourse.deleteMany({courseCode: 501}).then(function(){
            // after successful deletion, try to find any doc with the above criteria
            MathCourse.find({courseCode: 501}).then(function(results){
                // assert that array is empty
                assert(results.length === 0);
                done();
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    });
});
