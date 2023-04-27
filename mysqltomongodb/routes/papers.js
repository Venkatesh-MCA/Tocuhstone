const express = require('express')
const mongoose = require('mongoose')
const router = express.Router() 
const { encode, decode } = require('html-entities');
const papers= require('../models/papers');

//Get question
router.get('/:papercode', async (req, res) => {

    var paper = await papers.find({"papercode":req.params.papercode});
    res.send(paper)
});


router.get('/:papercode/:subject',async (req,res)=>{
    var paperres= await papers.aggregate( [
        {
             '$unwind': {
               'path': '$question_paper'
             },
         },
      {
         '$match': {
           'papercode': req.params.papercode,
           "question_paper.subject_master_name":req.params.subject
         }
      },
      
       {
     '$project': {
       'Questionorder': '$question_paper.Questionorder',
       'question_master_id':'$question_paper.question_master_id',
       'topic_master_name':'$question_paper.topic_master_name',
       'subject':'$question_paper.subject_master_name',
       'starttime':'',
       'endtime':'',
       'outputfiename':'',
       'rawvideofilename':'',
       'starttime_old':'',
       'endtime_old':'',
       'papercode':'$papercode',
       'status_code':'',
       'processstatus':''
     }
   }
     ]);
     res.send(paperres)
})
module.exports = router