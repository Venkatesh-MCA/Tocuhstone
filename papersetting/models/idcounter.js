const mongoose = require('mongoose')

const idcounter = new mongoose.Schema({    
    topic_master_id:{
        type:Number,        
        required:true
    },
    subtopic_master_id:{
        type:Number,
        required:true,
    },
    question_master_id:{
        type: Number,
        required: true,    
    }, 
    answer_master_id:{
        type:Number,
        required:true
    }
})

//module.exports = mongoose.model('JRQuestionMaster', question)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


module.exports=idcounter;