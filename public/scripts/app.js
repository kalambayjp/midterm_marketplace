// Client facing scripts here
$(() => {

  // $("#wishlist").on("click", renderWishList);
  // $("#myListings").on("click", renderMyProducts);
  
  $(".add-wishlist-form").on("click", replaceAddToWishlist) 

  const $pageHeader = $('#page-header');

  $("#message-form").on("submit", sendMessage);
});

const replaceAddToWishlist = function(e) {
  e.preventDefault();
  const $productId = $(this).closest('span').attr('id')
  const product_id = $productId.slice(4)

  const $removeWishlistForm = $(`<form class="remove-wishlist-form" method="post" action="products/wishlist/${product_id}/delete"><button class="remove-from-wishlist">Remove from wishlist</button></form>`);

    $.post(`/products/wishlist/${product_id}/add`);
    console.log("Clicked!");

    $(`#${$productId}`).children('form:first').remove()
    $(`#${$productId}`).append($removeWishlistForm)
};

const renderWishList = function(e) {
  e.preventDefault();
  console.log("Clicked!");

  $.get("/products/wishlist/1") // USER ID is hard coded!!!
    .then(data => {
      console.log(data.products);
      $products = data.products;
      renderList($products);
      //  renderUsers(data.users);
    });
};

const renderMyProducts = function (e) {
  e.preventDefault();
  console.log("Clicked!");

  $.get("/products/user/2") // USER ID is hard coded!!!
    .then(data => {
      console.log(data.products);
      $products = data.products;
      renderList($products);
      //  renderUsers(data.users);
    });
};

const renderList = function (products) {
  const $container = $("#featured");
  for (const product of products) {
    $container.append(`
    <div>${product.title}</div>
    <tbody>
          <tr class="product-row">

              <td class="product-block">
                <span class="product-thumbnail">
                  <img src="${product.img_url}" alt="${product.title}" />
                </span>
                <span class="product-details">
                  <h3 class="product-title">
                   ${product.title}
                  </h3>
                  <hr>
                  <h4 class="product-price">Price: $${((product.price) / 100).toFixed(2)}
                  </h4>
                  <hr>
                  <span class="product-buttons">
                    <a href="/products/product/${product.id}"><button class="view-details">View product details</button></a>
                    <button class="add-to-wishlist">Add to wishlist</button>
                    <button class="contact seller">Contact seller</button>
                  </span>
                </span>
              </td>

          </tr>
        </tbody>
    `);
  }
}

// RENDER MESSAGES IN SINGLE PRODUCT PAGE

// const renderMessages = (e) => {
//   e.preventDefault();
//   console.log("Clicked!");
//   console.log($(this));
//   $('#message-box').show();
//   $.get(`/messages/1/15`) //HARDCODED
//     .then(message => {
//       bringMessages(message.conversation);
//     })
//     .catch(err => err);
// };

const bringMessages = function (conversation) {
  const $container = $("#messages-container");
  for (let mess in conversation) {
    $container.append(`
        <li class="sender">
          ${conversation[mess].message}
        </li>
      <p>Sent by ${conversation[mess].name} @ TimeStamp </p>
    `);
  }
};

const sendMessage = (e) => {
  e.preventDefault();
  console.log('Hello message');
  // console.log(data.body)
  const message = "$(this).serialized()";
  $.post(`/messages/1/2`, message) //HARDCODED
  // .then((data) => {
  //   console.log(data);
  // })
}

// const showMessageList = (e) => {
//   e.preventDefault();
//   console.log('Clicked');
//   $.get(`/messages/7/1/15`)
//   .then(data => {
//     console.log(data);
//     const $listContainer = $(".message-box");
//     $listContainer.toggle();
//   })
// }
