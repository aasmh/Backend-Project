const dbconnect = require("../config/database");
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
    res.send(`Employe with the id ${id} deleted from the database.`);
  });
};

module.exports = {
  deleteEmployee,
};
