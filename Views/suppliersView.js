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
function addOnPostEventListner(supplier) {
  document.getElementById("suppliers-post").addEventListener("click", () => {
    let data = gatherPostInputData();
    supplier.postData(data);
    console.log(supplier);
    toggleSuccessAlert();
  });
}

document.getElementById("close").addEventListener("click", () => {
  var el = document.getElementById('bsalert');
  el.className = 'd-none';

});

function toggleSuccessAlert(){
  var el = document.getElementById('bsalert');
  el.className = 'alert alert-info';
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

function gatherDeleteInputdata() {
  return document.getElementById("supplier-id").value;
}

function gatherUpdateInputData() {
  let id = document.getElementById("supplier-id").value;
  let name = document.getElementById("supplier-name").value;
  let CUI = document.getElementById("supplier-cui").value;
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
    console.log("id",id)
    supplier.updateData(data, id);
  });
}

// event de delete supplier
function addOnDeleteEventListner(supplier) {
  document.getElementById("suppliers-delete").addEventListener("click", () => {
    let data = gatherDeleteInputdata();
    let id = document.getElementById("supplier-id").value;
    supplier.deleteData(data, id);
  });
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

