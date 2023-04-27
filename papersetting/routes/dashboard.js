const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const getUniqeElements = require('./libfuntions');

//get subjectwise questioncount
router.get('/:inst', async (req, res) => {
    try {
        let exercise_tagres = await getsubjectwiseqcount(req.params.inst);
        res.send(exercise_tagres);

    } catch (err) {
        console.error(err)

    }
});


const getsubjectwiseqcount = async (inst) => {
    
    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    var resp = await modelname.aggregate(
        [
            {
                 "$group": {
                "_id": {
                    "question_master_subject_id":"$question_master_subject_id",
                    "subject_master_name": "$subject_master_name",
                    "question_master_level_name": "$question_master_level_name",
                    "topic_id":"$topic_id",
                    "topic_master_name":"$topic_master_name"
                     
                },
                "questioncount": { "$sum": 1 }
            },
            
        },
        {
            $project:{
                "question_master_subject_id":{ $toInt: "$_id.question_master_subject_id" },
                  "subject_master_name": "$_id.subject_master_name",
                    "question_master_level_name": "$_id.question_master_level_name",
                    "topic_id":"$_id.topic_id",
                    "topic_master_name":"$_id.topic_master_name",
                    "qcount":"$questioncount"
            }
        },
            {$unset:"_id"}
        ]
    ).sort({"question_master_subject_id":1})

    
        let unisubs = await getUniqeElements(resp, 'subject_master_name');
        var subjectobj=[];var Mainobj=[];
        // unisubs.forEach(s => {
        //      topicsdata[s]= resp.filter(e=>e.subject_master_name==s)
        //      Mainobj.push({"subject":topicsdata[s].subject_master_name,""})
        // });


    return { "Status": 200, "result": resp };
}

module.exports = router