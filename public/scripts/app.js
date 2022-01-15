// Client facing scripts here
$(() => {
  $(".add-wishlist-form").on("click", replaceAddToWishlist); 
  $(".remove-wishlist-form").on("click", replaceRemoveWishlist);
  $("#message-form").on("submit", sendMessage);
});

const replaceAddToWishlist = function(e) {
  e.preventDefault();
  const $productId = $(this).closest('span').attr('id'); //extracts products id
  const product_id = $productId.slice(4);
  const $removeWishlistForm = $(`<form class="remove-wishlist-form"><button class="remove-from-wishlist">Remove from wishlist</button></form>`);

  $.post(`/products/wishlist/${product_id}/add`);
  $(`#${$productId}`).children('form:first').remove();
  $(`#${$productId}`).append($removeWishlistForm);
  location.reload();
};

const replaceRemoveWishlist = function(e) {
  e.preventDefault();
  const $productId = $(this).closest('span').attr('id');
  const product_id = $productId.slice(4);
  const $addWishlistForm = $(`<form class="add-wishlist-form"><button class="add-to-wishlist">Add to wishlist</button>
  </form>`);

  $.post(`/products/wishlist/${product_id}/delete`);
  $(`#${$productId}`).children('form:first').remove();
  $(`#${$productId}`).append($addWishlistForm);
  location.reload();
};