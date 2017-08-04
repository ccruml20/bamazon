DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE departments (
	department_id INTEGER(11) AUTO_INCREMENT NOT NULL, 
	department_name VARCHAR(100), 
	over_head_cost DECIMAL(10,2) NOT NULL, 
	PRIMARY KEY (item_id)
);

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL, 
	product_name VARCHAR(100), 
	department_name VARCHAR(100),
	price DECIMAL(10,2) NOT NULL, 
	stock_quantity INTEGER(11) NOT NULL, 
	product_sales INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);


INSERT INTO departments (department_name, over_head_cost)
VALUES('Movies', 10020);

INSERT INTO departments (department_name, over_head_cost)
VALUES('House Ware', 45000);

INSERT INTO departments (department_name, over_head_cost)
VALUES('Books', 9500);

INSERT INTO departments (department_name, over_head_cost)
VALUES('Toys', 22000);

INSERT INTO departments (department_name, over_head_cost)
VALUES('Electornics', 50000);




INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Doctor Strange', 'Movies', 18.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Transformers: The Last Knight', 'Movies', 24.95, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('KitchenAid [mixer]', 'House Ware', 224.06, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Stainless Steel Cup', 'House Ware', 2.00, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('The Land of Stories', 'Books', 13.11, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('The Princess Bride', 'Books', 8.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Cozmo [robot]', 'Toys', 179.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Silly Putty', 'Toys', 5.95, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('ShmEco Dot', 'Electornics', 49.99, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Sony Camera', 'Electornics', 189.99, 9);

INSERT INTO products (product_sales);


SELECT * FROM products;