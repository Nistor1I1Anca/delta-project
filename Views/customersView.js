window.onload = function() {
  setWelcome();
  getData();

  let customer = new Customer();
  addOnPostEventListner(customer); //post
  addOnDeleteEventListner(customer); //delete
  addOnUpdateEventListner(customer); //put
};
async function getData() {
  let customers = new Customers();
  await customers.fetchData();
  console.log(customers.items[0]);
  console.log(customers.items);
}

// event de post new customer
function addOnPostEventListner(customer) {
  document.getElementById("customers-post").addEventListener("click", () => {
    let data = gatherPostInputData();
    customer.postData(data);
  });
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

function gatherPostInputData() {
  let customerId = document.getElementById("post-customers-id").value;
  let customerName = document.getElementById("post-customers-name").value;
  let customerCUI = document.getElementById("post-customers-cui").value;
  return {
    id: customerId,
    Name: customerName,
    CUI: customerCUI
  };
}
