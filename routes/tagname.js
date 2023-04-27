const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { encode, decode } = require('html-entities');
//Get tags
router.get('/:inst', async (req, res) => {
    try {
        const tagnameres = await getalltagnames(req.params.inst);
        res.send(tagnameres);
    } catch (err) {
        console.error(err)

    }
});

//Get tagquestions
router.get('/:inst/:tagname', async (req, res) => {
    try {
        const tagquesres = await gettagquestions(req.params.inst, req.params.tagname);
        res.send(tagquesres);
    } catch (err) {
        console.error(err)

    }
});

//tag search
router.get('/:inst/:search/:searchword', async (req, res) => {
    try {
        const tagquesres = await searchtagname(req.params.inst, req.params.searchword);
        res.send(tagquesres);
    } catch (err) {
        console.error(err)

    }
});

//Get tagquestions with multiple tag names
router.post('/:inst', async (req, res) => {
    try {
        const tagquesres = await getmultitagques(req.params.inst, req.body.tags,req.body.question_master_subject_id);
        res.send(tagquesres);
    } catch (err) {
        console.error(err)

    }
});

//update add new tag to new tagname
// put: http://localhost:4002/tag/JUNIOR/test/-31-01-2023
router.put('/:inst/:oldtag/:newtag', async (req, res) => {
    try {
        const tagquesres = await updateaddnewtag(req.params.inst, req.params.oldtag, req.params.newtag);
        res.send(tagquesres);
    } catch (err) {
        console.error(err)

    }
});

//delete tag from the questions
//delete : http://localhost:4002/tag/JUNIOR/-31-01-2023
router.delete('/:inst/:tagname', async (req, res) => {
    try {
        const tagquesres = await updatedeletetag(req.params.inst, req.params.tagname);
        res.send(tagquesres);
    } catch (err) {
        console.error(err)

    }
});

//update add new tag to given questionids
// put: http://localhost:4002/tag/JUNIOR/test/-31-01-2023
router.post('/:inst/:newtag', async (req, res) => {
    try {
        const tagquesres = await addnewtagquestions(req.params.inst, req.params.newtag, req.body.questions);
        res.send(tagquesres);
    }
    catch (err) {
        console.error(err)

    }
});





const getalltagnames = async (inst) => {
    //console.log(questionArray.question_master_id);
    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    let exsits = await modelname.aggregate(
        [
            { "$unwind": "$tag_name" },
            {
                "$group": {
                    "_id": "$tag_name",
                    "questioncount": { "$sum": 1 }

                },
            },
            {
                $project: {
                    tagname: "$_id",
                    noofques: "$questioncount"
                }
            }
        ]
    ).sort({ tagname: 1 })

    if (exsits.length == 0) {

        return { "Status": "tagnames not found", "result": exsits };

    } else {

        return { "Status": "200", "result": exsits };

    }

}


const gettagquestions = async (inst, tagname) => {
    //console.log(questionArray.question_master_id);
    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    let exsits = await modelname.find(
        { "tag_name": { $in: [tagname] } }
    )

    if (exsits.length == 0) {

        return { "Status": tagname + " tag questions not found", "result": exsits };

    } else {

        return { "Status": "200", "tag": tagname, "result": exsits };

    }

}

const getmultitagques = async (inst, tags,subjid) => {
    tagstype = Array.isArray(tags);
    //console.log(tags);
    if (tagstype == true) {
        tags = tags;
    } else {
        tags = tags.split(",");
    }

    //console.log(tags);
    //list = tags.map(s => `"${s}"`).join(', ');
    //console.log(list);
    //list="["+list+"]";
    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    let exsits = await modelname.find(

        { "question_master_subject_id":subjid,"tag_name": { $in: tags } }
    ).sort({"topic_id":-1,"subtopic_id":1,"question_master_type":-1})

    if (exsits.length == 0) {

        return { "Status": tags + " tag questions not found", "result": exsits };

    } else {
        for(var i=0;i<exsits.length;i++){
            //console.log(exsits[i].question_master_id);
            exsits[i].question_master_desc = decode(exsits[i].question_master_desc, { level: 'html5' });
            for(a=0;a<exsits[i].ans.length;a++){
                exsits[i].ans[a].answer_master_desc=decode(exsits[i].ans[a].answer_master_desc, { level: 'html5' });
            }
        }
        return { "Status": "200", "tag": tags, "result": exsits };

    }

}

const updateaddnewtag = async (inst, oldtag, newtag) => {

    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    let exsits = await modelname.updateMany(
        {
            "tag_name": { $in: [oldtag] },
        },
        {
            $push: {
                "tag_name": newtag
            }
        }
    )

    if (exsits.length == 0) {

        return { "Status": "add new tag " + newtag + " questions not found", "result": exsits };

    } else {

        return { "Status": "200", "tag": newtag, "result": exsits };

    }

}

const updatedeletetag = async (inst, tagname) => {

    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    let exsits = await modelname.updateMany(
        {

        },
        { $pull: { tag_name: { $in: [tagname] } } }
    )

    if (exsits.length == 0) {

        return { "Status": tagname + " questions not found", "result": exsits };

    } else {

        return { "Status": "200", "tag": tagname, "result": exsits };

    }

}

const addnewtagquestions = async (inst, newtag, questionArray) => {
    questiontypes = Array.isArray(questionArray);
    // console.log(questiontypes);
    if (questiontypes == true) {
        questionArray = questionArray;
    } else {
        questionArray = questionArray.split(",");
    }

    //console.log(questionArray); return false
    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    let exsits = await modelname.updateMany(
        {
            "question_master_id": { $in: questionArray },
        },
        {
            $push: {
                "tag_name": newtag
            }
        }
    )

    if (exsits.length == 0) {

        return { "Status": "add new tag " + newtag + " selected questions not updated", "result": exsits };

    } else {

        return { "Status": "200", "tag": newtag, "result": exsits };

    }



}

const searchtagname = async (inst, searchtagname) => {

    inst = inst + '_questionbanks'

    const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

    
    const re = new RegExp(searchtagname);
   
    
    let exsits = await modelname.aggregate([
        { $unwind: "$tag_name" },

        {
            "$group": {
                "_id": "$tag_name",
                //"questioncount": { "$sum": 1 }

            },
        },

        {
            $project: {
                tagname: "$_id",
                returnObject: {
                    $regexFind: { input: "$_id", regex: re}
                },
                // noofques: "$questioncount"
            }
        },
        {
            $match: {
                "returnObject": {
                    $exists: true,
                    $ne: null
                }
            }
        },
        { $unset: ["returnObject","_id"] }
    ]).sort({ returnObject: -1 }
    )

     
    if (exsits.length == 0) {

        return { "Status": "search tag " + searchtagname + " selected questions not updated", "result": exsits };

    } else {

        return { "Status": "200", "tag": searchtagname, "result": exsits };

    }



}
module.exports = router