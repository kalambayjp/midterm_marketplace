UPDATE products
SET title=$1, category_id=$2, description=$3, img_url=$4, price=$5, featured=$6, sold=$7, listed_on=$8
WHERE products.id = $9;
