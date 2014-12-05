/**
 * Declare Preloader Class
 * @param game
 * @constructor
 */
Critterer.Preloader = function(game) {
    this.preload_bar = null;
    this.critterer_logo = null;
    this.game_play_btn = null;
    this.ready = false;
}

Critterer.Preloader.prototype = {

    /**
     * Implements preload()
     * preload all remaining game assets
     */
    preload: function () {
        this.preload_bar = this.add.sprite(this.world.centerX, this.world.centerY +50, 'preload_bar');
        this.preload_bar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preload_bar);

        this.critterer_logo = this.add.sprite(this.world.centerX, this.world.centerY - 75, 'critterer_logo');
        this.critterer_logo.anchor.setTo(0.5, 0.5);

        this.load.image('game_play_btn', 'img/game-play.png');
    },

    /**
     * Implements create()
     * once all assets are loaded, we can turn off cropping preload bar
     */
    create: function () {
        this.preload_bar.cropEnabled = false;
    },

    /**
     * Implements update()
     * the update method fires constantly when the create method is complete
     * simply let the game know all assets loaded. we're ready.
     */
    update: function () {
        this.ready = true;
        this.state.start('MainMenu');
    }
}
