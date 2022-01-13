// Client facing scripts here
$(() => {

  console.log('Ready');
  $("#wishlist").on("click", renderWishList);
  $("#myListings").on("click", renderMyProducts);
  $(".add-wishlist-form").on("click", replaceAddToWishlist) 
  


});

const replaceAddToWishlist = function(e) {
  e.preventDefault();
  const $productId = $(this).closest('span').attr('id')
  const product_id = $productId.slice(4)
  
  
  if ($(".login-as")) {
    $.post(`/products/wishlist/${product_id}/add`);
    console.log("Clicked!");
    
    const $removeWishlistForm = $(`<form class="remove-wishlist-form" method="post" action="products/wishlist/<%= product.id %>/delete"><button class="remove-from-wishlist">Remove from wishlist</button></form>`);

    $(`#${$productId}`).children('form:first').remove()
    $(`#${$productId}`).append($removeWishlistForm)
  } else {
    console.log('please login/register')
  }

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

const renderMyProducts = function(e) {
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

const renderList = function(products) {
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

  // for (const product of products) {

  //   const wishProduct = $container.append(

  //     `<tbody>
  //       <tr class="product-row">

  //           <td class="product-block">
  //             <span class="product-thumbnail">
  //               <img src="${product.img_url}" alt="${product.title}" />
  //             </span>
  //             <span class="product-details">
  //               <h3 class="product-title">
  //                ${product.title}
  //               </h3>
  //               <hr>
  //               <h4 class="product-price">Price: $${((product.price) / 100).toFixed(2)}
  //               </h4>
  //               <hr>
  //               <span class="product-buttons">
  //                 <a href="/products/product/${product.id}"><button class="view-details">View product details</button></a>
  //                 <button class="add-to-wishlist">Add to wishlist</button>
  //                 <button class="contact seller">Contact seller</button>
  //               </span>
  //             </span>
  //           </td>

  //       </tr>
  //     </tbody>`

  //   );

    // return wishProduct;


      // $container.append(`<li>${user.name}</li>`)
    // }

}
// const renderUsers = function(users) {

//   const $container = $("container");
//   for (const user of users) {

//     $container.append(`<li>${user.name}</li>`)
//   }
// };
