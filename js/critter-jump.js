// recall that this simply checks to make sure the page is completely loaded before it does anything.
// once loaded, we simply call our init function to get things moving
domready(function()
{
    init();
});

// here we are listening for a 'resize' event
// quite literally, checking to see if the visitor has resized the screen
window.addEventListener('resize', function()
{
    resize();
});

//this is an on-"" event. ON orientation change, we call the resize() function.
window.onorientationchange = resize;

// list variables
var game;
var width;
var height;

/**
 * this will be the main function that initializes the game
 */
function init()
{
    game = new GAME.CJEngine();
    document.body.appendChild(game.view.renderer.view);

    // our initial update game loop call
    requestAnimFrame(update);

    resize();
}

/**
 * simply modifies the GAMEs width and height
 * parameters to match those of the window.
 */
function resize()
{
    window.scrollTo(0, 0);

    var h = 640;
    var width = window.innerWidth || document.body.clientWidth;
    var height = window.innerHeight || document.body.clientHeight;
    var ratio = height / h;
    // ratio keeps the width of the game in line with a specified height.

    if(game)
    {
        var view = game.view.renderer.view;
        view.style.height = h * ratio +"px";

        var newWidth = (width / ratio);

        view.style.width = width +"px";

        game.view.resize(newWidth , h);

    }

    GAME.width = (width /ratio);
    GAME.height = h;
}

/**
 * we simply run game.update() and do it over and over again
 */
function update()
{
    //console.log('update was just called');
    game.update();
    // requestAnimFrame simply recalls this update() function in a loop
    requestAnimFrame(update);
}