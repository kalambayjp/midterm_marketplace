const express = require('express');
const users = require('./users');
const router  = express.Router();

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

  router.get("/:user_id/:product_id", (req, res) => {



    db.query(`SELECT messages.*, users.*, products.* FROM messages
    JOIN users ON users.id = messages.sender_id
    JOIN products ON products.id = messages.product_id
    WHERE (messages.sender_id = $1 OR messages.receiver_id = $1) AND products.id = $2
    ORDER BY time DESC
    ;`, [req.session.userId, req.params.product_id])
      .then(data => {
        console.log('before conditional  >>>', data.rows);
        if (data.rows.length < 1) {
          console.log("Hello");
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
            console.log(templateVars);
            res.render("conversation", templateVars);
            return;

          })
          return;
        } else if (data.rows[0].sender_id === req.params.user_id) {
          receiver_id = data.rows[0].receiver_id;
        } else {
          receiver_id = data.rows[0].sender_id;
        }

        console.log([req.params.product_id, req.session.userId, receiver_id])

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
        console.log(templateVars);
        // res.json({ conversation });
        res.render("conversation", templateVars);
        return;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Send message

  router.post("/:receiver_id/:product_id", (req, res) => {
    const message = req.body.message;
    const messageTime = new Date(Date.now());

    // const receiver_id = req.params.receiver_id;
    const messageValues = [req.params.product_id, req.session.userId, req.params.receiver_id, message, messageTime];
    console.log('POST a message:');
    console.log(req.body.message);

    db.query(`INSERT INTO messages (product_id, sender_id, receiver_id,  message, time)

    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, messageValues)
      .then(data => {

        res.redirect(`../${req.params.user_id}/${req.params.product_id}`);
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


// INSERT INTO messages (product_id, sender_id, receiver_id,  message, time)
//     VALUES (11, '7', '16', 'hi adam', '2022-01-14T23:14:14.636Z')
//     RETURNING *;
