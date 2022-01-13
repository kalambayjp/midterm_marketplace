$(() => {

  const $productsListing = $(`
  <section class="products-listings" id="products-listings">
    </section>
  `);

  window.$productsListing = $productsListing;


  const renderAllProducts = function() {

  $.get("/products/")
    .then(data => {
     console.log(data.products);
     $products = data.products;
     renderList($products);
    });


  const renderList = function(products) {
    for (const product of products) {
      $productsListing.append(`
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
  }

  window.$productsListing.renderAllProducts = renderAllProducts();

});
