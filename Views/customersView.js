window.onload = function() {
  //setWelcome();
  //getData();

  let customer = new Customer();
  addOnPostEventListner(customer); //post
  addOnDeleteEventListner(customer); //delete
  addOnUpdateEventListner(customer); //put
  getAllCustomersNames()

  $(document).on('click', '#customer-list button', function () {
    var selectedCustomerId = $(this).attr("id");
    getCustomerById(selectedCustomerId);
  });
};

async function getData() {
  let customers = new Customers();
  await customers.fetchData();
}

async function getCustomerById(id) {
  let customer = new Customer();
  await customer.fetchData(id);
  $("#customer-name-add").val(customer.Name);
  $("#customer-cui-add").val(customer.CUI);
  $("#customer-id-add").val(customer.Id);
}

// event de post new customer
function addOnPostEventListner(customer) {
  document.getElementById("customers-post").addEventListener("click", () => {
    let data = gatherPostInputData();
    customer.postData(data);
  });
}

// event de update customer
function addOnUpdateEventListner(customer) {
  document.getElementById("customers-update").addEventListener("click", () => {
    let data = gatherUpdateInputData();
    let id = document.getElementById("customer-id-add").value;
    console.log("intra", data);
    console.log("id", id);
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
  return document.getElementById("customer-id-add").value;
}

function gatherPostInputData() {
  let customerId = document.getElementById("id-customers").value;
  let customerName = document.getElementById("customers-name").value;
  let customerCUI = document.getElementById("customers-cui").value;
  return {
    id: customerId,
    Name: customerName,
    CUI: customerCUI
  };
}

function gatherUpdateInputData() {
  let customerId = document.getElementById("customer-id-add").value;
  let customerName = document.getElementById("customer-name-add").value;
  let customerCUI = document.getElementById("customer-cui-add").value;
  return {
    id: customerId,
    Name: customerName,
    CUI: customerCUI
  };
}

async function getAllCustomersNames() {
  let customers = new Customers();
  await customers.fetchData();
  var html = ``;
  for (let i = 0; i < customers.items.length; i++) {
    html += ` <button type="button" id="${customers.items[i].Id}" class="list-group-item list-group-item-action">${customers.items[i].Name}</button>`;
  }
  $("#customer-list").append(html);
}
