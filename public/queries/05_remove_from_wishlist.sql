DELETE FROM wishlists WHERE wishlists.id = (SELECT wishlists.id FROM wishlists
JOIN products ON wishlists.product_id = products.id
JOIN users ON wishlists.user_id = users.id
WHERE users.id = $1 AND products.id = $2);
