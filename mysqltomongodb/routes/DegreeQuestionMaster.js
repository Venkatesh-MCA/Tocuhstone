const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
//const { JR, DEGREE } = require('../models/QuestionMaster')
require("./DegreeQuestionMasterFun")();


//Get question
router.get('/:inst/:questionid', async (req, res) => {

    let finalobj = await fetchdegreequesdetails(req.params.inst, req.params.questionid);
    res.send(finalobj);
    //let resp = await insertdegreedata(req.params.inst, finalobj);
    //res.send(resp);
});

//Post question
router.post('/:inst', async (req, res) => {

    let resp = await insertdegreedata(req.params.inst, req.body);
    res.send(resp)

});

//insert question function calling
const insertdegreedata = async (inst, questionArray) => {
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