function Supplier() {
  this.Id = null;
  this.Name = "";
  this.CUI = null;
}

Supplier.prototype.fetchData = async function (id) {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  let supplierThis = this;
  await fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
    method: "GET"
  })
    .then(resp => resp.json())
    .then(function (supplier) {
      supplierThis.Id = supplier.Id;
      supplierThis.Name = supplier.Name;
      supplierThis.CUI = supplier.CUI;
    })
    .catch(function (e) {
      alert("fetch error:" + e);
    });
};

// to be linked to suppliersView
Supplier.prototype.postData = async function (data) {
  await fetch("http://delta.apexcode.ro/api/suppliers", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    // .then(resp => resp.json())
    .then(function (jsonResp) {
      document.cookie = "status=" + jsonResp.status;
    })
    .catch(e => alert(`post error: ${e}`));
};

// to be linked to suppliersView
Supplier.prototype.updateData = async function (data, id) {
  await fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
    method: "PUT",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(function (jsonResp) {
      document.cookie = "status=" + jsonResp.status;
    })
    // .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};

// to be linked to suppliersView
Supplier.prototype.deleteData = async function (id) {
  await fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(function (jsonResp) {
      document.cookie = "status=" + jsonResp.status;
    })
    .catch(e => alert(`post error: ${e}`));
};
