const { json } = require('express');
const express = require('express');
const mysql = require('mysql2');
const dbconnect = require('../config/database');
const con = dbconnect.connection;



const checkdatabase = async(req, res) => {
    try{
        if(dbconnect.connectDB()){
            res.status(200).send({ message:"Database is up and running", status:true });
        }
        else{
            res.status(500).send({ message:"Database is Down", status:false });
        }
    }
    catch{
        res.status(500).send({message:"There was an error processing this request", status:false});
    }
}

const getcountrycode = async (name) => {
    return new Promise((resolve , reject)=> {
        var sql = `SELECT Country_code FROM countries WHERE Country_name='${name}';`;
        con.query(sql, (err,result) =>{
            if(err){ 
                reject(err);
            }
            else
            {
                if(result[0] === undefined)
                {
                    resolve(result[0]);
                }
                else
                {
                resolve(result[0].Country_code);
                }
            }
        })
    });
}

const fetchcountrycode = async (req, res) =>{
    try
    {
        if(req.query.name == undefined){
            throw {message:"Name parameter was not received", query:false};
        }
        const name = req.query.name;
        const cname = await getcountrycode(name);
        if(cname === undefined){
            throw {message:"That entry does not exist in the Database", query:false};
        }
        else{
            res.status(200).send({ message:"Query Exceuted Correctly", Country_Code:cname , query:true});
        }
    }
    catch(err)
    {
        res.status(404).send(err);
    }
}

const getportcode = async (name) => {
    return new Promise((resolve , reject)=> {
        var sql = `SELECT Port_Code FROM ports WHERE Port_Name='${name}';`;
        con.query(sql, (err,result) =>{
            if(err){ 
                reject(err);
            }
            else
            {
                if(result[0] === undefined)
                {
                    resolve(result[0]);
                }
                else
                {
                resolve(result[0].Port_Code);
                }
            }
        })
    });
}


const fetchportcode = async (req, res) =>{
    try
    {
        if(req.query.name == undefined){
            throw {message:"Name parameter was not received", query:false};
        }
        const name = req.query.name;
        const pname = await getportcode(name);
        if(pname === undefined ){
            throw {message:"That entry does not exist in the Database", query:false};
        }
        else{
            res.status(200).send({ message:"Query Executed Correctly", Port_Code:pname , query:true});
        }
    }
    catch(err)
    {
        res.status(404).send(err);
    }
}

const getallcountries = async () => {
    return new Promise((resolve , reject)=> {
        var sql = `SELECT * FROM countries;`;
        con.query(sql, (err,result) =>{
            if(err){ 
                reject(err);
            }
            else
            {
                if(result[0] === undefined)
                {
                    resolve(result[0]);
                }
                else
                {
                resolve(result);
                }
            }
        })
    });
}

const fetchallcountries = async (req, res) => {
    try{
        const cbfun = await getallcountries();
        if(cbfun === undefined){
            throw {message:"There was an error retrieving the query", query:false};
        }
        else
        {
            res.status(200).send({ message:"Query Executed Correctly", query:true, allentries:cbfun});
        }
    }
    catch(err) 
    {
        res.status(500).send(err);
    }
}

const getallports = async (limit = 0) => {
    return new Promise((resolve , reject)=> {
        if(!limit){
            var sql = `SELECT * FROM ports;`;    
        }else
        {
            var sql = `SELECT * FROM ports LIMIT ${limit};`;
        }
        con.query(sql, (err,result) =>{
            if(err)
            { 
                reject(err);
            }
            else
            {
                if(result[0] === undefined)
                {
                    resolve(result[0]);
                }
                else
                {
                resolve(result);
                }
            }
        })
    });
}

const fetchallports = async (req, res) => {
    try{
        const lm = req.query.limit;
        const cbfun = await getallports(lm);
        if(cbfun === undefined){
            throw {message:"There was an error retrieving the query", query:false};
        }
        else
        {
            res.status(200).send({ message:"Query Executed Correctly", query:true, allentries:cbfun});
        }
    }
    catch(err) 
    {
        res.status(500).send(err);
    }
}

const getallagents = async () => {
    return new Promise((resolve , reject)=> {
        var sql = `SELECT * FROM agents;`;
        con.query(sql, (err,result) =>{
            if(err){ 
                reject(err);
            }
            else
            {
                if(result[0] === undefined)
                {
                    resolve(result[0]);
                }
                else
                {
                resolve(result);
                }
            }
        })
    });
}

const fetchallagents = async (req, res) => {
    try{
        const cbfun = await getallagents();
        if(cbfun === undefined){
            throw {message:"There was an error retrieving the query", query:false};
        }
        else
        {
            res.status(200).send({ message:"Query Executed Correctly", query:true, allentries:cbfun});
        }
    }
    catch(err) 
    {
        res.status(500).send(err);
    }
}

const getshipdesc = async () => {
    return new Promise((resolve , reject)=> {
        var sql = `SELECT * FROM ship_description;`;
        con.query(sql, (err,result) =>{
            if(err){ 
                reject(err);
            }
            else
            {
                if(result[0] === undefined)
                {
                    resolve(result[0]);
                }
                else
                {
                resolve(result);
                }
            }
        })
    });
}

const fetchshipdesc = async (req, res) => {
    try{
        const cbfun = await getshipdesc();
        if(cbfun === undefined){
            throw {message:"There was an error retrieving the query", query:false};
        }
        else
        {
            res.status(200).send({ message:"Query Executed Correctly", query:true, allentries:cbfun});
        }
    }
    catch(err) 
    {
        res.status(500).send(err);
    }
}

const getshiptypes = async () => {
    return new Promise((resolve , reject)=> {
        var sql = `SELECT * FROM ship_types;`;
        con.query(sql, (err,result) =>{
            if(err){ 
                reject(err);
            }
            else
            {
                if(result[0] === undefined)
                {
                    resolve(result[0]);
                }
                else
                {
                resolve(result);
                }
            }
        })
    });
}

const fetchshiptypes = async (req, res) => {
    try{
        const cbfun = await getshiptypes();
        if(cbfun === undefined){
            throw {message:"There was an error retrieving the query", query:false};
        }
        else
        {
            res.status(200).send({ message:"Query Executed Correctly", query:true, allentries:cbfun});
        }
    }
    catch(err) 
    {
        res.status(500).send(err);
    }
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

// const gettable = async (req, res) => {
//     var sql = "SELECT `Route#`,`ShipName`,`IMO`, `Nationality`,`ShipType`, `Agent`,`Route#`, `Actualarrival`,`Est.Departdate`, `OpType`, `Items`  FROM testtable ";

//     con.query(sql, (err, result) =>{
//         if(err){
//             throw err
//         }
//         res.status(200).send(result);
//     });
// };


const fetchArrival = async (req, res) => {
    const sql = `SELECT * FROM ship_arrival;`;
    con.query(sql, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("Internal server error");
        return;
      }
      res.status(200).send(result);
    });

}
const fetchDepart = async (req, res) => {
    const sql = `SELECT * FROM ship_departure;`;
    con.query(sql, function (err, result) {
    if (err) {
        console.error(err);
        res.status(500).send("Internal server error");
        return;
    }
    res.status(200).send(result);
    });

}



module.exports = { usergetid  , getcountrycode , getportcode , fetchportcode , fetchcountrycode , checkdatabase , fetchallcountries , 
fetchallports , fetchallagents , fetchshipdesc , fetchshiptypes ,fetchArrival ,fetchDepart };