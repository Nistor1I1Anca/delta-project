function Products(){
    this.items = [];
}

Products.prototype.fetchData =  async function(){
    //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
    console.log("test daca intra");
    let productsThis = this;
    await fetch(
       'http://delta.apexcode.ro/api/products',{
        method: 'GET'
       }).then(resp=>resp.json())
    .then(function(products){
        for(let i = 0; i < products.length; i++){
            let product = products[i];
            let productModel = new Product();
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