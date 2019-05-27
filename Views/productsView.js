window.onload = function() {
  getData();
};

async function getData() {
  let products = new Products();
  await products.fetchData();
  console.log(products.items);
  console.log(products.items[1]);
}
