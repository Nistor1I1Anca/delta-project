function Invoices(){
    this.items = [];
}

Invoices.prototype.fetchData = function(){
    //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
    var invoicesThis = this;
    fetch(
        'http://delta.apexcode.ro/api/invoices',{
         method: 'GET'
    })
    .then(function(resp){
        return resp.json();
    })
    .then(function(invoices){
        for(var i = 0; i < invoices.length; i++){
            var invoice = invoices[i];
            var invoiceModel = new Invoice();
            invoiceModel.Id = invoice.Id;
            invoiceModel.Series = invoice.Series;
            invoiceModel.Number = invoice.Number;
            invoiceModel.Date = invoice.Date;
            invoiceModel.SupplierId = invoice.SupplierId;
            invoiceModel.CustomerId = invoice.CustomerId;
            invoiceModel.InvoiceItems = invoice.InvoiceItems;

            invoicesThis.items.push(invoiceModel);
        }
        console.log("intra aici!");
    })
    .catch(function(e){
        alert('fetch error:' + e);
    })
};