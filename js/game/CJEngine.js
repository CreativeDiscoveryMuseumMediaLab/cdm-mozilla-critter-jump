/**
 * establish the GAME class
 * @class
 */
var GAME = GAME || {};

/**
 * the GAME engine
 * @constructor
 */
GAME.CJEngine = function()
{
    this.view = new GAME.CJView(this);
}

/**
 * runs the game loop
 */
GAME.CJEngine.prototype.update = function()
{
    this.view.update();
}