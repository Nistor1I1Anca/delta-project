function Customers() {
  this.items = [];
}

Customers.prototype.fetchData = async function() {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  let customersThis = this;
  await fetch("http://delta.apexcode.ro/api/customers", {
    method: "GET"
  })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(customers) {
      for (let i = 0; i < customers.length; i++) {
        let customer = customers[i];
        let customerModel = new Customer();

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
