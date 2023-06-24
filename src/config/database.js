const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'ap-project-do-user-13215137-0.b.db.ondigitalocean.com',
    port:25060,
    user:'abdo',
    password:'AVNS_jTBzev2csl3OXGvGZoN',
    database:'orcl-backup'
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