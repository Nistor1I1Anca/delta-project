function Product(){
    this.id = null;
    this.name = "";
    this.type = "";
}

Product.prototype.fetchData = function(id){
    //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
    var productThis = this;
    return $.ajax({
        url: 'http://delta.apexcode.ro/api/products/' + id,
        method: 'GET'
    })
    .then(function(product){
        productThis.id = product.id;
        productThis.name = product.name;
        productThis.type = product.type;
    })
    .catch(function(e){
        alert('fetch error:' + e);
    })
};