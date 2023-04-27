const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const connection = require('../config/JRtouchstone_config');
//const { JR, DEGREE } = require('../models/QuestionMaster')
require("./JRQuestionMasterFun")();


//Get question
router.get('/:inst/:questionid', async (req, res) => {
     
    let finalobj = await fetchquesdetails(req.params.inst, req.params.questionid);
    //console.log(finalobj);
    res.send(finalobj);
    
   // let resp = await insertjrdata(req.params.inst, finalobj);
    //res.send(resp);
});

//Post question
router.post('/:inst', async (req, res) => {

    let resp = await insertjrdata(req.params.inst, req.body);
    res.send(resp)

});

router.get('/:inst/:limit/:offset', async (req, res) => {
    var qids=[];
    try {
        //limit 5 offset 15
        var Getques = "select question_master_id from question_master order by question_master_id limit 5 ";
        //console.log(Getques); return false;
       
       connection.query(Getques, async function (err, result) {
            if (result == '') {
                console.log('No questions found');
                res.send({
                    status: 'No Questions found'
                })
                return false;
            }
            if (err) {
                console.log(err);
                // res.send("Unbale to get the students details ");
            }
            qids= result.map(a => a.question_master_id);


           // res.send(qids);
           //console.log(qids);
         for(var q=0;q<qids.length;q++){
                console.log(qids[q]);
               await getquestiondata(req.params.inst,qids[q]);
               
            }
            
           
        })
       
       
    } catch (err) {
        console.error(err)
       // res.render('error/500')
    }
   
});


 
//insert question function calling
const insertjrdata = async (inst, questionArray) => {
    //console.log(questionArray.question_master_id);
    inst = inst + '_questionbanks'

    const model = mongoose.model(inst, require('../models/QuestionMaster'));

    let exsits = await model.find({ "question_master_id": questionArray.question_master_id })

    if (exsits.length == 0) {

        var quesres = await model.create(questionArray)

        return { "Question Status": "Inserted", "result": quesres };

    } else {

        filter = { "question_master_id": questionArray.question_master_id };
        update = questionArray;

        let quesres = await model.findOneAndUpdate(filter, update);

        return { "Question Status": "updated", "result": quesres };

    }

}

//get questions
const getquestiondata = async (inst) => {

    inst = inst + '_questionbank'
    const model = mongoose.model(inst, require('../models/QuestionMaster'));
    //console.log(model);

    var quesres = await model.find().sort({ "question_master_id": 1 })
    return quesres;
}






module.exports = router