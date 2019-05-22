window.onload = function() {
  var customers = new Customers();
  customers.fetchData();
  console.log(customers.items)

  var customer = new Customer();
  addOnSubmitEventListner(customer);
  addOnDeleteEventListner(customer);
};

// event de post new customer
function addOnSubmitEventListner(customer) {
  document.getElementById("customers-submit").addEventListener("click", () => {
    let data = gatherPostInputData();
    customer.postData(data);
  });
}
function gatherPostInputData() {
  let customerName = document.getElementById("name-customers").value;
  let customerCUI = document.getElementById("CUI-customers").value;
  return {
    Name: customerName,
    CUI: customerCUI
  };
}


// event de delete customer
function addOnDeleteEventListner(customer) {
  document.getElementById("customers-delete").addEventListener("click", () => {
    let id = gatherDeleteInputdata();
    customer.deleteData(id);
  });
}

function gatherDeleteInputdata() {
  return document.getElementById("id-customers").value;
}
