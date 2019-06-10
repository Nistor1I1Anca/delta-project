window.onload = function () {
  var invoiceId = getUrlParameter("invoiceId");
  var invoiceItemId = getUrlParameter("invoiceItemId");
  getAllProducts();
  getAllInvoices();
  if (invoiceId != "" || invoiceItemId != "") {
    fetchItemDataOnEdit(invoiceId, invoiceItemId);
  }
  else {
    addANewInvoiceItem();
  }
};

async function fetchItemDataOnEdit(invoiceId, invoiceItemId) {
  editNewInvoiceItem();
  var invoiceItem = new InvoiceItem();
  await invoiceItem.fetchData(invoiceId, invoiceItemId);
  var productId = invoiceItem.Product.Id;

  // var productName = document.getElementById(productId).value;
  document.getElementById(productId).setAttribute('selected', '');
  document.getElementById(1).removeAttribute('selected');
  document.getElementById("id-quantity").value = invoiceItem.Quantity;
  document.getElementById("id-price").value = invoiceItem.Price;
  document.getElementById("add-button").style.display = 'none';
}

function addANewInvoiceItem() {
  document.getElementById("update-button").style.display = 'none';

}

function editNewInvoiceItem() {
  document.getElementById("add-item-to-invoice-row").style.display = 'none';
}

//add a new item
$(document).on('click', '#add-button', function () {
  let invoiceItemObject = new InvoiceItem();
  let itemQuantity = document.getElementById("id-quantity").value;
  let itemPrice = document.getElementById("id-price").value;
  let productId = document.getElementById("products").getAttribute("productid");
  var productName = document.getElementById("products").innerHTML.split("<span class", 1)[0].trim();
  let invoiceId = document.getElementById("add-item-to-invoice").getAttribute("invoiceid");
  // var invoiceName = document.getElementById("add-item-to-invoice").innerHTML.split("<span class", 1)[0].trim();
  let product = {
    Id: productId,
    Name: productName
  };
  let invoiceItemAdd = {
    Id: 1,
    ProductId: productId,
    Quantity: itemQuantity,
    Price: itemPrice,
    VAT: 5,
    InvoiceId: invoiceId,
    Product: product
  };
  invoiceItemObject.postdata(invoiceItemAdd, invoiceId);
  var responseStatus = getCookie("status");
    console.log(responseStatus);
    if (responseStatus == "201" || responseStatus == "204" || responseStatus == "200") {
      toggleSuccessAlert();
    }
    else if (responseStatus == "400" || responseStatus == "401" || responseStatus == "402" ||
      responseStatus == "404" || responseStatus == "500" || responseStatus == "501") {
      toggleUnsuccessAlert()
    }
  // });
});

//update an existing item
$(document).on('click', '#update-button', function () {
  var invoiceId = getUrlParameter("invoiceId");
  var invoiceItemId = getUrlParameter("invoiceItemId");
  let invoiceItemObject = new InvoiceItem();
  let itemQuantity = document.getElementById("id-quantity").value;
  let itemPrice = document.getElementById("id-price").value;
  let productId = document.getElementById("products").getAttribute("productid");
  var productName = document.getElementById("products").innerHTML.split("<span class", 1)[0].trim();
  let product = {
    Id: productId,
    Name: productName
  };
  let invoiceItemUpdate = {
    Id: invoiceItemId,
    ProductId: productId,
    Quantity: itemQuantity,
    Price: itemPrice,
    VAT: 3,
    InvoiceId: invoiceId,
    Product: product
  };
  invoiceItemObject.updateData(invoiceItemUpdate, invoiceId, invoiceItemId);
  var responseStatus = getCookie("status");
    console.log(responseStatus);
    if (responseStatus == 201) {
      console.log("intra");
      toggleSuccessAlert();
    }
    else if (responseStatus == "400" || responseStatus == "401" || responseStatus == "402" ||
      responseStatus == "404" || responseStatus == "500" || responseStatus == "501") {
      toggleUnsuccessAlert()
    }
});

async function getItemById(invoiceId, invoiceItemId) {
  var invoiceItem = new InvoiceItem();
  await invoiceItem.fetchData(invoiceId, invoiceItemId);
  return invoiceItem;
}


$(document).on('click', '#product-dropdown li a', function () {
  var selectedProductId = $(this).attr("id");
  document.getElementById('products').setAttribute("productId", selectedProductId);
  document.getElementById('products').innerHTML = $(this).text();
  var html = `<span class="caret" id = "arrow"></span>`;
  document.getElementById('products').innerHTML += html;
});

async function getAllProducts() {
  var products = new Products();
  await products.fetchData();
  html = ``;
  for (let i = 0; i < products.items.length; i++) {
    html += `<li>`;
    html += `<a href="#" class="products-items" id="${products.items[i].Id}">${products.items[i].Name}`;
    html += `</a></li>`;
  }
  document.getElementById("product-dropdown").innerHTML += html;
}

async function getAllInvoices() {
  var invoices = new Invoices();
  await invoices.fetchData();
  html = ``;
  for (let i = 0; i < invoices.items.length; i++) {
    html += `<li>`;
    html += `<a href="#" class="invoices-items" id="${invoices.items[i].Id}">${invoices.items[i].Series}`;
    html += `</a></li>`;
  }
  document.getElementById("add-item-dropdown").innerHTML += html;
}

$(document).on('click', '#add-item-dropdown li a', function () {
  var selectedInvoiceId = $(this).attr("id");
  document.getElementById('add-item-to-invoice').setAttribute("invoiceId", selectedInvoiceId);
  document.getElementById('add-item-to-invoice').innerHTML = $(this).text();
  var html = `<span class="caret" id = "arrow"></span>`;
  document.getElementById('add-item-to-invoice').innerHTML += html;
});

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

document.getElementById("close").addEventListener("click", () => {
  var el = document.getElementById('bsalert');
  el.style.visibility = "hidden";
});

document.getElementById("danger-alert-close").addEventListener("click", () => {
  var el = document.getElementById('danger-alert');
  el.style.visibility = "hidden";

  // el.className = 'd-none';
});

function toggleSuccessAlert() {
  var el = document.getElementById('bsalert');
  el.style.visibility = "visible";
  // .visibility = "hidden";
}

function toggleUnsuccessAlert() {
  var el = document.getElementById('danger-alert');
  el.style.visibility = "visible";

  // el.className = 'alert alert-danger';
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

