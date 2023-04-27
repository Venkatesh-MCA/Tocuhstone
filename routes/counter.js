const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()


//Get questionst
module.exports = function () {
    this.auto_id = async (inst, paramtype) => {
        try {
            inst = inst + '_cnts'

            const modelname = mongoose.model(inst, require('../models/counterschema'));
            const autoincid = await modelname.findOneAndUpdate(
                { idname: paramtype },
                { $inc: { seq: 1 } },
                { upsert: true, new: true, setDefaultsOnInsert: true }
                // , (err, cd) => {
                //     console.log(cd);
                //    if (cd == null) {
                //        const newrval = new modelname({ "id": paramtype, "seq": 1 })
                //        newrval.save()
                //         seqId = 1;
                //     } else {
                //        seqId = cd.seq
                //     }
                // }
            )
            return autoincid.seq;
            // res.send(seqId);
        } catch (err) {
            console.error(err)

        }
    }
}

//module.exports = router