const express = require('express');
const mysql = require('mysql2');
const app = express();

//Importing Routes
const Routes = require('./routes/routes'); 

//Connecting to Mysql DB
const dbconnect = require('./config/database');
const con = dbconnect.connection;
dbconnect.connectDB();

app.use(express.json());

//Set Server Port
app.listen(3000);



//Routes Activation
app.use('/api/', Routes);





