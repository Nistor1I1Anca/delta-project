function InvoiceItem() {
  this.Id = null;
  this.ProductId = null;
  this.Quantity = null;
  this.Price = null;
  this.VAT = null;
  this.InvoiceId = null;
  this.Product = new Product();
}

InvoiceItem.prototype.fetchData = async function (invoiceItemId) {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  let invoiceItemThis = this;
  await fetch("http://delta.apexcode.ro/api/InvoiceItems/" + invoiceItemId, {
    method: "GET"
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (invoiceItem) {
      invoiceItemThis.Id = invoiceItem.Id;
      invoiceItemThis.ProductId = invoiceItem.ProductId;
      invoiceItemThis.Quantity = invoiceItem.Quantity;
      invoiceItemThis.Price = invoiceItem.Price;
      invoiceItemThis.VAT = invoiceItem.VAT;
      invoiceItemThis.InvoiceId = invoiceItem.InvoiceId;
      invoiceItemThis.Product = invoiceItem.Product;
    });
};

InvoiceItem.prototype.postdata = async function (invoiceItemId) {
  await fetch("http://delta.apexcode.ro/api/InvoiceItems/" + invoiceItemId, {
    method: "PUT",
    body: JSON.stringify(this),
    headers: { "Content-Type": "application/json", Accept: "application/json" }
      .then(function (resp) {
        return resp.json();
      })
      .then(function (invoiceItem) {
        invoiceItemThis.Id = invoiceItem.Id;
        invoiceItemThis.ProductId = invoiceItem.ProductId;
        invoiceItemThis.Quantity = invoiceItem.Quantity;
        invoiceItemThis.Price = invoiceItem.Price;
        invoiceItemThis.VAT = invoiceItem.VAT;
        invoiceItemThis.InvoiceId = invoiceItem.InvoiceId;
        invoiceItemThis.Product = invoiceItem.Product;
      })
  })
};

// to be linked to invoicesView
InvoiceItem.prototype.deleteData = async function (id) {
  await fetch("http://delta.apexcode.ro/api/InvoiceItems/" + id, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};
