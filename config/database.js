const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'192.168.1.2',
    user:'abdo',
    password:'moha',
    database:'orcl'
});

const connectDB =() =>{
    try {
        connection.connect();
        console.log('Connected to Mysql DB');
    } catch (error) {
        console.log(error);
    }
}



module.exports = {connection , connectDB };