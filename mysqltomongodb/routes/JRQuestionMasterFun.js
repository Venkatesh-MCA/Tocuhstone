const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const connection = require('../config/JRtouchstone_config');
const { encode, decode } = require('html-entities');

module.exports = function () {
    this.fetchquesdetails = async (inst, questionid) => {
        //console.log(connection)
        try {
            let qdetails = await questiondetails(questionid);
            let ans = await questionans(questionid);
            let questionprogram = await question_program(questionid);
            let questiontag = await question_tag(questionid);
            let questionsubtopic = await question_subtopic(questionid);
            let questionvideos = await question_videos(questionid);
            var tags = []; var programs = []; var videores = [];

            if(questionsubtopic.length==0){
                    quessubtopic_master_id='';
                    quesubtopic_master_name='';
            }else{
                quessubtopic_master_id=questionsubtopic[0].subtopic_master_id;
                quesubtopic_master_name=questionsubtopic[0].subtopic_master_name;
            }
            

            for (var i = 0; i < questiontag.length; i++) {
                tags.push(questiontag[i].tag_name);
            }
            for (var p = 0; p < questionprogram.length; p++) {
                programs[p] = {
                    "program_master_id": questionprogram[p].program_master_id,
                    "program_master_name": questionprogram[p].program_master_name
                };
            }
            for (var v = 0; v < questionvideos.length; v++) {
                videores[v] = {
                    "sourcepath": questionvideos[v].sourcepath,
                    "url": questionvideos[v].url,
                    "created": questionvideos[v].created,
                };
            }

            for (var a = 0; a < ans.length; a++) {
                ans[a].answer_master_desc = decode(ans[a].answer_master_desc, { level: 'html5' });
                // ans[a].answer_master_desc = ans[a].answer_master_desc.replace('/width:\/g', "width:");                     
            }
            //details[0].question_master_desc =qdetails[0].question_master_desc.replace(new RegExp('&quot;', "g"), "");
            // qdetails[0].question_master_desc=html_entity_decode(qdetails[0].question_master_desc);        
            qdetails[0].question_master_desc = decode(qdetails[0].question_master_desc, { level: 'html5' });
            //console.log(qdetails[0].question_master_desc);
            qdetails[0].question_master_hints = decode(qdetails[0].question_master_hints, { level: 'html5' });
            // qdetails[0].question_master_hints =qdetails[0].question_master_hints.replace(new RegExp('&quot;', "g"), "");
            var qobj = {
                "question_master_id": qdetails[0].question_master_id,
                "question_master_desc": qdetails[0].question_master_desc,
                "ans": ans,
                "question_master_type": qdetails[0].question_master_type,
                "question_master_type_name": qdetails[0].question_type_name,
                "question_master_type_code": qdetails[0].type_code,
                "question_master_level_id": qdetails[0].question_master_level_id,
                "question_master_level_name": qdetails[0].question_level_name,
                "question_master_subject_id": qdetails[0].question_master_subject_id,
                "subject_master_name": qdetails[0].subject_master_name,
                "topic_id": qdetails[0].topic_id,
                "topic_master_name": qdetails[0].topic_master_name,
                "subtopic_id": quessubtopic_master_id,
                "subtopic_master_name":quesubtopic_master_name,
                "question_master_hint": qdetails[0].question_master_hints,
                "user_id": qdetails[0].user_id,
                "ques_created": qdetails[0].created_date,
                "ques_update": qdetails[0].update_date,
                "program": programs,
                "tag_name": tags,
                "videos": videores

            };
            //console.log(qobj);
            //let resp = await insertdata('degree', qobj);
            //res.send(resp);
            // res.send(qobj);

            return qobj;
            
        } catch (err) {
            //console.error(err)
            return err;
            // res.render('error/500')
        }
    }
}


const questiondetails = async (qid) => {

    //quesArray="309949,309951,309955,309958,309964";
    return new Promise((resolve, reject) => {
        let sqlqry = "select qm.*,sm.subject_master_name, qtp.question_type_name,qtp.type_code,ql.question_level_name,ql.question_level_code,tm.topic_master_name,tm.topic_master_id as topic_id 	from question_master qm left join subject_master sm on qm.question_master_subject_id=sm.subject_master_id left join question_type qtp on qm.question_master_type=qtp.question_type_id left join question_level ql on qm.question_master_level_id=ql.question_level_id left join question_topic qtpc on qm.question_master_id=qtpc.question_id   left join topic_master tm on qtpc.topic_id=tm.topic_master_id where qm.question_master_id=" + qid + "";
        //console.log(sqlqry);
        connection.query(sqlqry, (error, elements) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(elements);
            }
            

        });

    });

}


const questionans = async (qid) => {

    //quesArray="309949,309951,309955,309958,309964";
    return new Promise((resolve, reject) => {
        let sqlqry = "select * from answer_master where answer_master_question_id=" + qid + " order by answer_master_id";
        //console.log(sqlqry);
        connection.query(sqlqry, (error, elements) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(elements);
            }
        });

    });

}


const question_program = async (qid) => {

    //quesArray="309949,309951,309955,309958,309964";
    return new Promise((resolve, reject) => {
        let sqlqry = "select program_master_id,program_master_name from question_program,program_master  where question_program.program_id=program_master.program_master_id and question_id=" + qid + "";
        //console.log(sqlqry);
        connection.query(sqlqry, (error, elements) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(elements);
            }
        });

    });

}


const question_tag = async (qid) => {

    //quesArray="309949,309951,309955,309958,309964";
    return new Promise((resolve, reject) => {
        let sqlqry = "select question_id,tag_name from question_tag where question_id=" + qid + "";
        //console.log(sqlqry);
        connection.query(sqlqry, (error, elements) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(elements);
            }
        });

    });

}


const question_subtopic = async (qid) => {

    //quesArray="309949,309951,309955,309958,309964";
    return new Promise((resolve, reject) => {
        let sqlqry = "select question_id,subtopic_master_id,subtopic_master_name from question_subtopic,subtopic_master where question_subtopic.subtopic_id=subtopic_master.subtopic_master_id and question_id=" + qid + "";
        //console.log(sqlqry);
        connection.query(sqlqry, (error, elements) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(elements);
            }
        });

    });

}



const question_videos = async (qid) => {

    //quesArray="309949,309951,309955,309958,309964";
    return new Promise((resolve, reject) => {
        let sqlqry = "select * from videos where qid=" + qid + "";
        //console.log(sqlqry);
        connection.query(sqlqry, (error, elements) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(elements);
            }
        });
        
    });

}

//sql functions
function escapeHtml(text) {
    return text
        .replace(/&amp;/g, "g")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

function html_entity_decode(message) {
    return message.replace(/[<>'"]/g, function (m) {
        return '&' + {
            '\'': 'apos',
            '"': 'quot',
            '&': 'amp',
            '<': 'lt',
            '>': 'gt',
        }[m] + ';';
    });
}
