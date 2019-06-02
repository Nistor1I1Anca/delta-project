window.onload = function () {
    getInvoiceData();
    getAllSuppliersNames();
    getAllCustomersNames();
}

async function getInvoiceData() {
    let invoice = new Invoice();
    await invoice.fetchData(5);
    document.getElementById("series").value = invoice.Series;
    document.getElementById("number").value = invoice.Number;

    //date processing
    var d = new Date(invoice.Date);
    var dateOnly = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()
    document.getElementById("date").value = dateOnly;
}

async function getAllSuppliersNames() {
    let suppliers = new Suppliers();
    await suppliers.fetchData();
    var html = ``;
    for (let i = 0; i < suppliers.items.length; i++) {
        html += `<li><a href="#" id="${suppliers.items[i].Id}">${suppliers.items[i].Name}</a><li>`;
    }
    $("#supplier-dropdown").append(html);
}

async function getSupplierCUIAfterId(id){
    let supplier = new Supplier();
    await supplier.fetchData(id);
    $('.cui-supplier').text("CUI: "+ supplier.CUI);
}

async function getCustomerCUIAfterId(id){
    let customer = new Customer();
    await customer.fetchData(id);
    $('.cui-customer').text("CUI: "+ customer.CUI);
}

$(document).on('click', '#supplier-dropdown li a', function() {
    // var selectedSupplier = $(this).text();
    var selectedSupplierId = $(this).attr("id");
    $('#supplier').text($(this).text());
    var html = `<span class="caret" id = "arrow"></span>`;
    $('#supplier').append(html);
    getSupplierCUIAfterId(selectedSupplierId);
}); 

$(document).on('click', '#customer-dropdown li a', function() {
    // var selectedCustomer = $(this).text();
    var selectedCustomerId = $(this).attr("id");
    console.log("selectedCustomerId", selectedCustomerId);
    $('#customer-button').text($(this).text());
    var html = `<span class="caret" id = "arrow"></span>`;
    $('#customer-button').append(html);
    getCustomerCUIAfterId(selectedCustomerId);
}); 

async function getAllCustomersNames() {
    let customers = new Customers();
    await customers.fetchData();
    var html = ``;
    for (let i = 0; i < customers.items.length; i++) {
        html += `<li><a href="#" id="${customers.items[i].Id}">${customers.items[i].Name}</a><li>`;
    }
    $("#customer-dropdown").append(html);
}
