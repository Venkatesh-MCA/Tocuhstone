const mongoose = require('mongoose')

const topics = new mongoose.Schema({    
    subject_id:{
        type:Number,
        //unique: true,
        required:true
    },
    subject_master_name:{
        type:String,
        required:true,
    },
    topic_master_id:{
        type: Number,
        required: true,    
    },   
    topic_master_name:{
        type:String,
        require:true
    },    
    subtopic_master_id:{
        type:Number,
        //require:true
    },
    subtopic_master_name:{
        type:String,
        //require:true
    }
     
  
} )

//module.exports = mongoose.model('JRQuestionMaster', question)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


module.exports=topics;