var GAME = GAME || {};

GAME.CJView = function (engine) {

    this.engine = engine;
    this.renderer = new PIXI.autoDetectRenderer(600,800);
    this.stage = new PIXI.Stage(0xFF0000);

    console.log("Renderer Height: " + this.renderer.height);
    console.log("Background Color: " + this.stage.backgroundColor);

    this.container = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.container);

}