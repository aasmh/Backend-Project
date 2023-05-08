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
    console.log("employee added");
    res.send("employee added");
  } catch (error) {
    console.log(error);
  }
};

const addDepart = async (req, res) => {
  try {
    console.log("Depart added");
    res.send("Depart added");
  } catch (error) {
    console.log(error);
  }
};
const addArrival = async (req, res) => {
  try {
    console.log("Arrival added");
    res.send("Arrival added");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  //   const { name, email, password, password_confirm } = req.body;
  //   db.query(
  //     "SELECT email FROM users WHERE email = ?",
  //     [email],
  //     async (error, res) => {
  //       // remaining code goes here
  //     }
  //   );
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
