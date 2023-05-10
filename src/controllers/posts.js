const { json } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dbconnect = require('../config/database');
const res = require('express/lib/response');
const con = dbconnect.connection;

const checkexistsagents = async (Pk) => {
    return new Promise((resolve , reject)=> {
        const ssql = `SELECT Agent_Code FROM agents WHERE Perm_No='${Pk}'`;
        con.query(ssql, (err,result) =>{
            if(err){ 
                reject(err);
            }
            else
            {
                if(result[0] === undefined)
                {
                    resolve( {message:"This Agent Does Not Exist!", status:false } );
                }
                else
                {
                    resolve( {message:"This Agent Already Exists!", status:true } );
                }
            }
        })
    });
    
}

const addnewagent = async (req,res) => {
    try 
    {
        const obj = req.body;
        // if(obj.Perm_No === undefined)
        // {
        //     throw {message:"Permission Number was not entered", status:false}
        // }
        
        // if(obj.Perm_dt_st === undefined)
        // {
        //     throw {message:"Permission date start was not entered", status:false};
        // }
        
        // if(obj.Perm_dt_end === undefined)
        // {
        //     throw {message:"Permission data end was not entered", status:false};
        // }

        // if(obj.email === undefined)
        // {
        //     throw {message:"Email was not entered", status:false};
        // }
        
        // if(obj.Telephone === undefined)
        // {
        //     throw {message:"Telephone Number was not entered", status:false};
        // }
        
        // if(obj.Address === undefined)
        // {
        //     throw {message:"Address was not entered", status:false};
        // }

        // if(obj.Agent_Name === undefined)
        // {
        //     throw {message:"Agent Name was not entered", status:false};
        // }
        const exist = await checkexistsagents(obj.Perm_No);

        // const isql = "INSERT INTO agents (`Perm_No`";
        // con.query(isql, (err, result) =>{
        //     if(err)
        //     {
        //         console.log(err);
        //     }
        //     else
        //     {
        //         console.log
        //     }
        // });
        

        res.status(201).send(exist.status);

    } 
    catch(err) 
    {
        res.status(400).send(err);
    }
}


module.exports = { addnewagent , checkexistsagents };