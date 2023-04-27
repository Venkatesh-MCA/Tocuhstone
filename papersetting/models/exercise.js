const mongoose = require('mongoose')

const exercise = new mongoose.Schema({
    "testwrittendate": { type: Date, default: Date.now },
    "Subjectid": Number,
    "SubjectName": String,
    "Topicname": String,
    "Studentid": Number,
    "StudentName": String,
    "attemptedJson": Object,
    "ResultJson": Object,
    "branch": String,
    "groupid": Number,
    "groupName": String,
    "dateOnly": String,
    "email": String,
    "rollNo": Number,
    "sectionName": String,
    "videoId": String,
    "chapterId": Number,
    "chapterName": String,
}, {
    timestamps: true
}, { versionKey: false })

//module.exports = mongoose.model('JRQuestionMaster', question)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


module.exports = exercise;