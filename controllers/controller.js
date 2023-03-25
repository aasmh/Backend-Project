const { json } = require('express');
const express = require('express');
const mysql = require('mysql2');
const dbconnect = require('../config/database');
const con = dbconnect.connection;

const getcountrycode = async (name) => {
    return new Promise((resolve , reject)=> {
        var sql = `SELECT Country_code FROM countries WHERE Country_name='${name}';`;
        con.query(sql, (err,result) =>{
            if(err){ 
                reject(err);
            }
            else{
                resolve(result[0].Country_code);
            }
        })
    });
}

const getportcode = async (name) => {
    return new Promise((resolve , reject)=> {
        var sql = `SELECT Port_Code FROM countries WHERE Port_Name='${name}';`;
        con.query(sql, (err,result) =>{
            if(err){ 
                reject(err);
            }
            else{
                resolve(result[0].Port_Code);
            }
        })
    });
}



const usergetid = async (req, res) => {
    var sqlj = "SELECT JobID FROM job WHERE Jobname=?;";
    

    const jobtype = ['Computer Science'];
    con.query(sqlj,jobtype,(err, result) =>{
        if(err){
            throw err
        }
        console.log(result);
        console.log(result[0].JobID);
        res.status(200).send(result);
    })
};

const gettable = async (req, res) => {
    var sql = "SELECT `Route#`,`ShipName`,`IMO`, `Nationality`,`ShipType`, `Agent`,`Route#`, `Actualarrival`,`Est.Departdate`, `OpType`, `Items`  FROM testtable ";

    con.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        res.status(200).send(result);
    });
};

module.exports = { usergetid , gettable , getcountrycode };