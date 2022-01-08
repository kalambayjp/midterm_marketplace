CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  sold BOOLEAN DEFAULT FALSE,
  listed_on TIMESTAMP,
  owner_id INTEGER REFERENCES NOT NULL users(id) ON DELETE CASCADE
);

INSERT INTO categories (title)
VALUES ('Cell Phones'),
('Laptops'),
('Desktops'),
('Tablets'),
(`TVs`),
('Cameras'),
('Components'),
('Others');

INSERT INTO products (title, category_id, description, img_url, price, featured, sold, listed_on,
owner_id)
VALUES
('iphone 11 pro', 1, 'For sale is a brand new in box iPhone 11 Pro Space Grey 64GB. I upgraded to the latest model after my old iPhone 11 broke, and this is the brand new one Apple sent me as an Apple Care replacement.', 'https://i.pinimg.com/474x/eb/02/50/eb0250cc1ecd0ec085a0e348d19b3378.jpg', 50000, fales, false, '2021-10-29 14:56:59', 2),
('google pixel 6 pro ', 1, 'Never opened, still sealed Google Pixel 6 Pro looking to sell asap, pickup will be in montreal price is $1200, no trades, cash only.', 'https://i.ebayimg.com/images/g/JkcAAOSwyvJh2eKI/s-l640.webp', 120000, true, false, '2022-01-06 14:56:59', 3),
