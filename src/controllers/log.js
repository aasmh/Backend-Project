const dbconnect = require("../config/database");
const con = dbconnect.connection;
const ctrl = require("../controllers/gets");

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
    res.status(500).send(err);
  }
};

const loginEmp = async (req, res) => {
  try {
    console.log("login sececess ");
    res.send("login sececess");
  } catch (error) {
    console.log(error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    console.log("login sececess ");
    res.send("login sececess");
  } catch (error) {
    console.log(error);
  }
};

const addEmp = async (req, res) => {
  try {
    const {
      Employee_ID,
      Employee_Name,
      Employee_Password,
      Email,
      Telephone,
      Address,
      Agent_Code,
      ship_description_IMO,
    } = req.body;
    const sql = `INSERT INTO employees (Employee_ID, Employee_Name, Employee_Password, Email
                , Telephone , Address , Agent_Code , ship_description_IMO )  VALUES (?, ? , ? ,?,?, ? , ? ,?)`;
    con.query(
      sql,
      [
        Employee_ID,
        Employee_Name,
        Employee_Password,
        Email,
        Telephone,
        Address,
        Agent_Code,
        ship_description_IMO,
      ],
      function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send("Internal server error");
          return;
        }
        res
          .status(200)
          .send(
            `employee with the name ${Employee_Name} with ID ${Employee_ID} added to the database!`
          );
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const addDepart = async (req, res) => {
  try {
    const {
      Arrival_ID,
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
      ship_arrival_Voyage_No,
    } = req.body;

    const sql = `INSERT INTO ship_departure (
        Arrival_ID,
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
        ship_arrival_Voyage_No
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(
      sql,
      [
        Arrival_ID,
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
        ship_arrival_Voyage_No,
      ],
      function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send("Internal server error");
          return;
        }
        res
          .status(200)
          .send(
            `Ship departure with the ID ${Voyage_No} added to the database!`
          );
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const addArrival = async (req, res) => {
  try {
    const {
      Arrival_ID,
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
    const sql = `INSERT INTO ship_arrival ( Arrival_ID, Voyage_No, IMO, Arrival_Date_Plan, Arrival_Date_Actual,
                 Port_of_Departure, Agent_Code, Berth_No, Berthing_Date, Cargo_Arrival, Op_Code) 
                 VALUES (?, ? , ? ,?, ? , ? ,?, ? , ? ,?, ?)`;
    con.query(
      sql,
      [
        Arrival_ID,
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
          console.error(err);
          res.status(500).send("Internal server error");
          return;
        }
        res
          .status(200)
          .send(
            `Ship arrival with the name ${Arrival_ID} with ID ${Voyage_No} added to the database!`
          );
      }
    );
  } catch (error) {
    console.log(error);
  }
};
// add admin
const register = async (req, res) => {
  try {
    const { Admin_ID, Username, Admin_Password, Employee_ID } = req.body;
    const sql = `INSERT INTO admin (Admin_ID , Username, Admin_Password , Employee_ID)  VALUES (?, ? , ? ,?)`;
    con.query(
      sql,
      [Admin_ID, Username, Admin_Password, Employee_ID],
      function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send("Internal server error");
          return;
        }
        res
          .status(200)
          .send(
            `admin with the username ${Username} with ID ${Admin_ID} added to the database!`
          );
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