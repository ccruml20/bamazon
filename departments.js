var Department = function(departmentData){
	this.id = departmentData.department_id,
	this.department = departmentData.department_name,
	this.overhead = departmentData.over_head_cost,
	this.product_sales = departmentData.product_sales
}

module.exports = Department;