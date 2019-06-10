window.onload = function () {
  getData();
};

async function getData() {
  let invoices = new Invoices();

  await invoices.fetchData();

  var html = ``;
  for (let i = 0; i < invoices.items.length; i++) {
    html += `<tr id="${invoices.items[i].Id}" class="invoice-items"></tr>`;
    html += `<td>${i + 1}</td>`;
    html += `<td>${invoices.items[i].Series}</td>`;
    html += `<td>${invoices.items[i].Number}</td>`;
    html += `<td>${invoices.items[i].Date}</td>`;
    html += `<td><button type="button" id="${invoices.items[i].Id}" class="btn btn-success btn-sm" data-action="edit">Edit</button>`;
    html += `<button type="button" id="${invoices.items[i].Id}" class="btn btn-danger btn-sm" data-action="delete">Delete</button></td>`;
  }

  document.getElementById('data_table').innerHTML += html;
}

$(document).on('click', 'button[data-action="edit"]', function () {
  var selectedInvoiceId = $(this).attr("id");
  let invoice = new Invoice();
  invoice.fetchData(selectedInvoiceId);
  var queryString = "?invoiceId=" + selectedInvoiceId;
  window.location.href = "invoice.html" + queryString;
});

$(document).on('click', '#add-new-invoice', function () {
  // add-new-invoice
  window.location.href = "invoice.html";
});


  $(document).on('click', '#data_table button[data-action="delete"]', function () {
    var selectedRow = $(this).attr("id");
    let invoicess = new Invoices();
    invoicess.deleteData(selectedRow);
    $(this).parent().parent().remove();
  });




