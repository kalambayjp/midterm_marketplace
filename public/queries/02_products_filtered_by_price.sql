SELECT *
FROM products
WHERE price > 0
AND price < 1000000000
ORDER BY price
LIMIT 8;
