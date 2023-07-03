const express = require('express');
const Routes = require('./src/routes/routes');
const cors = require('cors');
const dbconnect = require('./src/config/database');
const con = dbconnect.connection;
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;


// app.use(cors({
//   origin: (origin, callback) => {
//     callback(null, true);
//   },
//   credentials: true,
// }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/', Routes);

app.get('/', (req, res) => {
  res.send('Hello From Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});

function keepAlive() {
  con.query('SELECT 1', (error, results) => {
    if (error) {
      console.error('Error executing keep-alive query:', error);
    } else {
      console.log('Keep-alive query executed successfully');
    }
  });
}

// Set the interval for executing the keep-alive query (every 7 hours in this example)
const interval = 7 * 60 * 60 * 1000;
setInterval(keepAlive, interval);


































































































































































































" "