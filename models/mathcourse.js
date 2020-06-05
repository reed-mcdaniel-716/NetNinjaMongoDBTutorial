// MongoDB data model for different math courses
const mongoose = require('mongoose');
// getting schema pyototype/class
const Schema = mongoose.Schema;

//---------------- Part 1: creating schema and model ----------------

// creating new schema
// a MathCourse instance can have any or none of the below fields
    // but nothing that is not listed
const MathCourseSchema = new Schema({
    courseName: String,
    university: String,
    courseCode: Number
});
// every new math course should be based on the above schema
const MathCourse = mongoose.model('mathcourse', MathCourseSchema);

// export for use elsewhere
module.exports = MathCourse;
