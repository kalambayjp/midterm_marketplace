SELECT *
FROM messages
JOIN users ON messages.user_id = users.id
JOIN products ON messages.product_id = products.id
WHERE users.id = $1 AND products.id = $2
ORDER BY time DESC
LIMIT 10;
