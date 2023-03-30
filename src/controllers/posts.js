const { json } = require('express');
const express = require('express');
const mysql = require('mysql2');
const dbconnect = require('../config/database');
const con = dbconnect.connection;

const addnewagent = async (req,res) => {
    try 
    {
       console.log("wslt");
        const obj = req.body;
       console.log(obj);
       res.status(200).send(obj);
        
    } 
    catch(err) 
    {
        res.status(404).send("Error");
    }
}

module.exports = { addnewagent };