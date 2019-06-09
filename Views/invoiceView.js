window.onload = function () {
    var id = getUrlParameter("invoiceId");
    console.log("is este fucking", id);
    if (id === null || id === "") {
        console.log("id is null");
        getInvoiceDataForANewInvoice();
    }
    else {
        getInvoiceData(id);
        getAllInvoiceItems(id);
    }
    console.log(id);
    getAllSuppliersNames();
    getAllCustomersNames();
}

$(function () {
    console.log("intra sua ba");
    $("#footer").load("footer.html");
});

async function getInvoiceDataForANewInvoice() {
    document.getElementById("products-table").style.display = 'none';
    document.getElementById("update-invoice").style.display = 'none';

    let suppliers = new Suppliers();
    await suppliers.fetchData();
    console.log(suppliers);
    console.log("ce trb", suppliers.items[0].SupplierId);
    document.getElementById('supplier').setAttribute("supplierId", suppliers.items[0].Id);
    document.getElementById('supplier').innerHTML = suppliers.items[0].Name;
    var html = `<span class="caret" id = "arrow"></span>`;
    document.getElementById('supplier').innerHTML += html;

    let customers = new Customers();
    await customers.fetchData();
    console.log(customers);
    console.log(customers.items[0]);
    document.getElementById('customer-button').setAttribute("customerId", customers.items[0].Id);
    document.getElementById('customer-button').innerHTML = customers.items[0].Name;
    var html = `<span class="caret" id = "arrow"></span>`;
    document.getElementById('customer-button').innerHTML += html;
}

async function getInvoiceData(id) {
    document.getElementById("add-invoice").style.display = 'none';

    let invoice = new Invoice();
    await invoice.fetchData(id);
    document.getElementById("series").value = invoice.Series;
    document.getElementById("number").value = invoice.Number;

    //date processing
    var d = new Date(invoice.Date);
    var dateOnly = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()
    document.getElementById("date").value = dateOnly;

    //fetch supplier id correctly
    var supplierId = invoice.SupplierId;
    let supplier = new Supplier();
    await supplier.fetchData(supplierId);
    document.getElementById("supplier").innerHTML = supplier.Name;
    var html = `<span class="caret" id = "arrow"></span>`;
    document.getElementById("supplier").innerHTML += html;
    document.getElementById('supplier').setAttribute("supplierId", supplierId);

    //fetch customer id correctly
    var customerId = invoice.CustomerId;
    let customer = new Customer();
    await customer.fetchData(customerId);
    document.getElementById("customer-button").innerHTML = customer.Name;
    var html = `<span class="caret" id = "arrow"></span>`;
    document.getElementById("customer-button").innerHTML += html;
    document.getElementById('customer-button').setAttribute("customerId", customerId);
}

async function getAllSuppliersNames() {
    let suppliers = new Suppliers();
    await suppliers.fetchData();
    var html = ``;
    for (let i = 0; i < suppliers.items.length; i++) {
        html += `<li><a href="#" class="supplier-items" id="${suppliers.items[i].Id}">${suppliers.items[i].Name}</a><li>`;
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
    // document.getElementById('supplier').classList.add(selectedSupplierId);
    document.getElementById('supplier').setAttribute("supplierId", selectedSupplierId);
    document.getElementById('supplier').innerHTML = $(this).text();
    var html = `<span class="caret" id = "arrow"></span>`;
    document.getElementById('supplier').innerHTML += html;
    getSupplierCUIAfterId(selectedSupplierId);
});

$(document).on('click', '#customer-dropdown li a', function () {
    var selectedCustomerId = $(this).attr("id");
    document.getElementById('customer-button').setAttribute("customerId", selectedCustomerId);
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


async function getAllInvoiceItems(id) {
    let invoiceItems = new InvoiceItems();
    let invoiceItemBaseUrl = "http://127.0.0.1:5500/invoice-item.html/";
    await invoiceItems.fetchData(id);
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

$(document).on('click', '#update-invoice', function () {
    var invoiceID = getUrlParameter("invoiceId");
    let invoice = new Invoice();
    // invoice.updateData(invoiceID);

    let invoiceNumber = document.getElementById("number").value;
    let invoiceSeries = document.getElementById("series").value;
    let invoiceDate = document.getElementById("date").value;
    let supplierId = document.getElementById("supplier").getAttribute("supplierId");
    let customerId = document.getElementById("customer-button").getAttribute("customerId");

    let invoiceUpdate = {
        Id: invoiceID,
        Number: invoiceNumber,
        Date: invoiceDate,
        Series: invoiceSeries,
        CustomerId: customerId,
        SupplierId: supplierId
    };
    invoice.updateData(invoiceUpdate, invoiceID)
});

$(document).on('click', '#add-invoice', function () {
    // style.display="none"
    let invoice = new Invoice();
    let invoiceNumber = document.getElementById("number").value;
    let invoiceSeries = document.getElementById("series").value;
    let invoiceDate = document.getElementById("date").value;
    let supplierId = document.getElementById("supplier").getAttribute("supplierId");
    let customerId = document.getElementById("customer-button").getAttribute("customerId");

    let invoiceAdd = {
        Id: 1,
        Number: parseInt(invoiceNumber),
        Date: invoiceDate,
        Series: invoiceSeries,
        CustomerId: parseInt(customerId),
        SupplierId: parseInt(supplierId)
    };
    invoice.postData(invoiceAdd);
});


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};