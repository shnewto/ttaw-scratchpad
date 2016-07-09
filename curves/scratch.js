

function drawPath( QOffsets, AOffsets, path, dotStart, dotEnd ) {

    // get (top, left) coordinates for the two elements
    var x1 = QOffsets.left;
    var y1 = QOffsets.top;

    var x2 = AOffsets.left;
    var y2 = AOffsets.top;

    var scale = (document.body.clientHeight / 6);

    var m1 = (( x1 + x2 ) / 2) - scale;
    var m2 = (( y1 + y2 ) / 2) - scale;
    var m3 = (( x1 + x2 ) / 2) + scale;
    var m4 = (( y1 + y2 ) / 2) + scale;

    path.setAttribute(
        "d",
        "M "  + x1 + " " + y1 + " q " +  m1 + " " + m2 + ", " + m3 + " " + m4 + " T " + x2 + " " + y2  );

    dotStart.setAttribute( "cx", x1 );
    dotStart.setAttribute( "cy", y1 );

    dotEnd.setAttribute( "cx", x2 );
    dotEnd.setAttribute( "cy", y2 );
}


function loadPaths()
{
    var numQandAsets = 2;

    for( idx = 1; idx <= numQandAsets; idx++ )
    {
        var QOffsets = document.getElementById( 'q' + idx ).getBoundingClientRect();
        var AOffsets = document.getElementById( 'a' + idx ).getBoundingClientRect();
        var path = document.getElementById( 'path' + idx );
        var dotStart = document.getElementById( 'dotStart' + idx );
        var dotEnd = document.getElementById( 'dotEnd' + idx );

        drawPath( QOffsets, AOffsets, path, dotStart, dotEnd );
    }
}


function place_divs()
{
    var numQandAsets = 2;

    for( idx = 2; idx <= numQandAsets; idx++ )
    {
        var pos1x = Math.floor(Math.random()*1000);
        var pos1y = Math.floor(Math.random()*100);

        document.getElementById( 'q' + idx ).style.left = pos1x + 'px';
        document.getElementById( 'q' + idx ).style.top = pos1y + 'px';


        var pos2x = Math.floor(Math.random()*1000);
        var pos2y = Math.floor(Math.random()*100);

        document.getElementById( 'a' + idx ).style.left = pos2x + 'px';
        document.getElementById( 'a' + idx ).style.top = pos2y + 'px';
    }

}


function show_answer( identifier )
{

    console.log( "seeing click event" );

    document.getElementById( 'a' + identifier ).style.visibility = 'visible';
    document.getElementById( 'path' + identifier ).style.visibility = 'visible';
    document.getElementById( 'dotStart' + identifier ).style.visibility = 'visible';
    document.getElementById( 'dotEnd' + identifier ).style.visibility = 'visible';
}


window.onload = function() {
    place_divs();
    loadPaths();
};


window.onresize = function() {
    loadPaths();
};

