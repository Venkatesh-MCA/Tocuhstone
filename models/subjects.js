const mongoose = require('mongoose')

const subjects = new mongoose.Schema({    
    subject_master_id:{
        type:Number,
        //unique: true,
        required:true
    },
    subject_master_name:{
        type:String,
        required:true,
    },
    subject_master_eabled:{
        type: Number,
        required: true,    
    },   
    sub_order:{
        type:Number,
        require:true
    }
     
     
  
} )

//module.exports = mongoose.model('JRQuestionMaster', question)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


module.exports=subjects;