//define API url
var apiUrl = "http://alpha.apexcode.ro/api";

//metoda de GET prin Fetch API
    fetch(apiUrl + '/products', {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    }).then(function(datele){
        for(var i=0; i< datele.length; i++){
            // JSON.stringify - converteste un JSON in string
            document.getElementById("id-products").value = JSON.stringify(datele[1]);
    }
});