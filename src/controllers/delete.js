const dbconnect = require("../config/database");
const posts = require("./posts");
const gets = require("./gets");
const logs = require("./log");

const con = dbconnect.connection;

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM employees WHERE Employee_ID = ?";
  con.query(sql, [id], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({ message:`Internal server error${err}`});
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send({ message:"User not found"});
      return;
    }
    res.send({ message: "Employee deleted successfully", query: true });
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
        throw {
          message: "Error deleting the entry from the Database, Try Again",
          status: false,
        };
      } else {
        res
          .status(200)
          .send({ message: `Port code ${resobj.code} deleted successfully`, query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteCountry = async (req, res) => {
  try {
    const resobj = req.body;
    console.log(req.body);

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
        throw {
          message: "Error deleting the entry from the Database, Try Again",
          status: false,
        };
      } else {
        res
          .status(200)
          .send({
            message: `Country with ${resobj.code} deleted successfully`,
            query: true,
            result,
          });
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

    const exists = await posts.Ifsqlexists(
      "ship_types",
      "Type_Code",
      resobj.code
    );

    if (!exists) {
      throw { message: "Entry does not exist in the Database", status: true };
    }

    const sql = `DELETE FROM ship_types WHERE Type_Code = '${resobj.code}';`;
    con.query(sql, (err, result) => {
      if (err) {
        throw {
          message: "Error deleting the entry from the Database, Try Again",
          status: false,
        };
      } else {
        res
          .status(200)
          .send({ message: `Ship type with code: ${resobj.code} deleted successfully`, query: true });
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

    const exists = await posts.Ifsqlexists(
      "operations",
      "Operation_Code",
      resobj.code
    );
    if (!exists) {
      throw { message: "Entry does not exist in the Database", status: true };
    }
    const sql = `DELETE FROM operations WHERE Operation_Code = '${resobj.code}';`;
    con.query(sql, (err, result) => {
      if (err) {
        throw {
          message: "Error deleting the entry from the Database, Try Again",
          status: false,
        };
      } else {
        res
          .status(200)
          .send({ message: `operations with code ${resobj.code} deleted successfully`, query: true });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteDepart = async (req, res) => {
  try {
    const { Arrival_ID } = req.body;

    const checkDepartureSql =
      "SELECT * FROM ship_departure WHERE Arrival_ID = ?";

    con.query(checkDepartureSql, [Arrival_ID], (err, result) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message:`Internal server error${err}`});
        return;
      }

      // If no matching departure record is found, send an error message
      if (result.length === 0) {
        res
          .status(400)
          .send({ message:"Departure record does not exist for the provided Arrival_ID"});
        return;
      }

      const deleteDepartureSql =
        "DELETE FROM ship_departure WHERE Arrival_ID = ?";

      con.query(deleteDepartureSql, [Arrival_ID], (err, deleteResult) => {
        if (err) {
          console.error(err);
          res.status(400).send({ message:`Internal server error${err}`});
          return;
        }
        res
          .status(200)
          .send({ message: `Depart with ${Arrival_ID} deleted successfully`, query: true });
      });
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteArrival = async (req, res) => {
  try {
    const { Arrival_ID } = req.body;

    const checkArrivalSql = "SELECT * FROM ship_arrival WHERE Arrival_ID = ?";

    con.query(checkArrivalSql, [Arrival_ID], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message:`Internal server error${err}`});
        return;
      }

      // If no matching arrival record is found, send an error message
      if (result.length === 0) {
        res
          .status(400)
          .send({ message:"Arrival record does not exist for the provided Arrival_ID"});
        return;
      }

      const deleteArrivalSql = "DELETE FROM ship_arrival WHERE Arrival_ID = ?";

      con.query(deleteArrivalSql, [Arrival_ID], (err, deleteResult) => {
        if (err) {
          console.error(err);
          res.status(500).send({ message:"Internal server error"});
          return;
        }
        res
          .status(200)
          .send({ message: `Arrival ${Arrival_ID}deleted successfully`, query: true });
      });
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteShipDesc = async (req, res) => {
  try {
    const { IMO } = req.body;

    const checkShipDesc = "SELECT * FROM ship_description WHERE IMO = ?";

    con.query(checkShipDesc, [IMO], (err, result) => {
      if (err) {
        console.error(err);
        res.status(400).send({ message:`Internal server error${err}`});
        return;
      }

      // If no matching arrival record is found, send an error message
      if (result.length === 0) {
        res.status(400).send({ message:"IMO record does not exist for the provided IMO"});
        return;
      }

      const deleteShipDesc = "DELETE FROM ship_description WHERE IMO = ?";

      con.query(deleteShipDesc, [IMO], (err, deleteResult) => {
        if (err) {
          console.error(err);
          res.send(err);
          res.status(500).send({ message:"Internal server error "+ err});
          return;
        }
        res
          .status(200)
          .send({ message: `ShipDesc IMO:${IMO} deleted successfully`, query: true });
      });
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteAgent = async (req, res) => {
  try {
    const { Agent_Code } = req.body;
    console.log(Agent_Code);
    const checkAgent = "SELECT * FROM agents WHERE Agent_Code = ?";

    con.query(checkAgent, [Agent_Code], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message:`Internal server error: ${err}`});
        return;
      }

      // If no matching agent record is found, send an error message
      if (result.length === 0) {
        res
          .status(400)
          .send({ message:"Agent record does not exist for the provided Agent_Code"});
        return;
      }

      const deleteQuery = "DELETE FROM agents WHERE Agent_Code = ?";

      con.query(deleteQuery, [Agent_Code], (err, deleteResult) => {
        if (err) {
          console.error(err);
          res.status(400).send({ message:`Internal server error${err}`});
          return;
        }
        res
          .status(200)
          .send({ message: `Agent with Agent Code${Agent_Code} deleted successfully`, query: true });
      });
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const de7ktest = async (req, res) => {
  console.log(req.body);
  res.send(req.body);
};

module.exports = {
  deleteEmployee,
  deletePort,
  deleteCountry,
  deleteShipType,
  deleteOperation,
  deleteDepart,
  deleteArrival,
  deleteShipDesc,
  deleteAgent,
};
