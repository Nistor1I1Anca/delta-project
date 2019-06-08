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
  console.log(products.items);
  console.log(products.items[1]);
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
  });
}

function addOnUpdateClickEventListner(product) {
  document.getElementById("product-update").addEventListener("click", () => {
    let data = gatherPutInputData();
    let id = document.getElementById("product-id").value;
    product.updateData(data, id);
  });
}

function addOnDeleteClickEventListner(product) {
  document.getElementById("product-delete").addEventListener("click", () => {
    let id = document.getElementById("product-id").value;
    product.deleteData(id);
  });
}

function gatherPutInputData() {
  let name = document.getElementById("product-name").value;
  let type = document.getElementById("product-type").value;
  let id = document.getElementById("product-id").value;

  return (data = {
    Name: name,
    ProductType: type,
    Id: id
  });
}
function gatherInputdata() {
  let id = document.getElementById("product-id-add").value;
  let name = document.getElementById("product-name-add").value;
  let type = document.getElementById("product-type-add").value;

  return (data = {
    Id: id,
    Name: name,
    ProductType: type
  });
}
