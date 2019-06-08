window.onload = function () {
    getInvoiceData();
    getAllSuppliersNames();
    getAllCustomersNames();
    getAllInvoiceItems();
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
    document.getElementById("supplier-dropdown").innerHTML = html;
}

async function getSupplierCUIAfterId(id) {
    let supplier = new Supplier();
    await supplier.fetchData(id);
    document.getElementById("cui-supplier").innerHTML = "CUI: " + supplier.CUI;
    // $('.cui-supplier').text("CUI: " + supplier.CUI);
}

async function getCustomerCUIAfterId(id) {
    let customer = new Customer();
    await customer.fetchData(id);
    document.getElementById("cui-customer").innerHTML = "CUI: " + customer.CUI;
}

$(document).on('click', '#supplier-dropdown li a', function () {
    var selectedSupplierId = $(this).attr("id");
    document.getElementById('supplier').innerHTML = $(this).text();
    var html = `<span class="caret" id = "arrow"></span>`;
    document.getElementById('supplier').innerHTML += html;
    getSupplierCUIAfterId(selectedSupplierId);
});

$(document).on('click', '#customer-dropdown li a', function () {
    var selectedCustomerId = $(this).attr("id");
    document.getElementById('customer-button').innerHTML = $(this).text();
    var html = `<span class="caret" id = "arrow"></span>`;
    document.getElementById('customer-button').innerHTML += html;
    getCustomerCUIAfterId(selectedCustomerId);
});

async function getAllCustomersNames() {
    let customers = new Customers();
    await customers.fetchData();
    var html = ``;
    for (let i = 0; i < customers.items.length; i++) {
        html += `<li><a href="#" id="${customers.items[i].Id}">${customers.items[i].Name}</a><li>`;
    }
    document.getElementById('customer-dropdown').innerHTML += html;
}

async function getAllInvoiceItems() {
    let invoiceItems = new InvoiceItems();
    let invoiceItemBaseUrl = "http://127.0.0.1:5500/invoice-item.html/";
    //replace invoiceId = 5 with an id generated dinamically
    await invoiceItems.fetchData(5);
    var html = ``;
    for (let i = 0; i < invoiceItems.items.length; i++) {
        html += `<tr id="${invoiceItems.items[i].Id}" class="invoice-items"></tr>`;
        html += `<td >${invoiceItems.items[i].Id}</td>`;
        html += `<td >${invoiceItems.items[i].Product.Name}</td>`;
        html += `<td >${invoiceItems.items[i].Quantity}</td>`;
        html += `<td >${invoiceItems.items[i].Price}</td>`;
        var value = invoiceItems.items[i].Quantity * invoiceItems.items[i].Price;
        html += `<td>${value}</td>`;
        html += `<td>${invoiceItems.items[i].VAT}</td>`;
        html += `<td><a href ="${invoiceItemBaseUrl}${invoiceItems.items[i].Id}" type="button" id="edit-column" class="btn btn-info btn-sm">Edit</a>`;
        html += `<a type="button" id="${invoiceItems.items[i].Id}" class="btn btn-info btn-sm delete">Delete</a></td>`;
    }
    document.getElementById('items-table').innerHTML += html;
}

$(document).on('click', '#items-table .delete', function () {
    var selectedSupplierId = $(this).attr("id");
    console.log(selectedSupplierId);
    let invoiceItem = new InvoiceItem();
    invoiceItem.deleteData(selectedSupplierId);
    $(this).parent().parent().remove();
});