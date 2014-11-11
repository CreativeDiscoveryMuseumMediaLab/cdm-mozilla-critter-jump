/**
 * establish the GAME class
 * @class
 */
var GAME = GAME || {};

/**
 * the view object within GAME
 * @param engine
 * @constructor
 */
GAME.CJView = function (engine)
{
    this.engine = engine;
    this.renderer = new PIXI.autoDetectRenderer(600,800);
    this.stage = new PIXI.Stage(0xFFFFFF);

    this.container = new PIXI.DisplayObjectContainer();
    this.container.hitArea = this.stage.hitArea;
    this.container.interactive = true;

    this.hud = new PIXI.DisplayObjectContainer();
    this.game = new PIXI.DisplayObjectContainer();
    this.gameFront = new PIXI.DisplayObjectContainer();

    this.container.addChild(this.game);
    this.container.addChild(this.gameFront);

    this.stage.addChild(this.container);
    this.stage.addChild(this.hud);
}

/**
 * updates and renders the view
 */
GAME.CJView.prototype.update = function()
{
    this.renderer.render(this.stage);
}

/**
 * resizes the view based on the given width and height
 * @param w
 * @param h
 */
GAME.CJView.prototype.resize = function(w, h)
{
    GAME.width = w;
    GAME.height = h;

    this.renderer.resize(w,h);
}
