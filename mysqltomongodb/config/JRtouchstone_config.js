const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
//console.log(process.env.JRTOUCHSTONE_MYSQL_DB);
//console.log(process.env.TOUCHSTONE_MYSQL_DB);
var connection = mysql.createConnection({
    "host": process.env.JRTOUCHSTONE_MYSQL_HOST,
    "user": process.env.JRTOUCHSTONE_MYSQL_USER,
    "password": process.env.JRTOUCHSTONE_MYSQL_PASS,
    "database": process.env.JRTOUCHSTONE_MYSQL_DB,
    "multipleStatements":true,
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("JUNIOR Touchstone Database Connected");
    }
});
// connection.getConnection((err,connection)=> {
//     if(err)
//     throw err;
//     console.log('Database connected successfully');
//     connection.release();
//   });
module.exports = connection;