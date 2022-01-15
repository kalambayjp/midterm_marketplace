SELECT name, email, phone_number
FROM users
JOIN products ON products.owner_id = users.id
WHERE products.id = $1;
