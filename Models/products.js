function Products(){
    this.items = [];
}

Products.prototype.fetchData = function(){
    //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
    var productsThis = this;
    fetch(
       'http://delta.apexcode.ro/api/products',{
        method: 'GET'
       }).then(resp=>resp.json())
    .then(function(products){
        for(var i = 0; i < products.length; i++){
            var product = products[i];
            var productModel = new Product();
            productModel.Id = product.Id;
            productModel.Name = product.Name;
            productModel.ProductType = product.ProductType;
            productsThis.items.push(productModel);
        }
    })
    .catch(function(e){
        alert('fetch error:' + e);
    })
};