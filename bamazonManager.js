var inquirer = require('inquirer');
var DataAccessLayer = require("./dataAccessLayer.js");
var dataAccess = new DataAccessLayer(3306, "root", "password");

dataAccess.getProductsAdmin(function (productArray) {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
    "View Products for Sale",
    "View Low Inventory",
    "Add to Inventory",
    "Add New Product"
    ]
  })
  .then(function(answer){
    switchCase(answer, productArray);
  });
});

function switchCase(answer, productArray) {
  switch (answer.action) {
    case "View Products for Sale":
    viewProducts(answer, productArray,);
    break;
    case "View Low Inventory":
    viewLowInventory(productArray);
    break;
    case "Add to Inventory":
    addInventoryPrompt(productArray);
    break;
    case "Add New Product":
    addProductToInventoryPrompt(productArray);
    break;
  }
}

function viewProducts(answer, productArray) {
  for (var i = 0; i < productArray.length; i++) {
    console.log("Department: " + productArray[i].department + "Item Id: " + 
      productArray[i].item + " || Product: " + productArray[i].product + " || Price: " + 
      productArray[i].price + " || Stock Quantity: " + productArray[i].quantity);
  }
}

function viewLowInventory(productArray){
  for (var i = 0; i < productArray.length; i++) {
    if(productArray[i].quantity < 99){
      console.log("Department: " + productArray[i].department + "Item Id: " + 
        productArray[i].item + " || Product: " + productArray[i].product + " || Price: " + 
        productArray[i].price + " || Stock Quantity: " + productArray[i].quantity);
    }
  }
}

function addInventoryPrompt(productArray){
  for (var i = 0; i < productArray.length; i++) {
    console.log("Department: " + productArray[i].department + "Item Id: " + 
      productArray[i].item + " || Product: " + productArray[i].product + " || Price: " + 
      productArray[i].price + " || Stock Quantity: " + productArray[i].quantity);
  }
  inquirer.prompt([
  {
    type: "input",
    message: "What the id of the product you with to add to inventory.",
    name: "item_id",
  },
  {
    type: "input",
    message: "How many would you like to add?",
    name: "stock_quantity",
  },
  ])
  .then(function(customerRes) {
    addInventory(customerRes, productArray);
  });
}

function addInventory(customerRes, productArray){
  var productId = getProductById(customerRes.item_id, productArray);
  var addInventoryAmount = customerRes.stock_quantity;
  dataAccess.addProductInventroy(productId, addInventoryAmount);
  console.log(addInventoryAmount, productId.product, "units have been added to", productId.department, "inventory")
}

function getProductById(productId, productArray) {
  for (var i = 0; i < productArray.length; i++) {
    if(productId == productArray[i].item){
      return productArray[i];
    }
  }
  throw Error("Couldn't find an item with the id " + productId + "!");
}

function addProductToInventoryPrompt(){
  inquirer.prompt([
  {
    type: "input",
    message: "Enter the product name",
    name: "product_name",
  },
  {
    type: "input",
    message: "Enter the Department name of the product",
    name: "department_name",
  },
  {
    type: "input",
    message: "Enter the price of the item.",
    name: "price",
  },
  {
    type: "input",
    message: "How many units do you wish to add",
    name: "stock_quantity",
  }
  ])
  .then(function(customerRes) {
    addNewProduct(customerRes);
  });
}

function addNewProduct(customerRes){
  dataAccess.addProductToDatabase(customerRes);
}




