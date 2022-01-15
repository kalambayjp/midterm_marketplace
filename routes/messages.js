const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // ROUTE TO VIEW CHATS
  router.get("/:user_id/:product_id", (req, res) => {

    db.query(`
    SELECT messages.*, users.*, products.* FROM messages
    JOIN users ON users.id = messages.sender_id
    JOIN products ON products.id = messages.product_id
    WHERE (messages.sender_id = $1 OR messages.receiver_id = $1) AND products.id = $2
    ORDER BY time DESC;`, [req.session.userId, req.params.product_id])
      .then(data => {
        if (data.rows.length < 1) {
          db.query(`SELECT * from products WHERE id = $1;`, [req.params.product_id])
          .then(data => {
            const templateVars = {
              conversation: [],
              user_id: req.session.userId,
              userName: req.session.userName,
              product_id: data.rows[0].id,
              receiver_id: data.rows[0].owner_id,
              sender_id: req.session.userId,
              title: data.rows[0].title,
              img_url: data.rows[0].img_url
            }
            res.render("conversation", templateVars);
            return;
          })
          return;
        } else if (data.rows[0].sender_id === req.params.user_id) {
          receiver_id = data.rows[0].receiver_id;
        } else {
          receiver_id = data.rows[0].sender_id;
        }
        const templateVars = {
          conversation: data.rows,
          user_id: req.session.userId,
          userName: req.session.userName,
          product_id: data.rows[0].id,
          receiver_id: receiver_id,
          sender_id: req.session.userId,
          title: data.rows[0].title,
          img_url: data.rows[0].img_url
        }
        res.render("conversation", templateVars);
        return;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // ROUTE TO SEND MESSAGE IN CHAT
  router.post("/:receiver_id/:product_id", (req, res) => {
    const message = req.body.message;
    const messageTime = new Date(Date.now());
    const messageValues = [req.params.product_id, req.session.userId, req.params.receiver_id, message, messageTime];

    db.query(`
    INSERT INTO messages (product_id, sender_id, receiver_id,  message, time)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`, messageValues)
      .then(data => {
        res.redirect(`../${req.params.user_id}/${req.params.product_id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};