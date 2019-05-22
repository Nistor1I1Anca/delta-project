function Supplier() {
    this.Id = null;
    this.Name = "";
    this.CUI = null;
  }
  
  Supplier.prototype.fetchData = function(id) {
    //daca nu salvam this curent, inauntru cand suprascriu id-ul, o sa am alt current context: this
    var supplierThis = this;
    fetch("http://delta.apexcode.ro/api/suppliers/" + id, {
      method: "GET"
    })
      .then(resp => resp.json())
      .then(function(supplier) {
        supplierThis.Id = supplier.Id;
        supplierThis.Name = supplier.Name;
        supplierThis.CUI = supplier.CUI;
      })
      .catch(function(e) {
        alert("fetch error:" + e);
      });
  };
  