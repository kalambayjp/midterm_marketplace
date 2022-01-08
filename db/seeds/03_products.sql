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
('iphone 11 pro', 1, 'For sale is a brand new in box iPhone 11 Pro Space Grey 64GB. I upgraded to the latest model after my old iPhone 11 broke, and this is the brand new one Apple sent me as an Apple Care replacement.', 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', 50000, false, false, '2021-10-29 14:56:59', 2),
('iphone 12', 1, 'Perfect conditon iphone 12, looking to sell asap, pickup will be in montreal price is $800, no trades, cash only.', 'https://images.pexels.com/photos/7214628/pexels-photo-7214628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 80000, true, false, '2022-01-06 14:56:59', 3),
('ipad', 4, 'Ipad Pro in Great condition. w/ WiFi+cellular. Kept in case at all times. Hardly used. Has a circular mark from the case it was in. Just a cosmetic mark though, not any damage. Will remove the locking pad installed on the back before selling. Selling to upgrade.', 'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 90000, false, false, '2022-01-08 14:56:59', 6),
('ipad', 4, 'iPad Air (3rd Gen), 64GB / Wifi, Includes charging cord, nice used condition, selling price is $470', 'https://images.pexels.com/photos/8533227/pexels-photo-8533227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 47000, false, false, '2021-08-08 14:56:59', 4),
('small vintage tv', 5, 'old school tv, still works! for any retro inspired people out there', 'https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 2000, false, false, '2021-10-01 14:56:59', 5),
('42in flat screen smart tv', 5, 'fairly new tv, still in great condition, no damage on it 400 or best offer', 'https://images.pexels.com/photos/5490302/pexels-photo-5490302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 4000, false, false, '2021-11-01 14:56:59', 8),
