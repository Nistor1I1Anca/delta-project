window.onload = function(){
var invoices = new Invoices();
// invoices.fetchData().then(function(){
//     for(let i=0; i < invoices.length; i++){
//         console.log("ajunge");
//         console.log(invoices[i]);
//     }
// });
invoices.fetchData();
console.log(invoices.items);
}