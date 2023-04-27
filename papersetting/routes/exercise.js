const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//get exercise tags
router.get('/:inst/:subjectid/:topicname', async (req, res) => {
    try {
        let exercise_tagres = await getexercisetags(req.params.inst, req.params.subjectid, req.params.topicname);
        res.send(exercise_tagres);

    } catch (err) {
        console.error(err)

    }
});

//get questions from the exercise tag
router.get('/:inst/:tagname', async (req, res) => {
    try {
        let quesres = await exerctagquestion(req.params.inst, req.params.tagname);
        res.send(quesres);

    } catch (err) {
        console.error(err)

    }
});

//get exercise records by student id
router.get('/:inst/:studentid', async (req, res) => {
    try {
        inst = inst + '_studentattempts'

        const modelname = mongoose.model(inst, require('../models/exercise'));

        const eventslist = await modelname.find({ "Studentid": req.params.studentid });
        res.send(eventslist);
    } catch (err) {
        res.send("Error " + err)
    }
});

//save exercise records
router.get('/:inst/', async (req, res) => {
    try {
        inst = inst + '_studentattempts'

        const modelname = mongoose.model(inst, require('../models/exercise'));

        const attemptres = await modelname.create(req.body);
        
        res.send(attemptres);
    } catch (err) {
        res.send("Error " + err)
    }
});


const getexercisetags = async (inst, subjectid, topicname) => {

    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    var tagname_res = await modelname.aggregate(
        [
            { $unwind: "$tag_name" },
            {
                $match: {
                    "tag_name": /EXERCISE/,
                    //"subject_master_name": "MATHEMATICS",
                    "question_master_subject_id": subjectid,
                    "topic_master_name": topicname
                }
            },
            {
                $group: {
                    _id: {
                        "tag_name": "$tag_name",
                        "subject_master_name": "$subject_master_name",
                        "question_master_subject_id": "$question_master_subject_id",
                        "topic_master_name": "$topic_master_name"

                    }
                }
            },
            {
                $project: {
                    tag_name: "$_id.tag_name",
                    subject_master_name: "$_id.subject_master_name",
                    topicid: "$_id.topic_master_name",
                    subjectid: "$_id.question_master_subject_id"
                }

            },
            {
                "$unset": "_id"
            }

        ]
    )


    return { "Status": 200, "result": tagname_res };
}


const exerctagquestion = async (inst, topicname) => {

    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    var tagname_res = await modelname.aggregate(
        [
            {
                "$match":
                    { "tag_name": { $in: [topicname] } },
            },
            {
                $project: {
                    "question_id": "$question_master_id",
                    "question_level_name": "$question_master_level_name",
                    "question_master_desc": "$question_master_desc",
                    "ans": 1,
                    "question_master_hints": "$question_master_hint",
                    "question_master_level_id": "$question_master_level_id",
                    "question_master_subject_id": "$question_master_subject_id",
                    "question_master_type": "$question_master_type",
                    "question_type_name": "$question_master_type_name",
                    "subject_master_name": "$subject_master_name",
                    "topic_id": "$topic_id",
                    "topic_master_name": "$topic_master_name",
                    "type_code": "$question_master_type_code",
                    "tag_name": 1,
                    "program_master_id": 1,
                    "program_master_name": 1
                }
            }
        ]
    )


    return { "Status": 200, "result": tagname_res };
}
module.exports = router