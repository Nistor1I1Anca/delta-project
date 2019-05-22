window.onload = function() {
  var products = new Products();
  products.fetchData();
  console.log(products.items);
};
