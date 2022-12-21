const mysql = require("mysql");

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs_mhs",
  charset: "utf8mb4",
  timezone: "+07:00", // Jakarta
});

conn.getConnection((err) => {
  if (err) throw err;

  console.info("DB Connected!");
});

module.exports = conn;
