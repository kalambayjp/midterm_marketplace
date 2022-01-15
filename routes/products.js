/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /products
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { on } = require('nodemon');
const router = express.Router();

module.exports = (db) => {
  // LISTS OF MULTIPLE PRODUCTS:
  // VIEW ALL PRODUCTS
  router.get("/", (req, res) => {
    let queryString = `SELECT * FROM products`;
    let queryParams = [];

    if (req.query.minimum_price) {
      queryParams.push(req.query.minimum_price);
      queryString += `\nWHERE price >= $${queryParams.length}`;

      if (req.query.maximum_price) {                                // IF MIN PRICE & MAX PRICE
        queryParams.push(req.query.maximum_price);
        queryString += `\nAND price <= $${queryParams.length}\nORDER BY featured
        DESC;`;

        return db.query(queryString, queryParams)
          .then(data => {
            const allproducts = data.rows;
            db.query(`
          SELECT products.*, wishlist_items.user_id, wishlist_items.product_id, users.id AS logged_in_user
          FROM products
          JOIN wishlist_items ON wishlist_items.product_id = products.id
          JOIN users ON wishlist_items.user_id = users.id
          WHERE users.id = $1;`, [req.session.userId])
              .then(data => {
                const wishlistProducts = data.rows;
                let wishlistProductIds = [];

                wishlistProducts.forEach(product => {
                  wishlistProductIds.push(product.id);
                })

                function isOnUserWishlist(obj) {
                  if (wishlistProductIds.includes(obj.id)) {
                    obj.wishlist = true;
                  }
                }

                allproducts.map(isOnUserWishlist);

                const templateVars = {
                  user_id: req.session.userId,
                  userName: req.session.userName,
                  products: allproducts
                }
                res.render('products', templateVars);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }

      queryString += `\n ORDER BY featured
      DESC;`;                                // ONLY MIN PRICE

      return db.query(queryString, queryParams)
        .then(data => {
          const allproducts = data.rows;

          db.query(`
        SELECT products.*, wishlist_items.user_id, wishlist_items.product_id, users.id AS logged_in_user
        FROM products
        JOIN wishlist_items ON wishlist_items.product_id = products.id
        JOIN users ON wishlist_items.user_id = users.id
        WHERE users.id = $1;`, [req.session.userId])
            .then(data => {
              const wishlistProducts = data.rows;
              let wishlistProductIds = [];

              wishlistProducts.forEach(product => {
                wishlistProductIds.push(product.id);
              })

              function isOnUserWishlist(obj) {
                if (wishlistProductIds.includes(obj.id)) {
                  obj.wishlist = true;
                }
              }

              allproducts.map(isOnUserWishlist);

              const templateVars = {
                user_id: req.session.userId,
                userName: req.session.userName,
                products: allproducts
              }
              res.render('products', templateVars);
            })
        })
        .catch(err => {
          console.log(err);
        });
    } else if (req.query.maximum_price) {                             // ONLY MAX PRICE
      queryParams.push(req.query.maximum_price);
      queryString += `\nWHERE price <= $${queryParams.length}\nORDER BY featured
      DESC;`;

      return db.query(queryString, queryParams)
        .then(data => {
          const allproducts = data.rows;

          db.query(`
        SELECT products.*, wishlist_items.user_id, wishlist_items.product_id, users.id AS logged_in_user
        FROM products
        JOIN wishlist_items ON wishlist_items.product_id = products.id
        JOIN users ON wishlist_items.user_id = users.id
        WHERE users.id = $1;`, [req.session.userId])
            .then(data => {
              const wishlistProducts = data.rows;
              let wishlistProductIds = [];

              wishlistProducts.forEach(product => {
                wishlistProductIds.push(product.id);
              })

              function isOnUserWishlist(obj) {
                if (wishlistProductIds.includes(obj.id)) {
                  obj.wishlist = true;
                }
              }

              allproducts.map(isOnUserWishlist);

              const templateVars = {
                user_id: req.session.userId,
                userName: req.session.userName,
                products: allproducts
              }
              res.render('products', templateVars);
            })
        })
        .catch(err => {
          console.log(err);
        });
    } else {                                                     // NO PRICE FILTERS
      queryString += `\nORDER BY featured DESC;`
      console.log('queryString', queryString);
      return db.query(queryString, queryParams)
        .then(data => {
          const allproducts = data.rows;

          db.query(`
        SELECT products.*, wishlist_items.user_id, wishlist_items.product_id, users.id AS logged_in_user
        FROM products
        JOIN wishlist_items ON wishlist_items.product_id = products.id
        JOIN users ON wishlist_items.user_id = users.id
        WHERE users.id = $1;`, [req.session.userId])
            .then(data => {
              const wishlistProducts = data.rows;
              let wishlistProductIds = [];

              wishlistProducts.forEach(product => {
                wishlistProductIds.push(product.id);
              })

              function isOnUserWishlist(obj) {
                if (wishlistProductIds.includes(obj.id)) {
                  obj.wishlist = true;
                }
              }

              allproducts.map(isOnUserWishlist);

              const templateVars = {
                user_id: req.session.userId,
                userName: req.session.userName,
                products: allproducts
              }
              res.render('products', templateVars);
            })
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

  // VIEW ALL PRODUCTS OF A SINGLE USER
  router.get("/users/:user_id", (req, res) => {
    db.query(`
    SELECT *
    FROM products
    WHERE owner_id = $1
    ORDER BY featured
    DESC
    ;`, [req.session.userId])
      .then(data => {
        const templateVars = {
          user_id: req.session.userId,
          userName: req.session.userName,
          products: data.rows
        }
        res.render('products', templateVars)
      })
      .catch(err => {
        console.log(err);
      });
  });

  // VIEW USER'S WISHLIST
  router.get("/wishlist/:user_id", (req, res) => {
    db.query(`
    SELECT products.*, wishlist_items.product_id, users.id AS logged_in_user
    FROM products
    JOIN wishlist_items ON wishlist_items.product_id = products.id
    JOIN users ON wishlist_items.user_id = users.id
    WHERE users.id = $1 AND products.sold = false;`, [req.session.userId])
      .then(data => {
        data.rows.forEach(product => {
          product.wishlist = true
        });
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
    INSERT INTO wishlist_items (user_id, product_id)
    VALUES ($1, $2)`, inputVars)
      .then(data => {
        return;
        // logic is done using jquery
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  // DELETE PRODUCT FROM WISHLIST
  router.post("/wishlist/:product_id/delete", (req, res) => {
    const inputVars = [req.session.userId, req.params.product_id]
    console.log('inputVars-->', inputVars);
    db.query(`
    DELETE FROM wishlist_items
    WHERE user_id = $1 AND product_id = $2;`, inputVars)
      .then(data => {
        return;
        // logic is done using jquery
      })
      .catch(err => {
        console.log('error -->', err);
      });
  });

  // SINGLE PRODUCT PAGES:
  // GET NEW PRODUCT FORM
  router.get("/new", (req, res) => {
    const templateVars = {
      user_id: req.session.userId,
      userName: req.session.userName
    }
    res.render("new_listing", templateVars);
  });

  // POST NEW PRODUCT FOR SALE
  router.post("/new", (req, res) => {
    const getCategoryID = (category) => {
      switch (category) {
        case 'Cell Phones':
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
    const inputVars = [req.body.title, category_id, req.body.description, req.body.img_url, (req.body.price * 100), req.body.featured, req.session.userId, getTime];
    
    db.query(`
    INSERT INTO products (title, category_id, description, img_url, price, featured, owner_id, listed_on)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;`, inputVars)
      .then(data => {
        res.redirect(`users/${req.session.userId}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // VIEW SINGLE PRODUCT
  router.get("/product/:id", (req, res) => {
    db.query(`
    SELECT products.id as single_product_id, products.title, products.description, products.img_url, products.price, products.owner_id, products.sold, users.*, messages.* FROM products
    JOIN users ON products.owner_id = users.id
    LEFT JOIN messages ON messages.product_id = products.id
    WHERE products.id = $1;`, [req.params.id])
      .then(data => {
        const templateVars = {
          user_id: req.session.userId,
          userName: req.session.userName,
          product: data.rows[0]
        }
        res.render("single_product", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // VIEW EDIT PRODUCTS PAGE
  router.get("/product/:id/edit", (req, res) => {
    const inputVars = [req.params.product_id];

    db.query(`
      SELECT products.*, categories.title as category FROM products
      JOIN categories ON products.category_id = categories.id
      WHERE products.id = $1;`, [req.params.id])
      .then(data => {
        const templateVars = {
          user_id: req.session.userId,
          userName: req.session.userName,
          product: data.rows[0]
        }
        res.render('edit_product.ejs', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // SUBMIT EDIT FORM TO EDIT PRODUCT PAGE
  router.post("/product/:id/edit", (req, res) => {
    const productId = req.params.id;
    const getCategoryID = (category) => {
      switch (category) {
        case 'Cell Phones':
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

    const category_id = getCategoryID(req.body.category);
    const inputVars = [req.body.title, category_id, req.body.description, req.body.img_url, (req.body.price * 100), req.body.featured, req.body.sold, productId];

    db.query(`
    UPDATE products
    SET title=$1, category_id=$2, description=$3, img_url=$4, price=$5, featured=$6, sold=$7
    WHERE products.id = $8;`, inputVars)
      .then(data => {
        const products = data.rows;
        res.redirect(`/products/product/${productId}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // DELETE A PRODUCT
  router.post("/product/:product_id/delete", (req, res) => {
    const inputVars = [req.params.product_id]
    db.query(`
    DELETE FROM products
    WHERE products.id = $1`, inputVars)
      .then(data => {
        res.redirect('/products/users/:user_id')
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  
  return router;
};
