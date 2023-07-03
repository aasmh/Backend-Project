const { json } = require("express");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const dbconnect = require("../config/database");
const res = require("express/lib/response");
const con = dbconnect.connection;
const gets = require("./gets");
const bcrypt = require("bcrypt");


//just a comment
//add another comment
// Third Comment
//Fourth Comment

const ifexists = async (tablename, columnname, value) => {
  try {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${tablename} WHERE ${columnname}='${value}'`;
      con.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result[0] === undefined) {
            resolve({ message: "This Value Does Not Exist!", status: false });
          } else {
            resolve({ message: "This Value Already Exists!", status: true });
          }
        }
      });
    });
  } catch (err) {
    return {
      message: "There was an error processing your request",
      status: false,
    };
  }
};

const Ifsqlexists = async (tablename, columnname, value) => {
  try {
    const resp = await ifexists(tablename, columnname, value);
    if (resp.status) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
};

const addnewport = async (req, res) => {
  try {
    const resobj = req.body;

    if (resobj == undefined) {
      throw { message: "Parameter was not received", status: false };
    }

    const exists = await gets.getportcode(resobj.name);

    if (exists !== undefined) {
      throw {
        message: "That entry already exists in the Database",
        status: true,
      };
    }

    const sql = `INSERT INTO ports (Port_Name, Port_Code) VALUES ('${resobj.name}', '${resobj.code}'); `;
    con.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage , query: false });

      } else {
        res
          .status(200)
          .send({ message: "Add_New_Port Query Executed Correctly", query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const addnewcountry = async (req, res) => {
  try {
    const resobj = req.body;
    if (resobj == undefined) {
      throw { message: "Parameter was not received", status: false };
    }
    const exists = await gets.getcountrycode(resobj.name);

    if (exists !== undefined) {
      throw {
        message: "That entry already exists in the Database",
        status: true,
      };
    }

    const sql = `INSERT INTO countries (Country_Name, Country_Code) VALUES ('${resobj.name}','${resobj.code}');`;
    con.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage , query: false });

      } else {
        res
          .status(200)
          .send({ message: "Add_New_Country Query Executed Correctly", query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const addnewshiptype = async (req, res) => {
  try {
    const resobj = req.body;
    if (resobj == undefined) {
      throw { message: "Parameter was not received", status: false };
    }
    const exists = await Ifsqlexists("ship_types", "Type_Code", resobj.code);

    if (exists) {
      throw {
        message: "That entry already exists in the Database",
        status: true,
      };
    }

    const sql = `INSERT INTO ship_types (Ship_type_nm,Type_Code) VALUES ('${resobj.name}','${resobj.code}');`;
    con.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage , query: false });

      } else {
        res
          .status(200)
          .send({ message: "Ad_New_Ship_Type Query Executed Correctly", query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const addnewoperation = async (req, res) => {
  try {
    const resobj = req.body;
    if (resobj == undefined) {
      throw { message: "Parameter was not received", status: false };
    }

    const exists = await Ifsqlexists(
      "operations",
      "Operation_Code",
      resobj.code
    );

    if (exists) {
      throw {
        message: "That entry already exists in the Database",
        status: true,
      };
    }

    const sql = `INSERT INTO operations (Operation_nm, Operation_Code) VALUES ('${resobj.name}','${resobj.code}');`;
    con.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage , query: false });

      } else {
        res
          .status(200)
          .send({ message: "Add_New_Operation Query Executed Correctly", query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const addshipdesc = async (req, res) => {
  try {
    const {
      IMO,
      Call_sign,
      Ship_Name,
      Ship_Country_Code,
      Ship_Type_Code,
      Crew_No,
      Passar_No,
      Width,
      Length,
      Draft,
      Dead_Weight,
      Gross_Ton,
      Build_Date,
    } = req.body;
    const sql = `INSERT INTO ship_description (IMO, Call_sign, Ship_Name, Ship_Country_Code, Ship_Type_Code, Crew_No, Passar_No, Width, Length, Draft, Dead_Weight, Gross_Ton, Build_Date)  VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?)`;
    con.query(
      sql,
      [
        IMO,
        Call_sign,
        Ship_Name,
        Ship_Country_Code,
        Ship_Type_Code,
        Crew_No,
        Passar_No,
        Width,
        Length,
        Draft,
        Dead_Weight,
        Gross_Ton,
        Build_Date,
      ],
      function (err, result) {
        if (err) {
          res.status(500).send({ message: err.sqlMessage , query: false });
        } else {
          res
            .status(200)
            .send({ message: "add_ship Query Executed Correctly", query: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const addAgent = async (req, res) => {
  try {
    const { Agent_Code, Perm_No, Perm_dt_st, Perm_dt_end, Email, Telephone, Address, Agent_Name } = req.body;

    const insertQuery = "INSERT INTO agents (Agent_Code, Perm_No, Perm_dt_st, Perm_dt_end, Email, Telephone, Address, Agent_Name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    con.query(insertQuery, [Agent_Code, Perm_No, Perm_dt_st, Perm_dt_end, Email, Telephone, Address, Agent_Name], (err, result) => {
      if (err) {

        res.status(500).send({ message: err.sqlMessage , query: false });

      } else {
        res
          .status(200)
          .send({ message: "Agent Query Executed Correctly", query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};


const login = async (req, res) => {
  const { Email, Employee_Password } = req.body;
  const sql = "SELECT * FROM employees WHERE Email=?";
  con.query(sql, [Email], async (err, result) => {
    if (err === null && result.length > 0) {
      const storedPassword = result[0].Employee_Password;
      if (Employee_Password === storedPassword) {
        res.status(200).cookie('emp',result[0].Role,{httpOnly:true, maxAge:120*60 }).send({ result: result[0] });
      } else {
        
        res
          .status(401)
          .send({ error: "Email and password combination is not correct" });
      }
    } else {
      res.status(401).send({ error: "User not found" });
    }
  });
};


const logout = async (req, res) => {
  res.cookie('emp', ' ' , {httpOnly:true, maxAge:1} );
  res.end();
}



const addlogs = async (req, res) => {
  try {
    const resobj = req.body;
    if (resobj == undefined) {
      throw { message: "Parameter was not received", status: false };
    }

    const logDate = new Date().toISOString().slice(0, 19).replace("T", " ");
 
    const sql = `INSERT INTO logs (name,message, log_date) VALUES ('${resobj.name}','${resobj.message}','${logDate}');`;
    con.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage , query: false });

      } else {
        res
          .status(200)
          .send({ message: "add logs Query Executed Correctly", query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};



module.exports = {
  addnewport,
  addnewcountry,
  addnewshiptype,
  addnewoperation,
  Ifsqlexists,
  addshipdesc,
  addAgent,
  login,
  logout,
  addlogs,
};
