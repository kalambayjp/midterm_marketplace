UPDATE products
SET featured=$1
WHERE products.id = $2
AND user_id = $3;
