const { json } = require('express');
const express = require('express');
const mysql = require('mysql2');
const dbconnect = require('../config/database');
const con = dbconnect.connection;

const addnewagent = async (req,res) => {
    try 
    {
        const obj = req.body;
        if(obj.Perm_No === undefined)
        {
            throw {message:"Permission Number was not entered", status:false}
        }
        
        if(obj.Perm_dt_st === undefined)
        {
            throw {message:"Permission date start was not entered", status:false};
        }
        
        if(obj.Perm_dt_end === undefined)
        {
            throw {message:"Permission data end was not entered", status:false};
        }

        if(obj.email === undefined)
        {
            throw {message:"Email was not entered", status:false};
        }
        
        if(obj.Telephone === undefined)
        {
            throw {message:"Telephone Number was not entered", status:false};
        }
        
        if(obj.Address === undefined)
        {
            throw {message:"Address was not entered", status:false};
        }

        if(obj.Agent_Name === undefined)
        {
            throw {message:"Agent Name was not entered", status:false};
        }

        

    } 
    catch(err) 
    {
        res.status(400).send(err);
    }
}


module.exports = { addnewagent };