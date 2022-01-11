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
[] post /products/new //listing new product
[] get /products/product/:id/edit // edit product form
[] post /products/product/:id/edit //edit a product submit
[] delete /products/product/:id/delete //delete a product
[] post /products/whishlist/:user_id/add // add a product to wishlist
[] delete /products/whishlist/:user_id/delete // delete a product from wishlist
[] get /products/search_by_price //filtering products by price

## users
[x] get /users
[x] get /users/user/:user_id    //individual user profile
[x] get /users/new  //Register form
[X] post /users/new      //adding new user

## messages
[] get /messages //display list of all messages
[] get /messages/:product_id //display messages related to a product
[] post /messages/:product_id //send messages about a product


## stretch routes
[] get /products/search_by_category //filtering products by category
[] post /users/:user_id/edit 
[] delete /users/:user_id/delete 
[] delete /messages/:product_id/delete //delete a message

## EJS Templates
[..] index
[] products
[] single product
[] add new product
[] user profile
[] message
[] login
[..] register
[] Partials:
  [..] navbar
  [] header
  [] footer

## APIs
[] gmail api
