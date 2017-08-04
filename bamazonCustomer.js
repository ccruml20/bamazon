var inquirer = require('inquirer');
var DataAccessLayer = require("./dataAccessLayer.js");
var dataAccess = new DataAccessLayer(3306, "root", "password");

dataAccess.getProducts(function (productArray) {
	inquirer.prompt([
	{
		type: "input",
		message: "Enter the Item Id for the product you wish to purchase.",
		name: "item_id",
	},
	{
		type: "input",
		message: "How many would you like to purchase?",
		name: "stock_quantity",
	},
	])
	.then(function(customerRes) {
		purchaseItem(customerRes, productArray);
	});
});

function purchaseItem(customerRes, productArray){
	var order = getOrderById(customerRes.item_id, productArray);
	var customerOrderAmount = parseInt(customerRes.stock_quantity);
	var quantityRemainingIfOrderGoesThrough = order.quantity - customerOrderAmount;
	if(quantityRemainingIfOrderGoesThrough < 0){
		console.log("Sorry we only have", order.quantity, "in stock...\n");
	} else{
		dataAccess.setProducts(customerRes.item_id, quantityRemainingIfOrderGoesThrough, function() {
			orderCalc(customerRes, order);
		});
	}
}

function orderCalc(customerRes, order){
	var purchaseTotel = parseInt(customerRes.stock_quantity) * order.price;
	console.log(" Thank you for your purchase\n","from the", order.department, 
		"department!\n", order.product,"x", parseInt(customerRes.stock_quantity),"@ $", order.price);
	console.log("  Your Total is...", "$", purchaseTotel);
	dataAccess.setSalesRevenue(purchaseTotel, order);
}	

function getOrderById(itemId, productArray) {
	for (var i = 0; i < productArray.length; i++) {
		if(itemId == productArray[i].item){
			return productArray[i];
		}
	}
	throw Error("Couldn't find an item with the id " + itemId + "!");
}


