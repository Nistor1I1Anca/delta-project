function Customer() {
  this.Id = null;
  this.Name = "";
  this.CUI = null;
}

Customer.prototype.fetchData = async function(id) {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  let customerThis = this;
  await fetch("http://delta.apexcode.ro/api/customers/" + id, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .then(function(customer) {
      customerThis.Id = customer.Id;
      customerThis.Name = customer.Name;
      customerThis.CUI = customer.CUI;
    })
    .catch(function(e) {
      alert("fetch error:" + e);
    });
};

Customer.prototype.postData = function(data) {
  fetch("http://delta.apexcode.ro/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};

Customer.prototype.updateData = function(data, id) {
  fetch("http://delta.apexcode.ro/api/customers/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data)
  })
    // .then(resp => resp.json())
    .then(jsonResp => {
      console.log(jsonResp);
      console.log(data);
    })
    .catch(e => alert(`post error: ${e}`));
};

Customer.prototype.deleteData = function(id) {
  fetch("http://delta.apexcode.ro/api/customers/" + id, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};
