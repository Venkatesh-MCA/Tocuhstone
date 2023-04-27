const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const connection = require('../config/Degreetouchstone_config');
const getUniqeElements = require('./math');

router.get('/:inst/sadasdasdasd/asdasdasd/asdasdasdasd/assdasd', async (req, res) => {
    try {
        //var Gettopics = "select subject_id,subject_master_name,topic_master_id,topic_master_name,subtopic_master_id,subtopic_master_name from subject_topic,topic_master,subject_master,subtopic_master,topic_subtopic where subject_topic.topic_id=topic_master_id and subject_master.subject_master_id=subject_topic.subject_id  and  topic_subtopic.topic_id=topic_master.topic_master_id and         topic_subtopic.subtopic_id=subtopic_master.subtopic_master_id  and  subject_id in (1,2)  order by subject_id,topic_master_name";
        var Gettopics = "select subject_id,subject_master_name,topic_master_id,topic_master_name from subject_topic,topic_master,subject_master where subject_topic.topic_id=topic_master_id and subject_master.subject_master_id=subject_topic.subject_id and subject_id in (1,2) order by subject_id,topic_master_name";
        //console.log(Getques); return false;
        // var qids=[];
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
            //  qids= result.map(a => a.question_master_id);
            var subtopics = []; var topicids = []; var resp = []; var obj = []; var test=[];
            let unisubs = await getUniqeElements(result, 'subject_master_name');
            let unitopics=await getUniqeElements(result,'topic_master_id');
            //console.log(unisubs.length);
            //console.log(unitopics);

            for (var s = 0; s < unisubs.length; s++) {
              //console.log(unisubs[s])
                
                obj[s]=result.filter(e=>e.subject_master_name==unisubs[s])
                topicids[s]=obj[s].map(a => a.topic_master_id)
                resp[s]=await getsubtopics(topicids[s])
                //console.log(obj[s].length);
                //subject_id,subject_master_name,topic_master_id,topic_master_name
                for(var t=0;t<obj[s].length;t++){
                    //console.log(obj[s][t].topic_master_id)
                    obj[s][t].subtopics=resp[s].filter(h=>h.topic_master_id==obj[s][t].topic_master_id);
                   // console.log(obj[s][t].topic_master_id)    
                }
                
               
                 
                 


            }

            res.send(obj);
        })

    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
});

router.get('/:inst', async (req, res) => {
    try {
        var Gettopics = "select subject_id,subject_master_name,topic_master_id,topic_master_name,subtopic_master_id,subtopic_master_name from subject_topic,topic_master,subject_master,subtopic_master,topic_subtopic where subject_topic.topic_id=topic_master_id and subject_master.subject_master_id=subject_topic.subject_id  and  topic_subtopic.topic_id=topic_master.topic_master_id and         topic_subtopic.subtopic_id=subtopic_master.subtopic_master_id  order by subject_id,topic_master_name";
         var qcntresp=[];
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
const getsubtopics = async (qids) => {

    //quesArray="309949,309951,309955,309958,309964";
    return new Promise((resolve, reject) => {
        let sqlqry = "select topic_master_id,topic_master_name,subtopic_master_id,subtopic_master_name from subject_topic,topic_master,subject_master,subtopic_master,topic_subtopic where subject_topic.topic_id=topic_master_id and subject_master.subject_master_id=subject_topic.subject_id  and  topic_subtopic.topic_id=topic_master.topic_master_id and         topic_subtopic.subtopic_id=subtopic_master.subtopic_master_id   and topic_master_id in ("+qids+") order by subject_id,topic_master_name";
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
 
module.exports = router


