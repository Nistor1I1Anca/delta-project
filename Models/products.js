function Products(){
    this.items = [];
}

Products.prototype.fetchData = function(){
    //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
    var productsThis = this;
    return $.ajax({
        url: 'http://delta.apexcode.ro/api/products',
        method: 'GET'
    })
    .then(function(products){
        for(var i = 0; i < products.length; i++){
            var product = products[i];
            var productModel = new Product();
            productModel.id = product.id;
            productModel.name = product.name;
            productModel.type = product.type;
            productsThis.items.push(productModel);
        }
    })
    .catch(function(e){
        alert('fetch error:' + e);
    })
};