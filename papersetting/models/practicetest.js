const mongoose = require('mongoose')

const papers = new mongoose.Schema({
    ExamType: {
        type: String,
    },
    Subjects: {
        type: Array,
    },
    Subjectname: {
        type: String
    },
    Topics: {
        type: Array,
    },
    TopicsArr: {
        type: Array
    },
    Level: {
        type: String
    },
    NoOfQueSub: {
        type: String
    },
    ExamTime: {
        type: String
    },
    QueLimit: {
        type: String
    },
    TimeLeft: {
        type: Number
    },
    Questions: {
        type: Object
    },
    uid: {
        type: String
    },
    suc: {
        type: String
    },
    branch: {
        type: String
    },
    section: {
        type: String
    },
    name: {
        type: String
    },
    time_left: {
        type: Number
    },
    examstatus: {
        type: String
    },
    summary: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

}, {
    timestamps: true
}, { versionKey: false })

//module.exports = mongoose.model('JRQuestionMaster', question)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


module.exports = papers;