window.onload = function () {
  getData();
};

async function getData() {
  console.log("hhhhh")
  let invoices = new Invoices();

  await invoices.fetchData();

  var html = ``;
  for (let i = 0; i < invoices.items.length; i++) {
    html += `<tr id="${invoices.items[i].Id}"></tr>`;
    html += `<td>${i+1}</td>`;
    html += `<td>${invoices.items[i].Series}</td>`;
    html += `<td>${invoices.items[i].Number}</td>`;
    html += `<td>${invoices.items[i].Date}</td>`;

    html += `<td><button type="button" id="edit-column" class="btn btn-success btn-sm">Edit</button>`;
    html += `<button type="button" id="delete-column" class="btn btn-danger btn-sm">Delete</button></td>`;

  }
  $("#data_table").append(html);
  console.log(invoices.items);
  console.log(invoices.items[0]);
}
