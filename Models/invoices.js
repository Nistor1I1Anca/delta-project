function Invoices(){
    this.items = [];
   
}

Invoices.prototype.fetchData = async function(){
    //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
    let invoicesThis = this;
    await fetch(
        'http://delta.apexcode.ro/api/invoices/',{
         method: 'GET'
    })
    .then(function(resp){
        return resp.json();
    })
    .then(function(invoices){
        for(let i = 0; i < invoices.length; i++){
            let invoice = invoices[i];
            let invoiceModel = new Invoice();
            invoiceModel.Id = invoice.Id;
            invoiceModel.Series = invoice.Series;
            invoiceModel.Number = invoice.Number;
            invoiceModel.Date = invoice.Date;
            invoiceModel.SupplierId = invoice.SupplierId;
            invoiceModel.CustomerId = invoice.CustomerId;

            invoicesThis.items.push(invoiceModel);
        }
    })
    .catch(function(e){
        alert('fetch error:' + e);
    })
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
    Invoices.prototype.deleteData = function (id) {
        fetch("http://delta.apexcode.ro/api/invoices/" + id, {
          method: "DELETE"
        })
          .then(resp => resp.json())
          .then(jsonResp => console.log(jsonResp))
          .catch(e => alert(`post error: ${e}`));
      };
};