SELECT *
FROM products
JOIN users ON products.owner_id = users.id
WHERE users.id = 1;
