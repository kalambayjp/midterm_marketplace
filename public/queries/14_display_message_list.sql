SELECT *
FROM messages
JOIN users ON sender_id = users.id
JOIN products ON product_id = products.id
WHERE sender_id = $1
AND product_id = $2
AND receiver_id = $3
ORDER BY time;
