/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Login
  router.post("/login", (req, res) => {
    const email = req.body.email;

    db.query(`SELECT id, name, email, password
    FROM users
    WHERE users.email = $1;`,[email])
      .then(data => {
        const user = data.rows[0];
        req.session.userId = user.id;
        req.session.userName = user.name;

        res.redirect('/products');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Logout
  router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect('/products');
  });

  
  // VIEW REGISTER FORM
  router.get("/new", (req, res) => {
    res.render("user_reg");
  });

  // POST REGISTER FORM
  router.post("/new", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query(`INSERT INTO users
    (name, email, password, phone_number, country, city, province, street, post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id
    ;`, [name, email, password,'', 'Canada', 'Toronto','ON','', 'N3V7T5']) // HARD CODED ADDITIONAL INFO ON REGISTER
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
