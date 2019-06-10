function InvoiceItems(){
    this.items = [];
}

InvoiceItems.prototype.fetchData = async function(invoiceId){
    //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
    let invoiceItemsThis = this;
    await fetch(
        'http://delta.apexcode.ro/api/invoices/'+invoiceId+'/items',{
         method: 'GET'
    })
    .then(function(resp){
        return resp.json();
    })
    .then(function(invoiceItems){
        for(let i = 0; i < invoiceItems.length; i++){
            let invoiceItem = invoiceItems[i];
            let invoiceItemModel = new InvoiceItem();
            invoiceItemModel.Id = invoiceItem.Id;
            invoiceItemModel.ProductId = invoiceItem.ProductId;
            invoiceItemModel.Quantity = invoiceItem.Quantity;
            invoiceItemModel.Price = invoiceItem.Price;
            invoiceItemModel.VAT = invoiceItem.VAT;
            invoiceItemModel.InvoiceId = invoiceItem.InvoiceId;
            invoiceItemModel.Product = invoiceItem.Product;

            invoiceItemsThis.items.push(invoiceItemModel);
        }
    })
    .catch(function(e){
        alert('fetch error:' + e);
    })
};