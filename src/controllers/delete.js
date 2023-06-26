const dbconnect = require("../config/database");
const posts = require("./posts");
const gets = require("./gets");
const con = dbconnect.connection;

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM employees WHERE Employee_ID = ?";
  con.query(sql, [id], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send(`Employee with the id ${id} deleted from the database.`);
  });
};

const deletePort = async (req, res) => {
  try {
    const resobj = req.body;

    if (resobj == undefined) {
      throw { message: "Parameter was not received", status: false };
    }

    const exists = resobj.code;

    if (exists === undefined) {
      throw { message: "Entry does not exist in the Database", status: true };
    }

    const sql = `DELETE FROM ports WHERE Port_Code = '${resobj.code}';`;
    con.query(sql, (err, result) => {
      if (err) {
        throw { message: "Error deleting the entry from the Database, Try Again", status: false };
      } else {
        res.status(200).send({ message: "Entry deleted successfully", query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteCountry = async (req, res) => {
  try {
    const resobj = req.body;

    if (resobj == undefined) {
      throw { message: "Parameter was not received", status: false };
    }

    const exists = resobj.code;
    console.log(exists);
    if (exists === undefined) {
      throw { message: "Entry does not exist in the Database", status: true };
    }
    console.log("Exited");

    const sql = `DELETE FROM countries WHERE Country_Code = '${resobj.code}';`;
    con.query(sql, (err, result) => {
      if (err) {
        throw { message: "Error deleting the entry from the Database, Try Again", status: false };
      } else {
        res.status(200).send({ message: "Entry deleted successfully", query: true , result });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteShipType = async (req, res) => {
  try {
    const resobj = req.body;

    if (resobj == undefined) {
      throw { message: "Parameter was not received", status: false };
    }

    const exists = await posts.Ifsqlexists("ship_types", "Type_Code", resobj.code);

    if (!exists) {
      throw { message: "Entry does not exist in the Database", status: true };
    }

    const sql = `DELETE FROM ship_types WHERE Type_Code = '${resobj.code}';`;
    con.query(sql, (err, result) => {
      if (err) {
        throw { message: "Error deleting the entry from the Database, Try Again", status: false };
      } else {
        res.status(200).send({ message: "Entry deleted successfully", query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteOperation = async (req, res) => {
  try {
    const resobj = req.body;
    if (resobj == undefined) {
      throw { message: "Parameter was not received", status: false };
    }

    const exists = await posts.Ifsqlexists("operations", "Operation_Code", resobj.code);  
    if (!exists) {
      throw { message: "Entry does not exist in the Database", status: true };
    }
    const sql = `DELETE FROM operations WHERE Operation_Code = '${resobj.code}';`;
    con.query(sql, (err, result) => {
      if (err) {
        throw { message: "Error deleting the entry from the Database, Try Again", status: false };
      } else {
        res.status(200).send({ message: "Entry deleted successfully", query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteDepart = async (req, res) => {
  try {
    const { Arrival_ID } = req.body;

    const checkDepartureSql = 'SELECT * FROM ship_departure WHERE Arrival_ID = ?';

    con.query(checkDepartureSql, [Arrival_ID], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }

      // If no matching departure record is found, send an error message
      if (result.length === 0) {
        res.status(400).send('Departure record does not exist for the provided Arrival_ID');
        return;
      }

      const deleteDepartureSql = 'DELETE FROM ship_departure WHERE Arrival_ID = ?';

      con.query(deleteDepartureSql, [Arrival_ID], (err, deleteResult) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal server error');
          return;
        }
        res.status(200).send(`Ship departure with the Arrival_ID ${Arrival_ID} deleted successfully`);
      });
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteArrival = async (req, res) => {
  try {
    const { Arrival_ID } = req.body;

    const checkArrivalSql = 'SELECT * FROM ship_arrival WHERE Arrival_ID = ?';

    con.query(checkArrivalSql, [Arrival_ID], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }

      // If no matching arrival record is found, send an error message
      if (result.length === 0) {
        res.status(400).send('Arrival record does not exist for the provided Arrival_ID');
        return;
      }

      const deleteArrivalSql = 'DELETE FROM ship_arrival WHERE Arrival_ID = ?';

      con.query(deleteArrivalSql, [Arrival_ID], (err, deleteResult) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal server error');
          return;
        }
        res.status(200).send(`Ship arrival with the Arrival_ID ${Arrival_ID} deleted successfully`);
      });
    });
  } catch (err) {
    res.status(400).send(err);
  }
};


module.exports = {
  deleteEmployee, deletePort , deleteCountry, deleteShipType, deleteOperation , deleteDepart , deleteArrival
};
