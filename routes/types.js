const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//Get questionst
router.get('/:inst', async (req, res) => {
    try {
        const questiontyperes = await getalltypes(req.params.inst);
        res.send(questiontyperes);
    } catch (err) {
        console.error(err)

    }
});



const getalltypes = async (inst) => {
    //console.log(questionArray.question_master_id);
    inst = inst + '_quuestiontypes'

    const modelname = mongoose.model(inst, require('../models/types'));

    let exsits = await modelname.find({}).sort({ "question_type_id": 1 })

    if (exsits.length == 0) {

        return { "Status": "question types not found", "result": exsits };

    } else {

        return { "Status": "200", "result": exsits };

    }

}

module.exports = router