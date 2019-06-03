function Invoice() {
  this.CustomerId = null;
  this.Date = "";
  this.Id = null;
  this.Number = null;
  this.Series = "";
  this.SupplierId = null;

  //l-am initializat cu un empty object; aduce InvoiceItems de la server.
  //trebuie sa creem clasa InvoiceItem ?
}

Invoice.prototype.fetchData = async function(id) {
  //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
  let invoiceThis = this;
  await fetch("http://delta.apexcode.ro/api/invoices/5", {
    method: "GET"
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (invoice) {
      invoiceThis.CustomerId = invoice.CustomerId;
      invoiceThis.Date = invoice.Date;
      invoiceThis.Id = invoice.Id;
      invoiceThis.Number = invoice.Number;
      invoiceThis.Series = invoice.Series;
      invoiceThis.SupplierId = invoice.SupplierId;
    })
};

// to be linked to invoicesView
Invoice.prototype.postData = function (data) {
  fetch("http://delta.apexcode.ro/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};

// to be linked to invoicesView
Invoice.prototype.updateData = function (data) {
  fetch("http://delta.apexcode.ro/api/products/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data)
  })
    // .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};

// to be linked to invoicesView
Invoice.prototype.deleteData = function (id) {
  fetch("http://delta.apexcode.ro/api/products/" + id, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(e => alert(`post error: ${e}`));
};
