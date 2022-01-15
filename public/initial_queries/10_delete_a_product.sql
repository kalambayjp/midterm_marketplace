DELETE FROM products
WHERE products.id = $1
AND owner_id = $2;
