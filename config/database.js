const express = require('express');
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
        console.log('Connected to Mysql DB');
    } catch (error) {
        console.log(error);
    }
}



module.exports = {connection , connectDB };