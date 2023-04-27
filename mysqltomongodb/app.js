const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
//const connection = require('./config/JRtouchstone_config');
//const competitiveconnection = require('./config/COMPETITIVEtouchstone_config');
//const degreeconnection = require('./config/Degreetouchstone_config');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
var cors = require('cors');

// Load config
dotenv.config({ path: './config/config.env' })
dotenv.config({ path: './config/competitiveconfig.env' })



connectDB()

const app = express()
app.use(cors({origin: '*'}));
app.use('/', express.static('public'))
app.use(express.json({limit: '1024mb'}));
// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
 
var jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 

// Add headers before the routes are defined
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

 
 
app.set('view engine', '.hbs')

 

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index')) 
app.use('/jrquestionmaster', require('./routes/JRQuestionMaster')) 
app.use('/comptquestionmaster', require('./routes/CompetitiveQuestionMaster'))
app.use('/degreequestionmaster', require('./routes/DegreeQuestionMaster')) 

app.use('/postallques', require('./routes/postallquestions')) 

app.use('/posttopics', require('./routes/posttopics')) 

app.use('/programs', require('./routes/programs')) 


app.use('/videoform', require('./routes/video_form')) 
app.use('/paper', require('./routes/papers')) 
app.use('/paths', require('./routes/getfilepaths')) 


 
 
 


const PORT = process.env.PORT || 3000

const Host=`http://localhost:${PORT}`
app.listen(
  PORT,
  console.log(`Server running in ${Host}`)
)
