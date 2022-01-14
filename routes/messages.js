const express = require('express');
const { networkInterfaces } = require('os');
const users = require('./users');
const router = express.Router();

module.exports = (db) => {

  let receiver;
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM messages;`)
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

  router.get("/:user_id/:receiver_id/:product_id", (req, res) => {

    db.query(`SELECT messages.*, users.name, users.id as sender_id, products.img_url, products.title, products.id as product_id
    FROM messages
    JOIN users ON sender_id = users.id
    JOIN products ON messages.product_id = products.id
    ORDER BY time DESC
    ;`)
      .then(data => {

        if (!data.rows[0].receiver_id) {
          receiver_id = data.rows[0].owner_id;
        } else if (data.rows[0].sender_id === req.params.user_id) {
          receiver_id = data.rows[0].receiver_id;
        } else {
          receiver_id = data.rows[0].sender_id;
        }

        console.log('inputs >> ', [req.session.userId, receiver_id, req.params.product_id])

        const templateVars = {
          conversation: data.rows,
          user_id: req.session.userId,
          userName: data.rows[0].name,
          product_id: data.rows[0].id,
          receiver_id: receiver_id
        }
        res.render("conversation", templateVars);

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:user_id/:receiver_id/:product_id", (req, res) => {
    const message = req.body.message;
    const messageTime = new Date(Date.now());
    // const receiver_id = data.rows[0].receiver_id;
    const messageValues = [req.session.userId, req.params.receiver_id, req.params.product_id, message, messageTime];

    console.log('POST a message:');
    console.log(messageValues);
    console.log('req: ', req);

    db.query(`INSERT INTO messages (sender_id, receiver_id, product_id, message, time)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, messageValues)
      .then(data => {
        res.redirect(`../1/${req.params.product_id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:user_id", (req, res) => {
    db.query(`SELECT products.title, COUNT(messages.message)
    FROM messages
    JOIN products ON messages.product_id = products.id
    WHERE messages.sender_id = $1 OR messages.receiver_id = $1
    GROUP BY products.id;`, [req.params.user_id])
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


  return router;
};


// const postTime = Date.now();



// SELECT sender_id, receiver_id, message, messages.product_id
//     FROM messages
//     JOIN users ON messages.sender_id = users.id
//     JOIN products ON messages.product_id = products.id
//     WHERE messages.product_id = 3 AND (sender_id = 1 OR receiver_id = 1)
//     ORDER BY time DESC;


