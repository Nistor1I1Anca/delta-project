window.onload = function() {  
  var customers = new Customers();
  customers.fetchData();
  console.log(customers.items);

  var customer = new Customer();
  addOnPostEventListner(customer); //post
  addOnDeleteEventListner(customer); //delete
  addOnUpdateEventListner(customer); //put
};

// event de post new customer
function addOnPostEventListner(customer) {
  document.getElementById("customers-post").addEventListener("click", () => {
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

function addOnUpdateEventListner(customer) {
  document.getElementById("customers-update").addEventListener("click", () => {
    let data = gatherPostInputData();
    let id = document.getElementById("id-customers").value;
    console.log(data);
    console.log(id);
    customer.updateData(data, id);
  });
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
