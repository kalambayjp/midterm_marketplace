// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const cookieSession = require('cookie-session');
// const bodyParser = require('body-parser');

const app = express();
const morgan = require("morgan");
app.use(cookieSession({
  name: 'session',
  keys: ['marketplace','midterm']
}));

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const messagesRoutes = require("./routes/messages");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/products", productsRoutes(db));
app.use("/messages", messagesRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {

  const userID = req.session.userId;
  const userName = req.session.userName;

  db.query(`
    SELECT *
    FROM products
    WHERE sold = false
    LIMIT 4;`)
      .then(data => {
        // console.log(data.rows);
        const templateVars = {
          products: data.rows,
          user_id: userID,
          userName: userName
        }
        // const products = data.rows;
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});


// app.get("/test", (req, res) => {
//   res.render("test");
// });

app.listen(PORT, () => {
  console.log(`TECHMARKET app listening on port ${PORT}`);
});
