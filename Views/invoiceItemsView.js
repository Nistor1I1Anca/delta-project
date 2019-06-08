window.onload = function() {
  setWelcome();

  let invoiceId = 8;  //de sters dupa ce avem un InvoiceId in URL 

  // de decomentat - >>>>  let invoiceId = getUrlParameter("invoiceId");
  
  document.getElementById("id-invoice").innerHTML = invoiceId;

  populateCustomerAndSupplier();
  populateSelect(invoiceId);

  addOnSelectChangeEventListner();
  addOnSaveClickEventLisnter(invoiceId);
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

  await fetch("http://delta.apexcode.ro/api/Invoices/" + invoiceId + "/items", {
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

function addOnSelectChangeEventListner(currentProduct) {
  document.getElementById("select").addEventListener("change", async () => {
    let currentProduct = document.getElementById("select").value;

    let invoiceItem = new InvoiceItem();
    await invoiceItem.fetchData(currentProduct);

    document.getElementById("id-quantity").placeholder = invoiceItem.Quantity;
    document.getElementById("id-quantity").value = invoiceItem.Quantity;

    document.getElementById("id-price").placeholder = invoiceItem.Price;
    document.getElementById("id-price").value = invoiceItem.Price;
  });
}

function addOnSaveClickEventLisnter(invoiceId) {
  document.getElementById("submit-button").addEventListener("click", () => {
    let quantity = document.getElementById("id-quantity").value;
    let price = document.getElementById("id-price").value;
    let currentProduct = document.getElementById("select").value;
    console.log(currentProduct)

    data = {
      InvoiceId: invoiceId,
      Id: currentProduct,
      Quantity: quantity,
      Price: price,
      ProductId: 40,
      VAT: 5,
    
    };

    fetch("http://delta.apexcode.ro/api/invoices/" + invoiceId + "/items/" + currentProduct, {
      method: "PUT",
      body: JSON.stringify(data),
      mode:"cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(resp => resp.json())
      .then(jsonResp => console.log(jsonResp))
      .catch(e => alert(`post error: ${e}`));
  });
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
