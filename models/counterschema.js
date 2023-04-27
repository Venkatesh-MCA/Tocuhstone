const mongoose = require('mongoose')

const idcounter = new mongoose.Schema({    
    idname:{
        type:String,        
        required:true
    },
    seq:{
        type:Number,
        required:true,
    }
    
} ,{

    versionKey: false // You should be aware of the outcome after set to false

})

//module.exports = mongoose.model('JRQuestionMaster', question)
//var JR = mongoose.model('Jr_QuestionMaster', question);
//var DEGREE = mongoose.model('Degree_QuestionMaster', question);


module.exports=idcounter;