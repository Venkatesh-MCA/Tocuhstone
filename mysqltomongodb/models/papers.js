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
        required:true,
    },
    branch:{
        type: String,
        required: true,    
    },
    inst:{
        type:String,
        required:true
    },
    createdAt: {
    type: Date,
    default: Date.now,
  }
  
},{
    timestamps: true
  },{ versionKey: false })

module.exports = mongoose.model('papers', papers)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


//module.exports=question;