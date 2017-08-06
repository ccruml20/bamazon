var inquirer = require('inquirer');
var console = require('better-console');
var DataAccessLayer = require("./dataAccessLayer.js");
var dataAccess = new DataAccessLayer(3306, "root", "password");

dataAccess.getDepartmentSales(function (departmentArray) {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
    "View Product Sales by Department",
    "Create New Department"
    ]
  })
  .then(function(answer){
    switchCase(answer, departmentArray);
  });
});

function switchCase(answer, departmentArray) {
  switch (answer.action) {
    case "View Product Sales by Department":
    viewDepartmentSales(answer, departmentArray);
    break;
    case "Create New Department":
    addDepartmentPrompt(departmentArray);
    break;
  }
}

function viewDepartmentSales(answer, departmentArray){
    console.table(departmentArray);

}

function addDepartmentPrompt(){
  inquirer.prompt([
  {
    type: "input",
    message: "Enter new Department name",
    name: "department_name",
  },

  {
    type: "input",
    message: "Whats the overhead cost of the Department",
    name: "over_head_cost",
  }
  ])
  .then(function(customerRes) {
    addNewDepartment(customerRes);
  });
}

function addNewDepartment(customerRes){
  dataAccess.addDepartmentToDatabase(customerRes);
  console.log("     updating Department Data....\n", customerRes.department_name,
   "overhead cost is... ", customerRes.over_head_cost);
}

  
