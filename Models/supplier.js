function Supplier() {
  this.Id = null;
  this.Name = "";
  this.CUI = null;
}

<<<<<<< HEAD
Supplier.prototype.fetchData = async function (id) {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
=======
Supplier.prototype.fetchData = async function(id) {
>>>>>>> 6300198c1fce1563b711a6f9b56fa2e086d7cdab
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

<<<<<<< HEAD
// to be linked to suppliersView
Supplier.prototype.postData = async function (data) {
  console.log("intra", data);
=======
Supplier.prototype.postData = async function(data) {
  console.log(JSON.stringify(data));
>>>>>>> 6300198c1fce1563b711a6f9b56fa2e086d7cdab
  await fetch("http://delta.apexcode.ro/api/suppliers", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data)
  })
<<<<<<< HEAD
    // .then(resp => resp.json())
    .then(function (jsonResp) {
      console.log("jsonResp:", jsonResp.status);
      document.cookie = "status="+ jsonResp.status;
    })
    .catch(e => alert(`post error: ${e}`));
};

// to be linked to suppliersView
Supplier.prototype.updateData = function (data, id) {
  console.log(id, "ajunge");
  console.log(data, "intra");
  fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
=======
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};

Supplier.prototype.updateData = async function(data, id) {
  await fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
>>>>>>> 6300198c1fce1563b711a6f9b56fa2e086d7cdab
    method: "PUT",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};

<<<<<<< HEAD
// to be linked to suppliersView
Supplier.prototype.deleteData = function (id) {
  fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
=======
Supplier.prototype.deleteData = async function(id) {

  await fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
>>>>>>> 6300198c1fce1563b711a6f9b56fa2e086d7cdab
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};
