const dbconnect = require("../config/database");
const con = dbconnect.connection;

const getemp = async (limit = 0) => {
  return new Promise((resolve, reject) => {
    if (!limit) {
      var sql = `SELECT * FROM employees;`;
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

const fetchemployee = async (req, res) => {
  try {
    const lm = req.query.limit;
    const cbfun = await getemp(lm);
    if (cbfun === undefined) {
      throw {
        message: "There was an error retrieving the query",
        query: false,
      };
    } else {
      res.status(200).send({
        message: "Query Executed Correctly",
        query: true,
        getemp: cbfun,
      });
    }
  } catch (err) {
    res.status(500).send({ message:err});
  }
};

const loginEmp = async (req, res) => {
  try {
    console.log("login success");
    res.send("login success");
  } catch (error) {
    console.log(error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    console.log("login success");
    res.send("login success");
  } catch (error) {
    console.log(error);
  }
};

const addEmp = async (req, res) => {
  try {
    const { Employee_Name, Employee_Password, Email, Telephone, Role } = req.body;
    const sql = `INSERT INTO employees (Employee_Name, Employee_Password, Email, Telephone, Role) VALUES (?, ?, ?, ?, ?)`;
    con.query(
      sql,
      [Employee_Name, Employee_Password, Email, Telephone, Role],
      function (err, result) {
        if (err) {
          res.status(400).send({ message: err.sqlMessage, query: false });
        } else {
          res
            .status(200)
            .send({ message: `Employee  ${Employee_Name} added Correctly`, query: true }); 
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const addDepart = async (req, res) => {
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

    const departureID = "SELECT MAX(Arrival_ID) FROM ship_departure";

    const checkDepartureSql = "SELECT * FROM ship_departure WHERE Arrival_ID = ?";

    con.query(checkDepartureSql, [departureID], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message:"Internal server error"});
        return;
      }

      if (result.length > 0) {
        res.status(409).send({ message:"Arrival_ID already exists in ship_departure table"});
        return;
      }

      const sql = `
        INSERT INTO ship_departure (
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
          Berth_No_Depth
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      con.query(
        sql,
        [
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
        ],
        (err, result) => {
          if (err) {
            res.status(400).send({ message: err.sqlMessage, query: false });
          } else {
            res
              .status(200)
              .send({ message: `Depart  ${Voyage_No} added Correctly`, query: true }); 
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const addArrival = async (req, res) => {
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

    const sql = `
      INSERT INTO ship_arrival (
        Voyage_No,
        IMO,
        Arrival_Date_Plan,
        Arrival_Date_Actual,
        Port_of_Departure,
        Agent_Code,
        Berth_No,
        Berthing_Date,
        Cargo_Arrival,
        Op_Code
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    con.query(
      sql,
      [
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
      ],
      function (err, result) {
        if (err) {
          res.status(400).send({ message: err.sqlMessage, query: false });
        } else {
          res
            .status(200)
            .send({ message: `Arrival  ${Voyage_No} added Correctly`, query: true });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

const register = async (req, res) => {
  try {
    const { Admin_ID, Username, Admin_Password, Employee_ID } = req.body;
    const sql = `INSERT INTO admin (Admin_ID, Username, Admin_Password, Employee_ID) VALUES (?, ?, ?, ?)`;
    con.query(
      sql,
      [Admin_ID, Username, Admin_Password, Employee_ID],
      function (err, result) {
        if (err) {
          res.status(400).send({ message: err.sqlMessage, query: false });
        }
        res
          .status(200)
          .send({ message: `register by ${Username} at ${Date()}`, query: true });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fetchemployee,
  loginEmp,
  loginAdmin,
  addEmp,
  addArrival,
  addDepart,
  register,
};
