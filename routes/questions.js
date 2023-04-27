const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { encode, decode } = require('html-entities');
require("./counter")();


//Get questions
router.get('/:inst/:subjectname/:pageno/:limit', async (req, res) => {
    try {
        const subjectres = await getquestions(req.params.inst, req.params.subjectname, req.params.pageno, req.params.limit);
        res.send(subjectres);
    } catch (err) {
        console.error(err)

    }
});

//Add new question
router.post('/:inst', async (req, res) => {
    try {
        const questionres = await addquestionmasterid(req.params.inst, req.body);
        res.send(questionres);
    } catch (err) {
        console.error(err)

    }
});

//update question
router.put('/:inst', async (req, res) => {
    try {


        req.body.question_master_desc = encode(req.body.question_master_desc, { level: 'html5' });
        if (req.body.ans.length != 0) {

            for (var a = 0; a < req.body.ans.length; a++) {

                req.body.ans[a].answer_master_desc = encode(req.body.ans[a].answer_master_desc, { level: 'html5' });

            }
            req.body.question_master_hint = encode(req.body.question_master_hint, { level: 'html5' });
        }


        const questionres = await updatequestion(req.params.inst, req.body);
        res.send(questionres);
    } catch (err) {
        console.error(err)

    }
});

//delete question
router.delete('/:inst/:questionid', async (req, res) => {
    try {
        const questionres = await deletequestion(req.params.inst, req.params.questionid);
        res.send(questionres);
    } catch (err) {
        console.error(err)

    }
});

const getquestions = async (inst, subjectname, pagno, limit) => {
    //console.log(questionArray.question_master_id);
    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    let exsits = await modelname.find({ "subject_master_name": subjectname }).sort({ "_id": -1 }).skip(parseInt(pagno)).limit(parseInt(limit))

    if (exsits.length == 0) {

        return { "Status": "Questions not found", "result": exsits };

    } else {

        return { "Status": "200", "result": exsits };

    }

}

const addquestionmasterid = async (inst, questionArray) => {
    //console.log(questionArray.question_master_id);
    const lastquestionid = await auto_id(inst, 'question_master_id');

    if (lastquestionid == '') {
        questionArray.question_master_id = lastquestionid;
        questionArray.question_master_desc = encode(questionArray.question_master_desc, { level: 'html5' });
        if (questionArray.ans.length != 0) {

            for (var a = 0; a < questionArray.ans.length; a++) {
                const latestansid = await auto_id(inst, 'answer_master_id');
                //console.log(latestansid);
                questionArray.ans[a].answer_master_desc = encode(questionArray.ans[a].answer_master_desc, { level: 'html5' });

                questionArray.ans[a].answer_master_question_id = lastquestionid[0].question_master_id


                questionArray.ans[a].answer_master_id = latestansid;
            }
            questionArray.question_master_hint = encode(questionArray.question_master_hint, { level: 'html5' });
        }

    }
    //console.log(inst)
    //console.log(questionArray)
    addnewquestion(inst, questionArray)
}

const addnewquestion = async (inst, questionArray) => {

    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    var quesres = await modelname.create(questionArray)

    return { "Question Status": "question added successfully !", "result": quesres };
}

const updatequestion = async (inst, questionArray) => {
    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    let exsits = await modelname.find({ "question_master_id": questionArray.question_master_id })

    if (exsits.length == 0) {

        //var quesres = await model.create(questionArray)

        return { "Question Status": "question not updated", "result": quesres };

    } else {

        filter = { "question_master_id": questionArray.question_master_id };
        update = questionArray;

        let quesres = await modelname.findOneAndUpdate(filter, update);

        return { "Question Status": "updated", "result": quesres };

    }

}

const deletequestion = async (inst, questionid) => {
    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    let exsits = await modelname.find({ "question_master_id": questionArray.question_master_id })

    if (exsits.length == 0) {

        //var quesres = await model.create(questionArray)

        return { "Question Status": "question not found", "result": exsits };

    } else {

        filter = { "question_master_id": questionid };

        let quesres = await modelname.deleteOne(filter);

        return { "Question Status": "Question deleted successfully", "result": quesres };

    }

}
module.exports = router