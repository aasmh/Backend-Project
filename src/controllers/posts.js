const { json } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dbconnect = require('../config/database');
const res = require('express/lib/response');
const con = dbconnect.connection;
const gets = require('./gets');

//just a comment
//add another comment

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
                throw { message:"Error Inserting into Ports Table, Try Again", status:false , err}
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
                throw { message:"Error Inserting into Countries Table, Try Again", status:false , err }
            }
            else
            {
                res.status(200).send({ message:"Query Executed Correctly", query:true });
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
        const exists = await Ifsqlexists("ship_types","Type_Code",resobj.code);
        
        if(exists){
            throw { message:"That entry already exists in the Database", status:true };
        }

        const sql = `INSERT INTO ship_types (Ship_type_nm,Type_Code) VALUES ('${resobj.name}','${resobj.code}');`;
        con.query(sql, (err, result) => {
            if(err)
            {
                throw { message:"Error Inserting into Ship Types Table, Try Again", status:false , err}
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
        
        const exists = await Ifsqlexists("operations","Operation_Code",resobj.code);
        
        if(exists){
            throw { message:"That entry already exists in the Database", status:true };
        }

        const sql = `INSERT INTO operations (Operation_nm, Operation_Code) VALUES ('${resobj.name}','${resobj.code}');`;
        con.query(sql, (err, result) => {
            if(err)
            {
                throw { message:"Error Inserting into Operation Table, Try Again", status:false , err}
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




module.exports = {  addnewport , addnewcountry , addnewshiptype , addnewoperation , Ifsqlexists};
