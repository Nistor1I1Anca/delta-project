window.onload = function () {
  // getFooter();
  getData();
};

// $(function(){
//   $("#footer").load("footer.html"); 
//   });
// function getFooter(){
//   console.log("vine si pe aici!");
//   $("#footer").load("footer.html");
// }

async function getData() {
  console.log("hhhhh")
  let invoices = new Invoices();

  await invoices.fetchData();

  var html = ``;
  for (let i = 0; i < invoices.items.length; i++) {
    html += `<tr id="${invoices.items[i].Id}"></tr>`;
    html += `<td>${i + 1}</td>`;
    html += `<td>${invoices.items[i].Series}</td>`;
    html += `<td>${invoices.items[i].Number}</td>`;
    html += `<td>${invoices.items[i].Date}</td>`;
    //button[data-action="edit"][id="8"]
    html += `<td><button type="button" id="${invoices.items[i].Id}" class="btn btn-success btn-sm" data-action="edit">Edit</button>`;
    html += `<button type="button" id="${invoices.items[i].Id}" class="btn btn-danger btn-sm" data-action="delete">Delete</button></td>`;

  }
  $("#data_table").append(html);
  console.log(invoices.items);
  console.log(invoices.items[0]);
}

$(document).on('click', 'button[data-action="edit"]', function () {
  var selectedInvoiceId = $(this).attr("id");
  console.log(selectedInvoiceId);
  let invoice = new Invoice();
  invoice.fetchData(selectedInvoiceId);
  var queryString = "?invoiceId=" + selectedInvoiceId;
  window.location.href = "invoice.html" + queryString;
});

$(document).on('click', '#add-new-invoice', function () {
  console.log("itra");
  // add-new-invoice
  window.location.href = "invoice.html";
});
