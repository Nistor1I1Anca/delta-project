function Product() {
  this.Id = null;
  this.Name = "";
  this.ProductType = "";
}

Product.prototype.fetchData = async function (id) {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  let productThis = this;
  await fetch("http://delta.apexcode.ro/api/products/" + id, {
    method: "GET"
  })
    .then(resp => resp.json())
    .then(function (product) {
      productThis.Id = product.Id;
      productThis.Name = product.Name;
      productThis.ProductType = product.ProductType;
    })
    .catch(function (e) {
      alert("fetch error:" + e);
    });
};

// to be linked to productsView
Product.prototype.postData = async function (data) {
  await fetch("http://delta.apexcode.ro/api/Products", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data)
  })
  .then(function (jsonResp) {
    console.log("status", jsonResp.status);
    document.cookie = "status=" + jsonResp.status;
  })
    .catch(e => alert(`post error: ${e}`));
};

// to be linked to productsView
Product.prototype.updateData = function (data, id) {
  fetch("http://delta.apexcode.ro/api/products/" + id, {
    method: "PUT",
    // mode:"cors",
    dataType: "json",
    headers: { "Content-Type": "application/json; charset=utf-8", Accept: "application/json" },
    body: JSON.stringify(data)
  })
  .then(function (jsonResp) {
    console.log("status", jsonResp.status);
    document.cookie = "status=" + jsonResp.status;
  })
    .catch(e => alert(`post error: ${e}`));
};

// to be linked to productsView
Product.prototype.deleteData = function (id) {
  fetch("http://delta.apexcode.ro/api/products/" + id, {
    method: "DELETE"
  })
    .then(function (jsonResp) {
      console.log("status", jsonResp.status);
      document.cookie = "status=" + jsonResp.status;
    })
    .catch(e => alert(`post error: ${e}`));
};
