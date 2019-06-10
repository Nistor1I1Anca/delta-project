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
    var responseStatus = getCookie("status");
    console.log(responseStatus);
    if (responseStatus == "201" || responseStatus == "204" || responseStatus == "200") {
      toggleSuccessAlert();
    }
    else if (responseStatus == "400" || responseStatus == "401" || responseStatus == "402" ||
      responseStatus == "404" || responseStatus == "500" || responseStatus == "501") {
      toggleUnsuccessAlert()
    }
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
    var responseStatus = getCookie("status");
    console.log(responseStatus);
    if (responseStatus == "201" || responseStatus == "204" || responseStatus == "200") {
      toggleSuccessAlert();
    }
    else if (responseStatus == "400" || responseStatus == "401" || responseStatus == "402" ||
      responseStatus == "404" || responseStatus == "500" || responseStatus == "501") {
      toggleUnsuccessAlert()
    }
  });
}

// event de delete customer
function addOnDeleteEventListner(customer) {
  document.getElementById("customers-delete").addEventListener("click", () => {
    let id = gatherDeleteInputdata();
    customer.deleteData(id);
    var responseStatus = getCookie("status");
    console.log(responseStatus);
    if (responseStatus == "201" || responseStatus == "204" || responseStatus == "200") {
      toggleSuccessAlert();
    }
    else if (responseStatus == "400" || responseStatus == "401" || responseStatus == "402" ||
      responseStatus == "404" || responseStatus == "500" || responseStatus == "501") {
      toggleUnsuccessAlert()
    }
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

document.getElementById("close").addEventListener("click", () => {
  var el = document.getElementById('bsalert');
  el.className = 'd-none';
});

document.getElementById("danger-alert-close").addEventListener("click", () => {
  var el = document.getElementById('danger-alert');
  el.className = 'd-none';
});

function toggleSuccessAlert() {
  var el = document.getElementById('bsalert');
  el.className = 'alert alert-info';
}

function toggleUnsuccessAlert() {
  var el = document.getElementById('danger-alert');
  el.className = 'alert alert-danger';
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
