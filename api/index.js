const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Set up Global configuration access
dotenv.config();

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "methee",
  },
});

app.use(cors());
app.use(bodyParser.json());
const port = 7000;

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Login endpoint
app.post("/login", async (req, res) => {
  console.log(req.body);

  // Check request
  if (req.body.email === "" || req.body.passwd === "") {
    return res.send({
      message: "Username and password must not be empty",
      status: "0",
    });
  }

  // Check user and password
  try {
    let ids = await knex("users").where({
      email: req.body.email,
      password: req.body.passwd,
    });

    if (ids.length === 0) {
      return res.send({
        message: "Invalid username or password",
        status: "error_user",
      });
    }

    // Generate JWT token
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ email: req.body.email }, jwtSecretKey);

    res.send({
      message: "Login success",
      status: "success",
      row: ids[0],
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Insert user endpoint
app.post("/insert", async (req, res) => {
  console.log("data=", req.body);
  const { username, password, email } = req.body;

  try {
    const ids = await knex("users").insert({
      username: username,
      password: password,
      email: email,
    });

    res.send({
      ok: 1,
      id: ids[0],
    });
  } catch (error) {
    console.error(error);
    res.send({ ok: 0, error: error.message });
  }
});

// List all users
app.get("/list", async (req, res) => {
  try {
    const rows = await knex("users");
    res.send({
      status: "yes",
      row: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Search for a user (แก้ไขแล้ว)
app.get("/user", async (req, res) => {
  const { username, email } = req.query;

  try {
    const query = knex("users");

    if (username) {
      query.where({ username: username });
    }
    
    if (email) {
      query.where({ email: email });
    }

    const rows = await query;
    
    if (rows.length === 0) {
      return res.send({
        status: "no",
        message: "No user found",
      });
    }

    res.send({
      status: "yes",
      row: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Delete a user
app.post("/delete", async (req, res) => {
  console.log("data to delete=", req.body);
  const { id } = req.body;

  try {
    await knex("users").where({ id: id }).del();
    res.send({ ok: 1 });
  } catch (error) {
    console.error(error);
    res.send({ ok: 0, error: error.message });
  }
});

// Generate JWT token
app.post("/user/generateToken", (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ userId: 12 }, jwtSecretKey);

  res.send({ token });
});

// Verify JWT token
app.get("/user/validateToken", (req, res) => {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.headers[tokenHeaderKey];
    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      res.send("Successfully Verified");
    } else {
      res.status(401).send("Access Denied");
    }
  } catch (error) {
    res.status(401).send("Access Denied");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
