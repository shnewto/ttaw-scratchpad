

var eventsRequest = new XMLHttpRequest();


eventsRequest.open('GET', 'https://api.github.com/repos/snewt/ttaw-catalog/events' );


eventsRequest.onload = parseCommits;


function parseCommits()
{
    var eventsResponses = JSON.parse( this.responseText);

    for( var response of eventsResponses )
    {
        if( response.type == "PushEvent" )
        {
            var commits = response.payload.commits;
            var repo = response.repo.name;
            document.getElementById( 'page-title' ).innerHTML = repo;
            document.getElementById( 'header-title' ).innerHTML =
                '<h1>' + 'Repository  Events - <em>'+ repo + '</em>'+ '<\h1>';

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
    var img;
    var name = urlResponse.commit.author.name;

    if( name === 'snewt' || name === 'Shea Newton' || name === 'snewton-at-harbrick')
    {
        name = 'snewt';
        img = 'img/ceci.jpeg';
    }
    else if( name === 'CrockAgile' || name === 'Jeffery Crocker' || name === 'Jeff Crocker')
    {
        name = 'CrockAgile';
        img = 'img/croc.jpeg';
    }
    else
    {
        img = 'img/GitHub-Mark.png';
    }

    document.getElementById( 'cd-timeline' ).innerHTML +=
        '<div class=\"cd-timeline-block\">' +
        '<div class=\"cd-timeline-img cd-picture\">' +
        '</div> <!-- cd-timeline-img -->' +
        '<div class=\"cd-timeline-content\">' +
        '<a href=' + urlResponse.html_url + '>' +
        '<h2>' + urlResponse.sha.substr(0,9) + '</h2>' +
        '</a>' +
        '<p>' +  name + '<br>'+ urlResponse.commit.message +
        '<img align=right src='  + img + '  border=\"7px\" height=\"100\" />' +
        '</p>' +
        '<p>additions: ' + urlResponse.stats.additions + '<br>' +
        'deletions: ' + urlResponse.stats.deletions + '</p>' +
        '<span class=\"cd-date\">' + urlResponse.commit.committer.date + '</span>' +
        '</div> <!-- cd-timeline-content -->' +
        '</div> <!-- cd-timeline-block -->';

    console.log( 'GET: ', urlResponse.html_url );
};


eventsRequest.send();
