const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'admin',
    password:'admin',
    database:'orcl'
});

const connectDB =() =>{
    try {
        connection.connect();
        // console.log('Connected to Mysql DB');
        return 1;
    } catch (error) {
        // console.log(error);
        return 0;
    }
}



module.exports = {connection , connectDB };