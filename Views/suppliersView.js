window.onload = function() {
 getData(); //not necessary here, only verifying it works.
 
 let supplier = new Supplier();
  addOnPostEventListner(supplier); //post
  addOnDeleteEventListner(supplier); //delete
  addOnUpdateEventListner(supplier); //put
};

async function getData(){
    let suppliers = new Suppliers();
  await suppliers.fetchData();
  console.log(suppliers.items[0]);
  console.log(suppliers.items);
}



// event de post new supplier
function addOnPostEventListner(supplier) {
  document.getElementById("suppliers-post").addEventListener("click", () => {
    let data = gatherPostInputData();
    supplier.postData(data);
    console.log(data);
  });
}
function gatherPostInputData() {
  let name = document.getElementById("name-suppliers").value;
  let CUI = document.getElementById("CUI-suppliers").value;
  return {
    Name: name,
    CUI: CUI
  };
}

function addOnUpdateEventListner(supplier) {
  document.getElementById("suppliers-update").addEventListener("click", () => {
    let data = gatherPostInputData();
    let id = document.getElementById("id-suppliers").value;
    console.log(data);
    console.log(id);
    supplier.updateData(data, id);
  });
}

// event de delete supplier
function addOnDeleteEventListner(supplier) {
  document.getElementById("suppliers-delete").addEventListener("click", () => {
    let id = gatherDeleteInputdata();
    supplier.deleteData(id);
  });
}

function gatherDeleteInputdata() {
  return document.getElementById("id-suppliers").value;
}