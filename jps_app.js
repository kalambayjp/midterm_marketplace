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

  if (req.body.minimum_price) {
    queryParams.push(req.body.minimum_price * 100);
    queryString += `\nAND price >= $${queryParams.length}`;
    
    if (req.body.maximum_price) {
      queryParams.push(req.body.maximum_price * 100);
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
  } else if (req.body.maximum_price) {
    queryParams.push(req.body.maximum_price * 100);
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