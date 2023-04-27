const express = require('express')
const router = express.Router() 
const { readdir } = require('fs/promises');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv')

//Get question
router.get('/', async (req, res) => {
    console.log(process.env.videofilepath);
    //dirpath="http://10.60.1.22/~venki/valt/";
    dirpath=process.env.videofilepath;
    //const filename = path.basename('/routes') 
    //console.log(filename);
    ext='js';
    // fs.readdir(dirpath,(err,files)=>{
    //     files.forEach((element) => {
    //         console.log(element)
    //     });
    // })

    const matchedFiles = [];

    const files = await readdir(dirpath);

    for (const file of files) {
        // Method 1:
        const fileExt = path.extname(file);

        if (fileExt === `.${ext}`) {
            matchedFiles.push(file);
        }
    }
    res.send(matchedFiles);
});
module.exports = router