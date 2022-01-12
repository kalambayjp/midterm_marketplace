## CSS
- normalize
- bootstrap

## Division of tasks
- Horizontal
- pair programming

## Routes
## products
[x] get /products
[x] get /products/product/:id
[x] get /products/user/:user_id
[x] get /products/whishlist/:user_id
[x] get /products/search_by_price //filtering products by price
[x] post /products/new //listing new product
[x] get /products/product/:id/edit // edit product form
[x] post /products/product/:id/edit //edit a product submit
[x] delete /products/product/:id/delete //delete a product
[x] post /products/whishlist/:user_id/add // add a product to wishlist
[x] delete /products/whishlist/:user_id/delete // delete a product from wishlist

## users
[x] get /users
[x] get /users/user/:user_id    //individual user profile
[x] get /users/new  //Register form
[X] post /users/new      //adding new user

## messages
[x] get /messages //display list of all messages
[x] get /messages/:product_id //display messages related to a product
[x] post /messages/:product_id //send messages about a product


## stretch routes
[] get /products/search_by_category //filtering products by category
[] post /users/:user_id/edit 
[] delete /users/:user_id/delete 
[] delete /messages/:product_id/delete //delete a message

## EJS Templates
[-] index // Don't need 2 templates
[x] listings or homepage
[x] single product
[] add new product 
[] user profile
[] user registration 
[-] message // goes to single product page
[] conversations 
[-] login // goes to listings
[-] register // dublicate
[] Partials:
  [..] navbar
  [x] header
  [x] footer

## APIs
[] gmail api
