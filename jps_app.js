const replaceAddToWishlist = function(e) {
  e.preventDefault();
  console.log("Clicked!");
  
  const $removeWishlistForm = $(`<form class="remove-wishlist-form" method="post" action="products/wishlist/<%= product.id %>delete/"><button class="remove-from-wishlist">Remove from wishlist</button></form>`);

  $(".add-wishlist-form").remove()
  $(".product-buttons").append($removeWishlistForm)
};

