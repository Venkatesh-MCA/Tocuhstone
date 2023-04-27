const mongoose = require('mongoose')

const programs = new mongoose.Schema({    
    program_master_id:{
        type:Number,
        //unique: true,
        required:true
    },
    program_master_name:{
        type:String,
        required:true,
    }
     
     
  
} )

//module.exports = mongoose.model('JRQuestionMaster', question)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


module.exports=programs;