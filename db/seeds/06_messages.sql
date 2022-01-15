INSERT INTO messages (sender_id, receiver_id, product_id, message)
VALUES (1, 7, 15, 'Hi'),
(7, 1, 15, 'Hello'),
(1, 7, 15, 'Is it still available?'),
(7, 1, 15, 'Yep')

RETURNING *;
