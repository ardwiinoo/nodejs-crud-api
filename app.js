const express = require("express");
const conn = require("./config/db");

const app = express();
const port = 3000;

app.use(express.json({ extended: true }));

// route
app.get("/get-mahasiswa", (req, res) => {
  const queryStr = "SELECT * FROM mahasiswa WHERE deleted_at IS NULL";

  conn.query(queryStr, (err, results) => {
    if (err) {
      console.info(err);
      res.error(err.sqlMessage, res);
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses Menampilkan Data!",
        results: results,
      });
    }
  });
});

app.post("/store-mahasiswa", (req, res) => {
  const param = req.body;
  const name = param.name;
  const jurusan = param.jurusan;

  const queryStr = "INSERT INTO mahasiswa (name, jurusan) VALUES (?, ?)";
  const values = [name, jurusan];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses Menyimpan Data!",
        data: null,
      });
    }
  });
});

app.get("/get-mahasiswa-by-id", (req, res) => {
  const param = req.query;
  const id = param.id;

  const queryStr =
    "SELECT * FROM mahasiswa WHERE id = ? AND deleted_at IS NULL";
  const values = [id];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses Menampilkan Data!",
        results,
      });
    }
  });
});

app.put("/update-mahasiswa", (req, res) => {
  const param = req.body;
  const id = param.id;
  const name = param.name;
  const jurusan = param.jurusan;
  const now = new Date();

  const queryStr =
    "UPDATE mahasiswa SET name = ?, jurusan = ?, updated_at = ? WHERE id = ? AND deleted_at IS NULL";
  const values = [name, jurusan, now, id];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses Update Data Mahasiswa!",
        data: null,
      });
    }
  });
});

app.delete("/delete-mahasiswa", (req, res) => {
  const param = req.body;
  const id = param.id;
  const now = new Date();

  const queryStr = "UPDATE mahasiswa SET deleted_at = ? WHERE id = ?";
  const values = [now, id];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses Menghapus Data Mahasiswa",
        data: null,
      });
    }
  });
});

// run server
app.listen(port, () => {
  console.info(`Server Running in port ${port}.`);
});
