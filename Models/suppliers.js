function Suppliers() {
    this.items = [];
  }
  
  Suppliers.prototype.fetchData = async function() {
    //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
    let suppliersThis = this;
    await fetch("http://delta.apexcode.ro/api/suppliers", {
      method: "GET"
    })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(suppliers) {
        for (let i = 0; i < suppliers.length; i++) {
          let supplier = suppliers[i];
          let supplierModel = new Supplier();
  
          supplierModel.Id = supplier.Id;
          supplierModel.Name = supplier.Name;
          supplierModel.CUI = supplier.CUI;
  
          suppliersThis.items.push(supplierModel);
        }
      })
      .catch(function(e) {
        alert("fetch error:" + e);
      });
  };
  