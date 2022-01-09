INSERT INTO messages (user_id, product_id, message)
VALUES ($1, $2, input_text)
RETURNING *;
