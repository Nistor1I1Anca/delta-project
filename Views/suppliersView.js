window.onload = function () {
  getData(); //not necessary here, only verifying it works.

  let supplier = new Supplier();
  addOnPostEventListner(supplier); //post
  addOnDeleteEventListner(supplier); //delete
  addOnUpdateEventListner(supplier); //put
  getAllSuppliersNames();

  $(document).on('click', '#supplier-list button', function () {
    var selectedSupplierId = $(this).attr("id");
    getSupplierById(selectedSupplierId);
  });
};

async function getData() {
  let suppliers = new Suppliers();
  await suppliers.fetchData();
}

async function getSupplierById(id) {
  let supplier = new Supplier();
  await supplier.fetchData(id);
  $("#supplier-name").val(supplier.Name);
  $("#supplier-cui").val(supplier.CUI);
  $("#supplier-id").val(supplier.Id);
}

// event de post new supplier
// function addOnPostEventListner(supplier) {
function addOnPostEventListner(supplier) {
  // let response = supplier.postData(data)
  document.getElementById("suppliers-post").addEventListener("click", () => {
    let data = gatherPostInputData();
    let response = supplier.postData(data);
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

function gatherPostInputData() {
  let id = document.getElementById("supplier-id-add").value;
  let name = document.getElementById("supplier-name-add").value;
  let CUI = document.getElementById("supplier-cui-add").value;
  return {
    id: id,
    Name: name,
    CUI: CUI
  };
}

// event de update supplier
function addOnUpdateEventListner(supplier) {
  document.getElementById("suppliers-update").addEventListener("click", () => {
    let data = gatherUpdateInputData();
    let id = document.getElementById("supplier-id").value;
    supplier.updateData(data, id);
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

// event de delete supplier
function addOnDeleteEventListner(supplier) {
  document.getElementById("suppliers-delete").addEventListener("click", () => {
    let data = gatherDeleteInputdata();
    let id = document.getElementById("supplier-id").value;
    supplier.deleteData(data, id);
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
  return document.getElementById("supplier-id").value;
}

async function getAllSuppliersNames() {
  let suppliers = new Suppliers();
  await suppliers.fetchData();
  var html = ``;
  for (let i = 0; i < suppliers.items.length; i++) {
    html += ` <button type="button" id="${suppliers.items[i].Id}" class="list-group-item list-group-item-action">${suppliers.items[i].Name}</button>`;
  }
  $("#supplier-list").append(html);
}


function gatherUpdateInputData() {
  let supplierName = document.getElementById("supplier-name").value;
  let supplierCUI = document.getElementById("supplier-cui").value;
  let supplierId = document.getElementById("supplier-id").value;
  return {
    id: supplierId,
    Name: supplierName,
    CUI: supplierCUI
  };
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
