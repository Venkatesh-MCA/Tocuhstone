const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ path: './config/degreeconfig.env' })
//console.log(process.env.TOUCHSTONE_MASTER_MYSQL);
//console.log(process.env.TOUCHSTONE_MYSQL_DB);
var degreeconnection = mysql.createConnection({
    "host": process.env.DEGREETOUCHSTONE_MYSQL_HOST,
    "user": process.env.DEGREETOUCHSTONE_MYSQL_USER,
    "password": process.env.DEGREETOUCHSTONE_MYSQL_PASS,
    "database": process.env.DEGREETOUCHSTONE_MYSQL_DB,
});

degreeconnection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("DEGREE Touchstone Database Connected");
    }
});

module.exports = degreeconnection;