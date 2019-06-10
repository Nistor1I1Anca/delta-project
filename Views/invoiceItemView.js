window.onload = function () {
  var invoiceId = getUrlParameter("invoiceId");
  console.log("is este fucking", invoiceId);
  var invoiceItemId = getUrlParameter("invoiceItemId");
  console.log("is este fucking", invoiceItemId);
  getAllProducts();
  getAllInvoices();
  if (invoiceId != "" || invoiceItemId != "") {
    console.log("este in edit");
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
  console.log("quantity", invoiceItem.Quantity);
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
  invoiceItemObject.postdata(invoiceItemAdd, invoiceId)
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
  invoiceItemObject.updateData(invoiceItemUpdate, invoiceId, invoiceItemId)
});

async function getItemById(invoiceId, invoiceItemId) {
  var invoiceItem = new InvoiceItem();
  await invoiceItem.fetchData(invoiceId, invoiceItemId);
  console.log("invoiceItem",invoiceItem);
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
    console.log("products.items", products.items[i].Id);
    html += `<li>`;
    html += `<a href="#" class="products-items" id="${products.items[i].Id}">${products.items[i].Name}`;
    html += `</a></li>`;
  }
  document.getElementById("product-dropdown").innerHTML += html;
}

async function getAllInvoices() {
  var invoices = new Invoices();
  await invoices.fetchData();
  console.log(invoices);
  html = ``;
  for (let i = 0; i < invoices.items.length; i++) {
    // console.log("products.items", invoices.items[i].Id);
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



// $(document).on('click', '#update-button', function () {
//   var invoiceItem = new InvoiceItem();
//   // await invoiceItem.fetchData(invoiceId, invoiceItemId);
//   // var 
// });

// function addOnSelectChangeEventListner(currentProduct) {
//   document.getElementById("select").addEventListener("change", async () => {
//     let currentProduct = document.getElementById("select").value;

//     let invoiceItem = new InvoiceItem();
//     await invoiceItem.fetchData(currentProduct);

//     document.getElementById("id-quantity").placeholder = invoiceItem.Quantity;
//     document.getElementById("id-quantity").value = invoiceItem.Quantity;

//     document.getElementById("id-price").placeholder = invoiceItem.Price;
//     document.getElementById("id-price").value = invoiceItem.Price;
//   });
// }

// function addOnSaveClickEventLisnter() {
//   let invoiceId = 8;  //de sters dupa ce avem un InvoiceId in URL   
//   // document.getElementById("id-invoice").innerHTML = invoiceId;
//   document.getElementById("submit-button").addEventListener("click", () => {
//     let quantity = document.getElementById("id-quantity").value;
//     let price = document.getElementById("id-price").value;
//     let currentProduct = document.getElementById("select").value;
//     console.log(currentProduct)

//     data = {
//       InvoiceId: invoiceId,
//       Id: currentProduct,
//       Quantity: quantity,
//       Price: price,
//       ProductId: 40,
//       VAT: 5,

//     };

//     fetch("http://delta.apexcode.ro/api/invoices/" + invoiceId + "/items/" + currentProduct, {
//       method: "PUT",
//       body: JSON.stringify(data),
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       }
//     })
//       .then(resp => resp.json())
//       .then(jsonResp => console.log(jsonResp))
//       .catch(e => alert(`post error: ${e}`));
//   });
// }

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
