window.onload = function(){
    var suppliers = new Suppliers();
  
    suppliers.fetchData();
    console.log(suppliers.items);
    }