/**
 * Declare Preloader Class
 * @param game
 * @constructor
 */
Critterer.Preloader = function(game) {
    this.preload_bar = null;
    this.loader_lbl = null;
    this.game_play_btn = null;
    this.ready = false;
};

Critterer.Preloader.prototype = {

    /**
     * Implements preload()
     * preload all remaining game assets
     */
    preload: function () {

        this.loader_lbl = this.add.text(
            this.world.centerX,
            this.world.centerY - 50,
            "",
            {
                size: "32px",
                fill: "#FFF",
                align: "center"
            }
        );
        this.loader_lbl.anchor.setTo(0.5,0.5);

        this.preload_bar = this.add.sprite(this.world.centerX, this.world.centerY +50, 'preload_bar');
        this.preload_bar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preload_bar);

        // pre load assets for the rest of the game (e.g. Main Menu, Game, etc.)
        this.load.spritesheet('bad', 'img/sprites/bad.png', 39, 40, 16);
        this.load.spritesheet('good', 'img/sprites/good.png', 32, 32,6);
        this.load.image('critterer_logo', 'img/critterer-logo.png');
        this.load.image('game_play_btn', 'img/hud/play-icon.png');
        this.load.image('background', 'img/background.png');
        this.load.image('btnPause', 'img/hud/pause.png');
	    this.load.image('panel', 'img/hud/pause-modal.png');
	    this.load.image('restart_btn', 'img/hud/restart-icon.png');
	    this.load.image('menu_btn', 'img/hud/menu-icon.png');
    },

    /**
     * Implements create()
     * once all assets are loaded, we can turn off cropping preload bar
     */
    create: function () {
        this.preload_bar.cropEnabled = false;
        this.loader_lbl.setText("Loading . . .");
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
