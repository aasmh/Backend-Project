const dbconnect = require('../config/database');
const posts = require("./posts");
const gets = require("./gets");
const con = dbconnect.connection;

const updatePort = async (req, res) => {
    try {
      const resobj = req.body;
  
      if (resobj == undefined) {
        throw { message: "Parameter was not received", status: false };
      }
  
      const exists = await gets.getportcode(resobj.name);
  
      if (exists === undefined) {
        throw { message: "Entry does not exist in the Database", status: true };
      }
  
      const sql = `UPDATE ports SET Port_Code = '${resobj.code}' WHERE Port_Name = '${resobj.name}';`;
      con.query(sql, (err, result) => {
        if (err) {
          throw { message: "Error updating the entry in the Database, Try Again", status: false };
        } else {
          res.status(200).send({ message: "Entry updated successfully", query: true });
        }
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
  const updateCountry = async (req, res) => {
    try {
      const resobj = req.body;
  
      if (resobj == undefined) {
        throw { message: "Parameter was not received", status: false };
      }
  
      const exists = await gets.getcountrycode(resobj.name);
  
      if (exists === undefined) {
        throw { message: "Entry does not exist in the Database", status: true };
      }
  
      const sql = `UPDATE countries SET Country_Code = '${resobj.code}' WHERE Country_Name = '${resobj.name}';`;
      con.query(sql, (err, result) => {
        if (err) {
          throw { message: "Error updating the entry in the Database, Try Again", status: false };
        } else {
          res.status(200).send({ message: "Entry updated successfully", query: true });
        }
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
  const updateShipType = async (req, res) => {
    try {
      const resobj = req.body;
      
      if (resobj == undefined) {
        throw { message: "Parameter was not received", status: false };
      }
      const exists = await posts.Ifsqlexists("ship_types", "Type_Code", resobj.code);
      if (!exists) {
        throw { message: "Entry does not exist in the Database", status: true };
      }
      const sql = `UPDATE ship_types SET Ship_type_nm = '${resobj.name}' WHERE Type_Code = '${resobj.code}';`;
      con.query(sql, (err, result) => {
        if (err) {
          throw { message: "Error updating the entry in the Database, Try Again", status: false };
        } else {
          res.status(200).send({ message: "Entry updated successfully", query: true });
        }
      });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  const updateOperation = async (req, res) => {
    try {
      const resobj = req.body;
  
      if (resobj == undefined) {
        throw { message: "Parameter was not received", status: false };
      }
      
      const exists = await posts.Ifsqlexists("operations", "Operation_Code", resobj.code);
      
      if (!exists) {
        throw { message: "Entry does not exist in the Database", status: true };
      }
  
      const sql = `UPDATE operations SET Operation_nm = '${resobj.name}' WHERE Operation_Code = '${resobj.code}';`;
      con.query(sql, (err, result) => {
        if (err) {
          throw { message: "Error updating the entry in the Database, Try Again", status: false };
        } else {
          res.status(200).send({ message: "Entry updated successfully", query: true });
        }
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };

  const updateDepart = async (req, res) => {
    try {
      const {
        Voyage_No,
        IMO,
        Agent_Code,
        Departure_Date_Plan,
        Departure_Date_Actual,
        Cargo_departure,
        Destination_Port,
        Maritime_Safety,
        Police,
        Customs,
        Port_Authority,
        Berth_No_Depth,
      } = req.body;
  
      const checkDepartureSql = 'SELECT * FROM ship_departure WHERE Voyage_No = ?';
  
      con.query(checkDepartureSql, [Voyage_No], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send(`Internal server error ${err}`);
          return;
        }
  
        // If no matching departure record is found, send an error message
        if (result.length === 0) {
          res.status(400).send('Departure record does not exist for the provided Voyage_No');
          return;
        }
  
        const updateDepartureSql = `
          UPDATE ship_departure SET
          IMO = ?,
          Agent_Code = ?,
          Departure_Date_Plan = ?,
          Departure_Date_Actual = ?,
          Cargo_departure = ?,
          Destination_Port = ?,
          Maritime_Safety = ?,
          Police = ?,
          Customs = ?,
          Port_Authority = ?,
          Berth_No_Depth = ?
          WHERE Voyage_No = ?
        `;
  
        con.query(
          updateDepartureSql,
          [
            IMO,
            Agent_Code,
            Departure_Date_Plan,
            Departure_Date_Actual,
            Cargo_departure,
            Destination_Port,
            Maritime_Safety,
            Police,
            Customs,
            Port_Authority,
            Berth_No_Depth,
            Voyage_No,
          ],
          (err, updateResult) => {
            if (err) {
              console.error(err);
              res.status(500).send(`Internal server error ${err.sqlMessage}`);
              return;
            }
            res.status(200).send(`Ship departure with the Voyage_No ${Voyage_No} updated successfully`);
          }
        );
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
  
  const updateArrival = async (req, res) => {
    try {
      const {
        Voyage_No,
        IMO,
        Arrival_Date_Plan,
        Arrival_Date_Actual,
        Port_of_Departure,
        Agent_Code,
        Berth_No,
        Berthing_Date,
        Cargo_Arrival,
        Op_Code,
      } = req.body;
  
      const checkArrivalSql = 'SELECT * FROM ship_arrival WHERE Voyage_No = ?';
  
      con.query(checkArrivalSql, [Voyage_No], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send(`Internal server error ${err}`);
          return;
        }
  
        // If no matching arrival record is found, send an error message
        if (result.length === 0) {
          res.status(400).send('Arrival record does not exist for the provided Voyage_No');
          return;
        }
  
        const updateArrivalSql = `
          UPDATE ship_arrival SET
          IMO = ?,
          Arrival_Date_Plan = ?,
          Arrival_Date_Actual = ?,
          Port_of_Departure = ?,
          Agent_Code = ?,
          Berth_No = ?,
          Berthing_Date = ?,
          Cargo_Arrival = ?,
          Op_Code = ?
          WHERE Voyage_No = ?
        `;
  
        con.query(
          updateArrivalSql,
          [
            IMO,
            Arrival_Date_Plan,
            Arrival_Date_Actual,
            Port_of_Departure,
            Agent_Code,
            Berth_No,
            Berthing_Date,
            Cargo_Arrival,
            Op_Code,
            Voyage_No,
          ],
          (err, updateResult) => {
            if (err) {
              console.error(err);
              res.status(500).send(`Internal server error ${err.sqlMessage}`);
              return;
            }
            res.status(200).send(`Ship arrival with the Arrival_ID ${Voyage_No} updated successfully`);
          }
        );
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
  module.exports = { updatePort , updateCountry , updateShipType , updateOperation , updateDepart , updateArrival};