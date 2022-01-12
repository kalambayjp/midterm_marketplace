const renderProducts = function(e) {
  e.preventDefault();
  console.log("Clicked!");

  $.get("/") 
  .then(data => {
    console.log(data);
    $products = data;
    renderList($products);
  //  renderUsers(data.users);
  });

};

router.get("/", (req, res) => {
  let queryString = `
  SELECT *
  FROM products
  WHERE sold = false
  `;
  let queryParams = [];

  if (inputs.minimum_price) {
    queryParams.push(inputs.minimum_price * 100);
    queryString += `\nAND price >= $${queryParams.length}`;
    
    if (inputs.maximum_price) {
      queryParams.push(inputs.maximum_price * 100);
      queryString += `\nAND price <= $${queryParams.length}\n LIMIT 8;`;

      return db.query(queryString, queryParams)
      .then(data => {
      const products = data.rows;
      res.render('products', products);
      })
      .catch(err => {
        // res.render('***', err);
        alert(err);
      });    
    }

    queryString += `\nLIMIT 8;`;
    return db.query(queryString, queryParams)
    .then(data => {
      const products = data.rows;
      res.render('products', products);
    })
    .catch(err => {
      // res.render('***', err);
      alert(err);
    });
  } else if (inputs.maximum_price) {
    queryParams.push(inputs.maximum_price * 100);
    queryString += `\nAND price <= $${queryParams.length}\nLIMIT 8;`;

    return db.query(queryString, queryParams)
    .then(data => {
    const products = data.rows;
    res.render('products', products);
    })
    .catch(err => {
      // res.render('***', err);
      alert(err);
    });    
  };

  queryString += `\nLIMIT 8;`;
  return db.query(queryString)
  .then(data => {
    const products = data.rows;
    res.render('products', products);
  })
  .catch(err => {
    // res.render('***', err);
    alert(err);
  });
});