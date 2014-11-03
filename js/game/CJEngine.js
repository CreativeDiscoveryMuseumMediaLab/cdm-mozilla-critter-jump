// establish the GAME class
var GAME = GAME || {};

// build the GAME.CJEngine constructor
GAME.CJEngine = function() {

    this.view = new GAME.CJView(this);

}

GAME.CJEngine.prototype.update = function() {
    this.view.update();
}