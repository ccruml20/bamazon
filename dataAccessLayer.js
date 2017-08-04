var mysql = require("mysql");
var Product = require("./products.js");

var DataAccessLayer = function(port, user, password) {
	var connection = mysql.createConnection({
		host: "localhost",
		port: port,
		user: user,
		password: password,
		database: "bamazon"
	});
	this.getProducts = function(callback){
		connection.connect(function(err) {
			if (err) throw err;
			var query = "SELECT * FROM products";
			connection.query(query, function(error, res) {
				var productArray = [];
				if (error) throw error;
				for (var i = 0; i < res.length; i++) {
					console.log("Item Id: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);
					productArray.push(new Product(res[i]));
				}
				callback(productArray);
			});
		});
	};
	this.setProducts = function(productId, quantityRemaining, callback){
		connection.connect(function(err) {
			var query = "UPDATE products SET stock_quantity=? WHERE item_id=?";
			connection.query(query, [quantityRemaining, productId], function(err, res) {
				if (err) throw err;	
				callback();
			});
		});
	};
	this.getProductsAdmin = function(callback){
		connection.connect(function(err) {
			if (err) throw err;
			var query = "SELECT * FROM products";
			connection.query(query, function(error, res) {
				var productArray = [];
				if (error) throw error;
				for (var i = 0; i < res.length; i++) {
					productArray.push(new Product(res[i]));
				}
				callback(productArray);
			});
		});
	};
	this.addProductInventroy = function(productId, addInventoryAmount){
		connection.connect(function(err) {
			var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id=?";
			connection.query(query, [addInventoryAmount, productId.item], function(err, res) {
				if (err) throw err;	
			});
		});
	};
	this.addProductToDatabase = function(customerRes){
		connection.connect(function(err) {
			var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)";
			connection.query(query, [customerRes.product_name, customerRes.department_name, customerRes.price, customerRes.stock_quantity], function(err, res) {
				if (err) throw err;	
			});
		});
	};
}

module.exports = DataAccessLayer;
