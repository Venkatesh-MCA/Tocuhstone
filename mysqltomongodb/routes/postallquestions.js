const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const connection = require('../config/JRtouchstone_config');
 
router.get('/:inst', async (req, res) => {
    try {
        //var Getques = "select question_master_id from question_master order by question_master_id limit 5000 ";
        //5136
        //5146
        //question_master_id>5146
        //var Getques = "select question_master_id from question_master  where question_master_id>325516 order by question_master_id";
        var Getques = "select question_id from question_tag where tag_name in  ('PEP-JEEMAIN-2023-01-24-FN','PEP-JEEMAIN-2023-01-24-AN','PEP-JEEMAIN-2023-01-25-FN','PEP-JEEMAIN-2023-01-25-AN','PEP-JEEMAIN-2023-01-29-FN','PEP-JEEMAIN-2023-01-29-AN','PEP-JEEMAIN-2023-01-30-FN','PEP-JEEMAIN-2023-01-30-AN','PEP-JEEMAIN-2023-01-31-FN','PEP-JEEMAIN-2023-01-31-AN','PEP-JEEMAIN-2023-02-01-FN','PEP-JEEMAIN-2023-02-01-AN')";
        
        //console.log(Getques); return false;
        var qids=[];
        connection.query(Getques, function (err, result) {
            if (result == '') {
                console.log('No questions found');
                res.send({
                    status: 'No Questions found'
                })
                return false;
            }
            if (err) {
                console.log(err);
                // res.send("Unbale to get the students details ");
            }
            qids= result.map(a => a.question_id);


            res.send(qids);
        })

    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
});

module.exports = router

 
