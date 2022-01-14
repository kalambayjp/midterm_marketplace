// Client facing scripts here
$(() => {

  // $("#logout").on("click", logout);
  // $("#login-form").on("submit", login);
  $("#click").on("click", renderSignUpForm);
  $("#vl-products").on("click", renderProducts)
  $("#vl-wishlist").on("click", wishList)
  // $("#vl-delete").on("click", deleteProduct)

});

// const logout = function(e) {
//   e.preventDefault();

//   $.post("users/logout")
//   .then(data => {
//   });

// };

// const login = function(e) {
//   e.preventDefault();
//   $.post("/users/login", $(this).serialize())
//   // .then(data => console.log(data))
//   // .catch(err => console.log('Login error', err));
// };


const renderSignUpForm = function() {
  views_manager.show('signUp');
  }

const renderProducts = function() {

  views_manager.show('products');
  }


const wishList = function() {

  views_manager.show('wishlist');
  }

// const deleteProduct = function(e) {
//   e.preventDefault();
//   const $productId = $(this).closest('span').attr('id')
//   const product_id = $productId,slice(8);
//   console.log('product_id to delete', product_id);
//   console.log($(this));
//   $.post(`/products/product/${product_id}/delete`)
// }
