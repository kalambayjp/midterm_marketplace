$(() => {

  const $main = $('#vl-main-content');

  window.views_manager = {};

  window.views_manager.show = function(item) {

    $productsListing.detach();
    $signUpForm.detach();
    $productsWishList.detach();

    switch (item) {
      case 'products':
        $productsListing.appendTo($main);
        break;
      case 'signUp':
        $signUpForm.appendTo($main);
        break;
      case 'wishlist':
        $productsWishList.appendTo($main);
        break;
    }
  }

});
