const mongoose = require('mongoose')

const papers = new mongoose.Schema({    
    papercode:{
        type:String,
        unique: true,
        required:true
    },
    question_paper:{
        type:Array,
        required:true,
    },
    schema:{
        type:Array,
        //required:true
    },
    program:{
        type:String
    },
    tagname:{
        type:String
    },
    branch:{
        type: String,
        required: true,    
    },   
    userid:{
        type:Number,
        require:true
    },    
    createdAt: {
    type: Date,
    default: Date.now,
  }
  
},{
    timestamps: true
  },{ versionKey: false })

//module.exports = mongoose.model('JRQuestionMaster', question)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


module.exports=papers;