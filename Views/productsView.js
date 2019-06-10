window.onload = function() {
  getData();

  let product = new Product();
  addOnPostClickEventListner(product);
  addOnUpdateClickEventListner(product);
  addOnDeleteClickEventListner(product);
  getAllProductNames()

  $(document).on('click', '#product-list button', function () {
    // let supplier = new Supplier();
    var selectedProductId = $(this).attr("id");
    getProductById(selectedProductId, product);
  });
};

async function getData() {
  let products = new Products();
  await products.fetchData();
}

async function getAllProductNames() {
  let products = new Products();
  await products.fetchData();
  var html = ``;
  for (let i = 0; i < products.items.length; i++) {
    html += ` <button type="button" id="${products.items[i].Id}" class="list-group-item list-group-item-action">${products.items[i].Name}</button>`;
  }
  $("#product-list").append(html);
}
async function getProductById(id, product) {
  await product.fetchData(id);
  $("#product-name").val(product.Name);
  $("#product-type").val(product.ProductType);
  $("#product-id").val(product.Id);
}

function addOnPostClickEventListner(product) {
  document.getElementById("product-post").addEventListener("click", () => {
    data = gatherInputdata();
    product.postData(data);
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

function addOnUpdateClickEventListner(product) {
  document.getElementById("product-update").addEventListener("click", () => {
    let data = gatherPutInputData();
    let id = document.getElementById("product-id").value;
    product.updateData(data, id);
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

function addOnDeleteClickEventListner(product) {
  document.getElementById("product-delete").addEventListener("click", () => {
    let id = document.getElementById("product-id").value;
    product.deleteData(id);
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

function gatherPutInputData() {
  let name = document.getElementById("product-name").value;
  let type = document.getElementById("product-type").value;
  let id = document.getElementById("product-id").value;

  return {
    Name: name,
    ProductType: type,
    Id: id
  };
}
function gatherInputdata() {
  let id = document.getElementById("product-id-add").value;
  let name = document.getElementById("product-name-add").value;
  let type = document.getElementById("product-type-add").value;

  return {
    id: id,
    Name: name,
    ProductType: type
  };
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

