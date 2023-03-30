const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'192.168.1.2',
    port:3306,
    user:'abdo',
    password:'moha',
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