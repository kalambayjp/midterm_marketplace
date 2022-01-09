SELECT *
FROM products
JOIN wishlists ON wishlists.product_id = products.id
JOIN users ON wishlists.user_id = users.id
WHERE users.id = $1;
