const mysqlc = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ path: './config/competitiveconfig.env' })
//console.log(process.env.COMPETITIVETOUCHSTONE_MYSQL_DB);

var comptconnection = mysqlc.createConnection({
    "host": process.env.COMPETITIVETOUCHSTONE_MYSQL_HOST,
    "user": process.env.COMPETITIVETOUCHSTONE_MYSQL_USER,
    "password": process.env.COMPETITIVETOUCHSTONE_MYSQL_PASS,
    "database": process.env.COMPETITIVETOUCHSTONE_MYSQL_DB,
    "multipleStatements":true
});

comptconnection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("COMPETITIVE Touchstone Database Connected");
    }
});

module.exports = comptconnection;