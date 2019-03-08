-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'product'
-- 
-- ---

DROP TABLE IF EXISTS product;
		
CREATE TABLE product (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NULL DEFAULT NULL,
  itemNumber TEXT NULL DEFAULT NULL,
  reviewRate DECIMAL NULL DEFAULT NULL,
  reviewNum INTEGER NULL DEFAULT NULL,
  questionNum INTEGER NULL DEFAULT NULL,
  answersNum INTEGER NULL DEFAULT NULL,
  stockAmount INTEGER NULL DEFAULT NULL,
  sellLimit INTEGER NULL DEFAULT NULL,
  lowestPrice INTEGER NULL DEFAULT NULL,
  logoOverlay TEXT NULL DEFAULT NULL,
  stockStatus INTEGER NULL DEFAULT NULL,
  sellFrom TEXT NULL DEFAULT NULL,
  shipOrigin TEXT NULL DEFAULT NULL,
  img TEXT NULL DEFAULT NULL,
  description TEXT NULL DEFAULT NULL,
  category1 INTEGER NULL DEFAULT NULL,
  category2 INTEGER NULL DEFAULT NULL,
  category3 INTEGER NULL DEFAULT NULL
);

-- ---
-- Table 'category'
-- 
-- ---

DROP TABLE IF EXISTS category;
		
CREATE TABLE category (
  id INTEGER NULL PRIMARY KEY,
  categoryName TEXT NULL DEFAULT NULL,
  option1 TEXT NULL DEFAULT NULL,
  option2 TEXT NULL DEFAULT NULL,
  option3 TEXT NULL DEFAULT NULL,
  option4 TEXT NULL DEFAULT NULL,
  option5 TEXT NULL DEFAULT NULL,
  option6 TEXT NULL DEFAULT NULL,
  option7 TEXT NULL DEFAULT NULL
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE product ADD FOREIGN KEY (category1) REFERENCES category (id);
ALTER TABLE product ADD FOREIGN KEY (category2) REFERENCES category (id);
ALTER TABLE product ADD FOREIGN KEY (category3) REFERENCES category (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE product ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE category ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO product (id,name,itemNumber,reviewRate,reviewNum,questionNum,answersNum,stockAmount,sellLimit,lowestPrice,logoOverlay,stockStatus,sellFrom,shipOrigin,img,description,category1,category2,category3) VALUES
-- ('','','','','','','','','','','','','','','','','','','');
-- INSERT INTO category (id,categoryName,option1,option2,option3,option3,option4,option5,option6,option7) VALUES
-- ('','','','','','','','','','');