const express = require("express");
const app = express();
const port = 4000; // or any other desired port
//setting up DB
const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "contact",
  port: 3306,
});

//serving static website
app.use("/", express.static("./website"));

//Insert data route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/insert", (req, res) => {
  const data = { name: req.body.name, email: req.body.email, subject: req.body.subject, messege: req.body.messege, phone: req.body.phone, Birth: req.body.Birth, radio: req.body.radio };
  const query = "INSERT INTO User SET ?";

  pool.query(query, data, (error, result) => {
    if (error) throw error;

    res.send("Data sent successfully!");
  });
});
// View data route
app.get("/view", (req, res) => {
    const query = "SELECT * FROM User";
  
    pool.query(query, (error, result) => {
      if (error) throw error;
  
      res.json(result);
    });
  });
//activating server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
    