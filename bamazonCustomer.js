var inquirer = require('inquirer');
var DataAccessLayer = require("./dataAccessLayer.js");
var dataAccess = new DataAccessLayer(3306, "root", "password");

dataAccess.getProducts(function(productArray){

	function customerPromt(){
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
		.then(purchasedItem);
	};

	var purchasedItem = function(customerRes){
			for (var i = 0; i < productArray.length; i++) {
				if(customerRes.item_id == productArray[i].item){
					var order = productArray[i];
				}
			}			
			dataAccess.setProducts(customerRes);
		}

		customerPromt();
		
	});


