function Customer() {
  this.Id = null;
  this.Name = "";
  this.CUI = null;
}

Customer.prototype.fetchData = function(id) {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  var customerThis = this;
  fetch("http://delta.apexcode.ro/api/customers/" + id, {
    method: "GET"
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
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};

Customer.prototype.deleteData = function(id){
  fetch("http://delta.apexcode.ro/api/customers/"+ id,{
   method:"DELETE"
  })
  .then(resp => resp.json())
  .then(jsonResp => console.log(jsonResp))
  .catch(e => alert(`post error: ${e}`));
}