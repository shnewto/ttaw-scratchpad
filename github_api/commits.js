// var userRequest = new XMLHttpRequest();
// userRequest.open('GET', 'https://api.github.com/users/snewt' );
//
// userRequest.onreadystatechange = function() {
//
//     if( userRequest.readyState != 4 || userRequest.status != 200 ) {
//         return;
//     }
//
//     var userResponse = JSON.parse( userRequest.responseText) ;
//
//     var reposRequest = new XMLHttpRequest();
//
//     reposRequest.open('GET', userResponse.repos_url);
//
//     reposRequest.onreadystatechange = function() {
//         console.log( reposRequest.responseText );
//     };
//
//     console.log( 'GET: ', userResponse.repos_url );
//
//     reposRequest.send();
// };
//
// console.log( 'GET: ', 'https://api.github.com/users/snewt' );
//
// userRequest.send();

function printCommitMessages() {
    var userResponse = JSON.parse(this.responseText);

    for( var response of userResponse )
    {
        if( response.type == "PushEvent" )
        {
            var commits = response.payload.commits;
            for( var commit of commits )
            {
                    document.getElementById( 'container' ).innerHTML +=
                        '<br>' + '{' + '<br>' + commit.author.name + ': ' +
                        '<br>' + commit.message + '<br>' + '}' + '<br>';
            }
        }
    }

}

var request = new XMLHttpRequest();
request.onload = printCommitMessages;
request.open('get', 'https://api.github.com/repos/snewt/symbolic-regression-c/events', true)
request.send()



