const dbconnect = require('../config/database');
const posts = require("./posts");
const gets = require("./gets");
const con = dbconnect.connection;

const updatePassword = async (req, res)=> {
  try {
    const resobj = req.body;

    if(resobj.email === undefined){
      throw { message: "Email Parameter was not received", status: false };
    }
    if(resobj.pass === undefined){
      throw { message: "Password Parameter was not received", status: false };
    }

    var sql = `UPDATE employees SET Employee_Password = '${resobj.pass}' WHERE Email = '${resobj.email}';`;
    
    con.query(sql, (err, result) => {
      if (err) {
        throw { message: "Error updating the entry in the Database, Try Again", status: false , err};
      } 
      else 
      {
        res.status(200).send({ message: `Password for mail : ${resobj.email} updated successfully`, query: true });
      }
    });

  } catch (err) {
      res.status(400).send(err);
  }
}

const updatePort = async (req, res) => {
    try {
      const resobj = req.body;
      
      const alter = "name";
      

      if(resobj.name === undefined){
        throw { message: "Name Parameter was not received", status: false };
      }

      if(resobj.code === undefined){
        throw { message: "Code Parameter was not received", status: false };
      }
      
      if(alter === "code")
      {
        const exists = await gets.getportcode(resobj.name);
  
        if (exists === undefined) {
          throw { message: "Entry does not exist in the Database", status: true };
        }

        var sql = `UPDATE ports SET Port_Code = '${resobj.code}' WHERE Port_Name = '${resobj.name}';`;
      }
      else
      {
        var sql = `UPDATE ports SET Port_Name = '${resobj.name}' WHERE Port_Code = '${resobj.code}';`;
      }

      
      con.query(sql, (err, result) => {
        if (err) {
          throw { message: "Error updating the entry in the Database, Try Again", status: false , result};
        } 
        else 
        {
          res.status(200).send({ message: `Port Entry : ${resobj.name} updated successfully`, query: true });
        }
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
  const updateCountry = async (req, res) => {
    try {
      const resobj = req.body;
      
      const alter = "name";

      
      if(alter === "code")
      {
        
        const exists = await gets.getcountrycode(resobj.name);
    
        if (exists === undefined) {
          throw { message: "Entry does not exist in the Database", status: true };
        }

        var sql = `UPDATE countries SET Country_Code = '${resobj.code}' WHERE Country_Name = '${resobj.name}';`;
      
      }
      else
      {
        var sql = `UPDATE countries SET Country_Name = '${resobj.name}' WHERE Country_Code = '${resobj.code}';`;
      }

      con.query(sql, (err, result) => {
        if (err) {
          console.error(err);
          res.status(400).send({ message:`error: ${err.sqlMessage}`});
          return;
                } else {
          res.status(200).send({ message: `Country ${resobj.name} updated successfully`, query: true });
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
          res.status(200).send({ message: `Ship Type ${resobj.name} updated successfully`, query: true });
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
          res.status(200).send({ message: `Operation ${resobj.name} updated successfully`, query: true });
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
          res.status(400).send({message:` error: ${err.sqlMessage}`});
          return;
        }
  
        // If no matching departure record is found, send an error message
        if (result.length === 0) {
          res.status(400).send({message:'Departure record does not exist for the provided Voyage_No'});
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
              res.status(400).send({message:`error: ${err.sqlMessage}`});
              return;
            }
            res.status(200).send({message:`Ship departure with the Voyage_No ${Voyage_No} updated successfully`});
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
          res.status(400).send({message:`error ${err.sqlMessage}`});
          return;
        }
  
        // If no matching arrival record is found, send an error message
        if (result.length === 0) {
          res.status(400).send({message:'Arrival record does not exist for the provided Voyage_No'});
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
              res.status(400).send({message:` error: ${err.sqlMessage}`});
              return;
            }
            res.status(200).send({message:`Ship arrival with the Arrival_ID ${Voyage_No} updated successfully`});
          }
        );
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };

  const updateShipDesc = async (req, res) => {
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
  
      const checkShipDescSql = 'SELECT * FROM ship_description WHERE IMO = ?';
  
      con.query(checkShipDescSql, [IMO], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send({message:`Internal server error ${err}`});
          return;
        }
  
        // If no matching ship record is found, send an error message
        if (result.length === 0) {
          res.status(400).send({message:'Ship record does not exist for the provided IMO'});
          return;
        }
  
        const updateShipDescSql = `
          UPDATE ship_description SET
            Call_sign = ?,
            Ship_Name = ?,
            Ship_Country_Code = ?,
            Ship_Type_Code = ?,
            Crew_No = ?,
            Passar_No = ?,
            Width = ?,
            Length = ?,
            Draft = ?,
            Dead_Weight = ?,
            Gross_Ton = ?,
            Build_Date = ?
          WHERE IMO = ?
        `;
  
        con.query(
          updateShipDescSql,
          [
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
            IMO,
          ],
          (err, updateResult) => {
            if (err) {
              console.error(err);
              res.status(400).send({message: err.sqlMessage});
              return;
            }
            res.status(200).send({message:`ship_description with the IMO ${IMO} updated successfully`});
          }
        );
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };


  const updateAgent = async (req, res) => {
    try {
      const {
        Agent_Code,
        Perm_No,
        Perm_dt_st,
        Perm_dt_end,
        Email,
        Telephone,
        Address,
        Agent_Name,
      } = req.body;
  
      const checkAgentSql = 'SELECT * FROM agents WHERE Agent_Code = ?';
  
      con.query(checkAgentSql, [Agent_Code], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send({message:`Internal server error ${err}`});
          return;
        }
  
        // If no matching agent record is found, send an error message
        if (result.length === 0) {
          res.status(400).send({message:'Agent record does not exist for the provided Agent_Code'});
          return;
        }
  
        const updateAgentSql = `
          UPDATE agents SET
            Perm_No = ?,
            Perm_dt_st = ?,
            Perm_dt_end = ?,
            Email = ?,
            Telephone = ?,
            Address = ?,
            Agent_Name = ?
          WHERE Agent_Code = ?
        `;
  
        con.query(
          updateAgentSql,
          [
            Perm_No,
            Perm_dt_st,
            Perm_dt_end,
            Email,
            Telephone,
            Address,
            Agent_Name,
            Agent_Code,
          ],
          (err, updateResult) => {
            if (err) {
              console.error(err);
              res.status(400).send({message:`error: ${err.sqlMessage}`});
              return;
            }
            res.status(200).send({message:`Ship agent with the agents ${Agent_Code} updated successfully`});
          }
        );
      });
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
  
  
  module.exports = { updatePort , updateCountry , updateShipType , updateOperation , updateDepart , updateArrival , updateShipDesc ,updateAgent , updatePassword};