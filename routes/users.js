/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/user/:user_id", (req, res) => {
    db.query(`SELECT *
    FROM users
    WHERE users.id = $1;`,[req.params.user_id])
      .then(data => {
        const users = data.rows[0];
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/new", (req, res) => {
    res.render("user_reg");
  });

  router.post("/new", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query(`INSERT INTO users
    (name, email, password, phone_number, country, city, province, street, post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, [name, email, password,'', 'Canada', 'Toronto','ON','', 'N3V7T5'])
      .then(data => {
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  return router;
};
