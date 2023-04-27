const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
require("./papercode_fun")();

//create paper with papercode generator
// router.post('/:inst', async (req, res) => {
//     try{

//         let nwwpaper=await generatepaper(req.params.inst,req.body.qids,req.body.schema,req.body.branch,req.body.userid);
//         res.send(nwwpaper);
//       } catch (err) {
//         console.error(err)

//     }
// })

const generatepaper = async (inst, reqArray) => {

    try {
        inst = inst + '_questionbanks'

        const modelname = mongoose.model(inst, require('../models/QuestionMaster'));

        let exsits = await modelname.find({
            "question_master_id": { $in: reqArray.qids  }
        }, { program:0,tag_name:0,videos: 0, ipdatedAt: 0, user_id: 0, ques_update: 0, ques_created: 0, createdAt: 0, __v: 0, updatedAt: 0, _id: 0 });


        if (exsits.length == 0) {

            res.send({ "Status": "questions not found", "result": exsits });

        } else {

            for (var q = 0; q < exsits.length; q++) {
                exsits[q].studentans = "";
                exsits[q].Questionorder = q;
                for (a = 0; a < exsits[q].ans.length; a++) {
                    exsits[q].ans[a].isanswered = 0;
                    exsits[q].ans[a].chk = false;
                }
            }


            //papercode generate start
            let papercode_gen_res = await getpapercode();
            //if papercode created then
            if (papercode_gen_res.Message == 'Success') {

                var fianlpaperobj = {
                    "papercode": papercode_gen_res.Data.Datetimestring,
                    "question_paper": exsits,
                    "schema": reqArray.schema,
                    "branch": reqArray.branch,
                    "userid": reqArray.userid,
                    "program":reqArray.program,
                    "tagname":reqArray.tagname,

                }

            }

            return fianlpaperobj;
            // res.send(fianlpaperobj);

        }

    } catch (err) {
        console.error(err)

    }

}
//module.exports = router;
module.exports = generatepaper;


