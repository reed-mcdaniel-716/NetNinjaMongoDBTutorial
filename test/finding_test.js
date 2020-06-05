const assert = require('assert');
// mongodb data model
const MathCourse = require('../models/mathcourse');

// description of tests
describe('Finding records', function(){
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
    it('Finds one document in the mathcourses collection meeting criteria', function(done){
        MathCourse.findOne({courseName: "Introduction to Theoretical Mathematics"}).then(function(result){
            assert(result.courseName === "Introduction to Theoretical Mathematics");
            done();
        }).catch((error) => {
            console.log(error);
        });
    });

    // next test
    // find multiple records based on criteria
    it('Finds all documents in the mathcourses collection meeting criteria', function(done){
        MathCourse.find({university: "Pitt"}).then(function(results){
            let foundAll = true;
            results.forEach((result) => {
                foundAll = foundAll && (result.university === 'Pitt');
            });

            assert(foundAll && (results.length === 2));
            done();
        }).catch((error) => {
            console.log(error);
        });
    });

    // next test
    // find a record by id
    it('Finds one document in the mathcourses collection by id', function(done){
        MathCourse.findOne({_id: course._id}).then(function(result){
            // ids are stored as objects not strings
            assert(result._id.toString() === course._id.toString());
            done();
        }).catch((error) => {
            console.log(error);
        });
    });
});
