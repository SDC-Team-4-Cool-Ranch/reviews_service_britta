-- DROP DATABASE IF EXISTS reviews_bm;
-- CREATE DATABASE reviews_bm;
-- \c reviews_bm; /* connect database */

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INT,
  rating INT NOT NULL,
  date BIGINT NOT NULL, /* timestamp? */
  summary VARCHAR(255),
  body TEXT,
  recommend BOOLEAN, /* default? changed this to recommend w/ ALTER */
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(50),
  response TEXT,
  helpfulness INT DEFAULT 0
);

CREATE INDEX product_id_idx ON reviews(product_id);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INT,
  url TEXT,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE INDEX review_id_p_idx ON reviews_photos(review_id);

CREATE TABLE IF NOT EXISTS reviews_characteristics (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER,
  review_id INTEGER,
  value INTEGER, /* 1 - 5 */
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE INDEX review_id_c_idx ON reviews_characteristics(review_id);


-- COPY reviews
-- FROM '/Users/brittamoore/Documents/Hack Reactor Senior Phase/SDC/reviews_service_britta/server/data/reviews.csv'
-- DELIMITER ',' NULL AS 'null' CSV HEADER;

-- COPY reviews_photos(id, review_id, url)
-- FROM '/Users/brittamoore/Documents/Hack Reactor Senior Phase/SDC/reviews_service_britta/server/data/reviews_photos.csv'
-- DELIMITER ',' NULL AS 'null' CSV HEADER;

-- COPY reviews_characteristics
-- FROM '/Users/brittamoore/Documents/Hack Reactor Senior Phase/SDC/reviews_service_britta/server/data/characteristic_reviews.csv'
-- DELIMITER ',' NULL AS 'null' CSV HEADER;
