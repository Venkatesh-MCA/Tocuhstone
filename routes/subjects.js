const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//Get questionst
router.get('/:inst', async (req, res) => {
    try {
        const subjectres = await getallsubjects(req.params.inst);
        res.send(subjectres);
    } catch (err) {
        console.error(err)

    }
});



const getallsubjects = async (inst) => {
    //console.log(questionArray.question_master_id);
    inst = inst + '_subjects'

    const modelname = mongoose.model(inst, require('../models/topics'));

    let exsits = await modelname.find({}).sort({ "subject_master_id": 1 })

    if (exsits.length == 0) {

        return { "Status": "Subject nof found", "result": exsits };

    } else {

        return { "Status": "200", "result": exsits };

    }

}

module.exports = router