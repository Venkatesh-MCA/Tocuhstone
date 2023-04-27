const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const generatepaper = require('./papersetter');

//get papers
router.get('/:inst', async (req, res) => {
    try {
            let papers=await getpapers(req.params.inst)
            res.send(papers);
    } catch (err) {
        console.error(err)

    }
});

router.post('/:inst', async (req, res) => {

    try {

        let nwwpaper = await generatepaper(req.params.inst, req.body);
        //res.send(nwwpaper);
        let createdpaper_res = await creatnwapaper(req.params.inst,nwwpaper)

        res.send({"Message":"Success","Data":createdpaper_res});

    } catch (err) {
        console.error(err)

    }
    //res.send(nwwpaper);
    

});


const creatnwapaper = async (inst, pareArray) => {

    inst = inst + '_papers'

    const modelname = mongoose.model(inst, require('../models/papers'));

    var paper_res = await modelname.create(pareArray)

    return { "Paper Status": "paper createdd successfully !", "result": paper_res };
}

const getpapers = async (inst) => {

    inst = inst + '_papers'

    const modelname = mongoose.model(inst, require('../models/papers'));

    var paper_res = await modelname.find({})

    return { "Papers": "Retrieve papers "+paper_res.length, "result": paper_res };
}
module.exports = router