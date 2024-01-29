const mysql = require("mysql2");

const connection = mysql.createConnection(process.env.DB_URI);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }

  console.log("Connected to MySQL database as id " + connection.threadId);
});

module.exports = connection;
