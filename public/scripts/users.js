// Client facing scripts here
$(() => {

  $("#logout").on("click", logout)
  .then(() => {
    // header.update();
  });
  $("#login-form").on("click", login)
  .then(() => {
    $("#page-header").update();
  });
  $("#click").on("click", renderSignUpForm);
  $("#vl-products").on("click", renderProducts)
  $("#vl-wishlist").on("click", wishList)

});

const logout = function(e) {
  e.preventDefault();

  $.post("users/logout")
  //  .then(() => {
  //   window.update();
  // });

};

const login = function(e) {
  e.preventDefault();
  $.post("users/login", $(this).serialize())
  // .then(() => {
  //   $("#page-header").update();
  // });
};


const renderSignUpForm = function() {
  views_manager.show('signUp');
  }

const renderProducts = function() {

  views_manager.show('products');
  }


const wishList = function() {

  views_manager.show('wishlist');
  }

