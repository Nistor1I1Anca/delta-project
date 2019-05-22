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

// to be linked to productsView
Product.prototype.postData = function(data) {
  fetch("http://delta.apexcode.ro/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};

// to be linked to productsView
Product.prototype.updateData = function(data) {
  fetch("http://delta.apexcode.ro/api/products/" + id, {
    method: "PUT",
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp));
};

// to be linked to productsView
Customer.prototype.deleteData = function(id) {
  fetch("http://delta.apexcode.ro/api/products/" + id, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};
