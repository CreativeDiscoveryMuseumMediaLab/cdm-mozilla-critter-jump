domready(function()
{
    init();
});

window.addEventListener('resize', function()
{
    resize();
});

window.onorientationchange = resize;

// list variables
var game;
var width;
var height;

/**
 * init game
 * this will be the main function that initializes the game
 */
function init() {

    game = new GAME.CJEngine();
    document.body.appendChild(game.view.renderer.view);

    requestAnimFrame(update);

    resize();
}

function resize()
{
    window.scrollTo(0, 0);

    var h = 640;
    var width = window.innerWidth || document.body.clientWidth;
    var height = window.innerHeight || document.body.clientHeight;
    var ratio = height / h;

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

function update() {
    game.update();
    requestAnimFrame(update);
}