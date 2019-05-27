function Invoice() {
  this.Id = null;
  this.Series = "";
  this.Number = null;
  this.Date = "";
  this.SupplierId = null;
  this.CustomerId = null;
  this.InvoiceItems = {};
  //l-am initializat cu un empty object; aduce InvoiceItems de la server.
  //trebuie sa creem clasa InvoiceItem ?
}

Invoice.prototype.fetchData = function(id) {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  let invoiceThis = this;
  fetch("http://delta.apexcode.ro/api/invoices/" + id, {
    method: "GET"
  })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(invoice) {
      invoiceThis.Id = invoice.Id;
      invoiceThis.Series = invoice.Series;
      invoiceThis.Number = invoice.Number;
      invoiceThis.Date = invoice.Date;
      invoiceThis.SupplierId = invoice.SupplierId;
      invoiceThis.CustomerId = invoice.CustomerId;
      invoiceThis.InvoiceItems = invoice.InvoiceItems;
    })
    .catch(function(e) {
      alert("fetch error:" + e);
    });
};

// to be linked to invoicesView
Product.prototype.postData = function(data) {
  fetch("http://delta.apexcode.ro/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};

// to be linked to invoicesView
Product.prototype.updateData = function(data) {
  fetch("http://delta.apexcode.ro/api/products/" + id, {
    method: "PUT",
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp));
};

// to be linked to invoicesView
Customer.prototype.deleteData = function(id) {
  fetch("http://delta.apexcode.ro/api/products/" + id, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};
