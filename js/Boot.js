var Critterer = {};

/**
 * preload Preloader assets, setup game stage and scale, start Preloader
 * @constructor
 */
Critterer.Boot = function (game) {};

Critterer.Boot.prototype = {

    /**
     * Implements preload()
     * preload any Preloader assets
     * the preload method fires after the constructor method is complete
     * @todo display sponsor logos
     */
    preload: function () {
        this.load.image('preload_bar', 'img/hud/loader_bar.png');
        this.load.image('critterer_logo', 'img/critterer_logo.png');
        this.load.image('ball', 'img/ball.png');
    },

    /**
     * Implements create()
     * the create method fires once the preload method is complete
     */
    create: function () {
        // set max number of inputs (only one mouse, finger, curser, etc)
        this.input.maxPointers = 1;

        // set to pause the game if browser window not active
        this.stage.disableVisibilityChange = false;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 480;
        this.scale.minHeight = 270;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.stage.forceLandscape = true;
        this.scale.setScreenSize(true);

        this.input.addPointer();
        this.stage.backgroundColor = '#171642';

        this.state.start('Preloader');
    }
};
