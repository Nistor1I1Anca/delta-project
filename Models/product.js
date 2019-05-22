function Product() {
  this.Id = null;
  this.Name = "";
  this.ProductType = "";
}

Product.prototype.fetchData = function(id) {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  var productThis = this;
  fetch("http://delta.apexcode.ro/api/products/" + id, {
    method: "GET"
  })
    .then(resp => resp.json())
    .then(function(product) {
      productThis.Id = product.Id;
      productThis.Name = product.Name;
      productThis.ProductType = product.ProductType;
    })
    .catch(function(e) {
      alert("fetch error:" + e);
    });
};
