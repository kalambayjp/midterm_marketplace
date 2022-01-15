// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const cookieSession = require('cookie-session');

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

const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const messagesRoutes = require("./routes/messages");

app.use("/users", usersRoutes(db));
app.use("/products", productsRoutes(db));
app.use("/messages", messagesRoutes(db));

// Home page
app.get("/", (req, res) => {
  res.redirect("/products");
});

app.listen(PORT, () => {
  console.log(`TECHMARKET app listening on port ${PORT}`);
});
