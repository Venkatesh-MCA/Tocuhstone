const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
//require("./idcountest_fun")();
require("./counter")();

//Get subjectwise topics and subtopics
router.get('/:inst/:subjectname', async (req, res) => {
    try {
        const topicres = await gettopicssubtopics(req.params.inst, req.params.subjectname);
        res.send(topicres);
    } catch (err) {
        console.error(err)

    }
});

//insert new topic with last topic master id 
router.post('/:inst/:subjectname', async (req, res) => {

    try {
        const latesttopicid = await auto_id(req.params.inst, 'topicid');
        const latestsubtopicid = await auto_id(req.params.inst, 'subtopicid');
        //console.log(latesttopicid);
        //console.log(latestsubtopicid);
        req.body.topic_master_id = latesttopicid
        req.body.subtopic_master_id = latestsubtopicid
        console.log(req.body);
        let ret = await inserttopicsubtopic(req.params.inst, req.body);
        res.send(ret);
    } catch (err) {
        console.error(err)
    }
})

//update topic subtopic name
router.put('/:inst/:topicid', async (req, res) => {

    try {
        inst = req.params.inst + '_topics'
        const modelname = mongoose.model(inst, require('../models/topics'));
        let topicexists = await modelname.findOne({"topic_master_id":req.params.topicid}).lean()
        //console.log(topicexists); return false
        if (!topicexists) {
            return res.send('error/404')
        }

        if (topicexists.topic_master_id != req.params.topicid) {
            res.send('topic id not equal')
        } else {
            topicaddedres = await modelname.findOneAndUpdate({ topic_master_id: req.params.topicid }, req.body, {
                new: true,
                runValidators: true,
            })

            res.send(topicaddedres)
        }
    } catch (err) {
        console.error(err)
        return res.send('error/500')
    }
})

//add new topic subtopic record
const inserttopicsubtopic = async (inst, topicarray) => {

    inst = inst + '_topics'

    const modelname = mongoose.model(inst, require('../models/topics'));

    let exsits = await modelname.create(topicarray)
    console.log(exsits);
    if (exsits.length == 0) {

        return { "Status": "topics not added", "result": exsits };

    } else {

        return { "Status": "200", "Message": "topic added successfully", "result": exsits };

    }

}


//insert question function calling
const gettopicssubtopics = async (inst, subjectname) => {
    //console.log(questionArray.question_master_id);
    inst = inst + '_topics'

    const modelname = mongoose.model(inst, require('../models/topics'));

    let exsits = await modelname.aggregate(
        [

            {
                $match: {
                    "subject_master_name": subjectname
                }
            },

            {
                "$group": {
                    "_id": {
                        "subject_master_name": "$subject_master_name",
                        "topic_master_id": "$topic_master_id",
                        "topic_master_name": "$topic_master_name",
                        "subtopic_master_name": "$subtopic_master_name",
                        "subtopic_master_id": "$subtopic_master_id"
                    },
                    //"bookCount": { "$sum": 1 }
                }
            },

            {
                "$group": {
                    "_id": { "topicid": "$_id.topic_master_id", "topicname": "$_id.topic_master_name" },
                    "subtopics": {
                        "$push": {
                            "subtopic_master_name": "$_id.subtopic_master_name",
                            "subtopic_master_id": "$_id.subtopic_master_id",
                        },
                    }
                }
            },

            // {
            //     $project:{
            //         "topic_master_id":"$_id.topic_master_id",
            //         "topic_master_name":"$_id.topic_master_name",
            //         "subtopics":1

            //     }
            // }
            {
                $project: {
                    _id: 0,
                    topicid: "$_id.topicid",
                    topicname: "$_id.topicname",
                    subtopics: "$subtopics"
                }
            }





        ]
    ).sort({ "topicid": 1 })

    if (exsits.length == 0) {

        return { "Status": "topics not found", "result": exsits };

    } else {

        return { "Status": "200", "result": exsits };

    }

}

module.exports = router