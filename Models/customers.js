function Customers() {
  this.items = [];
}

Customers.prototype.fetchData = function() {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  var customersThis = this;
  fetch("http://delta.apexcode.ro/api/customers", {
    method: "GET"
  })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(customers) {
      for (var i = 0; i < customers.length; i++) {
        var customer = customers[i];
        var customerModel = new Customer();

        customerModel.Id = customer.Id;
        customerModel.Name = customer.Name;
        customerModel.CUI = customer.CUI;

        customersThis.items.push(customerModel);
      }
    })
    .catch(function(e) {
      alert("fetch error:" + e);
    });
};
