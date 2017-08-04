var Product = function(productData) {
this.item = productData.item_id,
        this.product = productData.product_name,
        this.department = productData.department_name,
        this.price = productData.price,
        this.quantity = productData.stock_quantity
  }


module.exports = Product;