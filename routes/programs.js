const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//Get questionst
router.get('/:inst', async (req, res) => {
    try {
        const programres = await getallprograms(req.params.inst);
        res.send(programres);
    } catch (err) {
        console.error(err)

    }
});



const getallprograms = async (inst) => {
    //console.log(questionArray.question_master_id);
    inst = inst + '_programs'

    const modelname = mongoose.model(inst, require('../models/programs'));

    let exsits = await modelname.find({}).sort({ "program_master_id": 1 })

    if (exsits.length == 0) {

        return { "Status": "programs not found", "result": exsits };

    } else {

        return { "Status": "200", "result": exsits };

    }

}

module.exports = router