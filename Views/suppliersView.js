window.onload = function() {
 getData();
};

async function getData(){
    let suppliers = new Suppliers();
  await suppliers.fetchData();
  console.log(suppliers.items[0]);
  console.log(suppliers.items);
}