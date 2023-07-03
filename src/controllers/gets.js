const { json } = require("express");
const express = require("express");
const mysql = require("mysql2");
const dbconnect = require("../config/database");
const con = dbconnect.connection;

const checkdatabase = async (req, res) => {
  try {
    if (dbconnect.connectDB()) {
      res
        .status(200)
        .send({ message: "Database is up and running", status: true });
    } else {
      res.status(500).send({ message: "Database is Down", status: false });
    }
  } catch {
    res
      .status(500)
      .send({
        message: "There was an error processing this request",
        status: false,
      });
  }
};

const getcountrycode = async (name) => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT Country_code FROM countries WHERE Country_name='${name}';`;
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result[0] === undefined) {
          resolve(result[0]);
        } else {
          resolve(result[0].Country_code);
        }
      }
    });
  });
};

const fetchcountrycode = async (req, res) => {
  try {
    if (req.query.name == undefined) {
      throw { message: "Name parameter was not received", query: false };
    }
    const name = req.query.name;
    const cname = await getcountrycode(name);
    if (cname === undefined) {
      throw {
        message: "That entry does not exist in the Database",
        query: false,
      };
    } else {
      res
        .status(200)
        .send({
          message: "country code Exceuted Correctly",
          Country_Code: cname,
          query: true,
        });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const getportcode = async (name) => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT Port_Code FROM ports WHERE Port_Name='${name}';`;
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result[0] === undefined) {
          resolve(result[0]);
        } else {
          resolve(result[0].Port_Code);
        }
      }
    });
  });
};

const fetchportcode = async (req, res) => {
  try {
    if (req.query.name == undefined) {
      throw { message: "Name parameter was not received", query: false };
    }
    const name = req.query.name;
    const pname = await getportcode(name);
    if (pname === undefined) {
      throw {
        message: "That entry does not exist in the Database",
        query: false,
      };
    } else {
      res
        .status(200)
        .send({
          message: "port code  Executed Correctly",
          Port_Code: pname,
          query: true,
        });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const getallcountries = async () => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM countries;`;
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result[0] === undefined) {
          resolve(result[0]);
        } else {
          resolve(result);
        }
      }
    });
  });
};

const fetchallcountries = async (req, res) => {
  try {
    const cbfun = await getallcountries();
    if (cbfun === undefined) {
      throw {
        message: "There was an error retrieving the query",
        query: false,
      };
    } else {
      res
        .status(200)
        .send({
          message: "All countries Executed Correctly",
          query: true,
          allentries: cbfun,
        });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getallports = async (limit = 0) => {
  return new Promise((resolve, reject) => {
    if (!limit) {
      var sql = `SELECT * FROM ports;`;
    } else {
      var sql = `SELECT * FROM ports LIMIT ${limit};`;
    }
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result[0] === undefined) {
          resolve(result[0]);
        } else {
          resolve(result);
        }
      }
    });
  });
};

const fetchallports = async (req, res) => {
  try {
    const lm = req.query.limit;
    const cbfun = await getallports(lm);
    if (cbfun === undefined) {
      throw {
        message: "There was an error retrieving the query",
        query: false,
      };
    } else {
      res
        .status(200)
        .send({
          message: "ports Executed Correctly",
          query: true,
          allentries: cbfun,
        });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getallagents = async () => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM agents;`;
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result[0] === undefined) {
          resolve(result[0]);
        } else {
          resolve(result);
        }
      }
    });
  });
};

const fetchallagents = async (req, res) => {
  try {
    const cbfun = await getallagents();
    if (cbfun === undefined) {
      throw {
        message: "There was an error retrieving the query",
        query: false,
      };
    } else {
      res
        .status(200)
        .send({
          message: "allagents Executed Correctly",
          query: true,
          allentries: cbfun,
        });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getshipdesc = async () => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT DISTINCT sd.*, c.Country_Name ,t.Ship_type_nm
        FROM ship_description sd
        LEFT JOIN countries c ON sd.Ship_Country_Code = c.Country_Code
        LEFT JOIN ship_types t ON sd.Ship_Type_Code = t.Type_Code;`;
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result[0] === undefined) {
          resolve(result[0]);
        } else {
          resolve(result);
        }
      }
    });
  });
};

const fetchshipdesc = async (req, res) => {
  try {
    const cbfun = await getshipdesc();
    if (cbfun === undefined) {
      throw {
        message: "There was an error retrieving the query",
        query: false,
      };
    } else {
      res
        .status(200)
        .send({
          message: "shipdesc Executed Correctly",
          query: true,
          allentries: cbfun,
        });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getshiptypes = async () => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM ship_types;`;
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result[0] === undefined) {
          resolve(result[0]);
        } else {
          resolve(result);
        }
      }
    });
  });
};

const fetchshiptypes = async (req, res) => {
  try {
    const cbfun = await getshiptypes();
    if (cbfun === undefined) {
      throw {
        message: "There was an error retrieving the query",
        query: false,
      };
    } else {
      res
        .status(200)
        .send({
          message: "shiptypes Executed Correctly",
          query: true,
          allentries: cbfun,
        });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const usergetid = async (req, res) => {
  var sqlj = "SELECT JobID FROM job WHERE Jobname=?;";

  const jobtype = ["Computer Science"];
  con.query(sqlj, jobtype, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log(result[0].JobID);
    res.status(200).send(result);
  });
};


const fetchlogs = async (req, res) => {
    const sql = `SELECT * from logs`;
    con.query(sql, function (err, result) {
    if (err) {
        res.status(500).send({ message: err.sqlMessage , query: false });
    }
    res.status(200).send({ message:"Query Executed Correctly", query:true, allentries:result });
    });
}

// const gettable = async (req, res) => {
//     var sql = "SELECT `Route#`,`ShipName`,`IMO`, `Nationality`,`ShipType`, `Agent`,`Route#`, `Actualarrival`,`Est.Departdate`, `OpType`, `Items`  FROM testtable ";

//     con.query(sql, (err, result) =>{
//         if(err){
//             throw err
//         }
//         res.status(200).send(result);
//     });
// };

const getOperation = async (req, res) => {
  try {
    const Cd = req.query.code;
    var sql;
    if (Cd == undefined) {
      sql = `SELECT * FROM operations;`;
    } else {
      sql = `SELECT * FROM operations WHERE Operation_Code='${Cd}';`;
    }
    con.query(sql, function (err, result) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send({ message: "Query Failed to Execute", query: false });
        return;
      }
      res
        .status(200)
        .send({
          message: "Operation Executed Correctly",
          query: true,
          allentries: result,
        });
    });
  } catch (error) {
    console.error("Error");
  }
};

const fetchArrival = async (req, res) => {
  const sql = `SELECT ship_arrival.  Arrival_ID, Voyage_No, 
    Port_of_Departure, 
    IMO,
    Cargo_Arrival,
    Berthing_Date,
    Berth_No,
    Arrival_Date_Plan,
    Arrival_Date_Actual , agents.Agent_Name , ship_arrival.Agent_Code, operations.Operation_nm
    FROM ship_arrival
    LEFT JOIN agents ON ship_arrival.Agent_Code = agents.Agent_Code
    LEFT JOIN operations ON ship_arrival.Op_Code = operations.Operation_Code`;
  con.query(sql, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({ message:`Internal server error ${err}`});
      return;
    }
    res
      .status(200)
      .send({
        message: "Arrival Executed Correctly",
        query: true,
        allentries: result,
      });
  });
};

const fetchDepart = async (req, res) => {
  const sql = `SELECT ship_departure.*, agents.Agent_Name
    FROM ship_departure
    JOIN agents ON ship_departure.Agent_Code = agents.Agent_Code;
    `;
  con.query(sql, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({ message:`Internal server error${err}`});
      return;
    }
    res
      .status(200)
      .send({
        message: "Depart Executed Correctly",
        query: true,
        allentries: result,
      });
  });
};

const hivistedports = async (req, res) => {
  try {
    if (req.query.date == undefined) {
      throw { message: "Date parameter was not received", query: false };
    }

    const data = req.query;

    if (!data.limit) {
      var sql = `SELECT Destination_Port, COUNT(*) AS Depart_Count
        FROM ship_departure
        WHERE Departure_Date_Actual >= '${data.date}' AND Departure_Date_Actual <= CURDATE()
        GROUP BY Destination_Port
        ORDER BY Depart_Count DESC;`;
    } else {
      var sql = `SELECT Destination_Port, COUNT(*) AS Depart_Count
        FROM ship_departure
        WHERE Departure_Date_Actual >= '${data.date}' AND Departure_Date_Actual <= CURDATE()
        GROUP BY Destination_Port
        ORDER BY Depart_Count DESC
        LIMIT ${data.limit};`;
    }

    con.query(sql, function (err, result) {
      if (err) {
        res
          .status(500)
          .send({ message: "Internal Server Error", query: false, err });
        return;
      }
      res
        .status(200)
        .send({
          message: "Query Executed Correctly",
          query: true,
          allentries: result,
        });
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", query: false, error });
  }
};

const hiarrivedports = async (req, res) => {
  try {
    if (req.query.limit == undefined) {
      throw { message: "Limit parameter was not received", query: false };
    }
    if (req.query.date == undefined) {
      throw { message: "Date parameter was not received", query: false };
    }

    const data = req.query;

    if (!data.limit) {
      var sql = `SELECT Port_of_Departure, COUNT(*) AS Arriving_Count
            FROM ship_arrival
            WHERE Arrival_Date_Actual >= '${data.date}' AND Arrival_Date_Actual <= CURDATE()
            GROUP BY Port_of_Departure
            ORDER BY Arriving_Count DESC;`;
    } else {
      var sql = `SELECT Port_of_Departure, COUNT(*) AS Arriving_Count
            FROM ship_arrival
            WHERE Arrival_Date_Actual >= '${data.date}' AND Arrival_Date_Actual <= CURDATE()
            GROUP BY Port_of_Departure
            ORDER BY Arriving_Count DESC
            LIMIT ${data.limit};`;
    }

    con.query(sql, function (err, result) {
      if (err) {
        res
          .status(500)
          .send({ message: "Internal Server Error", query: false, err });
        return;
      }
      res
        .status(200)
        .send({
          message: "Query Executed Correctly",
          query: true,
          allentries: result,
        });
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", query: false, error });
  }
};

const highops = async (req, res) => {
  try {
    if (req.query.date == undefined) {
      throw { message: "Date parameter was not received", query: false };
    }

    const data = req.query;

    if (!data.limit) {
      var sql = `SELECT op.Operation_nm AS Operation_Name, COUNT(sa.Op_Code) AS Operation_Count
                FROM ship_arrival sa
                JOIN operations op ON sa.Op_Code = op.Operation_Code
                WHERE sa.Arrival_Date_Actual >= '${data.date}' AND sa.Arrival_Date_Actual <= CURDATE()
                GROUP BY sa.Op_Code, op.Operation_nm
                ORDER BY Operation_Count DESC
                ;`;
    } else {
      var sql = `SELECT op.Operation_nm AS Operation_Name, COUNT(sa.Op_Code) AS Operation_Count
                FROM ship_arrival sa
                JOIN operations op ON sa.Op_Code = op.Operation_Code
                WHERE sa.Arrival_Date_Actual >= '${data.date}' AND sa.Arrival_Date_Actual <= CURDATE()
                GROUP BY sa.Op_Code, op.Operation_nm
                ORDER BY Operation_Count DESC
                LIMIT ${data.limit};`;
    }

    con.query(sql, function (err, result) {
      if (err) {
        res
          .status(500)
          .send({ message: "Internal Server Error", query: false, err });
        return;
      }
      res
        .status(200)
        .send({
          message: "Query Executed Correctly",
          query: true,
          allentries: result,
        });
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", query: false, error });
  }
};
const highrecships = async (req, res) => {
  try {
    if (req.query.date == undefined) {
      throw { message: "Date parameter was not received", query: false };
    }

    const data = req.query;

    if (!data.limit) {
      var sql = `SELECT sd.Ship_Name, sd.IMO, COUNT(sa.IMO) AS Arrival_Count
                FROM ship_arrival sa
                JOIN ship_description sd ON sa.IMO = sd.IMO
                WHERE sa.Arrival_Date_Actual >= '${data.date}' AND sa.Arrival_Date_Actual <= CURDATE()
                GROUP BY sa.IMO, sd.Ship_Name, sd.IMO
                ORDER BY Arrival_Count DESC
                ;`;
    } else {
      var sql = `SELECT sd.Ship_Name, sd.IMO, COUNT(sa.IMO) AS Arrival_Count
                FROM ship_arrival sa
                JOIN ship_description sd ON sa.IMO = sd.IMO
                WHERE sa.Arrival_Date_Actual >= '${data.date}' AND sa.Arrival_Date_Actual <= CURDATE()
                GROUP BY sa.IMO, sd.Ship_Name, sd.IMO
                ORDER BY Arrival_Count DESC
                LIMIT ${data.limit};`;
    }

    con.query(sql, function (err, result) {
      if (err) {
        res
          .status(500)
          .send({ message: "Internal Server Error", query: false, err });
        return;
      }
      res
        .status(200)
        .send({
          message: "Query Executed Correctly",
          query: true,
          allentries: result,
        });
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", query: false, error });
  }
};
const highrecshipdata = async (req, res) => {
  try {
    if (req.query.fromdate == undefined) {
      throw { message: "From Date parameter was not received", query: false };
    }

    if (req.query.name == undefined) {
      throw { message: "Name parameter was not received", query: false };
    }

    const data = req.query;

    if (!data.limit) {
      if (req.query.todate == undefined) {
        var sql = `SELECT 
                    counter.Counter,
                    Arrival_Date_Actual,
                    Voyage_No
                FROM (
                    SELECT 
                    ROW_NUMBER() OVER (ORDER BY sa.Arrival_Date_Actual) AS Counter,
                    sa.Arrival_Date_Actual,
                    sa.Voyage_No
                    FROM ship_arrival sa
                    JOIN ship_description sd ON sa.IMO = sd.IMO
                    WHERE sd.Ship_Name = '${data.name}'
                    AND (
                        sa.Arrival_Date_Actual >= '${data.fromdate}'
                        AND sa.Arrival_Date_Actual <= CURDATE()
                    )
                ) AS counter
                ORDER BY counter.Counter              
                ;`;
      } else {
        var sql = `SELECT 
                    counter.Counter,
                    Arrival_Date_Actual,
                    Voyage_No
                FROM (
                    SELECT 
                    ROW_NUMBER() OVER (ORDER BY sa.Arrival_Date_Actual) AS Counter,
                    sa.Arrival_Date_Actual,
                    sa.Voyage_No
                    FROM ship_arrival sa
                    JOIN ship_description sd ON sa.IMO = sd.IMO
                    WHERE sd.Ship_Name = '${data.name}'
                    AND (
                        sa.Arrival_Date_Actual >= '${data.fromdate}'
                        AND sa.Arrival_Date_Actual <= '${data.todate}'
                    )
                ) AS counter
                ORDER BY counter.Counter              
                ;`;
      }
    } else {
      if (req.query.todate == undefined) {
        var sql = `SELECT 
                    counter.Counter,
                    Arrival_Date_Actual,
                    Voyage_No
                FROM (
                    SELECT 
                    ROW_NUMBER() OVER (ORDER BY sa.Arrival_Date_Actual) AS Counter,
                    sa.Arrival_Date_Actual,
                    sa.Voyage_No
                    FROM ship_arrival sa
                    JOIN ship_description sd ON sa.IMO = sd.IMO
                    WHERE sd.Ship_Name = '${data.name}'
                    AND (
                        sa.Arrival_Date_Actual >= '${data.fromdate}'
                        AND sa.Arrival_Date_Actual <= CURDATE()
                    )
                ) AS counter
                ORDER BY counter.Counter              
                    LIMIT ${data.limit};`;
      } else {
        var sql = `SELECT 
                    counter.Counter,
                    Arrival_Date_Actual,
                    Voyage_No
                FROM (
                    SELECT 
                    ROW_NUMBER() OVER (ORDER BY sa.Arrival_Date_Actual) AS Counter,
                    sa.Arrival_Date_Actual,
                    sa.Voyage_No
                    FROM ship_arrival sa
                    JOIN ship_description sd ON sa.IMO = sd.IMO
                    WHERE sd.Ship_Name = '${data.name}'
                    AND (
                        sa.Arrival_Date_Actual >= '${data.fromdate}'
                        AND sa.Arrival_Date_Actual <= '${data.todate}'
                    )
                ) AS counter
                ORDER BY counter.Counter              
                    LIMIT ${data.limit};`;
      }
    }

    con.query(sql, function (err, result) {
      if (err) {
        res
          .status(500)
          .send({ message: "Internal Server Error", query: false, err });
        return;
      }
      res
        .status(200)
        .send({
          message: "Query Executed Correctly",
          query: true,
          allentries: result,
        });
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", query: false, error });
  }
};

module.exports = {
  usergetid,
  getcountrycode,
  getportcode,
  fetchportcode,
  fetchcountrycode,
  checkdatabase,
  fetchallcountries,
  fetchallports,
  fetchallagents,
  fetchshipdesc,
  fetchshiptypes,
  fetchArrival,
  fetchDepart,
  fetchlogs,
  getOperation,
  hivistedports,
  hiarrivedports,
  highops,
  highrecships,
  highrecshipdata,

};
