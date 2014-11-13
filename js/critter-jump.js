// recall that this simply checks to make sure the page is completely loaded before it does anything.
// once loaded, we simply call our onReady() function to get things moving
domready(function()
{
    onReady();
});

// here we are listening for a 'resize' event
// quite literally, checking to see if the visitor has resized the screen
window.addEventListener('resize', function()
{
    resize();
});

// On orientation change, we call the resize() function.
window.onorientationchange = resize;

var GAME_MODE = {
    TITLE : 0,
    COUNT_DOWN : 1,
    PLAYING : 2,
    GAME_OVER : 3,
    INTRO : 4,
    PAUSED : 5
};

// list variables
var game;
var gameMode = 0;
var width;
var height;
var loader;
var black;
var cdm_logo;
var mozilla_logo;
var game_logo;
var interactive = true;
var loadInterval = false;
var pauseButton = false;

/**
 * load assets, set initial conditions
 */
function onReady()
{
    // make sure the visitor can't scroll in the window
    document.body.scroll = "no";

    // list images, spritesheets in a PIXI asset array
    loader = new PIXI.AssetLoader([
        "assets/hud/pause.png",
        "assets/hud/game-play.png",
        "assets/hud/credits-btn.png",
        "assets/hud/high-score-btn.png",
        "img/blackSquare.jpg",
        "img/HudAssets-hd.json",
        "img/CDM-wide-small.png",
        "img/Mozilla_Foundation_logo.gif",
    ]);

    // listening for PIXI assets to have finished loading
    loader.addEventListener('onComplete', function (event)
    {
        init();
        clearInterval(loadInterval);
    });

    // actually load the PIXI assets listed above
    loader.load();

    resize();
}

/**
 * this will be the main function that initializes the game
 */
function init()
{
    gameMode = GAME_MODE.INTRO;
    interactive = false;

    game = new GAME.CJEngine();
    document.body.appendChild(game.view.renderer.view);
    game.view.renderer.view.style.position = "absolute";
    game.view.renderer.view.webkitImageSmoothingEnabled = false

    // add objects to be manipulated before calling resize
    black = new PIXI.Sprite.fromImage("img/blackSquare.jpg");
    black.alpha = 0;

    cdm_logo = PIXI.Sprite.fromImage("img/CDM-wide-small.png");
    cdm_logo.anchor.x = 0.5;
    cdm_logo.anchor.y = 0.5;
    cdm_logo.alpha = 0;

    mozilla_logo = PIXI.Sprite.fromImage("img/Mozilla_Foundation_logo.gif");
    mozilla_logo.anchor.x = 0.5;
    mozilla_logo.anchor.y = 0.5;
    mozilla_logo.width = 300 * (2224/2091);
    mozilla_logo.height = 300 * (2224/2091);
    mozilla_logo.alpha = 0;

    game_logo = PIXI.Sprite.fromFrame("runLogo.png");
    game_logo.anchor.x = 0.5;
    game_logo.anchor.y = 0.5;
    game_logo.alpha = 0;

    game_play_btn = PIXI.Sprite.fromImage("assets/hud/game-play.png");
    game_play_btn.anchor.x = 0.5;
    game_play_btn.anchor.y = 0.5;
    game_play_btn.alpha = 0;
    game_play_btn.interactive = true;

    high_score_btn = PIXI.Sprite.fromImage("assets/hud/high-score-btn.png");
    high_score_btn.anchor.x = 0.5;
    high_score_btn.anchor.y = 0.5;
    high_score_btn.alpha = 0;
    high_score_btn.interactive = true;

    credits_btn = PIXI.Sprite.fromImage("assets/hud/credits-btn.png");
    credits_btn.anchor.x = 0.5;
    credits_btn.anchor.y = 0.5;
    credits_btn.alpha = 0;
    credits_btn.interactive = true;

    game_play_btn.mousedown = game_play_btn.touchstart = function(event)
    {
        event.originalEvent.preventDefault();
        console.log("We're ready to play!");
    }

    high_score_btn.mousedown = high_score_btn.touchstart = function(event)
    {
        event.originalEvent.preventDefault();
        console.log("What's my high score?!");
    }

    credits_btn.mousedown = credits_btn.touchstart = function(event)
    {
        event.originalEvent.preventDefault();
        console.log("Show me the money!");
    }

    this.game.view.hud.addChild(black);
    this.game.view.hud.addChild(cdm_logo);
    this.game.view.hud.addChild(mozilla_logo);
    this.game.view.hud.addChild(game_logo);
    this.game.view.hud.addChild(game_play_btn);
    this.game.view.hud.addChild(high_score_btn);
    this.game.view.hud.addChild(credits_btn);

    // our initial update game loop call
    requestAnimFrame(update);

    sponsorIntro();

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
        // resize view and elements within the view to match

        var view = game.view.renderer.view;
        view.style.height = h * ratio +"px";

        var newWidth = (width / ratio);

        view.style.width = width +"px";

        this.cdm_logo.position.x = newWidth / 2;
        this.cdm_logo.position.y = h/2 - 20;

        this.mozilla_logo.position.x = newWidth / 2;
        this.mozilla_logo.position.y = h/2 - 20;

        this.game_logo.position.x = newWidth / 2;
        this.game_logo.position.y = h/2 - 50;

        this.game_play_btn.position.x = newWidth / 2;
        this.game_play_btn.position.y = h/2 + this.game_logo.height/2;

        if(black)
        {
            black.scale.x = newWidth/16;
            black.scale.y = h/16;
        }

        credits_btn.position.x = newWidth - this.credits_btn.width/2 - 30;
        credits_btn.position.y = h - this.credits_btn.height/2 - 30;

        high_score_btn.position.x = this.credits_btn.position.x;
        high_score_btn.position.y = this.credits_btn.position.y - this.credits_btn.height - 30;

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

/**
 * show then hide the sponsor logos and disclaimers
 * then move on to the game title (main menu)
 */
function sponsorIntro()
{

    TweenLite.to(mozilla_logo, 0.5, {
        delay:0.5,
        alpha: 1,
        onComplete : (function() {
            TweenLite.to(mozilla_logo, 0.3, {
                delay: 2,
                alpha: 0,
            });
        })
    });

    TweenLite.to(black, 0.5, {
        delay: 3.3,
        alpha: 1,
    });

    TweenLite.to(cdm_logo, 0.5, {
        delay: 3.3,
        alpha: 1,
        onComplete: (function () {
            TweenLite.to(cdm_logo, 0.3, {
                delay: 2,
                alpha: 0,
                onComplete: showGameTitle
            });
        })
    });

}

/**
 * main menu with the logo, play and other options
 */
function showGameTitle()
{
    var fade_in_time = 0.5;

    TweenLite.to(game_logo, fade_in_time, {
        alpha: 1,
    });

    TweenLite.to(game_play_btn, fade_in_time, {
        alpha: 1,
    });

    TweenLite.to(credits_btn, fade_in_time, {
        alpha: 1,
    });

    TweenLite.to(high_score_btn, fade_in_time, {
        alpha: 1,
    });

    resize();

}