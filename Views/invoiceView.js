window.onload = function(){
    var invoice = new Invoice();
    //will be replace
    var id = 5;

    invoice.fetchData(id)
    .then(function(){
        var html = `<tr><th scope="row">1</th>`;
        html += `<td></td>`;
        html += `</tr`;
        var html = `<p>${post.id}</p>`;
        html +=  `<p>${post.title}</p>`;
        html +=  `<p>${post.body}</p>`;
        html +=  `<p>${post.userId}</p>`;

        $("#container").append(html);
        var comments = new Comments();
        comments.fetchData(id)
        .then(function(){
            var html = `<p>${comments.items[0].id}</p>`;
            html +=  `<p>${comments.items[0].name}</p>`;
            html +=  `<p>${comments.items[0].email}</p>`;
            html +=  `<p>${comments.items[0].body}</p>`;
            html +=  `<p>${comments.items[0].postId}</p>`;

            $("#container").append(html);
        })
        .catch(function(e){
            alert('fetch error' + e.status);
        });
    })
    .catch(function(e){
        alert('fetch error' + e.status);
    });
}

/**
* It retrieves a query (URL) parameter value
* 
* It expects you to send the parameter key(before '=')
* **/
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };