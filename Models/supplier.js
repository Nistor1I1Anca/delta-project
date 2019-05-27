function Supplier() {
  this.Id = null;
  this.Name = "";
  this.CUI = null;
}

Supplier.prototype.fetchData = function(id) {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  let supplierThis = this;
  fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
    method: "GET"
  })
    .then(resp => resp.json())
    .then(function(supplier) {
      supplierThis.Id = supplier.Id;
      supplierThis.Name = supplier.Name;
      supplierThis.CUI = supplier.CUI;
    })
    .catch(function(e) {
      alert("fetch error:" + e);
    });
};

// to be linked to suppliersView
Supplier.prototype.postData = function(data) {
  fetch("http://delta.apexcode.ro/api/suppliers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};

// to be linked to suppliersView
Supplier.prototype.updateData = function(data) {
  fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
    method: "PUT",
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp));
};

// to be linked to suppliersView
Supplier.prototype.deleteData = function(id) {
  fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};