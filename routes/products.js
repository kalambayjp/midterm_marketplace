/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /products
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { on } = require('nodemon');
const router  = express.Router();

module.exports = (db) => {

  // VIEW ALL PRODUCTS
  router.get("/", (req, res) => {

    
   

    let queryString = `
    SELECT *
    FROM products
    WHERE sold = false
    `;
    let queryParams = [];

    
    if (req.query.minimum_price) {                             
      queryParams.push(req.query.minimum_price);
      queryString += `\nAND price >= $${queryParams.length}`;
      
      if (req.query.maximum_price) {                                // IF MIN PRICE & MAX PRICE
        queryParams.push(req.query.maximum_price);
        queryString += `\nAND price <= $${queryParams.length}\nLIMIT 8;`;
  

        return db.query(queryString, queryParams)
        .then(data => {
        const templateVars = {
          products: data.rows
        }
        res.render('products', templateVars);
        })
        .catch(err => {
          console.log(err);
        });
      }


      queryString += `\nLIMIT 8;`;                                // ONLY MIN PRICE

      return db.query(queryString, queryParams)
      .then(data => {
        const templateVars = {
          user_id: req.session.userId,
          userName: req.session.userName,
          products: data.rows
        }
        res.render('products', templateVars);
      })
      .catch(err => {
        console.log(err);
      });
    } else if (req.query.maximum_price) {                             // ONLY MAX PRICE
      queryParams.push(req.query.maximum_price);
      queryString += `\nAND price <= $${queryParams.length}\nLIMIT 8;`;

      return db.query(queryString, queryParams)
      .then(data => {
        const templateVars = {
          user_id: req.session.userId,
          userName: req.session.userName,
          products: data.rows
        }
        res.render('products', templateVars);
      })
      .catch(err => {
        console.log(err);
      });

    } else {                                                     // NO PRICE FILTERS
      return db.query(queryString, queryParams)
      .then(data => {
        const templateVars = {
          user_id: req.session.userId,
          userName: req.session.userName,
          products: data.rows
        }
        res.render('products', templateVars);
      })
      .catch(err => {
        console.log(err);
      });
    }
    
  });

  // VIEW PRODUCTS FILTERED BY PRICE
  router.post("/", (req, res) => { 
    if (req.body.minimum_price) {

      let minPrice = parseInt(req.body.minimum_price * 100);
      
      if (req.body.maximum_price) {
        let maxPrice = parseInt(req.body.maximum_price * 100);
        res.redirect(`/products?minimum_price=${minPrice}&maximum_price=${maxPrice}`);
      }
  
      res.redirect(`/products?minimum_price=${minPrice}`);
    
    } else if (req.body.maximum_price) {
      let maxPrice = parseInt(req.body.maximum_price * 100);
      res.redirect(`/products?maximum_price=${maxPrice}`);
    };
  });

  // VIEW SINGLE PRODUCT
  router.get("/product/:id", (req, res) => {
    db.query(`
    SELECT *
    FROM products
    WHERE products.id = $1;`,[req.params.id])
      .then(data => {
        const products = data.rows[0];
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // VIEW ALL PRODUCTS OF A SINGLE USER
  router.get("/user/:user_id", (req, res) => {
    db.query(`
    SELECT products.*, users.id
    FROM products
    JOIN users ON products.owner_id = users.id
    WHERE users.id = $1;`, [req.params.user_id])
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

  // VIEW USER'S WISHLIST
  router.get("/wishlist/:user_id", (req, res) => {
    db.query(`
    SELECT *
    FROM products
    JOIN wishlists ON wishlists.product_id = products.id
    JOIN users ON wishlists.user_id = users.id
    WHERE users.id = $1;`, [req.session.userId])                    
      .then(data => {
        const templateVars = {
          user_id: req.session.userId,
          userName: req.session.userName,
          products: data.rows
        }
        res.render("products", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  
  // ADD PRODUCT TO WISHLIST
  router.post("/wishlist/:product_id/add", (req, res) => {
    const inputVars = [req.session.userId, req.params.product_id];
    
    
    return db.query(`
    INSERT INTO wishlists (user_id, product_id)
    VALUES ($1, $2)`, inputVars)              
      .then(data => {
        
        // res.redirect('/');
        res.redirect(`/products/wishlist/${req.session.userId}`) 
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  
  // DELETE PRODUCT FROM WISHLIST
  router.post("/products/wishlist/:product_id/delete", (req, res) => {
    const inputVars = [req.params.user_id, req.params.product_id]
    console.log('inputVars -->',inputVars);
    db.query(`
    DELETE FROM wishlists
    WHERE user_id = $1 AND product_id = $2`, inputVars)
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // POST NEW PRODUCT FOR SALE
  // GET new product form
  router.get("/new", (req, res) => {
      const templateVars = {
        user_id: req.session.userId,
        userName: req.session.userName
      }
      res.render("new_listing", templateVars);
  });

  // [] post /products/new //LISTING NEW PRODUCTS
  router.post("/new", (req, res) => {

    const getCategoryID = (category) => {

      switch (category) {
        case 'Cellphones':
          return 1;
        case 'Laptops':
          return 2;
        case 'Desktops':
          return 3;
        case 'Tablets':
          return 4;
        case 'TVs':
          return 5;
        case 'Cameras':
          return 6;
        case 'Components':
          return 7;
        default:
          return 8;
      };
    };

    const getTime = new Date(Date.now());
    const category_id = getCategoryID(req.body.category);

    const inputVars = [ req.body.title, category_id, req.body.description, req.body.img_url, (req.body.price * 100), req.body.featured, req.session.userId, getTime];
    db.query(`
    INSERT INTO products (title, category_id, description, img_url, price, featured, owner_id, listed_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;`, inputVars)
      .then(data => {
        res.redirect(`../products/user/${req.session.userId}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // [] get /products/product/:id/edit // edit product form
  // VIEW EDIT PRODUCTS PAGE
  router.get("/products/product/:id/edit", (req, res) => {
    const inputVars = [req.params.product_id];
    db.query(`
    SELECT * FROM products
    WHERE products.id = $1`, inputVars)
      .then(data => {
        const products = data.rows[0];
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // [] post /products/product/:id/edit //edit a product submit
  // SUBMIT EDIT FORM TO EDIT PRODUCT PAGE
  router.post("/products/product/:id/edit", (req, res) => {
    const inputVars = [req.params.title, req.params.category_id, req.params.description, req.params.img_url, req.params.price, req.params.featured, req.params.sold, req.params.id ,req.params.user_id];
    db.query(`
    UPDATE products
    SET title=$1, category_id=$2, description=$3, img_url=$4, price=$5, featured=$6, sold=$7,
    WHERE products.id = $8 and owner_id = $9;)`, inputVars)
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // [] delete /products/product/:id/delete //delete a product
  // DELETE A PRODUCT
  router.post("/products/product/:id/delete", (req, res) => {
    const inputVars = [req.params.user_id, req.params.product_id]
    db.query(`
    DELETE FROM products
    WHERE user_id = $1 AND product_id = $2`, inputVars)
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
