DELETE FROM wishlist_items WHERE wishlist_items.id = (SELECT wishlist_items.id FROM wishlist_items
JOIN products ON wishlist_items.product_id = products.id
JOIN users ON wishlist_items.user_id = users.id
WHERE users.id = $1 AND products.id = $2);
