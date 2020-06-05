const assert = require('assert');
// mongodb data model
const MathCourse = require('../models/mathcourse');

// description of tests
describe('Updating records', function(){
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
    it('Updates all documents in the mathcourses collection meeting criteria', function(done){
        // update update all documents
        MathCourse.updateMany({courseName: "Introduction to Theoretical Mathematics"}, {courseCode: 413}).then(function(){
            // because we updated all, any one we find should be updated
            MathCourse.findOne({courseName: "Introduction to Theoretical Mathematics"}).then(function(result){
                // assert that array is empty
                assert(result.courseCode === 413);
                done();
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    });

    // next test
    it('Updates all documents in the mathcourses collection meeting criteria using $set', function(done){
        // update update all documents
        MathCourse.updateMany({university: "Pitt"}, {$set: {university: "University of Pittsburgh"}}).then(function(){
            // because we updated all, any one we find should be updated
            MathCourse.findOne({courseName: "Introduction to Theoretical Mathematics"}).then(function(result){
                // assert that array is empty
                assert(result.university === "University of Pittsburgh");
                done();
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    });
});
