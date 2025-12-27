require("dotenv").config();

const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const uuid = require('uuid');
const path = require("path");

//for css
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: process.env.DB_PASSWORD
});

function getRandomUser() {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// for (let i = 1; i <= 100; i++) {
//   data.push(getRandomUser());
// }

// let q = "INSERT INTO `user` (id, username, email, password) VALUES ?";
// let data = [];

// connection.query(q, [data], (err, result) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log("Inserted rows:", result.affectedRows);
//   connection.end(); //end the connection
// });

//Home route
app.get("/", (req, res) => {
  const q = "SELECT COUNT(*) AS count FROM `user`";

  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    console.log("DB RESULT:", result); // 👈 MUST log
    const count = result[0].count;

    res.render("home.ejs", { count });
  });
});

//show route
app.get("/user", (req, res) => {
  const q = "SELECT * FROM `user`"; //Because user is a RESERVED KEYWORD in MySQL.

  try {
    connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    let data = result;
    //console.log(data);
    res.render("user.ejs", {data});
  });
  } catch (error) {
    console.log(error);
  }
  });


//edit route
app.get("/user/:id/edit", (req, res) => {
  const { id } = req.params;

  const q = "SELECT * FROM `user` WHERE id = ?";
  
  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    const user = result[0]; //object of user 
    res.render("edit.ejs", { user });
  });
});


app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const { password: formPass, username: newUsername } = req.body;

  const q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
    if (err) throw err;

    let user = result[0];
    if(formPass != user.password) {
      res.send("Wrong Password!");
      return;
    } else {
      let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
      connection.query(q2, (err, result) => {
        if (err) throw err;

        res.redirect("/user");
      });
    }
    
  });
  } catch (error) {
    console.log(error);
  }
}); 

// show delete confirmation page
app.get("/user/:id/remove", (req, res) => {
  const { id } = req.params;

  const q = "SELECT * FROM `user` WHERE id = ?";

  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    const user = result[0];
    res.render("remove.ejs", { user, error: null });
  });
});

// delete route with password check
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const q = "SELECT * FROM `user` WHERE id = ?";

  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    const user = result[0];

    if (password !== user.password) {
      // wrong password → reload remove page with error
      return res.render("remove.ejs", {
        user,
        error: "Incorrect password. Try again."
      });
    }

    const q2 = "DELETE FROM `user` WHERE id = ?";

    connection.query(q2, [id], (err) => {
      if (err) {
        console.log(err);
        return res.send("Database error");
      }

      res.redirect("/user");
    });
  });
});


//Add user
app.get("/user/new", (req, res) => {
  res.render("addUser.ejs");

});

app.post("/user/", (req, res) => {
  const { username, email, password} = req.body;
  let id = uuid.v4();

  let q = "INSERT INTO `user` (id, username, email, password) VALUES (?,?,?,?)";

  connection.query(q, [id, username, email, password], (err, result) => {
    try {
      if (err) throw err;

      res.redirect("/user");
    } catch(err) {
      console.log(err);
      res.send("Database error");
    }
  });
  
});

app.listen(8080, () => {
  console.log("server is listening at port 8080");
});




//inserting New Data

// let q = "INSERT INTO user (id, username, email, password) VALUES (?,?,?,?)";
// let user = [124, "123_newuser", "abc@gmail.com", "abc"],
//        