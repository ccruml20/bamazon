var DataAccessLayer = require("./dataAccessLayer.js");
var dataAccess = new DataAccessLayer(3306, "root", "password");
dataAccess.getProducts(function(productArray){
  console.log("-------------",productArray[0]);
});



// function orderProduct(productOrdered){
//   console.log("================",productOrdered);
// }

