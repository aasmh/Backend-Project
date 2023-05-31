const express = require('express');
const Routes = require('./src/routes/routes'); 

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//Routes Activation
app.use('/api/', Routes);

app.get("/", (req, res) => {
    res.send("Hello From Backend");
      });

//Set Server Port
app.listen(PORT ,() => {
    console.log(`Server running on port: http://localhost:${PORT}`);
  });