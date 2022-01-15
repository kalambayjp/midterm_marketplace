SELECT *
FROM products
JOIN wishlist_items ON wishlist_items.product_id = products.id
JOIN users ON wishlist_items.user_id = users.id
WHERE users.id = $1;
