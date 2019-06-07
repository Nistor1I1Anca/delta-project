window.onload = function() {
  setWelcome();
  let invoiceId = getUrlParameter("invoiceId");
  document.getElementById("id-invoice").innerHTML = invoiceId;

  populateCustomerAndSupplier();
  populateSelect(invoiceId);

  addOnSelectChangeEventListner();
  addOnSaveClickEventLisnter();
};



async function populateCustomerAndSupplier(invoiceId) {
  let invoice = new Invoice();
  await invoice.fetchData(5);

  let customer = new Customer();
  await customer.fetchData(invoice.CustomerId);
  document.getElementById("id-customer").innerHTML = customer.Name;

  let supplier = new Supplier();
  await supplier.fetchData(invoice.CustomerId);
  document.getElementById("id-supplier").innerHTML = supplier.Name;
}

async function populateSelect(invoiceId) {
  let product = new Product();

  await fetch("http://delta.apexcode.ro/api/Invoices/" + 5 + "/items", {
    method: "GET"
  })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(invoiceItems) {
      return invoiceItems;
    })
    .then(async invoiceItems => {
      for (let i = 0; i < invoiceItems.length; i++) {
        await product.fetchData(invoiceItems[i].Product.Id);
        document.getElementById("select").innerHTML += `<option value="${
          invoiceItems[i].Id
        }">${product.Name}</option>`;
      }
    });

  // select.value
}

function addOnSelectChangeEventListner() {
  document.getElementById("select").addEventListener("change", () => {
    let currentProduct = document.getElementById("select").value;

    fetch(
      "http://delta.apexcode.ro/api/Invoices/" + 5 + "/items/" + currentProduct,
      {
        method: "GET"
      }
    )
      .then(function(resp) {
        return resp.json();
      })
      .then(function(invoiceItems) {
        document.getElementById("id-quantity").placeholder =
          invoiceItems.Quantity;
        document.getElementById("id-price").placeholder = invoiceItems.Quantity;
      });
  });
}

function addOnSaveClickEventLisnter(){
  
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
