const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { encode, decode } = require('html-entities');
const videoform = require('../models/VideoForm');


router.get('/:inst/:papercode/:subject', async (req, res) => {

    let formres = await videoform.find({ "inst": req.params.inst, "papercode": req.params.papercode, "subject": req.params.subject });



    if (formres.length == 0) {
        res.send({ "Status": "204", "result": formres });
    } else {
        res.send({ "Status": "200", "result": formres });
    }

});


//update or insert details array based on params
router.post('/:inst/:papercode/:subject', async (req, res) => {

    const filter = { "inst": req.params.inst, "papercode": req.params.papercode, "subject": req.params.subject };

    let exists = await videoform.find(filter);
    //console.log(exists.length);
    //return false;
    if (exists.length == 0) {

        var formres = await videoform.create(req.body)

        res.send({ "Record Status": "Inserted", "result": formres });

    } else {

        update = req.body;

        let formres = await videoform.findOneAndUpdate(filter, update);

        res.send({ "Record Status": "updated", "result": formres });

    }

});


//update each question in details array
router.put('/:inst/:papercode/:subject', async (req, res) => {
    try {
        let exsits = await videoform.find({
            "inst": req.params.inst,
            "papercode": req.params.papercode,
            "subject": req.params.subject,
            "details": {
                "$elemMatch": {
                    "question_master_id": req.body.question_master_id
                }
            },
        }).lean()
       // console.log(req.body); return false;
        if (!exsits) {
            return res.send('error/404')
        }

        // if (exsits[0].question_master_id != req.body.question_master_id) {
        //     res.send('question id doesnot match')
        // } else {


            const obj = {
                $set: {
                    'details.$.status_code': req.body.status_code,
                    'details.$.processstatus': req.body.processstatus,
                    
                }
            };


            record = await videoform.findOneAndUpdate({
                "inst": req.params.inst,
                "papercode": req.params.papercode,
                "subject": req.params.subject,
                "details": {
                    "$elemMatch": {
                        "question_master_id": req.body.question_master_id
                    }
                },
            }, obj, {
                upsert: true,
                //runValidators: true,
            })

            res.send(record)
        //}
    } catch (err) {
        console.error(err)
        //res.render('error/404')
    }
});
module.exports = router