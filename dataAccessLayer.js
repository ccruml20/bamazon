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
				// connection.end(function(fail) {
				// 	if (fail) throw fail;
				// });
				callback(productArray);
			});
		});
	};
	this.setProducts = function(customerRes, callback){
		console.log("this is the inquirer answers",customerRes);
		connection.connect(function(err) {
			console.log("Updating Bamazon...\n",);
			var query = "UPDATE products SET stock_quantity=? WHERE item_id=?";
			connection.query(query, [customerRes.stock_quantity, customerRes.item_id], function(err, res) {
				if (err) throw err;	
				console.log(res);	
			});
		});
	}
}

module.exports = DataAccessLayer;
