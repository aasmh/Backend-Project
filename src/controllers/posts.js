const { json } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dbconnect = require('../config/database');
const res = require('express/lib/response');
const con = dbconnect.connection;
const gets = require('./gets');

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

const ifexists = async ( tablename,columnname, value ) => {
    try {
        return new Promise((resolve , reject)=> {
            const sql = `SELECT * FROM ${tablename} WHERE ${columnname}='${value}'`;
            con.query(sql, (err,result) =>{
                if(err){ 
                    reject(err);
                }
                else
                {
                    if(result[0] === undefined)
                    {
                        resolve( {message:"This Value Does Not Exist!", status:false } );
                    }
                    else
                    {
                        resolve( {message:"This Value Already Exists!", status:true } );
                    }
                }
            })
        });
    } 
    catch (err) {
        return({message:"There was an error processing your request" , status:false});
    }
};

const Ifsqlexists = async (tablename, columnname, value ) => {
    
    try {
        const resp = await ifexists(tablename, columnname, value);
        if(resp.status){
            return true;
        }
        else{
            return false;
        }
    } 
    catch(err){
        return err;
    }
}



const addnewport = async (req, res) => {
    try {

        const resobj = req.body;
        
        if(resobj == undefined){
            throw {message:"Parameter was not received", status:false};
        }

        const exists = await gets.getportcode(resobj.name);
        
        if(exists !== undefined){
            throw { message:"That entry already exists in the Database", status:true };
        }

        const sql = `INSERT INTO ports (Port_Name, Port_Code) VALUES ('${resobj.name}', '${resobj.code}'); `;
        con.query(sql, (err, result) => {
            if(err)
            {
                throw { message:"Error Inserting into the Database, Try Again", status:false }
            }
            else
            {
                res.status(200).send({ message:"Query Executed Correctly", query:true});
            }
        });

    }
    catch (err) {
        res.status(400).send(err);
    }
}

const addnewcountry = async (req, res) => {
    try {
        const resobj = req.body;
        if(resobj == undefined){
            throw {message:"Parameter was not received", status:false};
        }
        const exists = await gets.getcountrycode(resobj.name);
        
        if(exists !== undefined){
            throw { message:"That entry already exists in the Database", status:true };
        }

        const sql = `INSERT INTO countries (Country_Name, Country_Code) VALUES ('${resobj.name}','${resobj.code}');`;
        con.query(sql, (err, result) => {
            if(err)
            {
                throw { message:"Error Inserting into the Database, Try Again", status:false }
            }
            else
            {
                res.status(200).send({ message:"Query Executed Correctly", query:true});
            }
        });
    }
    catch (err) 
    {
        res.status(400).send(err);
    }
}
const addnewshiptype = async (req, res) => {
    try {
        const resobj = req.body;
        if(resobj == undefined){
            throw {message:"Parameter was not received", status:false};
        }
        const exists = await gets.getcountrycode(resobj.name);
        
        if(exists !== undefined){
            throw { message:"That entry already exists in the Database", status:true };
        }

        const sql = `INSERT INTO countries (Country_Name, Country_Code) VALUES ('${resobj.name}','${resobj.code}');`;
        con.query(sql, (err, result) => {
            if(err)
            {
                throw { message:"Error Inserting into the Database, Try Again", status:false }
            }
            else
            {
                res.status(200).send({ message:"Query Executed Correctly", query:true});
            }
        });
    }
    catch (err) 
    {
        res.status(400).send(err);
    }
}
const addnewoperation = async (req, res) => {
    try {
        const resobj = req.body;
        if(resobj == undefined){
            throw {message:"Parameter was not received", status:false};
        }
        const exists = await Ifsqlexists();
        
        if(exists !== undefined){
            throw { message:"That entry already exists in the Database", status:true };
        }

        const sql = `INSERT INTO operations (OP_Name, OP_Code) VALUES ('${resobj.name}','${resobj.code}');`;
        con.query(sql, (err, result) => {
            if(err)
            {
                throw { message:"Error Inserting into the Database, Try Again", status:false }
            }
            else
            {
                res.status(200).send({ message:"Query Executed Correctly", query:true});
            }
        });
    }
    catch (err) 
    {
        res.status(400).send(err);
    }
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