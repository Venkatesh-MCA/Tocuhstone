const mongoose = require('mongoose')

const videoform = new mongoose.Schema({    
    inst:{
        type:String,
        required:true
    },
    papercode:{
        type:String,
       // unique: true,
        required:true
    },
    subject:{
        type:String,
        required:true,
    },
    details:{
        type: Array,
        required: true,    
    },   
    
    createdAt: {
    type: Date,
    default: Date.now,
  }
  
},{
    timestamps: true
  },{ versionKey: false })

module.exports = mongoose.model('video_form', videoform)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


//module.exports=question;