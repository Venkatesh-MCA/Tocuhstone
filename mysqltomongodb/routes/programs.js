const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const connection = require('../config/Degreetouchstone_config');
const getUniqeElements = require('./math');
 
router.get('/:inst', async (req, res) => {
    try {
        var Gettopics = "select program_master_id,program_master_name from program_master";
        
        connection.query(Gettopics, async function (err, result) {
            if (result == '') {
                console.log('No topics found');
                res.send({
                    status: 'No topics found'
                })
                return false;
            }
            if (err) {
                console.log(err);

            }
            res.send(result);
        })

    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
}); 
router.get('/:inst/:levels', async (req, res) => {
    try {
        if(req.params.levels=='levels'){
        var Gettopics = "select * from question_level";
        }else  if(req.params.levels=='qtype'){
            var Gettopics = "select * from question_type";
        }
    else  if(req.params.levels=='subjects'){
        var Gettopics = "select subject_master_id,subject_master_name,subject_master_eabled,sub_order from subject_master";
    }
        connection.query(Gettopics, async function (err, result) {
            if (result == '') {
                console.log('No topics found');
                res.send({
                    status: 'No topics found'
                })
                return false;
            }
            if (err) {
                console.log(err);

            }
            res.send(result);
        })

    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
}); 
module.exports = router


