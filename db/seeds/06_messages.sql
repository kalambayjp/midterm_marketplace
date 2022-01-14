INSERT INTO messages (sender_id, receiver_id, product_id, message, time)
VALUES (1, 7, 15, 'Hi', '2022-01-13T00:52:58.758'),
(7, 1, 15, 'Hello', '2022-01-13T00:56:58.758'),
(1, 7, 15, 'Is it still available?', '2022-01-14T00:52:58.758'),
(7, 1, 15, 'Yep', '2022-01-14T00:55:59.611')


RETURNING *;
