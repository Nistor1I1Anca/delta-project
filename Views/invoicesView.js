window.onload = function() {
    getData();
};

async function getData() {
  let invoices = new Invoices();

  invoices.fetchData();
  console.log(invoices.items);
  console.log(invoices.items[0]);
}
