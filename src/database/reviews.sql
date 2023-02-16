-- DROP DATABASE IF EXISTS reviews_bm;
-- CREATE DATABASE reviews_bm;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  1_star_count INTEGER,
  2_star_count INTEGER,
  3_star_count INTEGER,
  4_star_count INTEGER,
  5_star_count INTEGER,
  recommended_count INTEGER,
  not_recommended_count INTEGER,
  characteristics_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id INTEGER AUTO_INCREMENT NOT NULL,
  rating INTEGER NOT NULL,
  summary VARCHAR(255) NOT NULL,
  recommended BOOLEAN, /* default? */
  response VARCHAR(500) NOT NULL,
  body VARCHAR(500) DEFAULT NULL,
  date TIMESTAMP NOT NULL,
  reviewer_name VARCHAR(50) NOT NULL,
  helpfulness INTEGER, /* NOT NULL? */
  reported BOOLEAN DEFAULT FALSE,
  photo_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INTEGER AUTO_INCREMENT NOT NULL,
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id INTEGER AUTO_INCREMENT NOT NULL,
  size_id INTEGER,
  size_value INTEGER,
  width_id INTEGER,
  width_value INTEGER,
  comfort_id INTEGER,
  comfort_value INTEGER,
  fit_id INTEGER,
  fit_value INTEGER,
  length_id INTEGER,
  length_value INTEGER,
  quality_id INTEGER,
  quality_value INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE products ADD FOREIGN KEY (id) REFERENCES reviews (product_id);
ALTER TABLE photos ADD FOREIGN KEY (id) REFERENCES reviews (photo_id);
ALTER TABLE characteristics ADD FOREIGN KEY (id) REFERENCES products (characteristics_id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Products` (`id`,`characteristics_id`,`1_star_count`,`2_star_count`,`3_star_count`,`4_star_count`,`5_star_count`,`recommended_count`,`not_recommended_count`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `Reviews` (`id`,`rating`,`summary`,`recommended`,`response`,`body`,`date`,`reviewer_name`,`helpfulness`,`reported`,`photo_id`,`product_id`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `Photos` (`id`,`url`) VALUES
-- ('','');
-- INSERT INTO `Characteristics` (`id`,`size_id`,`size_value`,`width_id`,`width_value`,`comfort_id`,`comfort_value`,`fit_id`,`fit_value`,`length_id`,`length-value`,`quality_id`,`quality_value`) VALUES
-- ('','','','','','','','','','','','','');