const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()


//insert practice test questions
router.post('/:inst', async (req, res) => {
    try {
        let pract_ques = await getpratcieques(req.params.inst, req.body)

        req.body.Questions = pract_ques.result;
        req.body.ExamTime = (req.body.Questions.length) * req.body.ExamTime;
        req.body.TimeLeft = req.body.ExamTime * 60;
        res.send(req.body);

        //insesrt record to practice test
        let pract_res = await insert_record(req.params.inst, req.body)

    } catch (err) {
        console.error(err)

    }
});

//update practice test questions
router.put('/:inst', async (req, res) => {
    console.log(req.body.summary)
    try {
        inst = inst + '_practicetests'

        const modelname = mongoose.model(inst, require('../models/practicetest'));

        let exsits = await modelname.find({
            "suc": req.body.suc,
            "uid": req.body.uid,
            "Questions": {
                "$elemMatch": {
                    "question_master_id": req.body.questionid
                }
            },
        }).lean()
        //console.log(req.body.setdata);
        if (!exsits) {
            return res.send('error/404')
        }

        if (exsits[0].uid != req.body.uid) {
            res.send('uid doesnot match')
        } else {


            const obj = {
                $set: {
                    'Questions.$.isanswered': 1,
                    'Questions.$.time_spent': req.body.time_spent,
                    'Questions.$.ans': req.body.ans,
                    "Questions.$.newpoints": req.body.newpoints,
                    "Questions.$.NewansnewStatus": req.body.NewansnewStatus,
                    "Questions.$.queupdate": 1,
                    "TimeLeft": req.body.TimeLeft,
                    "examstatus": req.body.examstatus,
                    "summary": req.body.summary
                }
            };


            story = await stdpracticetest.findOneAndUpdate({
                "suc": req.body.suc,
                "uid": req.body.uid,
                "Questions": {
                    "$elemMatch": {
                        "question_master_id": req.body.questionid
                    }
                }
            }, obj, {
                upsert: true,
                runValidators: true,
            })

            res.send(story)
        }
    } catch (err) {
        console.error(err)
        //res.render('error/404')
    }
});


//submit  practice test exam
router.post('/submit/:inst', async (req, res) => {
    var totlaq = req.body;
    for (var q = 0; q < totlaq.length; q++) {
        try {

            let exsits = await stdpracticetest.find({
                "suc": totlaq[q].suc,
                "uid": totlaq[q].uid,
                "Questions": {
                    "$elemMatch": {
                        "question_master_id": totlaq[q].questionid
                    }
                },
            }).lean()
            //console.log(req.body.setdata);
            if (!exsits) {
                return res.send('error/404')
            }

            if (exsits[0].uid != totlaq[q].uid) {
                res.send('uid doesnot match')
            } else {


                const obj = {
                    $set: {
                        'Questions.$.isanswered': 1,
                        'Questions.$.time_spent': totlaq[q].time_spent,
                        'Questions.$.ans': totlaq[q].ans,
                        "Questions.$.newpoints": totlaq[q].newpoints,
                        "Questions.$.NewansnewStatus": totlaq[q].NewansnewStatus,
                        "Questions.$.queupdate": 1,
                        "time_left": totlaq[q].time_left,
                        "examstatus": totlaq[q].examstatus
                    }
                };

                // console.log(obj);
                story = await stdpracticetest.findOneAndUpdate({
                    "suc": totlaq[q].suc,
                    "uid": totlaq[q].uid,
                    "Questions": {
                        "$elemMatch": {
                            "question_master_id": totlaq[q].questionid
                        }
                    }
                }, obj, {
                    upsert: true,
                    runValidators: true,
                })
                res.status(200).json({
                    status: 'succes',
                    data: story,
                })
                // res.send(story)
            }
        } catch (err) {
            console.error(err)
            //res.render('error/404')
        }
    }

});

//Get all marks by using succode and exam uid
router.get('/:inst/:suc/:uid', async (req, res) => {
    console.log('report');
    try {
        inst = req.params.inst + '_practicetests'

        const modelname = mongoose.model(inst, require('../models/practicetest'));
        const presenttest = await modelname.find({
            "suc": req.params.suc,
            "uid": req.params.uid
        }).lean()

        res.send(presenttest);
        // res.render('location/index', {
        //     presenttest,
        // })
    } catch (err) {
        console.error(err)
        //res.render('error/500')
    }
});

//Get all exams list by usig succode
router.get('/student/:inst/:suc/:uid', async (req, res) => {
    console.log('student all exam report');
    try {
        inst = req.params.inst + '_practicetests'

        const modelname = mongoose.model(inst, require('../models/practicetest'));

        const presenttest = await modelname.find({
            "suc": req.params.suc,            
        }).lean()

        res.send(presenttest);
        // res.render('location/index', {
        //     presenttest,
        // })
    } catch (err) {
        console.error(err)
        //res.render('error/500')
    }
});



const getpratcieques = async (inst, reqbody) => {

    var subjectid = reqbody.Subjects.toString();

    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    var paper_res = await modelname.aggregate([
        {
            "$match":
            {
                "question_master_subject_id": subjectid,
                "topic_id": { $in: reqbody.Topics },
                "question_master_level_id": reqbody.Level
            }
        },
        { $sample: { size: parseInt(reqbody.NoOfQueSub) } },

        {
            $project: {
                "question_master_id": 1,
                "question_master_desc": 1,
                "question_master_type": 1,
                "question_master_subject_id": 1,
                "question_master_level_id": 1,
                "question_level_name": "$question_master_level_name",
                "topic_id": 1,
                "question_type_name": "$question_master_type_name",
                "subject_master_name": 1,
                "topic_master_name": 1,
                "ans": 1,
                "tags": "$tag_name",
            }
        },
        { $unset: "_id" }

    ])


    return { "Paper Status": "Practice test questions!", "result": paper_res };
}

const insert_record = async (inst, Arrayfilelds) => {

    inst = inst + '_practicetests'

    const modelname = mongoose.model(inst, require('../models/practicetest'));

    var paper_res = await modelname.create(Arrayfilelds)


    return { "Paper Status": "Practice paper questions inserted!", "result": paper_res };
}
module.exports = router