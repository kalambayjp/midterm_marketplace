// Client facing scripts here
$(() => {

  console.log('Ready');
  $("#logout").on("click", logout);
  $("#login-form").on("submit", login);


});

const logout = function(e) {
  e.preventDefault();
  // console.log("Clicked!");

  $.post("users/logout")
  .then(data => {
  //  console.log(data);
  });

};

const login = function(e) {
  e.preventDefault();
  $.post("/users/login", $(this).serialize())
  // .then(data => console.log(data))
  // .catch(err => console.log('Login error', err));
};






// const renderMyProducts = function(e) {
//   e.preventDefault();
//   console.log("Clicked!");

//   $.get("/products/user/2") // USER ID is hard coded!!!
//   .then(data => {
//    console.log(data.products);
//    $products = data.products;
//    renderList($products);
//   //  renderUsers(data.users);
//   });

// };

// const renderList = function(products) {
//   const $container = $("#featured");
//   for (const product of products) {
//     $container.append(`
//     <div>${product.title}</div>
//     <tbody>
//           <tr class="product-row">

//               <td class="product-block">
//                 <span class="product-thumbnail">
//                   <img src="${product.img_url}" alt="${product.title}" />
//                 </span>
//                 <span class="product-details">
//                   <h3 class="product-title">
//                    ${product.title}
//                   </h3>
//                   <hr>
//                   <h4 class="product-price">Price: $${((product.price) / 100).toFixed(2)}
//                   </h4>
//                   <hr>
//                   <span class="product-buttons">
//                     <a href="/products/product/${product.id}"><button class="view-details">View product details</button></a>
//                     <button class="add-to-wishlist">Add to wishlist</button>
//                     <button class="contact seller">Contact seller</button>
//                   </span>
//                 </span>
//               </td>

//           </tr>
//         </tbody>
//     `);
//   }


// }

