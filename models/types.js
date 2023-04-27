const mongoose = require('mongoose')

const quuestiontypes = new mongoose.Schema({    
    question_type_id:{
        type:Number,
        //unique: true,
        required:true
    },
    question_type_name:{
        type:String,
        required:true,
    },
    type_code:{
        type: String,
        required: true,    
    }   
     
     
  
} )

//module.exports = mongoose.model('JRQuestionMaster', question)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


module.exports=quuestiontypes;