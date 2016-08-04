

var eventsRequest = new XMLHttpRequest();


eventsRequest.open('GET', 'https://api.github.com/repos/snewt/ttaw-scratchpad/events' );


eventsRequest.onload = parseCommits;


function parseCommits()
{
    var eventsResponses = JSON.parse( this.responseText);

    for( var response of eventsResponses )
    {
        if( response.type == "PushEvent" )
        {
            var commits = response.payload.commits;

            for (var commit of commits)
            {
                var urlRequest = new XMLHttpRequest();

                urlRequest.open('GET', commit.url);

                urlRequest.onload = parseURL;

                urlRequest.send();
            }
        }
    }
};


function parseURL()
{
    var urlResponse = JSON.parse( this.responseText );
    document.getElementById( 'container' ).innerHTML +=
        '<br>' + '{' + '<br>' +
        '<a href=' +  urlResponse.html_url  + '>' +
        urlResponse.sha.substr(0,9) +
        '</a>' +
        '<br>' + urlResponse.commit.message + '<br>' +
        '}' + '<br>';

    console.log( 'GET: ', urlResponse.html_url );
};


eventsRequest.send();
